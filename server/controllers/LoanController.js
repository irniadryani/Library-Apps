const { Op } = require("sequelize");
const Loans = require("../models/LoansModel");
const Book = require("../models/BookModel");
const Category = require("../models/CategoryModel");
const sequelize = require("../config/connection");

const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
};

const showLoanBook = async (req, res) => {
    try {
       
        const loans = await Loans.findAll({
            include: {
                model: Book,
                attributes: ["title"],
                as: 'book', 
            },
            order: [
              
                [sequelize.literal(`CASE WHEN "return_date" IS NULL THEN 1 ELSE 2 END`)],
               
                ['created_at', 'DESC'],
            ],
        });

        if (loans.length === 0) {
            return res.status(404).json({ msg: "No loans found" });
        }

        const formattedDateAdded = loans.date_added
        ? new Date(loans.date_added).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
        : null;

      
        const response = loans.map(loan => ({
            id: loan.id,
            borrower_name: loan.borrower_name,
            title: loan.book ? loan.book.title : null, 
            loan_date: formatDate(loan.loan_date),
            estimated_return_date: formatDate(loan.estimated_return_date),
            return_date: formatDate(loan.return_date),
            age: loan.age,
            created_at: loan.created_at,
            updated_at: loan.updated_at,
            deleted_at: loan.deleted_at,
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching loans:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const getLoanById = async (req, res) => {
    const { id } = req.params;

    try {
        const loan = await Loans.findByPk(id);

        if (!loan) {
            return res.status(404).json({ msg: "Loan not found" });
        }

        res.status(200).json(loan);
    } catch (error) {
        console.error("Error fetching loan:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const createLoan = async (req, res) => {
    const { loan_date, estimated_return_date, book_id, age, borrower_name } = req.body;
  
    try {
        
        const book = await Book.findOne({
            where: {
                id: book_id,
                status: 'Available',
            },
            include: [{ model: Category, as: 'category' }]
        });

        if (!book) {
            return res.status(400).json({ message: 'Book is not available or not found.' });
        }
  
        
        const loanDate = new Date(loan_date);
        const returnEstimationDate = new Date(estimated_return_date);
        const today = new Date();
  
       
        if (loanDate <= today) {
            return res.status(400).json({ message: 'Loan date must be after today.' });
        }
  
        
        if (loanDate >= returnEstimationDate) {
            return res.status(400).json({ message: 'Loan date must be before the estimated return date.' });
        }
  
        
        if (loanDate.getTime() === returnEstimationDate.getTime()) {
            return res.status(400).json({ message: 'Loan date and estimated return date cannot be the same.' });
        }
        if (age < 17) {
            return res.status(400).json({ message: 'Borrower must be at least 17 years old.' });
        } else if (age > 80) {
            return res.status(400).json({ message: 'Borrower age exceeds the maximum limit of 80 years.' });
        }
  
        const newLoan = await Loans.create({
            book_id: book_id,
            age: age,
            borrower_name,
            loan_date: loanDate,
            estimated_return_date: returnEstimationDate,
        });
  
       
        await book.update({ status: 'Borrowed' });
  
        return res.status(201).json({
            message: 'Loan has been successfully saved.',
            loan: newLoan,
            book: {
                title: book.title,
                author: book.author,
                category: book.category ? book.category.name : 'Unknown',
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while saving the loan.' });
    }
};


const returnBook = async (req, res) => {
    const { return_date } = req.body;
    const { id: loan_id } = req.params;

    try {
        const loan = await Loans.findOne({
            where: { id: loan_id },
            include: [
                {
                    model: Book,
                    as: 'book',
                    attributes: ['id', 'title', 'author', 'category_id', 'status'],
                    include: [
                        {
                            model: Category,
                            as: 'category',
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found.' });
        }

        if (!loan.book) {
            return res.status(404).json({ message: 'Associated book not found.' });
        }

        const formattedReturnDate = formatDate(return_date);

        // Update loan return date
        await loan.update({
            return_date: formattedReturnDate,
        });

        // Update book status
        await loan.book.update({ status: 'Available' });

        return res.status(200).json({
            message: 'Book returned successfully.',
            loan: loan,
        });
    } catch (error) {
        console.error('Error returning book:', error);
        return res.status(500).json({ message: 'An error occurred while returning the book.' });
    }
};


// const returnBook = async (req, res) => {
//     const { return_date } = req.body;
//     const { id: loan_id } = req.params;

//     try {
//         const loan = await Loans.findOne({
//             where: { id: loan_id },
//             include: [
//                 {
//                     model: Book,
//                     as: 'book',
//                     attributes: ['title', 'author', 'category_id'],
//                     include: [
//                         {
//                             model: Category,
//                             as: 'category',
//                             attributes: ['name']
//                         }
//                     ]
//                 }
//             ]
//         });

//         if (!loan) {
//             return res.status(404).json({ message: 'Loan not found.' });
//         }

//         await loan.update({
//             return_date: formatDate(return_date),
//         });

//         await loan.book.update({ status: 'Available' });

//         return res.status(200).json({
//             message: 'Book returned successfully.',
//             loan: loan,
//             book: {
//                 title: loan.book.title,
//                 author: loan.book.author,
//                 category: loan.book.category.name,
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'An error occurred while returning the book.' });
//     }
// };

module.exports = {
    showLoanBook, getLoanById, createLoan, returnBook
};


// const { Op } = require("sequelize");
// const Loans = require("../models/LoansModel");
// const Category = require("../models/CategoryModel");
// const Book = require("../models/BookModel")

// const showLoanBook = async (req,res) => {
//     try {
//         const loan = await Loans.findAll();

//         res.status(200).json(loan);
//     } catch (error) {
//         console.error("Error fetching loan:", error);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// }

// const getLoanById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const loan = await Loans.findByPk(id);

//         if (!loan) {
//             return res.status(404).json({ msg: "Loan not found" });
//         }

//         res.status(200).json(loan);
//     } catch (error) {
//         console.error("Error fetching loan:", error);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// };

// const createLoan = async (req, res) => {
//     const { loan_date, estimated_return_date, book_id, age, borrower_name } = req.body;
  
//     try {
//       // Check if the book is available
//       const book = await Book.findOne({
//         where: {
//           id: book_id,
//           status: 'Available',
//         },
//         include: [{ model: Category }] // Include Category to get its name
//       });
  
//       if (!book) {
//         return res.status(400).json({ message: 'Buku tidak tersedia atau tidak ditemukan.' });
//       }
  
//       // Validate loan dates
//       const today = new Date();
//       const loanDate = new Date(loan_date);
//       const returnEstimationDate = new Date(estimated_return_date);
  
//       if (loanDate <= today) {
//         return res.status(400).json({ message: 'Tanggal peminjaman harus lebih dari hari ini.' });
//       }
  
//       if (loanDate >= returnEstimationDate) {
//         return res.status(400).json({ message: 'Tanggal peminjaman harus sebelum estimasi pengembalian.' });
//       }
  
//       if (loanDate.getTime() === returnEstimationDate.getTime()) {
//         return res.status(400).json({ message: 'Tanggal peminjaman dan estimasi pengembalian tidak boleh sama.' });
//       }
  
//       // Create new loan
//       const newLoan = await Loans.create({
//         book_id: book_id,
//         age: age,
//         borrower_name,
//         loan_date: loanDate,
//         estimated_return_date: returnEstimationDate,
//       });
  
//       // Update book status to "Borrowed"
//       await book.update({ status: 'Borrowed' });
  
//       return res.status(201).json({
//         message: 'Peminjaman berhasil disimpan.',
//         loan: newLoan,
//         book: {
//           title: book.title,
//           author: book.author,
//           category: book.category ? book.category.name : 'Unknown', // Access category name
//         }
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan peminjaman.' });
//     }
//   };
  

//   const returnBook = async (req, res) => {
//     const { return_date } = req.body;
//     const { id: loan_id } = req.params; // Get loan ID from route parameter
  
//     try {
//       // Find the loan and associated book
//       const loan = await Loans.findOne({
//         where: { id: loan_id },
//         include: [
//           {
//             model: Book,
//             as: 'book',
//             attributes: ['title', 'author', 'category_id'],
//             include: [
//               {
//                 model: Category,
//                 as: 'category',
//                 attributes: ['name']
//               }
//             ]
//           }
//         ]
//       });
  
//       if (!loan) {
//         return res.status(404).json({ message: 'Loan not found.' });
//       }
  
//       // Update return date and book status
//       await loan.update({
//         return_date: new Date(return_date),
//       });
  
//       await loan.book.update({ status: 'Available' });
  
//       return res.status(200).json({
//         message: 'Book returned successfully.',
//         loan: loan,
//         book: {
//           title: loan.book.title,
//           author: loan.book.author,
//           category: loan.book.category.name, // Include category name if needed
//         }
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Error occurred while returning the book.' });
//     }
//   };
  

// module.exports = {
//     showLoanBook, getLoanById, createLoan, returnBook
// }