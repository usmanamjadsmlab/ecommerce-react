import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi"; // User icon
import { ChevronDown, LogOut } from "lucide-react"; // Lucide icons

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-[#FFFFFF] shadow-md flex justify-between items-center px-6 py-3 sticky top-0 z-10">
      {/* Left Side: Logo */}
      <Link to="/" className="font-extrabold text-2xl text-[#000000]">
        SHOP.CO
      </Link>

      {/* Right Side: User Dropdown */}
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer"
        >
          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#E0E0E0] flex items-center justify-center">
            <FiUser className="text-xl text-[#1A1A1A]" />
          </div>
          {/* Arrow Down */}
          <ChevronDown
            className={`text-[#1A1A1A] transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-4 w-36 bg-[#D4AF37] border border-[#D4AF37] rounded-lg shadow-lg py-2">
            <button
              onClick={() => alert("Logout clicked!")}
              className="flex items-center gap-2 w-full px-4 py-2 text-[#FFFFFF]"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
