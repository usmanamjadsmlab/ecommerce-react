import { useState } from "react";
import { BsFillPersonFill, BsLockFill, BsEnvelopeFill } from "react-icons/bs";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function AuthForm() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#E0E0E0]">
      <div className="relative w-[850px] h-[550px] bg-[#FFFFFF] rounded-[30px] shadow-2xl overflow-hidden">
        {/* LOGIN FORM */}
        <div
          className={`absolute right-0 w-1/2 h-full flex items-center text-center p-10 transition-all duration-700 z-10 ${
            isActive
              ? "opacity-0 pointer-events-none translate-x-[100%]"
              : "opacity-100 translate-x-0"
          }`}
        >
          <form className="w-full">
            <h1 className="text-3xl mb-[-10px] text-[#000000]">Login</h1>
            <div className="relative my-6">
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full p-3 pr-12 bg-[#E0E0E0] rounded-lg outline-none text-base font-medium text-[#1A1A1A]"
              />
              <BsFillPersonFill className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#1A1A1A]" />
            </div>
            <div className="relative my-6">
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full p-3 pr-12 bg-[#E0E0E0] rounded-lg outline-none text-base font-medium text-[#1A1A1A]"
              />
              <BsLockFill className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#1A1A1A]" />
            </div>
            <div className="text-sm text-left mb-4">
              <a href="#" className="text-[#1A1A1A] hover:text-[#D4AF37]">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#b38b2b] text-black font-semibold rounded-full shadow-md hover:bg-black hover:text-white hover:border hover:border-[#D4AF37] hover:scale-105 transition-transform duration-300"
            >
              Login
            </button>

            <p className="text-sm mt-4 text-[#1A1A1A]">
              or login with social platforms
            </p>
            <div className="flex justify-center mt-3 space-x-3">
              {[FaGoogle, FaFacebook, FaGithub, FaLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 border-2 border-[#E0E0E0] rounded-lg text-xl text-[#1A1A1A] hover:text-[#D4AF37] hover:border-[#D4AF37] transition"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </form>
        </div>

        {/* REGISTER FORM */}
        <div
          className={`absolute right-0 w-1/2 h-full flex items-center text-center p-10 transition-all duration-700 z-10 ${
            isActive
              ? "opacity-100 translate-x-0"
              : "opacity-0 pointer-events-none translate-x-[100%]"
          }`}
        >
          <form className="w-full">
            <h1 className="text-3xl mb-[-10px] text-[#000000]">Registration</h1>
            <div className="relative my-6">
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full p-3 pr-12 bg-[#E0E0E0] rounded-lg outline-none text-base font-medium text-[#1A1A1A]"
              />
              <BsFillPersonFill className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#1A1A1A]" />
            </div>
            <div className="relative my-6">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full p-3 pr-12 bg-[#E0E0E0] rounded-lg outline-none text-base font-medium text-[#1A1A1A]"
              />
              <BsEnvelopeFill className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#1A1A1A]" />
            </div>
            <div className="relative my-6">
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full p-3 pr-12 bg-[#E0E0E0] rounded-lg outline-none text-base font-medium text-[#1A1A1A]"
              />
              <BsLockFill className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[#1A1A1A]" />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#b38b2b] text-black font-semibold rounded-full shadow-md hover:bg-black hover:text-white hover:border hover:border-[#D4AF37] hover:scale-105 transition-transform duration-300"
            >
              Register
            </button>

            <p className="text-sm mt-4 text-[#1A1A1A]">
              or register with social platforms
            </p>
            <div className="flex justify-center mt-3 space-x-3">
              {[FaGoogle, FaFacebook, FaGithub, FaLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 border-2 border-[#E0E0E0] rounded-lg text-xl text-[#1A1A1A] hover:text-[#D4AF37] hover:border-[#D4AF37] transition"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </form>
        </div>

        {/* SLIDER BACKGROUND */}
        <div className="absolute w-full h-full">
          <div
            className={`absolute left-[-250%] w-[300%] h-full bg-[#000000] rounded-[150px] z-[1] transition-all duration-[1800ms] ${
              isActive ? "left-1/2" : ""
            }`}
          ></div>
          {/* Left Panel */}
          <div
            className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-[#FFFFFF] z-[2] transition-all duration-700 ${
              isActive ? "-left-1/2" : "left-0"
            }`}
          >
            <h1 className="text-3xl">Hello, Welcome!</h1>
            <p className="mb-5 text-sm">Don't have an account?</p>
            <button
              onClick={() => setIsActive(true)}
              className="w-40 h-12 border-2 border-[#FFFFFF] rounded-lg text-[#FFFFFF] font-semibold hover:bg-[#D4AF37] hover:text-[#000000] hover:border-[#D4AF37] transition"
            >
              Register
            </button>
          </div>
          {/* Right Panel */}
          <div
            className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-[#FFFFFF] z-[2] transition-all duration-700 ${
              isActive ? "right-96" : "-right-1/2"
            }`}
          >
            <h1 className="text-3xl">Welcome Back!</h1>
            <p className="mb-5 text-sm">Already have an account?</p>
            <button
              onClick={() => setIsActive(false)}
              className="w-40 h-12 border-2 border-[#FFFFFF] rounded-lg text-[#FFFFFF] font-semibold hover:bg-[#D4AF37] hover:text-[#000000] hover:border-[#D4AF37] transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
