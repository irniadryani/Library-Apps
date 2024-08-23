import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import Router from "./router/index.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer toastClassName="z-[999]" />{" "}
      <RouterProvider router={Router} />{" "}
    </QueryClientProvider>
  );
}

export default App;
