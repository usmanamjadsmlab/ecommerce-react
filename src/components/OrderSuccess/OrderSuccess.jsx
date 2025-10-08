import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import successImg from "../../assets/ordersuccessfully/Group 34562.png";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // ✅ New Order Create
    const newOrder = {
      id: Date.now().toString(), // unique order ID
      status: "Pending", // default
      date: new Date().toLocaleDateString(), // order date
      price: Math.floor(Math.random() * 5000) + 500, // random price
    };

    // ✅ Save in LocalStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    setOrderId(newOrder.id);
  }, []);

  return (
    <div className="flex justify-center p-8 mb-28">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl bg-[#FFFFFF] shadow-lg rounded-2xl p-6 flex flex-col items-center text-center"
      >
        <h1 className="text-3xl font-bold text-[#000000]">Order Successful</h1>
        <p className="text-[#1A1A1A] mb-6">
          Your order has been placed successfully
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center gap-6 mb-6"
        >
          <img
            src={successImg}
            alt="Order Success"
            className="w-96 h-40 object-cover rounded-lg border border-[#E0E0E0]"
          />
          <div className="flex flex-col items-center md:items-center">
            <FaCheckCircle className="text-[#D4AF37] text-6xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-[#000000]">
              Your order is confirmed 🎉
            </h3>
            <p className="text-[#1A1A1A] max-w-sm">
              Thank you for shopping with us! We’re preparing your order and it
              will be shipped soon. You can track the status in your account.
            </p>

            {/* ✅ Show Order ID */}
            {orderId && (
              <p className="mt-4 text-lg font-semibold text-[#000000]">
                Order ID: <span className="text-[#D4AF37]">{orderId}</span>
              </p>
            )}
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-6 w-full md:w-auto bg-gradient-to-r from-[#D4AF37] to-[#b38b2b] text-black border border-transparent hover:bg-black hover:text-white hover:border-[#D4AF37] py-3 px-6 rounded-lg font-semibold shadow-md transition-transform duration-300"
        >
          Go to Main Page
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
