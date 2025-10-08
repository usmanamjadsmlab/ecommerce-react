import React from "react";
import versaceImg from "../../assets/brands/versace.png";
import gucciImg from "../../assets/brands/gucci.png";
import pradaImg from "../../assets/brands/prada.png";
import zaraImg from "../../assets/brands/zara.png";
import ckImg from "../../assets/brands/ck.png";

const Brands = () => {
  return (
    <section data-aos="fade-up" className="bg-black py-12 px-6 md:px-0">
      <div
        className="max-w-7xl mx-auto 
          grid grid-cols-3 gap-8 
          md:flex md:justify-center md:items-center md:gap-20"
      >
        <img
          src={versaceImg}
          alt="Versace"
          data-aos="zoom-in"
          data-aos-delay="100"
          className="h-8 md:h-10 object-contain mx-auto"
        />
        <img
          src={zaraImg}
          alt="Zara"
          data-aos="zoom-in"
          data-aos-delay="200"
          className="h-8 md:h-10 object-contain mx-auto"
        />
        <img
          src={gucciImg}
          alt="Gucci"
          data-aos="zoom-in"
          data-aos-delay="300"
          className="h-8 md:h-10 object-contain mx-auto"
        />
        <div className="col-span-3 flex justify-center gap-8">
          <img
            src={pradaImg}
            alt="Prada"
            data-aos="zoom-in"
            data-aos-delay="400"
            className="h-8 md:h-10 object-contain"
          />
          <img
            src={ckImg}
            alt="Calvin Klein"
            data-aos="zoom-in"
            data-aos-delay="500"
            className="h-8 md:h-10 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Brands;
