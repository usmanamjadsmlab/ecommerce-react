import React, { useState } from "react";
import { IoMdSearch, IoMdClose, IoMdMenu } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const { cartCount } = useCart();

  const Menu = [
    { id: 1, name: "New Arrivals", link: "arrivals" },
    { id: 2, name: "New Selling", link: "selling" },
    { id: 3, name: "Dress Style", link: "dressstyle" },
  ];

  const DropdownLinks = [
    { id: 1, name: "Men", link: "/men" },
    { id: 2, name: "Women", link: "/women" },
    { id: 3, name: "Kids", link: "/kids" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleShop = () => {
    setIsShopOpen(!isShopOpen);
  };

  return (
    <div
      data-aos="fade-down"
      className="shadow-md bg-white text-black relative z-40"
    >
      <div className="container flex items-center justify-between py-4 px-4 sm:px-16">
        <div className="flex items-center gap-8" data-aos="fade-right">
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <IoMdClose className="text-2xl" />
            ) : (
              <IoMdMenu className="text-2xl" />
            )}
          </button>
          <a href="/" className="font-extrabold text-3xl">
            SHOP.CO
          </a>
          <ul className="hidden md:flex items-center gap-6">
            <li className="group relative cursor-pointer" data-aos="zoom-in">
              <button className="flex items-center gap-1">
                Shop
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-6 left-0 hidden group-hover:block w-40 rounded-md bg-white p-2 shadow-md">
                <ul>
                  {DropdownLinks.map((data) => (
                    <li key={data.id}>
                      <Link
                        to={data.link}
                        className="block w-full rounded-md p-2 hover:bg-gray-100"
                      >
                        {data.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {Menu.map((data, i) => (
              <li key={data.id} data-aos="fade-up" data-aos-delay={i * 100}>
                <ScrollLink
                  to={data.link}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  className="cursor-pointer hover:text-gray-600 transition-colors duration-200"
                >
                  {data.name}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4" data-aos="fade-left">
          <div className="hidden sm:block relative w-[150px] sm:w-[200px] md:w-[250px]">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full rounded-full bg-gray-100 border border-gray-300 py-2 pl-10 pr-4 text-sm focus:outline-none"
            />
            <IoMdSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
          </div>
          <button className="sm:hidden">
            <IoMdSearch className="text-2xl cursor-pointer" />
          </button>
          <div className="relative">
            <Link to="/cart">
              <FaCartShopping className="text-2xl cursor-pointer" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <button>
            <FiUser className="text-2xl cursor-pointer" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div
          data-aos="fade-down"
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6"
        >
          <ul className="space-y-4">
            <li>
              <button
                onClick={toggleShop}
                className="flex items-center gap-1 w-full text-left"
              >
                Shop
                <FaCaretDown
                  className={`transition-transform duration-200 ${
                    isShopOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isShopOpen && (
                <ul className="pl-4 mt-2 space-y-2">
                  {DropdownLinks.map((data) => (
                    <li key={data.id} data-aos="fade-right">
                      <Link
                        to={data.link}
                        className="block py-1 hover:text-gray-600"
                      >
                        {data.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {Menu.map((data, i) => (
              <li key={data.id} data-aos="fade-up" data-aos-delay={i * 100}>
                <ScrollLink
                  to={data.link}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  className="block py-1 cursor-pointer hover:text-gray-600"
                >
                  {data.name}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
