import React from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="bg-[#E0E0E0] min-h-screen">
      {/* Sidebar (fixed) */}
      <Sidebar />

      {/* Right Section */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <div className="p-6 flex-1 overflow-auto text-[#000000]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
