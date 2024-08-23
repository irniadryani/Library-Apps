import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function index({ children }) {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-grow overflow-auto">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
