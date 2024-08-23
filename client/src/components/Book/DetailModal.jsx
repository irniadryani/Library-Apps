import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { singleBookFn } from "../../api/Book/Book";
import { tailspin } from "ldrs";

export default function DetailModal({ bookId }) {
  const { data: dataSingleBook, refetch: refetchSingleBook } = useQuery(
    ["Single book", bookId],
    () => singleBookFn(bookId),
    {
      enabled: !!bookId,
    }
  );

  tailspin.register();

  useEffect(() => {
    if (bookId) {
      refetchSingleBook();
    }
  }, [bookId, refetchSingleBook]);

  return (
    <dialog id="detail_book_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Book Details</h3>
        {dataSingleBook ? (
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex flex-row gap-20">
              <p className="w-24 font-semibold text-start">Title</p>
              <p className="w-48 font-medium text-start">
                {dataSingleBook.title}
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <p className="w-24 font-semibold text-start">Author</p>
              <p className="w-48 font-medium text-start">
                {dataSingleBook.author}
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <p className="w-24 font-semibold text-start">Publication Year</p>
              <p className="w-48 font-medium text-start">
                {dataSingleBook.publication_year}
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <p className="w-24 font-semibold text-start">Publisher</p>
              <p className="w-48 font-medium text-start">
                {dataSingleBook.publisher}
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <p className="w-24 font-semibold text-start">Category</p>
              <p className="w-48 font-medium text-start">
                {dataSingleBook.category}
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <p className="w-24 font-semibold text-start">Date Added</p>
              <p className="w-48 font-medium text-start">
                {dataSingleBook.date_added}
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <p className="w-24 font-semibold text-start">Source</p>
              <p className="w-48 font-medium text-start">
                {dataSingleBook.source}
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <p className="w-24 font-semibold text-start">Old Book</p>
              <p className="w-48 font-medium text-start">
                {dataSingleBook.old_book}
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <p className="w-24 font-semibold text-start">Boookshelf</p>
              <p className="w-48 font-medium text-start">
                {dataSingleBook?.bookshelves?.name}
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <p className="w-24 font-semibold text-start">Status</p>
              <p
                className={`${
                  dataSingleBook.status === "Available"
                    ? "bg-green-600"
                    : "bg-red-600"
                } text-white p-2 text-center font-semibold rounded-lg w-48`}
              >
                {dataSingleBook.status}
              </p>
            </div>
          </div>
        ) : (
          <p>
            <l-tailspin
              size="40"
              stroke="5"
              speed="0.9"
              color="black"
            ></l-tailspin>
          </p>
        )}
      </div>
    </dialog>
  );
}
