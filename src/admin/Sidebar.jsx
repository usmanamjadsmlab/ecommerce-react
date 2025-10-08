import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiBox, FiShoppingCart } from "react-icons/fi";

export default function Sidebar() {
  const links = [
    { to: "/admin/dashboard", icon: <FiHome />, label: "Dashboard" },
    {
      to: "/admin/manage_orders",
      icon: <FiShoppingCart />,
      label: "Manage Orders",
    },
    { to: "/admin/products", icon: <FiBox />, label: "Products" },
  ];

  return (
    <div
      className="fixed top-0 left-0 w-64 h-screen hidden md:flex flex-col"
      style={{ background: "#1A1A1A", color: "#FFFFFF" }}
    >
      {/* Header */}
      <div
        className="p-4 text-center font-bold text-lg"
        style={{ borderBottom: "1px solid #000000", color: "#D4AF37" }}
      >
        Admin Panel
      </div>

      {/* Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition`
            }
            style={({ isActive }) => ({
              background: isActive ? "#D4AF37" : "transparent",
              color: isActive ? "#FFFFFF" : "#E0E0E0",
            })}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
