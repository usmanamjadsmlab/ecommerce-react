import React, { useState } from "react";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();

    // ✅ LocalStorage se orders nikaalna
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = savedOrders.find((o) => o.id === orderId);

    if (order) {
      setStatus(order.status);
      setOrderDetail(order);
    } else {
      setStatus("Not Found");
      setOrderDetail(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E0E0E0] px-4 py-10">
      <div className="max-w-md w-full bg-[#FFFFFF] shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-[#000000]">
          Track Your Order
        </h1>
        <p className="text-center text-[#1A1A1A] mb-6">
          Enter your Order ID to check the current status.
        </p>

        {/* Form */}
        <form onSubmit={handleTrack} className="space-y-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
            className="w-full border border-[#E0E0E0] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#b38b2b] text-black font-semibold py-2 rounded-lg border border-transparent hover:bg-black hover:text-white hover:border-[#D4AF37] shadow-md transition-transform duration-300 hover:scale-105"
          >
            Track Order
          </button>
        </form>

        {/* Result */}
        {status && (
          <div className="mt-6 text-center">
            {status === "Not Found" ? (
              <p className="text-red-500 font-semibold">❌ Order not found</p>
            ) : (
              <div>
                <p className="text-lg text-[#000000]">
                  ✅ Your order status:{" "}
                  <span className="font-bold text-[#D4AF37]">{status}</span>
                </p>

                {/* Extra Detail */}
                {orderDetail && (
                  <div className="mt-4 text-left border-t border-[#E0E0E0] pt-3 text-sm text-[#1A1A1A]">
                    <p>
                      <span className="font-semibold text-[#000000]">
                        Order ID:
                      </span>{" "}
                      {orderDetail.id}
                    </p>
                    <p>
                      <span className="font-semibold text-[#000000]">
                        Date:
                      </span>{" "}
                      {orderDetail.date}
                    </p>
                    <p>
                      <span className="font-semibold text-[#000000]">
                        Total:
                      </span>{" "}
                      ${orderDetail.total}
                    </p>
                    <p>
                      <span className="font-semibold text-[#000000]">
                        Payment:
                      </span>{" "}
                      {orderDetail.payment || "N/A"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
