import React from "react";
import { useNavigate } from "react-router-dom";
import successImg from "../../assets/OrderSuccessfully/Group 34562.png";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center p-8 mb-28">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center"
      >
        <h1 className="text-3xl font-bold">Product Confirmation</h1>
        <p className="text-gray-500 mb-6">Let’s create your account</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center gap-6 mb-6"
        >
          <img
            src={successImg}
            alt="Order Success"
            className="w-96 h-40 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center md:items-center">
            <FaCheckCircle className="text-green-500 text-6xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">
              Your order is successfully placed
            </h3>
            <p className="text-gray-600 max-w-sm">
              Thank you for shopping with us! Your order will be processed and
              shipped to you shortly. You can track your order in your account.
            </p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-6 w-full md:w-auto bg-black text-white py-3 px-6 rounded-lg"
        >
          Go to Main Page
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
