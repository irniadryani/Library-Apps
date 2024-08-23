import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { deleteBookFn, singleBookFn } from "../../api/Book/Book";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import EditModal from "./EditModal";
import DetailModal from "./DetailModal";

export default function TableBook({
  refetch,
  data,
  isLoading,
  currentPaginationTable,
}) {
  const [bookIdToDelete, setbookIdToDelete] = useState(null);
  const [bookToUpdate, setbookToUpdate] = useState(null);
  const [bookIdToView, setBookIdToView] = useState(null);
  const [currentPage, setCurrentPage] = useState(currentPaginationTable || 1);

  useEffect(() => {
    if (
      currentPaginationTable === undefined ||
      currentPaginationTable === null
    ) {
      setCurrentPage(1);
    }
  }, [currentPaginationTable]);

  const recordsPerPage = 5;
  const npage = Math.ceil((data?.length || 0) / recordsPerPage);
  const numbers = Array.from({ length: npage }, (_, index) => index + 1);

  // Pagination handlers
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

  const filteredBook = data
    ? data.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
      )
    : [];

  const openDetailModal = (bookId) => {
    setBookIdToView(bookId);
    document.getElementById("detail_book_modal").showModal();
  };

  const openUpdateModal = (bookId) => {
    document.getElementById("update_book_modal").showModal();
  };

  const handleDeleteBook = useMutation({
    mutationFn: (data) => deleteBookFn(data),
    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleConfirmDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await handleDeleteBook.mutateAsync(bookIdToDelete);
        Swal.fire({
          title: "Deleted!",
          text: "Your book has been deleted.",
          icon: "success",
        });
      }

      if (result.isDismissed || result.isDenied) {
        setbookIdToDelete(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    if (bookIdToDelete !== null) {
      handleConfirmDelete();
    }
  }, [bookIdToDelete]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-sm text-black text-center">
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBook?.map((book, index) => (
              <tr className="hover text-sm text-black">
                <th>{index + 1 + (currentPage - 1) * recordsPerPage}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category ? book.category.name : "No Category"}</td>
                <td>
                  <div
                    className={`${
                      book.status === "Available"
                        ? "bg-green-600"
                        : "bg-red-600"
                    } text-white p-2 text-center font-semibold rounded-lg`}
                  >
                    {book.status}
                  </div>
                </td>

                <td>
                  <div className="flex flex-row gap-4 justify-center items-center">
                    <div>
                      <button onClick={() => openDetailModal(book.id)}>
                        <FaInfoCircle size={20} />
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setbookToUpdate(book);
                          openUpdateModal(book.id);
                        }}
                      >
                        <FaPen size={16} />
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setbookIdToDelete(book.id);
                        }}
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditModal book={bookToUpdate} refetch={refetch} />
      <DetailModal bookId={bookIdToView} />

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
