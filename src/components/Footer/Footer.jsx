import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

import visaImg from "../../assets/footer/visa.png";
import masterImg from "../../assets/footer/mastercard.png";
import paypalImg from "../../assets/footer/paypal.png";
import appleImg from "../../assets/footer/apple.png";
import gpayImg from "../../assets/footer/gpay.png";

const Footer = () => {
  return (
    <div className="relative bg-[#E0E0E0] mt-16">
      {/* Newsletter Section */}
      <div
        className="relative -top-16 z-20 max-w-7xl mx-auto"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div className="w-full bg-[#000000] text-[#FFFFFF] rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <h3
            className="text-2xl md:text-5xl font-bold text-center md:text-left leading-snug"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            STAY UP TO DATE ABOUT <br /> OUR LATEST OFFERS
          </h3>
          <div
            className="flex flex-col gap-3 w-full md:w-[35%]"
            data-aos="fade-left"
            data-aos-delay="600"
          >
            <div className="flex items-center bg-[#FFFFFF] rounded-full px-4 py-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent text-[#000000] outline-none"
              />
            </div>
            <button className="bg-gradient-to-r from-[#D4AF37] to-[#b38b2b] text-black font-medium py-2 px-6 rounded-full hover:bg-black hover:text-white hover:border hover:border-[#D4AF37] shadow-md">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#E0E0E0] pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div
            className="col-span-2 md:col-span-1"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2 className="text-2xl font-bold text-[#000000]">SHOP.CO</h2>
            <p className="text-[#1A1A1A] mt-3">
              We have clothes that suit your style and which you’re proud to
              wear. From women to men.
            </p>
            <div
              className="flex gap-4 mt-4 text-xl"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <FaTwitter className="cursor-pointer text-[#1A1A1A] hover:text-[#D4AF37] transition" />
              <FaFacebookF className="cursor-pointer text-[#1A1A1A] hover:text-[#D4AF37] transition" />
              <FaInstagram className="cursor-pointer text-[#1A1A1A] hover:text-[#D4AF37] transition" />
              <FaGithub className="cursor-pointer text-[#1A1A1A] hover:text-[#D4AF37] transition" />
            </div>
          </div>

          {/* Links */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="font-bold mb-3 text-[#000000]">COMPANY</h3>
            <ul className="space-y-2 text-[#1A1A1A]">
              <li>About</li>
              <li>Features</li>
              <li>Works</li>
              <li>Career</li>
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="font-bold mb-3 text-[#000000]">HELP</h3>
            <ul className="space-y-2 text-[#1A1A1A]">
              <li>Customer Support</li>
              <li>Delivery Details</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="500">
            <h3 className="font-bold mb-3 text-[#000000]">FAQ</h3>
            <ul className="space-y-2 text-[#1A1A1A]">
              <li>Account</li>
              <li>Manage Deliveries</li>
              <li>Orders</li>
              <li>Payments</li>
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="600">
            <h3 className="font-bold mb-3 text-[#000000]">RESOURCES</h3>
            <ul className="space-y-2 text-[#1A1A1A]">
              <li>Free eBooks</li>
              <li>Development Tutorial</li>
              <li>How to - Blog</li>
              <li>Youtube Playlist</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row justify-between items-center border-t border-[#D4AF37] pt-6 text-[#1A1A1A]"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <p>Shop.co © 2000-2023, All Rights Reserved</p>
          <div
            className="flex gap-3 mt-4 md:mt-0"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <img src={visaImg} alt="Visa" className="h-12" />
            <img src={masterImg} alt="Mastercard" className="h-12" />
            <img src={paypalImg} alt="PayPal" className="h-12" />
            <img src={appleImg} alt="ApplePay" className="h-12" />
            <img src={gpayImg} alt="GooglePay" className="h-12" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
