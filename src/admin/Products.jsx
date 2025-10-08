import React, { useEffect, useState } from "react";
import { getAllProducts, normalizeProduct } from "../services/productsApi";
import { Eye, Edit, Trash, Plus, X, Save } from "lucide-react";
import toast from "react-hot-toast";

function capitalizeFirst(str) {
  if (!str) return "N/A";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    category: "",
    type: "",
    stock: "in",
  });

  // ✅ Search + Pagination states
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        const normalized = data.map((p, i) => normalizeProduct(p, i));
        setProducts(normalized);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // ✅ Delete handler
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted successfully!");
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      image: product.images[0],
      category: product.category,
      type: product.type,
      stock: product.stock === "out" ? "out" : "in",
    });
  };

  const handleSave = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              images: [formData.image],
              category: formData.category,
              type: formData.type,
              stock: formData.stock,
            }
          : p
      )
    );
    setEditingProduct(null);
    toast.success("Product updated successfully!");
  };

  const handleCancel = () => setEditingProduct(null);

  const handleView = (product) => setViewingProduct(product);
  const handleCloseView = () => setViewingProduct(null);

  const handleAdd = () => {
    setAddingProduct(true);
    setFormData({ image: "", category: "", type: "", stock: "in" });
  };

  const handleSaveNew = () => {
    const newProduct = {
      id: Date.now(),
      images: formData.image ? [formData.image] : [],
      category: formData.category,
      type: formData.type,
      stock: formData.stock,
    };
    setProducts((prev) => [...prev, newProduct]);
    setAddingProduct(false);
    toast.success("Product added successfully!");
  };

  const handleCancelAdd = () => setAddingProduct(false);

  // ✅ Search filter
  const filteredProducts = products.filter((p) => {
    const query = search.toLowerCase();
    return (
      p.category.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query) ||
      (p.images[0] || "").toLowerCase().includes(query)
    );
  });

  // ✅ Paginated results
  const paginatedProducts = filteredProducts.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  if (loading)
    return (
      <div className="pl-64 flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-[#E0E0E0] border-t-[#000000] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div
      className="ml-0 md:ml-64 p-6 min-h-screen"
      style={{ background: "#FFFFFF", color: "#000000" }}
    >
      {/* Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 rounded"
          style={{ background: "#D4AF37", color: "#FFFFFF" }}
        >
          <Plus size={18} />
          Add New Product
        </button>

        <input
          type="text"
          placeholder="Search products..."
          className="rounded-lg px-3 py-2 text-sm w-full md:w-1/3"
          style={{
            border: "1px solid #E0E0E0",
            background: "#FFFFFF",
            color: "#000000",
          }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-x-auto shadow"
        style={{ background: "#FFFFFF" }}
      >
        {paginatedProducts.length === 0 ? (
          <p className="p-4" style={{ color: "#1A1A1A" }}>
            No products found
          </p>
        ) : (
          <>
            <table className="min-w-full text-sm">
              <thead style={{ background: "#1A1A1A", color: "#FFFFFF" }}>
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-center">Stock</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    style={{ borderTop: "1px solid #E0E0E0" }}
                    className="hover:bg-[#E0E0E0]/40"
                  >
                    {/* Image */}
                    <td className="py-3 px-4 text-left">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt="Product"
                          className="w-14 h-14 object-cover rounded"
                          style={{ border: "1px solid #E0E0E0" }}
                        />
                      ) : (
                        <span style={{ color: "#1A1A1A" }}>No Image</span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-left">
                      {capitalizeFirst(product.category)}
                    </td>

                    {/* Type */}
                    <td className="py-3 px-4 text-left">
                      {capitalizeFirst(product.type)}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4 text-center">
                      {product.stock === "in" ? (
                        <span
                          className="px-3 py-1 text-xs rounded-lg font-medium"
                          style={{ background: "#28a745", color: "#FFFFFF" }} // ✅ Green
                        >
                          In Stock
                        </span>
                      ) : (
                        <span
                          className="px-3 py-1 text-xs rounded-lg font-medium"
                          style={{ background: "#dc3545", color: "#FFFFFF" }} // ✅ Red
                        >
                          Out of Stock
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="p-2 rounded-lg"
                          style={{ background: "#D4AF37", color: "#FFFFFF" }}
                          onClick={() => handleView(product)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="p-2 rounded-lg"
                          style={{ background: "#1A1A1A", color: "#FFFFFF" }}
                          onClick={() => handleEdit(product)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-2 rounded-lg"
                          style={{ background: "#dc3545", color: "#FFFFFF" }}
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div
              className="flex justify-between items-center p-4"
              style={{ borderTop: "1px solid #E0E0E0" }}
            >
              <div className="flex items-center gap-2 text-sm">
                <span>Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(0);
                  }}
                  className="rounded px-2 py-1 text-sm"
                  style={{
                    border: "1px solid #E0E0E0",
                    background: "#FFFFFF",
                    color: "#000000",
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span>
                  Page {page + 1} of{" "}
                  {Math.ceil(filteredProducts.length / pageSize) || 1}
                </span>
                <button
                  disabled={page === 0}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  className="px-2 py-1 rounded disabled:opacity-50"
                  style={{ border: "1px solid #E0E0E0" }}
                >
                  Prev
                </button>
                <button
                  disabled={
                    page + 1 >= Math.ceil(filteredProducts.length / pageSize)
                  }
                  onClick={() =>
                    setPage((prev) =>
                      prev + 1 < Math.ceil(filteredProducts.length / pageSize)
                        ? prev + 1
                        : prev
                    )
                  }
                  className="px-2 py-1 rounded disabled:opacity-50"
                  style={{ border: "1px solid #E0E0E0" }}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ✅ Add Product Modal */}
      {addingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="p-6 rounded-lg shadow-lg w-[600px]"
            style={{ background: "#FFFFFF", color: "#000000" }}
          >
            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>

            {/* Image Upload */}
            <div className="mb-4">
              <p className="mb-2 font-medium">Product Image:</p>
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border mb-2"
                  style={{ borderColor: "#E0E0E0" }}
                />
              ) : (
                <p className="text-sm" style={{ color: "#1A1A1A" }}>
                  No image uploaded
                </p>
              )}
              <input
                type="file"
                id="imageUploadAdd"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imgUrl = URL.createObjectURL(file);
                    setFormData({ ...formData, image: imgUrl });
                  }
                }}
              />
              <button
                onClick={() =>
                  document.getElementById("imageUploadAdd").click()
                }
                className="px-4 py-2 rounded"
                style={{ background: "#000000", color: "#FFFFFF" }}
              >
                Upload Image
              </button>
            </div>

            {/* Inputs */}
            <label className="block mb-2">
              Category:
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 rounded mt-1"
                style={{ border: "1px solid #E0E0E0" }}
              />
            </label>

            <label className="block mb-2">
              Type:
              <input
                type="text"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full p-2 rounded mt-1"
                style={{ border: "1px solid #E0E0E0" }}
              />
            </label>

            <label className="block mb-4">
              Stock:
              <select
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full p-2 rounded mt-1"
                style={{ border: "1px solid #E0E0E0" }}
              >
                <option value="in">In Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </label>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelAdd}
                className="flex items-center gap-1 px-4 py-2 rounded"
                style={{ background: "#E0E0E0", color: "#000000" }}
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSaveNew}
                className="flex items-center gap-1 px-4 py-2 rounded"
                style={{ background: "#D4AF37", color: "#FFFFFF" }}
              >
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="p-6 rounded-lg shadow-lg w-[600px]"
            style={{ background: "#FFFFFF", color: "#000000" }}
          >
            <h3 className="text-lg font-semibold mb-4">Edit Product</h3>

            {/* Image */}
            <div className="mb-4">
              <p className="mb-2 font-medium">Product Image:</p>
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border mb-2"
                style={{ borderColor: "#E0E0E0" }}
              />
              <input
                type="file"
                id="imageUploadEdit"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imgUrl = URL.createObjectURL(file);
                    setFormData({ ...formData, image: imgUrl });
                  }
                }}
              />
              <button
                onClick={() =>
                  document.getElementById("imageUploadEdit").click()
                }
                className="px-4 py-2 rounded"
                style={{ background: "#000000", color: "#FFFFFF" }}
              >
                Change Image
              </button>
            </div>

            {/* Inputs */}
            <label className="block mb-2">
              Category:
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 rounded mt-1"
                style={{ border: "1px solid #E0E0E0" }}
              />
            </label>

            <label className="block mb-2">
              Type:
              <input
                type="text"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full p-2 rounded mt-1"
                style={{ border: "1px solid #E0E0E0" }}
              />
            </label>

            <label className="block mb-4">
              Stock:
              <select
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full p-2 rounded mt-1"
                style={{ border: "1px solid #E0E0E0" }}
              >
                <option value="in">In Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </label>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 px-4 py-2 rounded"
                style={{ background: "#E0E0E0", color: "#000000" }}
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-4 py-2 rounded"
                style={{ background: "#D4AF37", color: "#FFFFFF" }}
              >
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ View Product Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="p-6 rounded-lg shadow-lg w-[600px]"
            style={{ background: "#FFFFFF", color: "#000000" }}
          >
            <h3 className="text-lg font-semibold mb-4">View Product</h3>

            <div className="mb-4">
              <p className="mb-2 font-medium">Product Image:</p>
              <img
                src={viewingProduct.images[0]}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border mb-2"
                style={{ borderColor: "#E0E0E0" }}
              />
            </div>

            <p className="mb-2">
              <span className="font-medium">Category:</span>{" "}
              {capitalizeFirst(viewingProduct.category)}
            </p>
            <p className="mb-2">
              <span className="font-medium">Type:</span>{" "}
              {capitalizeFirst(viewingProduct.type)}
            </p>
            <p className="mb-4">
              <span className="font-medium">Stock:</span>{" "}
              {viewingProduct.stock === "in" ? "In Stock" : "Out of Stock"}
            </p>

            <div className="flex justify-end">
              <button
                onClick={handleCloseView}
                className="px-4 py-2 rounded"
                style={{ background: "#000000", color: "#FFFFFF" }}
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
