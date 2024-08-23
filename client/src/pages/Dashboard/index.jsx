import React from "react";
import Layout from "../Layout/index";
import DashboardImg from "../../assets/dashboardimg.png";
import { listBookFn } from "../../api/Book/Book";
import { useQuery } from "react-query";

export default function index() {
  const {
    data: dataBook,
    refetch: refetchBook,
    isLoading: loadingBook,
    reset: resetBook,
  } = useQuery("allBook", listBookFn);

  const calculateTotalBooks = () => {
    let totalbooks = 0;

    if (!loadingBook && dataBook) {
      totalbooks = dataBook.length;
    }
    return totalbooks;
  };

  const calculateBorrowedBooks = () => {
    let borrowedBook = 0;

    if (!loadingBook && dataBook) {
      borrowedBook = dataBook.filter( (book) => (book.status) === "Borrowed").length;
    }
    return borrowedBook;
  };

  const calculateNewBooks = () => {
    let newBook = 0;

    if (!loadingBook && dataBook) {
      newBook = dataBook.filter( (book) => (book.old_book) === false).length;
    }
    return newBook;
  };

  const totalBorrowedBooks = calculateBorrowedBooks();
  const totalBooks = calculateTotalBooks();
  const totalNewBooks = calculateNewBooks();
  return (
    <div>
      <div className="bg-gradient-to-br from-[#808D7C] via-[#9CA986] to-[#C9DABF] w-full h-56 rounded-xl shadow-xl">
        <div className="flex flex-row justify-start items-start">
          <div className="mx-20 my-10">
            <p className="text-white text-3xl font-bold text-start">
              <span>Welcome to the</span>
              <br />
              <span className="block mt-2 text-4xl">Online Library</span>
            </p>
          </div>
          <div className="flex items-end justify-end ">
            <img src={DashboardImg} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        <div className="flex items-center justify-start rounded-xl bg-[#5F6F65] shadow-xl w-full h-36">
          <div className="flex flex-col items-start ml-5">
            <p className="font-bold text-sm text-start py-2 items-start text-white">
              Total Books
            </p>
            {!loadingBook && (
              <h2 className="font-bold text-6xl items-start text-white">
                {totalBooks}
              </h2>
            )}
            <p className="font-medium text-xs py-2 items-start text-white">
              Book
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start rounded-xl bg-[#5F6F65] shadow-xl w-full h-36">
        <div className="flex flex-col items-start ml-5">
            <p className="font-bold text-sm text-start py-2 items-start text-white">
              Total Borrowed Books
            </p>
            {!loadingBook && (
              <h2 className="font-bold text-6xl items-start text-white">
                {totalBorrowedBooks}
              </h2>
            )}
            <p className="font-medium text-xs py-2 items-start text-white">
              Book
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start rounded-xl bg-[#5F6F65] shadow-xl w-full h-36">
        <div className="flex flex-col items-start ml-5">
            <p className="font-bold text-sm text-start py-2 items-start text-white">
              Total New Books
            </p>
            {!loadingBook && (
              <h2 className="font-bold text-6xl items-start text-white">
                {totalNewBooks}
              </h2>
            )}
            <p className="font-medium text-xs py-2 items-start text-white">
              Book
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-xl bg-[#5F6F65] shadow-xl w-full h-36">
          Total Late Return
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-start my-10">Top 10 Popular Book</p>
      </div>
    </div>
  );
}
