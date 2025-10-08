import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from "chart.js";
import { SquareArrowOutUpRight } from "lucide-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const validOrders = savedOrders.filter(
        (o) => o && o.id && o.customer && o.total
      );
      setOrders(validOrders);
    } catch (err) {
      console.error("Error loading orders:", err);
      setOrders([]);
    }
  }, []);

  // ✅ Counts
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + Number(o.total || 0), 0);

  const confirmedCount = orders.filter((o) => o.status === "Delivered").length;
  const profit = totalRevenue * 0.65; // Dummy profit
  const cancelledCount = orders.filter((o) => o.status === "Cancelled").length;

  const cardData = [
    {
      label: "Total Revenue",
      amount: `$${Math.round(totalRevenue)}`,
      value: 75,
    },
    { label: "Orders Confirmed", amount: confirmedCount, value: 80 },
    { label: "Profit", amount: `$${Math.round(profit)}`, value: 60 },
    { label: "Orders Cancelled", amount: cancelledCount, value: 10 },
  ];

  // ✅ Line chart data
  const dailySales = {};
  orders.forEach((o) => {
    const date = new Date(o.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    dailySales[date] = (dailySales[date] || 0) + Number(o.total || 0);
  });

  const lineData = {
    labels: Object.keys(dailySales),
    datasets: [
      {
        label: "Sales",
        data: Object.values(dailySales).map((val) => Math.round(val)),
        borderColor: "#D4AF37",
        backgroundColor: "rgba(212, 175, 55, 0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: "#000000" } },
      y: {
        ticks: {
          color: "#000000",
          callback: (val) => Math.round(val),
        },
      },
    },
  };

  const pieOptions = {
    plugins: {
      legend: { display: false },
    },
    cutout: "70%",
  };

  return (
    <div
      className="ml-0 md:ml-64 p-6 min-h-screen"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className="relative p-4 rounded-2xl shadow"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            {/* External link icon */}
            <SquareArrowOutUpRight
              className="absolute top-3 right-3 w-5 h-5"
              style={{ color: "#1A1A1A" }}
            />

            {/* Label */}
            <h2 className="text-lg font-bold mb-3" style={{ color: "#000000" }}>
              {card.label}
            </h2>

            {/* Circle + Amount side by side */}
            <div className="flex items-center justify-between">
              <div className="w-16 h-16">
                <Pie
                  data={{
                    labels: ["Filled", "Empty"],
                    datasets: [
                      {
                        data: [card.value, 100 - card.value],
                        backgroundColor: ["#D4AF37", "#E0E0E0"],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={pieOptions}
                />
              </div>
              <div
                className="ml-4 text-2xl font-bold"
                style={{ color: "#000000" }}
              >
                {card.amount}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div
        className="p-6 rounded-2xl shadow"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold" style={{ color: "#000000" }}>
              ${Math.round(totalRevenue)}
            </h2>
            <p style={{ color: "#1A1A1A" }}>Sales this period</p>
          </div>
          <span className="font-semibold" style={{ color: "#D4AF37" }}>
            +12.5%
          </span>
        </div>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}
