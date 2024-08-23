import React, { useEffect, useState } from "react";
import { returnBookFn } from "../../api/Transaction/Transaction";
import { toast } from "react-toastify";

export default function TableTransaction({ data, refetch, currentPaginationTable}) {
    const [currentPage, setCurrentPage] = useState(currentPaginationTable || 1);
    const formatDate = (date) => {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
      };

      useEffect(() => {
        if (
          currentPaginationTable === undefined ||
          currentPaginationTable === null
        ) {
          setCurrentPage(1);
        }
      }, [currentPaginationTable]);
    
      const recordsPerPage = 10;
      const npage = Math.ceil((data?.length || 0) / recordsPerPage);
      const numbers = Array.from({ length: npage }, (_, index) => index + 1);
    
      const prePage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const changeCPage = (id) => {
        setCurrentPage(id);
      };
    
      const nextPage = () => {
        if (currentPage < npage) {
          setCurrentPage(currentPage + 1);
        }
      };
    
    
      const filteredTransaction= data
        ? data.slice(
            (currentPage - 1) * recordsPerPage,
            currentPage * recordsPerPage
          )
        : [];
    

      const handleReturnBook = async (id) => {
        try {
          const now = new Date();
          const formattedReturnDate = formatDate(now);
          
          await returnBookFn(id, { return_date: formattedReturnDate });
          toast.success("Successfully returned book");
          
          if (refetch) refetch();
        } catch (error) {
          console.error("Return error:", error);
          toast.error("Return failed. Please try again.");
        }
      };
      
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-sm text-black text-center">
              <th>No</th>
              <th>Title</th>
              <th>Borrower Name</th>
              <th>Loan Date</th>
              <th>Estimated Return Date</th>
              <th>Return Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransaction?.map((transaction, index) => (
              <tr className="hover text-sm text-black text-center">
                <th>{index + 1 + (currentPage - 1) * recordsPerPage}</th>
                <td>{transaction.title}</td>
                <td>{transaction.borrower_name}</td>
                <td>{transaction.loan_date}</td>
                <td>{transaction.estimated_return_date}</td>
                <td>{transaction.return_date}</td>
                <td>
                {transaction.return_date === null && (
                  <button
                    onClick={() => handleReturnBook(transaction.id)}
                    className="btn bg-[#5F6F65] text-white"
                  >
                    Return Book
                  </button>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="flex justify-center mt-5">
        <div className="flex items-center gap-4 mt-2 justify-center lg:justify-end">
          <button
            disabled={currentPage === 1}
            onClick={prePage}
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Prev
          </button>
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => changeCPage(num)}
              className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase ${
                currentPage === num
                  ? "bg-[#000000] text-white"
                  : "text-gray-900"
              } transition-all hover:bg-[#000000] hover:text-white active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            >
              {num}
            </button>
          ))}
          <button
            disabled={currentPage === npage}
            onClick={nextPage}
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
}
