import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CasualImg from "../../assets/dressstyle/Casual.png";
import KidsImg from "../../assets/dressstyle/Kids.png";
import PartyImg from "../../assets/dressstyle/Party.png";

const DressStyle = () => {
  return (
    <section id="dressstyle" className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto bg-gray-100 rounded-3xl p-8 shadow-md">
        <motion.h2
          className="text-center text-2xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          BROWSE BY CATEGORY
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              to="/men"
              className="relative rounded-xl overflow-hidden bg-white block shadow hover:scale-105 transition"
            >
              <img
                src={CasualImg}
                alt="Mens"
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-3 left-3 text-2xl font-bold text-black">
                Mens
              </span>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              to="/women"
              className="relative rounded-xl overflow-hidden bg-white block shadow hover:scale-105 transition"
            >
              <img
                src={PartyImg}
                alt="Womens"
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-3 left-3 text-2xl font-bold text-black">
                Womens
              </span>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              to="/kids"
              className="relative rounded-xl overflow-hidden bg-white block shadow hover:scale-105 transition"
            >
              <img
                src={KidsImg}
                alt="Kids"
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-3 left-3 text-2xl font-bold text-black">
                Kids
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DressStyle;
