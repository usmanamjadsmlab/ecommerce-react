import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { getAllProducts, normalizeProduct } from "../../services/productsApi";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Selling = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        const normalized = data.map((p, i) => normalizeProduct(p, i));

        const sellingProducts = normalized.filter(
          (item) =>
            (item.category.includes("women") ||
              item.category.includes("kids")) &&
            (item._source.isNew === false ||
              item._source.isNew === "false" ||
              item._source.isNew === 0)
        );

        setProducts(sellingProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center">
        <p className="animate-pulse text-gray-500">Loading products...</p>
      </div>
    );
  }

  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <div id="selling" className="py-10">
      <h2 data-aos="fade-up" className="text-4xl font-bold mb-12 text-center">
        NEW SELLING
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {visibleProducts.map((product, i) => (
          <div
            key={product.id}
            data-aos="zoom-in"
            data-aos-delay={i * 150}
            className="relative rounded-2xl bg-gray-50 p-6 shadow-sm hover:shadow-lg transition"
          >
            <button
              onClick={() => {
                addToCart(product);
                toast.success("Item added successfully!");
              }}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-black hover:text-white p-2 rounded-full transition"
            >
              <Plus className="w-5 h-5" />
            </button>
            <img
              src={product.img}
              alt={product.title}
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-full h-56 object-contain mb-4 cursor-pointer"
            />

            <h3 className="font-semibold text-lg mb-2 line-clamp-1">
              {product.title}
            </h3>
            <p className="text-lg font-bold">{product.price}</p>
          </div>
        ))}
      </div>
      {products.length > 4 && !showAll && (
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowAll(true)}
            className="px-10 py-3 border border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default Selling;
