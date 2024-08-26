import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateBookFn, singleBookFn } from "../../api/Book/Book";
import { getAllBookshelfFn } from "../../api/Bookshelf/Bookshelf";
import { getAllCategoryFn } from "../../api/Category/Category";

export default function EditModal({ book, refetch }) {
  const [date, setDate] = useState(new Date());

  // Format date to MM-DD-YYYY
  const formatDate = (date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

   // Fetching all bookshelves
   const {
    data: dataBookshelf,
    refetch: refetchBookshelf,
    isLoading: loadingBookshelf,
    reset: resetBookshelf,
  } = useQuery("allBookshelf", getAllBookshelfFn);

  // Fetching all categories
  const {
    data: dataCategory,
    refetch: refetchCategory,
    isLoading: loadingCategory,
    reset: resetCategory,
  } = useQuery("allCategory", getAllCategoryFn);

  // Form handling setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Effect to populate form with book details when `book` prop changes
  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("author", book.author);
      setValue("publication_year", book.publication_year);
      setValue("publisher", book.publisher);
      setValue("category_id", book.category_id);
      setValue("source", book.source);
      setValue("old_book", book.old_book ? "true" : "false");
      setValue("bookshelf_id", book.bookshelf_id);
      setDate(new Date(book.date_added));
    }
  }, [book, setValue]);

  // Mutation to update book details
  const handleUpdateBook = useMutation({
    mutationFn: (data) => updateBookFn(book.id, data),
    onSuccess: async () => {
      await refetch(); // Refetch the book list or other data after successful update
      Swal.fire({
        icon: "success",
        title: "Book Updated!",
        text: "The Book has been successfully updated.",
      });
      document.getElementById("update_book_modal").close(); // Close the modal after success
    },
    onError: async (error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error updating Book!",
        text: error.response?.data?.msg || "An error occurred",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    data.date_added = formatDate(date); // Format the date before submitting
    handleUpdateBook.mutateAsync(data); // Trigger the mutation to update book
  };


  return (
    <dialog id="update_book_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-start">Edit Book</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label htmlFor="title" className="flex font-semibold text-l mt-3">
              Title
            </label>
           
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Title"
              {...register("title")}
            />
          </div>

          <div>
            <label htmlFor="author" className="flex font-semibold text-l mt-3">
              Author
            </label>
          
            <input
              className="input input-md input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Author"
              {...register("author")}
            />
          </div>

          <div>
            <label htmlFor="publication_year" className="flex font-semibold text-l mt-3">
              Publication Year
            </label>
           
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Publication Year"
              {...register("publication_year", {
            
                valueAsNumber: true,
                validate: {
                  isFourDigit: (value) => /^\d{4}$/.test(value) || "Publication year must be a 4-digit number"
                }
              })}
            />
          </div>

          <div>
            <label htmlFor="publisher" className="flex font-semibold text-l mt-3">
              Publisher
            </label>
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Publisher"
              {...register("publisher")}
            />
          </div>

          <div>
            <label htmlFor="category_id" className="flex font-semibold text-l mt-3">
              Category
            </label>
            <select
              className="select select-bordered w-full rounded-lg mt-2"
              {...register("category_id")}
            >
              <option disabled selected>Select Category</option>
              {dataCategory?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
          </div>

          <div>
            <label htmlFor="date_added" className="flex font-semibold text-l mt-3">
              Date Added
            </label>
            <div className="flex justify-start my-2">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="MM-dd-yyyy"
              />
            </div>
          </div>

          <div>
            <label htmlFor="source" className="flex font-semibold text-l mt-3">
              Source
            </label>
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Source"
              {...register("source")}
            />
          </div>

          <div>
            <label htmlFor="old_book" className="flex font-semibold text-l mt-3">
              Old Book
            </label>
            <div className="flex flex-row gap-5">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">No</span>
                  <input
                    type="radio"
                    name="old_book"
                    value="false"
                    className="radio checked:bg-red-500 ml-2"
                    defaultChecked={!book?.old_book}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Yes</span>
                  <input
                    type="radio"
                    name="old_book"
                    value="true"
                    className="radio checked:bg-blue-500 ml-2"
                    defaultChecked={book?.old_book}
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="bookshelf" className="flex font-semibold text-l mt-3">
              Bookshelf
            </label>
            <select
              className="select select-bordered w-full rounded-lg mt-2"
              {...register("bookshelf_id")}
            >
              <option disabled selected>Select Bookshelf</option>
              {dataBookshelf?.map((bookshelf) => (
                <option key={bookshelf.id} value={bookshelf.id}>
                  {bookshelf.name}
                </option>
              ))}
            </select>
            
          </div>

          <div className="w-full flex justify-end">
            <button className="btn btn-ghost btn-xl bg-[#06476F] text-white rounded-lg mt-2" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
