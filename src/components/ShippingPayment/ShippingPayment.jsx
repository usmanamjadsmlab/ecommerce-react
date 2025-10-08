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
    <div className="bg-[#FFFFFF] text-[#000000] min-h-screen flex flex-col">
      <div className="container mx-auto flex-1 px-4 py-10 grid lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-2" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-2">Payment</h2>
          <p className="text-[#1A1A1A] mb-6">Please choose a payment method</p>

          {paymentOptions.map((method) => (
            <div
              key={method.name}
              onClick={() => setPayment(method.name)}
              className={`border rounded-lg p-4 mb-4 cursor-pointer flex items-center justify-between transition-all duration-300 ${
                payment === method.name
                  ? "border-[#D4AF37] bg-[#E0E0E0]"
                  : "border-[#E0E0E0]"
              }`}
            >
              <div>
                <input
                  type="radio"
                  checked={payment === method.name}
                  onChange={() => setPayment(method.name)}
                  className="mr-2 accent-[#D4AF37]"
                />
                <span className="font-semibold">{method.name}</span>
                <p className="text-sm text-[#1A1A1A]">{method.desc}</p>
              </div>
              <img
                src={method.img}
                alt={method.name}
                className="w-12 h-12 object-contain"
              />
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div
          className="lg:col-span-1 border border-[#E0E0E0] rounded-xl p-6 shadow-md h-fit bg-[#FFFFFF]"
          data-aos="fade-left"
        >
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2 text-[#1A1A1A]">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-[#1A1A1A]">
            <span>Discount</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-[#1A1A1A]">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-4 text-[#000000]">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleNext}
            className="mt-6 w-full bg-gradient-to-r from-[#D4AF37] to-[#b38b2b] text-black border border-transparent hover:bg-black hover:text-white hover:border-[#D4AF37] py-3 rounded-lg flex items-center justify-center gap-2 font-semibold shadow-md transition-transform duration-300 hover:scale-105"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingPayment;
