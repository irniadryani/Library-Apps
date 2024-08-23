import React, { useState } from "react";
import { listBookFn } from "../../api/Book/Book";
import { useQuery } from "react-query";
import TableBook from "../../components/Book/TableBook";
import InsertModal from "../../components/Book/InsertModal";
import { IoCreateOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

export default function index() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const {
    data: dataBook,
    refetch: refetchBook,
    isLoading: loadingBook,
    reset: resetBook,
  } = useQuery("allBook", listBookFn);

  const filteredBook = dataBook?.filter((book) => {
    const matchingTitle =
      search === "" ||
      book?.title?.toLowerCase().includes(search.toLowerCase())
    return matchingTitle;
  });

  return (
    <div>
      <div>
        <p className="m-10 font-bold text-4xl text-start">List Book</p>
        <div className="flex justify-end">
        <div className="flex items-center gap-2 pl-4 max-w-[200px] my-10 rounded-lg bg-white border border-black hover:border-black focus:border-black  border-solid border-2 shadow-xl">
          <IoMdSearch fontSize="1.125rem" color="#000000" />
          <input
            type="text"
            className="flex h-10 pe-4 pb-1 w-full rounded-lg outline-none text-sm"
            placeholder="Search Employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

        <div className="flex justify-end my-5">
          <button
            onClick={() =>
              document.getElementById("insert_book_modal").showModal()
            }
            className="btn bg-[#9CA986] text-white shadow-lg"
          >
            <IoCreateOutline color="white"/>
            Add Book
          </button>
        </div>
        {!loadingBook && (
          <TableBook
            refetch={refetchBook}
            data={filteredBook}
            isLoading={loadingBook}
            currentPaginationTable={
              location.state === null || location.state === undefined
                ? null
                : location.state.currentPaginationTable
            }
          />
        )}
      </div>

      <InsertModal refetch={refetchBook} />
    </div>
  );
}
