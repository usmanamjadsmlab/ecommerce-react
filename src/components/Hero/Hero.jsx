import React from "react";
import heroImg from "../../assets/hero/Rectangle_2.png";

const Hero = () => {
  return (
    <section
      data-aos="fade-in"
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-1 text-white">
        <h1
          data-aos="fade-right"
          data-aos-duration="1000"
          className="text-4xl md:text-7xl font-bold leading-tight max-w-xl text-[#000000]"
        >
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>

        <p
          data-aos="fade-left"
          data-aos-delay="200"
          className="mt-4 text-lg md:text-lg max-w-lg text-[#000000]"
        >
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>

        {/* CTA Button */}
        <div data-aos="zoom-in" data-aos-delay="400" className="mt-6">
          <button className="px-16 py-3 bg-gradient-to-r from-[#D4AF37] to-[#b38b2b] text-black border border-transparent hover:bg-black hover:text-white hover:border-[#D4AF37] rounded-full font-semibold shadow-md hover:scale-105 transition-transform duration-300">
            Shop Now
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-12 flex gap-8 flex-wrap">
          <div data-aos="fade-up" data-aos-delay="600">
            <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37]">
              200+
            </h2>
            <p className="text-sm text-[#000000]">International Brands</p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="800"
            className="pl-8 border-l border-[#1A1A1A]"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37]">
              2,000+
            </h2>
            <p className="text-sm text-[#000000]">High-Quality Products</p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="1000"
            className="pl-8 border-l border-[#1A1A1A]"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37]">
              30,000+
            </h2>
            <p className="text-sm text-[#000000]">Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
