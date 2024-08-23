import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import BookPic from "../../assets/book.png";
import { registerUserFn } from "../../api/Auth/Auth";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const methods = useForm();
  const navigate = useNavigate(); 
  const {
    register,
    handleSubmit: submitRegister,
    formState: { errors },
    reset: resetRegister,
  } = methods;

  const handleRegister = useMutation({
    mutationFn: (data) => registerUserFn(data),
    onSuccess: (res) => {
      console.log(res);
      resetRegister();
      navigate("/login");
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "The account has been successfully created.",
      });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.msg || "An error occurred",
      });
    },
  });

  const addAccount = (data) => {
    handleRegister.mutate(data);
  };

  return (
    <div className="flex bg-[#F6E96B] h-screen max-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mt-8">
            <div className="mt-6">
              <FormProvider {...methods}>
                <form
                  className="space-y-6"
                  onSubmit={submitRegister(addAccount)}
                >
                  <div className="bg-white rounded-xl shadow-xl p-10">
                    <div>
                      <h2 className="my-4 text-3xl font-bold tracking-tight text-start text-gray-900">
                        Register
                      </h2>
                    </div>
                    <div className="flex flex-col mb-2">
                      <label className="mb-1 text-start" htmlFor="">
                        Username
                      </label>
                      <input
                        type="text"
                        className="rounded-md border h-12 outline-none appearance-none px-4"
                        {...register("full_name", {
                          required: "Full Name is required",
                        })}
                      />
                      {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col mb-2">
                      <label className="mb-1 text-start" htmlFor="">
                        Email
                      </label>
                      <input
                        type="text"
                        className="rounded-md border h-12 outline-none appearance-none px-4"
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                      {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-row gap-10 mb-2 mt-2">
                      <div className="flex flex-col">
                        <label htmlFor="" className="text-start">
                          Password
                        </label>
                        <div className="relative mt-2">
                          <input
                            type="password"
                            className="rounded-md border h-12 outline-none appearance-none px-4 w-full"
                            {...register("password", {
                              required: "Password is required",
                            })}
                          />
                          {errors.password && <p>{errors.password.message}</p>}
                        </div>
                      </div>
                      <div className="flex flex-col mt-2 mb-2">
                        <label htmlFor="" className="text-start">
                          Confirm Password
                        </label>
                        <div className="relative mt-2">
                          <input
                            type="password"
                            className="rounded-md border h-12 outline-none appearance-none px-4 w-full"
                            {...register("confPassword")}
                          />
                          {errors.password && <p>{errors.password.message}</p>}
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        className="btn w-full bg-[#FF4E88] text-white"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex-1 w-full max-w-xs lg:flex justify-center items-center mx-40 my-20">
        <img src={BookPic} alt="Book" />
      </div>
    </div>
  );
}
