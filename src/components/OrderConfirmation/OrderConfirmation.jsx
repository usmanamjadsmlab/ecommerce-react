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

  return (
    <div className="flex justify-center p-8 mb-28">
      <div
        className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h1
          className="text-3xl font-bold"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Product Confirmation
        </h1>
        <p className="text-gray-500" data-aos="fade-up" data-aos-delay="300">
          Let’s create your account
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div
            className="col-span-2 space-y-6"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <div className="space-y-4">
              {cartItems.map((item, i) => (
                <div
                  key={item.uniqueId}
                  className="flex justify-between items-center border-b pb-3"
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
                      <p className="text-sm text-gray-500">
                        Color: {item.color || "N/A"} | Size:{" "}
                        {item.size || "N/A"}
                      </p>
                      <p className="text-sm">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div data-aos="fade-up" data-aos-delay="700">
              <p className="font-bold mb-2">Payment Method</p>
              <p className="text-gray-600">{payment || "Not Selected"}</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="800">
              <p className="font-bold mb-2">Shipping Information</p>
              <div className="space-y-3 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">
                    {customer?.firstName} {customer?.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Country</p>
                  <p className="font-medium">{customer?.country}</p>
                </div>

                <div>
                  <p className="text-gray-500">Address</p>
                  <p className="font-medium">{customer?.address}</p>
                </div>

                <div>
                  <p className="text-gray-500">State</p>
                  <p className="font-medium">{customer?.state}</p>
                </div>

                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">{customer?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-gray-50 p-6 rounded-xl shadow-md"
            data-aos="fade-left"
            data-aos-delay="600"
          >
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total Price</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/order-success")}
              className="mt-6 w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2"
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
