const { Op } = require("sequelize");
const Book = require("../models/BookModel");
const Loan = require("../models/LoansModel");
const Category = require("../models/CategoryModel");
const Bookshelf = require("../models/BookshelvesModel");

// Function for get last loan date for each book
const getLastLoanDate = async (bookId) => {
    try {
        const lastLoan = await Loan.findOne({
            where: { book_id: bookId },
            order: [['loan_date', 'DESC']],
            attributes: ['loan_date'],
        });
        return lastLoan ? lastLoan.loan_date : null;
    } catch (error) {
        console.error("Error fetching last loan date:", error);
        return null;
    }
};

//Function for get all book
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [{ model: Category, as: 'category', attributes: ['name'] }],
        });

        const response = await Promise.all(books.map(async (book) => {
            const lastLoanDate = await getLastLoanDate(book.id);

            const formattedLastLoanDate = lastLoanDate
                ? new Date(lastLoanDate).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                })
                : null;

            return {
                ...book.dataValues,
                formattedLastLoanDate
            };
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

//Function for insert book
const insertBook = async (req, res) => {
    const { title, author, publisher, publication_year, category_id, date_added, source, old_book, bookshelf_id, status } = req.body;

    try {
        if (!/^\d{4}$/.test(publication_year)) {
            return res.status(400).json({ msg: "Invalid publication year. It should be a 4-digit number." });
        }

        const isValidDateFormat = (dateString) => {
            const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-\d{4}$/; 
            return regex.test(dateString);
        };

        if (!isValidDateFormat(date_added)) {
            return res.status(400).json({ msg: "Invalid date format. Use MM-DD-YYYY format." });
        }

        const parseDate = (dateString) => {
            const [month, day, year] = dateString.split('-').map(num => parseInt(num, 10));
            return new Date(year, month - 1, day).toISOString();
        };

        const formattedDateAdded = parseDate(date_added);

        const book = await Book.create({
            title,
            author,
            publisher,
            publication_year: parseInt(publication_year, 10), 
            category_id,
            date_added: formattedDateAdded, 
            old_book,
            source,
            status,
            bookshelf_id
        });

        res.status(201).json({
            msg: "Book created successfully",
            book
        });
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

//Function for get book by id
const getBookById = async (req, res) => {
    const { id } = req.params;
  
    try {
    
      const book = await Book.findByPk(id, {
        include: [
            {
                model: Bookshelf, 
                attributes: ["name"],
                as: 'bookshelves',
            },
            {
                model: Category, 
                attributes: ["name"],
                as: 'category', 
            },
        ],
      });
  
      if (!book) {
        return res.status(404).json({ msg: "Book not found" });
      }
  
     
      const formattedDateAdded = book.date_added
        ? new Date(book.date_added).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
        : null;
  
     
      const isOldBook = book.old_book ? "Yes" : "No";
  
      const response = {
        id: book.id,
        category_id: book.category_id,
        category: book.category ? book.category.name : null,
        title: book.title,
        author: book.author,
        status: book.status,
        publisher: book.publisher,
        publication_year: book.publication_year,
        date_added: formattedDateAdded,
        source: book.source,
        old_book: isOldBook,
        bookshelf_id: book.bookshelf_id,
        bookshelves: book.bookshelves ? book.bookshelves.name : null,
        created_at: book.created_at,
        updated_at: book.updated_at,
        deleted_at: book.deleted_at,
        bookshelves: {
          name: book.bookshelves ? book.bookshelves.name : null,
        },
      };
  
    
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching book:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  //Function for update book 
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, publisher, publication_year, category_id, date_added, source, old_book, bookshelf_id, status } = req.body;

    try {
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }

        
        if (publication_year && !/^\d{4}$/.test(publication_year)) {
            return res.status(400).json({ msg: "Invalid publication year. It should be a 4-digit number." });
        }

        const isValidDateFormat = (dateString) => {
            const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-\d{4}$/; 
            return regex.test(dateString);
        };

        if (date_added && !isValidDateFormat(date_added)) {
            return res.status(400).json({ msg: "Invalid date format. Use MM-DD-YYYY format." });
        }

        
        const parseDate = (dateString) => {
            const [month, day, year] = dateString.split('-').map(num => parseInt(num, 10));
            return new Date(year, month - 1, day).toISOString(); 
        };

    
        const formattedDateAdded = date_added ? parseDate(date_added) : book.date_added;

        
        await book.update({
            title,
            author,
            publisher,
            publication_year: publication_year ? parseInt(publication_year, 10) : book.publication_year, // Convert to number if provided
            category_id,
            date_added: formattedDateAdded,
            source,
            old_book,
            status,
            bookshelf_id
        });

        res.status(200).json({ msg: "Book updated successfully", book });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

//Function for delete book
const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }

        await book.destroy();

        res.status(200).json({ msg: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


module.exports = { insertBook, getBookById, getAllBooks, updateBook, deleteBook };


