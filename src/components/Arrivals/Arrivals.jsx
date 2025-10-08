import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { getAllProducts, normalizeProduct } from "../../services/productsApi";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Arrivals = () => {
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

        const arrivalProducts = normalized.filter(
          (item) =>
            (item.category.includes("men") || item.category.includes("kids")) &&
            (item._source.isNew === true ||
              item._source.isNew === "true" ||
              item._source.isNew === 1)
        );

        setProducts(arrivalProducts);
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
        <p className="animate-pulse text-[#1A1A1A]">Loading products...</p>
      </div>
    );
  }

  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <div id="arrivals" className="py-10 px-6 md:px-32 bg-[#FFFFFF]">
      <h2
        data-aos="fade-up"
        className="text-4xl font-bold mb-12 text-center text-[#000000]"
      >
        NEW ARRIVALS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {visibleProducts.map((product, i) => (
          <div
            key={product.id}
            data-aos="zoom-in"
            data-aos-delay={i * 150}
            className="relative rounded-2xl border border-[#000000] bg-[#FFFFFF] p-6 shadow-sm hover:shadow-lg transition"
          >
            {/* Add to Cart Button */}
            <button
              onClick={() => {
                addToCart(product);
                toast.success("Item added successfully!");
              }}
              className="absolute top-2 right-2 bg-[#E0E0E0] p-2 rounded-full shadow hover:bg-[#D4AF37] hover:text-[#000000] transition"
            >
              <Plus className="w-5 h-5" />
            </button>

            {/* Product Image */}
            <img
              src={product.img}
              alt={product.title}
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-full h-56 object-contain mb-4 cursor-pointer"
            />

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-[#000000]">
              {product.title}
            </h3>

            {/* Price */}
            <p className="text-lg font-bold text-[#D4AF37]">{product.price}</p>
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
            className="px-10 py-3 bg-gradient-to-r from-[#D4AF37] to-[#b38b2b] text-black border border-transparent hover:bg-black hover:text-white hover:border-[#D4AF37] rounded-full font-semibold shadow-md hover:scale-105 transition-transform duration-300"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default Arrivals;
