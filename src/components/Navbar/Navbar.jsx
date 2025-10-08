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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleShop = () => setIsShopOpen(!isShopOpen);

  return (
    <div
      data-aos="fade-down"
      className="shadow-md bg-[#000000] text-[#E0E0E0] relative z-40"
    >
      <div className="container flex items-center justify-between py-4 px-4 sm:px-16">
        {/* Left Section */}
        <div className="flex items-center gap-8" data-aos="fade-right">
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <IoMdClose className="text-2xl" />
            ) : (
              <IoMdMenu className="text-2xl" />
            )}
          </button>

          <Link to="/" className="font-extrabold text-3xl text-[#D4AF37]">
            SHOP.CO
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6">
            <li className="group relative cursor-pointer" data-aos="zoom-in">
              <button className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors">
                Shop
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-6 left-0 hidden group-hover:block w-40 rounded-md bg-[#1A1A1A] p-2 shadow-md">
                <ul>
                  {DropdownLinks.map((data) => (
                    <li key={data.id}>
                      <Link
                        to={data.link}
                        className="block w-full rounded-md p-2 hover:bg-[#000000] hover:text-[#D4AF37]"
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
                  className="cursor-pointer hover:text-[#D4AF37] transition-colors"
                >
                  {data.name}
                </ScrollLink>
              </li>
            ))}

            <li>
              <Link
                to="/track-order"
                className="cursor-pointer hover:text-[#D4AF37] transition-colors"
              >
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4" data-aos="fade-left">
          {/* Search Box (Desktop) */}
          <div className="hidden sm:block relative w-[150px] sm:w-[200px] md:w-[250px]">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full rounded-full bg-[#1A1A1A] border border-[#E0E0E0] py-2 pl-10 pr-4 text-sm focus:outline-none text-[#E0E0E0] placeholder-[#E0E0E0]"
            />
            <IoMdSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-[#E0E0E0]" />
          </div>

          {/* Search Icon (Mobile) */}
          <button className="sm:hidden">
            <IoMdSearch className="text-2xl cursor-pointer text-[#E0E0E0]" />
          </button>

          {/* Cart */}
          <div className="relative">
            <Link to="/cart">
              <FaCartShopping className="text-2xl cursor-pointer text-[#E0E0E0]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#000000] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* User */}
          <Link to="/auth">
            <FiUser className="text-2xl cursor-pointer text-[#E0E0E0]" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          data-aos="fade-down"
          className="md:hidden absolute top-full left-0 right-0 bg-[#1A1A1A] shadow-lg py-4 px-6"
        >
          <ul className="space-y-4">
            <li>
              <button
                onClick={toggleShop}
                className="flex items-center gap-1 w-full text-left hover:text-[#D4AF37]"
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
                        className="block py-1 hover:text-[#D4AF37]"
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
                  className="block py-1 cursor-pointer hover:text-[#D4AF37]"
                >
                  {data.name}
                </ScrollLink>
              </li>
            ))}

            <li>
              <Link
                to="/track-order"
                className="block py-1 cursor-pointer hover:text-[#D4AF37]"
              >
                Track Order
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
