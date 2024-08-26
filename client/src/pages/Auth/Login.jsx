import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { loginUserFn } from "../../api/Auth/Auth";
import useStore from "../../store/index";
import BookPic from "../../assets/book.png";
import BookPic2 from "../../assets/book2.png";
import { toast } from "react-toastify";

export default function Login() {
  const methods = useForm();
  const { setUserSession, setAuthUser } = useStore();
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      console.log('Login data:', data); 
      const response = await loginUserFn(data); 

   
      if (response.session) {
        setUserSession(response.session); 
        setAuthUser({
          id: response.session.id,
          email: response.session.email,
          full_name: response.session.full_name,
          role: response.session.role,
        });

        navigate("/"); 
        toast.success("You successfully logged in");
      } else {
        throw new Error("No session data returned");
      }
    } catch (error) {
      console.error("Login failed:", error.message); 
      toast.error("Email or Password is not valid");
    }
  };

  return (
    <div className="flex bg-[#C1D8C3] !h-dvh w-full">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-start text-gray-900">
              Login
            </h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <FormProvider {...methods}>
                <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="flex flex-col">
                    <label className="mb-2 text-start" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      className="rounded-md border h-12 outline-none appearance-none px-4"
                      {...methods.register("email", { required: true })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password" className="text-start">
                      Password
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="password"
                        className="rounded-md border h-12 outline-none appearance-none px-4 w-full"
                        {...methods.register("password", { required: true })}
                      />
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="btn w-full bg-[#6A9C89] text-white">
                      Log in
                    </button>
                  </div>
                </form>

                <div className="mt-3 flex flex-row gap-2 justify-center items-center">
                  <p className="text-gray-600 font-semibold text-xs">Not a member?</p>
                  <a href="/register" className="text-blue-600 font-semibold text-xs">Sign Up</a>
                </div>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-row gap-10 ">
       <div>
       <img src={BookPic2} alt="Book" className="w-48 mt-40" /> 
        </div>

      </div>
    </div>
  );
}
