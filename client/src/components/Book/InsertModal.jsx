import React, { useState } from "react";
import { insertBookFn } from "../../api/Book/Book";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllBookshelfFn } from "../../api/Bookshelf/Bookshelf";
import { getAllCategoryFn } from "../../api/Category/Category";

export default function InsertModal({ refetch }) {
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
      reset,
    } = useForm();
  
    // Mutation to insert a new book
    const handleCreateBook = useMutation({
      mutationFn: (data) => insertBookFn(data),
      onMutate() {},
      onSuccess: (res) => {
        console.log(res);
        refetch(); // Refetch the list of books or other related data
        reset(); // Reset the form fields
        document.getElementById("insert_book_modal").close(); // Close the modal
        Swal.fire({
          icon: "success",
          title: "Book Created!",
          text: "The Book has been successfully created.",
        });
      },
      onError: (error) => {
        console.log(error);
        document.getElementById("insert_book_modal").close(); // Close the modal on error
        const errorMessage = error.response?.data?.message || "An error occurred";
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      },
    });
  
    // Handle form submission
    const addBook = (data) => {
      data.date_added = formatDate(date); // Add formatted date
      data.status = "Available"; // Set book status to "Available"
      handleCreateBook.mutateAsync(data); // Trigger the mutation to insert the book
    };
  

  return (
    <dialog id="insert_book_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-start">Insert Book</h3>
        <form onSubmit={handleSubmit(addBook)}>
          <div className="">
            <label htmlFor="title" className="flex font-semibold text-l mt-3">
              Title
            </label>
            {errors.title && (
              <p className="text-start text-red-600 text-xs">
                *This field is required
              </p>
            )}
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Title"
              {...register("title", { required: true })}
            />
          </div>

          <div>
            <label htmlFor="author" className="flex font-semibold text-l mt-3">
              Author
            </label>
            {errors.author && (
              <p className="text-start text-red-600 text-xs">
                *This field is required
              </p>
            )}
            <input
              className="input input-md input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Author"
              {...register("author", { required: true })}
            />
          </div>

          <div>
            <label
              htmlFor="publication_year"
              className="flex font-semibold text-l mt-3"
            >
              Publication Year
            </label>
            {errors.publication_year && (
              <p className="text-start text-red-600 text-xs">
                *This field is required
              </p>
            )}
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Publication Year"
              {...register("publication_year", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <label
              htmlFor="publisher"
              className="flex font-semibold text-l mt-3"
            >
              Publisher
            </label>
            {errors.publisher && (
              <p className="text-start text-red-600 text-xs">
                *This field is required
              </p>
            )}
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Publisher"
              {...register("publisher")}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="flex font-semibold text-l mt-3"
            >
              Category
            </label>
            <select
              className="select select-bordered w-full rounded-lg mt-2"
              {...register("category_id", { required: true })}
            >
              <option disabled selected>
                Select Category
              </option>
              {dataCategory?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && <span>This field is required</span>}
          </div>

          <div>
            <label
              htmlFor="date_added"
              className="flex font-semibold text-l mt-3"
            >
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
            <label
              htmlFor="old_book"
              className="flex font-semibold text-l mt-3"
            >
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
                    {...register("old_book")}
                    className="radio checked:bg-red-500 ml-2"
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
                    {...register("old_book")}
                    className="radio checked:bg-blue-500 ml-2"
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="bookshelf"
              className="flex font-semibold text-l mt-3"
            >
              Bookshelf
            </label>
            <select
              className="select select-bordered w-full rounded-lg mt-2"
              {...register("bookshelf_id", { required: true })}
            >
              <option disabled selected>
                Select Bookshelf
              </option>
              {dataBookshelf?.map((bookshelf) => (
                <option key={bookshelf.id} value={bookshelf.id}>
                  {bookshelf.name}
                </option>
              ))}
            </select>
            {errors.bookshelf_id && <span>This field is required</span>}
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
