import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AuthorizeLayout = () => {
  return (
    <div className="flex flex-row justify-between">
      <Sidebar />
      <div className="content-area w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthorizeLayout;
