import React, { useState } from "react";
import { listBookFn } from "../../api/Book/Book";
import { insertTransactionFn } from "../../api/Transaction/Transaction";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllBookshelfFn } from "../../api/Bookshelf/Bookshelf";

export default function InsertModal({ refetch }) {
  const [loandate, setLoanDate] = useState(new Date());
  const [estimateddate, setEstimatedDate] = useState(new Date());
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookDetails, setBookDetails] = useState({ author: '', bookshelfName: '' });

  const formatDate = (date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const {
    data: dataBookshelf,
    refetch: refetchBookshelf,
    isLoading: loadingBookshelf,
    reset: resetBookshelf,
  } = useQuery("allBookshelf", getAllBookshelfFn);

  const {
    data: dataBook,
    refetch: refetchBook,
    isLoading: loadingBook,
    reset: resetBook,
  } = useQuery("allBook", listBookFn);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const handleCreateBook = useMutation({
    mutationFn: (data) => insertTransactionFn(data),
    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      refetch();
      reset();
      document.getElementById("insert_transaction_modal").close();
      Swal.fire({
        icon: "success",
        title: "Loan Created!",
        text: "The Loan has been successfully created.",
      });
    },
    onError: (error) => {
        console.log(error);
        document.getElementById("insert_transaction_modal").close();
        const errorMessage = error.response?.data?.message || "An error occurred";
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      },
  });

  const addTransaction = (data) => {
    data.loan_date = formatDate(loandate);
    data.estimated_return_date = formatDate(estimateddate);
    data.book_id = selectedBook; 
    data.author = bookDetails.author; 
    data.bookshelf_name = bookDetails.bookshelfName; 

    handleCreateBook.mutateAsync(data);
  };

  const handleBookChange = (event) => {
    const selectedBookId = event.target.value;
    setSelectedBook(selectedBookId);

    const selectedBookData = dataBook.find((book) => book.id === selectedBookId);
    if (selectedBookData) {
      const bookshelf = dataBookshelf.find(bs => bs.id === selectedBookData.bookshelf_id);

      setBookDetails({
        author: selectedBookData.author,
        bookshelfName: bookshelf ? bookshelf.name : ''
      });

      setValue('author', selectedBookData.author);  
      setValue('bookshelf_id', selectedBookData.bookshelf_id); 
    }
  };

  const availableBooks = dataBook?.filter(book => book.status === 'Available') || [];

  return (
    <dialog id="insert_transaction_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-start">Insert Loan Book</h3>
        <form onSubmit={handleSubmit(addTransaction)}>
          <div>
            <label
              htmlFor="title"
              className="flex font-semibold text-l mt-3"
            >
              Title
            </label>
            <select
              className="select select-bordered w-full rounded-lg mt-2"
              {...register("title", { required: true })}
              onChange={handleBookChange}
            >
              <option disabled selected>
                Select Book
              </option>
              {availableBooks?.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
            {errors.title && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="author" className="flex font-semibold text-l mt-3">
              Author
            </label>
            <input
              className="input input-md input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Author"
              {...register("author", { required: true })}
              value={bookDetails.author} 
            />
          </div>
          <div>
            <label
              htmlFor="bookshelf_id"
              className="flex font-semibold text-l mt-3"
            >
              Bookshelf
            </label>
            <input
              className="input input-md input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Bookshelf"
              {...register("bookshelf_id", { required: true })}
              value={bookDetails.bookshelfName} 
            />
            {errors.bookshelf_id && <span>This field is required</span>}
          </div>
          <div>
            <label
              htmlFor="borrower_name"
              className="flex font-semibold text-l mt-3"
            >
              Borrower Name
            </label>
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Borrower Name"
              {...register("borrower_name")}
            />
          </div>
          <div>
            <label htmlFor="age" className="flex font-semibold text-l mt-3">
              Age
            </label>
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Age"
              {...register("age", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <label
              htmlFor="loan_date"
              className="flex font-semibold text-l mt-3"
            >
              Loan Date
            </label>
            <div className="flex justify-start my-2">
              <DatePicker
                selected={loandate}
                onChange={(loandate) => setLoanDate(loandate)}
                dateFormat="MM-dd-yyyy"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="estimated_return_date"
              className="flex font-semibold text-l mt-3"
            >
              Estimated Return Date
            </label>
            <div className="flex justify-start my-2">
              <DatePicker
                selected={estimateddate}
                onChange={(estimateddate) => setEstimatedDate(estimateddate)}
                dateFormat="MM-dd-yyyy"
              />
            </div>
          </div>

          <div className="w-full flex justify-end">
            <button
              className="btn btn-ghost btn-xl bg-[#06476F] text-white rounded-lg mt-2"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}




