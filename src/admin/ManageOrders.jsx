import React, { useState, useEffect } from "react";
import {
  Eye,
  CircleX,
  Clock,
  Package,
  Truck,
  Ban,
  ClipboardClock,
  SquareArrowOutUpRight,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [viewingOrder, setViewingOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || "Pending"
  );

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const validOrders = savedOrders.filter(
        (o) => o && o.id && o.customer && o.total
      );
      setOrders(validOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]);
    }
  }, []);

  const saveOrders = (updatedOrders) => {
    const validOrders = updatedOrders.filter(
      (o) => o && o.id && o.customer && o.total
    );
    localStorage.setItem("orders", JSON.stringify(validOrders));
    setOrders(validOrders);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleDateString("en-GB");
  };

  const handleView = (order) => {
    setViewingOrder(order);
  };

  const handleUpdate = (order) => {
    let newStatus = order.status;
    if (order.status === "Pending") newStatus = "Active";
    else if (order.status === "Active") newStatus = "Delivered";

    const updatedOrders = orders.map((o) =>
      o.id === order.id ? { ...o, status: newStatus } : o
    );
    saveOrders(updatedOrders);
    toast.success(`Order ${order.id} moved to ${newStatus}`);
  };

  const handleDelete = (id) => {
    const updatedOrders = orders.map((o) =>
      o.id === id ? { ...o, status: "Cancelled" } : o
    );
    saveOrders(updatedOrders);
    toast.success("Order moved to Cancelled");
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-[#E0E0E0] text-[#1A1A1A]";
      case "Active":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-[#E0E0E0] text-[#1A1A1A]";
    }
  };

  const getIconStyle = (category) => {
    switch (category) {
      case "Pending":
        return { icon: "#1A1A1A", bg: "#E0E0E0" };
      case "Active":
        return { icon: "#2563EB", bg: "#DBEAFE" }; // blue
      case "Delivered":
        return { icon: "#16A34A", bg: "#DCFCE7" }; // green
      case "Cancelled":
        return { icon: "#DC2626", bg: "#FEE2E2" }; // red
      default:
        return { icon: "#1A1A1A", bg: "#E0E0E0" };
    }
  };

  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const activeCount = orders.filter((o) => o.status === "Active").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
  const cancelledCount = orders.filter((o) => o.status === "Cancelled").length;

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase());
    if (selectedCategory === "All") return matchesSearch;
    if (selectedCategory === "Active")
      return matchesSearch && o.status === "Active";
    return matchesSearch && o.status === selectedCategory;
  });

  const paginatedOrders = filteredOrders.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  const SummaryCard = ({ label, count, Icon, category }) => {
    const { icon, bg } = getIconStyle(category);
    return (
      <div
        onClick={() => {
          setSelectedCategory(category);
          setPage(0);
        }}
        className={`relative cursor-pointer p-5 rounded-xl flex items-center gap-4 shadow transition h-32
        ${
          selectedCategory === category
            ? "ring-2 ring-[#D4AF37] bg-[#E0E0E0]"
            : "bg-[#FFFFFF]"
        }`}
      >
        <SquareArrowOutUpRight
          className="absolute top-3 right-3"
          size={18}
          style={{ color: "#1A1A1A" }}
        />
        <div
          className="w-12 h-12 flex items-center justify-center rounded-full"
          style={{ backgroundColor: bg }}
        >
          <Icon size={26} style={{ color: icon }} />
        </div>
        <div>
          <p className="text-sm" style={{ color: "#1A1A1A" }}>
            {label}
          </p>
          <h3 className="text-2xl font-bold" style={{ color: "#000000" }}>
            {count}
          </h3>
        </div>
      </div>
    );
  };

  return (
    <div
      className="ml-0 md:ml-64 p-6 min-h-screen"
      style={{ backgroundColor: "#E0E0E0", color: "#000000" }}
    >
      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          label="Pending Orders"
          count={pendingCount}
          Icon={Clock}
          category="Pending"
        />
        <SummaryCard
          label="Active Orders"
          count={activeCount}
          Icon={Package}
          category="Active"
        />
        <SummaryCard
          label="Delivered Orders"
          count={deliveredCount}
          Icon={Truck}
          category="Delivered"
        />
        <SummaryCard
          label="Cancelled Orders"
          count={cancelledCount}
          Icon={Ban}
          category="Cancelled"
        />
      </div>

      {/* ✅ Orders Table */}
      <div
        className="rounded-xl shadow overflow-x-auto"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div
          className="p-4 border-b flex flex-col md:flex-row justify-between gap-4"
          style={{ borderColor: "#E0E0E0" }}
        >
          <input
            type="text"
            placeholder="Search order id..."
            className="rounded-lg px-3 py-2 text-sm focus:outline-none w-full md:w-auto"
            style={{ border: "1px solid #E0E0E0", color: "#000000" }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />
        </div>
        {paginatedOrders.length === 0 ? (
          <p className="p-4" style={{ color: "#1A1A1A" }}>
            No orders found
          </p>
        ) : (
          <>
            <table className="min-w-full text-sm">
              <thead style={{ backgroundColor: "#E0E0E0", color: "#1A1A1A" }}>
                <tr>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-center">Date</th>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Order Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#E0E0E0]"
                    style={{ borderBottom: "1px solid #E0E0E0" }}
                  >
                    <td className="py-3 px-4 text-left">{order.id}</td>
                    <td className="py-3 px-4 text-center">
                      {formatDate(order.date)}
                    </td>
                    <td className="py-3 px-4 text-left flex items-center gap-2">
                      {/* customer avatar + name */}
                      <div className="w-8 h-8 rounded-full overflow-hidden border bg-[#E0E0E0] flex items-center justify-center">
                        {order.customer?.avatar ? (
                          <img
                            src={order.customer.avatar}
                            alt={order.customer.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt="Default Avatar"
                            className="w-6 h-6"
                          />
                        )}
                      </div>
                      <span>
                        {order.customer?.firstName || ""}{" "}
                        {order.customer?.lastName || ""}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">${order.total}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${statusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center flex justify-center gap-2">
                      {/* actions */}
                      <button
                        onClick={() => handleView(order)}
                        className="p-2 rounded-lg text-white"
                        style={{ backgroundColor: "#D4AF37" }}
                      >
                        <Eye size={16} />
                      </button>
                      {(order.status === "Pending" ||
                        order.status === "Active") && (
                        <>
                          <button
                            onClick={() => handleUpdate(order)}
                            className="p-2 rounded-lg text-white"
                            style={{ backgroundColor: "#1A1A1A" }}
                          >
                            <ClipboardClock size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-2 rounded-lg text-white"
                            style={{ backgroundColor: "red" }}
                          >
                            <CircleX size={16} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* ✅ Pagination */}
            <div
              className="flex justify-between items-center p-4 border-t"
              style={{ borderColor: "#E0E0E0" }}
            >
              <div className="flex items-center gap-2 text-sm">
                <span>Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(0);
                  }}
                  className="border rounded px-2 py-1 text-sm"
                  style={{ borderColor: "#E0E0E0" }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span>
                  Page {page + 1} of{" "}
                  {Math.ceil(filteredOrders.length / pageSize) || 1}
                </span>
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                  className="px-2 py-1 border rounded disabled:opacity-50"
                  style={{ borderColor: "#E0E0E0" }}
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setPage((prev) =>
                      prev + 1 < Math.ceil(filteredOrders.length / pageSize)
                        ? prev + 1
                        : prev
                    )
                  }
                  disabled={
                    page + 1 >= Math.ceil(filteredOrders.length / pageSize)
                  }
                  className="px-2 py-1 border rounded disabled:opacity-50"
                  style={{ borderColor: "#E0E0E0" }}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ✅ Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="rounded-xl shadow-lg w-full max-w-4xl p-6 relative overflow-y-auto max-h-[90vh]"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <button
              onClick={() => setViewingOrder(null)}
              className="absolute top-3 right-3"
              style={{ color: "#1A1A1A" }}
            >
              <X size={20} />
            </button>
            <h3
              className="text-2xl font-bold mb-6 border-b pb-3"
              style={{ color: "#000000", borderColor: "#E0E0E0" }}
            >
              Order Details
            </h3>

            {/* Customer Info */}
            <div
              className="border rounded-lg p-5 shadow mb-6"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E0E0E0" }}
            >
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: "#000000" }}
              >
                Customer Information
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border bg-[#E0E0E0] flex items-center justify-center">
                  <img
                    src={
                      viewingOrder.customer?.avatar ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="Customer"
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium" style={{ color: "#000000" }}>
                    {viewingOrder.customer?.firstName || ""}{" "}
                    {viewingOrder.customer?.lastName || ""}
                  </p>
                  <p className="text-sm" style={{ color: "#1A1A1A" }}>
                    {viewingOrder.customer?.phone || "N/A"}
                  </p>
                  <p className="text-sm" style={{ color: "#1A1A1A" }}>
                    {viewingOrder.customer?.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div
              className="border rounded-lg p-5 shadow mb-6"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E0E0E0" }}
            >
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: "#000000" }}
              >
                Order Items ({viewingOrder.items?.length || 0})
              </h4>
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{ backgroundColor: "#E0E0E0", color: "#000000" }}>
                    <th className="p-2 border">Product</th>
                    <th className="p-2 border">Image</th>
                    <th className="p-2 border">Qty</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {viewingOrder.items?.map((item, index) => (
                    <tr
                      key={index}
                      className="text-sm"
                      style={{ borderBottom: "1px solid #E0E0E0" }}
                    >
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-10 h-10 object-contain rounded"
                        />
                      </td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">${item.price.toFixed(2)}</td>
                      <td className="p-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                className="mt-4 text-sm space-y-1"
                style={{ color: "#1A1A1A" }}
              >
                <p>Subtotal: ${viewingOrder.subtotal || 0}</p>
                <p>Delivery Charges: ${viewingOrder.deliveryFee || 0}</p>
                <p>Coupon Discount: ${viewingOrder.discount || 0}</p>
                <p className="font-semibold" style={{ color: "#000000" }}>
                  Total Amount: ${viewingOrder.total || 0}
                </p>
              </div>
            </div>

            {/* Order Info */}
            <div
              className="border rounded-lg p-5 shadow"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E0E0E0" }}
            >
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: "#000000" }}
              >
                Order Information
              </h4>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
                style={{ color: "#1A1A1A" }}
              >
                <p>
                  <span className="font-medium" style={{ color: "#000000" }}>
                    Order ID:
                  </span>{" "}
                  {viewingOrder.id}
                </p>
                <p>
                  <span className="font-medium" style={{ color: "#000000" }}>
                    Order Date:
                  </span>{" "}
                  {formatDate(viewingOrder.date)}
                </p>
                <p>
                  <span className="font-medium" style={{ color: "#000000" }}>
                    Payment Method:
                  </span>{" "}
                  {viewingOrder.paymentMethod || "Online"}
                </p>
                <p>
                  <span className="font-medium" style={{ color: "#000000" }}>
                    Payment Status:
                  </span>{" "}
                  {viewingOrder.paymentStatus || "Paid"}
                </p>
                <p>
                  <span className="font-medium" style={{ color: "#000000" }}>
                    Order Status:
                  </span>{" "}
                  {viewingOrder.status}
                </p>
                <p>
                  <span className="font-medium" style={{ color: "#000000" }}>
                    Total Amount:
                  </span>{" "}
                  ${viewingOrder.total}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewingOrder(null)}
                className="px-4 py-2 rounded-lg"
                style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
