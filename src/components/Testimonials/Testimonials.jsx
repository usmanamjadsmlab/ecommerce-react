import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah M.",
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    review:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    name: "James L.",
    review:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    name: "Emma W.",
    review:
      "The quality is amazing! I got compliments on my outfit the first time I wore it. Definitely shopping here again. I'm thrilled to have stumbled upon Shop.co.first time I wore it. Definitely shopping here again. ",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Testimonials = () => {
  return (
    <section className="bg-[#FFFFFF] py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#000000]">
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex space-x-3">
            <button className="testimonial-prev cursor-pointer bg-[#E0E0E0] p-2 rounded-full shadow hover:bg-[#D4AF37] transition">
              <HiChevronLeft className="text-2xl text-[#000000]" />
            </button>
            <button className="testimonial-next cursor-pointer bg-[#E0E0E0] p-2 rounded-full shadow hover:bg-[#D4AF37] transition">
              <HiChevronRight className="text-2xl text-[#000000]" />
            </button>
          </div>
        </motion.div>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".testimonial-next",
            prevEl: ".testimonial-prev",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-[#FFFFFF] rounded-2xl shadow-md border border-[#E0E0E0] p-6 h-full"
              >
                <div className="flex text-[#D4AF37] mb-3">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-lg text-[#1A1A1A]">
                    {t.name}
                  </span>
                  <FaCheckCircle className="text-[#D4AF37]" />
                </div>
                <p className="text-[#1A1A1A] text-sm leading-relaxed">
                  {t.review}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
