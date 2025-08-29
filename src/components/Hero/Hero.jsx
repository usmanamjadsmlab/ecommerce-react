import React from "react";
import heroImg from "../../assets/hero/Rectangle 2.png";

const Hero = () => {
  return (
    <section
      data-aos="fade-in"
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      <div className="absolute inset-0 bg-white/0"></div>
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-1 text-black">
        <h1
          data-aos="fade-right"
          data-aos-duration="1000"
          className="text-4xl md:text-7xl font-bold leading-tight max-w-xl"
        >
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p
          data-aos="fade-left"
          data-aos-delay="200"
          className="mt-4 text-lg md:text-lg text-gray-600 max-w-lg"
        >
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <div data-aos="zoom-in" data-aos-delay="400" className="mt-6">
          <button className="px-16 py-3 bg-black text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform duration-300">
            Shop Now
          </button>
        </div>
        <div className="mt-12 flex gap-8 flex-wrap">
          <div data-aos="fade-up" data-aos-delay="600">
            <h2 className="text-3xl md:text-4xl font-bold">200+</h2>
            <p className="text-sm text-gray-600">International Brands</p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="800"
            className="pl-8 border-l border-gray-300"
          >
            <h2 className="text-3xl md:text-4xl font-bold">2,000+</h2>
            <p className="text-sm text-gray-600">High-Quality Products</p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="1000"
            className="pl-8 border-l border-gray-300"
          >
            <h2 className="text-3xl md:text-4xl font-bold">30,000+</h2>
            <p className="text-sm text-gray-600">Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
