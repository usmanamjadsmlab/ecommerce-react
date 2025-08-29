import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import visaImg from "../../assets/Footer/visa.png";
import mastercardImg from "../../assets/Footer/mastercard.png";
import paypalImg from "../../assets/Footer/paypal.png";
import appleImg from "../../assets/Footer/apple.png";
import gpayImg from "../../assets/Footer/gpay.png";

const ShippingPayment = () => {
  const navigate = useNavigate();
  const { payment, setPayment, subtotal, discount, deliveryFee, total } =
    useCart();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const handleNext = () => {
    if (!payment) {
      toast.error("Please select a payment method before proceeding!");
      return;
    }
    navigate("/order-confirmation");
  };

  const paymentOptions = [
    {
      name: "Visa",
      desc: "Pay securely using your Visa credit or debit card.",
      img: visaImg,
    },
    {
      name: "Mastercard",
      desc: "Pay with Mastercard for fast and secure checkout.",
      img: mastercardImg,
    },
    {
      name: "Paypal",
      desc: "Use your PayPal account for quick and protected payments.",
      img: paypalImg,
    },
    {
      name: "Apple Pay",
      desc: "Pay quickly with your saved Apple Pay wallet.",
      img: appleImg,
    },
    {
      name: "Google Pay",
      desc: "Pay with Google Pay for a smooth mobile checkout.",
      img: gpayImg,
    },
  ];

  return (
    <div className="bg-white dark:text-white min-h-screen flex flex-col">
      <div className="container mx-auto flex-1 px-4 py-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-2">Payment</h2>
          <p className="text-gray-500 mb-6">Please choose a payment method</p>

          {paymentOptions.map((method, index) => (
            <div
              key={method.name}
              onClick={() => setPayment(method.name)}
              className={`border rounded-lg p-4 mb-4 cursor-pointer flex items-center justify-between transition-all duration-300 ${
                payment === method.name
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <div>
                <input
                  type="radio"
                  checked={payment === method.name}
                  onChange={() => setPayment(method.name)}
                  className="mr-2"
                />
                <span className="font-semibold">{method.name}</span>
                <p className="text-sm text-gray-500">{method.desc}</p>
              </div>
              <img
                src={method.img}
                alt={method.name}
                className="w-12 h-12 object-contain"
              />
            </div>
          ))}
        </div>
        <div
          className="lg:col-span-1 border rounded-xl p-6 shadow-md h-fit"
          data-aos="fade-left"
        >
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleNext}
            className="mt-6 w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingPayment;
