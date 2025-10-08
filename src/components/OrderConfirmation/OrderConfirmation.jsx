import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const {
    cartItems,
    subtotal,
    discount,
    deliveryFee,
    total,
    customer,
    payment,
  } = useCart();
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Cart is empty. Cannot place order.");
      return;
    }

    if (!customer || !customer.firstName || !customer.address) {
      alert("Customer information is missing!");
      return;
    }

    if (!payment) {
      alert("Please select a payment method before confirming.");
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      items: cartItems,
      subtotal,
      discount,
      deliveryFee,
      total,
      customer,
      payment,
      status: "Pending",
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (newOrder.items.length > 0 && newOrder.total > 0) {
      orders.push(newOrder);
    }
    orders = orders.filter((o) => o.items && o.items.length > 0 && o.total > 0);
    localStorage.setItem("orders", JSON.stringify(orders));

    navigate("/order-success");
  };

  return (
    <div className="flex justify-center p-8 mb-28 text-[#000000]">
      <div
        className="w-full max-w-5xl bg-[#FFFFFF] shadow-lg rounded-2xl p-6 border border-[#E0E0E0]"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h1
          className="text-3xl font-bold text-[#000000]"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Product Confirmation
        </h1>
        <p className="text-[#1A1A1A]" data-aos="fade-up" data-aos-delay="300">
          Review your details before confirming the order
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Left Section */}
          <div
            className="col-span-2 space-y-6"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <div className="space-y-4">
              {cartItems.map((item, i) => (
                <div
                  key={item.uniqueId}
                  className="flex justify-between items-center border-b border-[#E0E0E0] pb-3"
                  data-aos="zoom-in"
                  data-aos-delay={i * 150 + 500}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-[#1A1A1A]">
                        Color: {item.color || "N/A"} | Size:{" "}
                        {item.size || "N/A"}
                      </p>
                      <p className="text-sm">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-[#000000]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div data-aos="fade-up" data-aos-delay="700">
              <p className="font-bold mb-2">Payment Method</p>
              <p className="text-[#1A1A1A]">{payment || "Not Selected"}</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="800">
              <p className="font-bold mb-2">Shipping Information</p>
              <div className="space-y-3 mt-4 text-sm">
                <div>
                  <p className="text-[#1A1A1A]">Name</p>
                  <p className="font-medium">
                    {customer?.firstName} {customer?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-[#1A1A1A]">Country</p>
                  <p className="font-medium">{customer?.country}</p>
                </div>
                <div>
                  <p className="text-[#1A1A1A]">Address</p>
                  <p className="font-medium">{customer?.address}</p>
                </div>
                <div>
                  <p className="text-[#1A1A1A]">State</p>
                  <p className="font-medium">{customer?.state}</p>
                </div>
                <div>
                  <p className="text-[#1A1A1A]">Phone</p>
                  <p className="font-medium">{customer?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div
            className="bg-[#FFFFFF] p-6 rounded-xl shadow-md border border-[#E0E0E0]"
            data-aos="fade-left"
            data-aos-delay="600"
          >
            <h2 className="text-lg font-semibold mb-4 text-[#000000]">
              Order Summary
            </h2>
            <div className="flex justify-between text-sm mb-2 text-[#1A1A1A]">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2 text-[#D4AF37]">
              <span>Discount</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2 text-[#1A1A1A]">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6 text-[#000000]">
              <span>Total Price</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              onClick={handleConfirmOrder}
              className="mt-6 w-full bg-gradient-to-r from-[#D4AF37] to-[#b38b2b] text-black border border-transparent hover:bg-black hover:text-white hover:border-[#D4AF37] py-3 rounded-lg flex items-center justify-center gap-2 font-semibold shadow-md transition-transform duration-300 hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="900"
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
