import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { getAllProducts, normalizeProduct } from "../../services/productsApi";
import { Link } from "react-router-dom";

const Kids = () => {
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        const normalized = data.map((p, i) => normalizeProduct(p, i));

        const kidsProducts = normalized.filter(
          (item) => item.category === "kids"
        );

        setProducts(kidsProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const FilterContent = () => (
    <>
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#000000]">
        <FiFilter /> Filters
      </h2>
      <div className="mb-6">
        <ul className="space-y-2 text-sm text-[#1A1A1A]">
          {["Shoes", "Clothes", "Toys", "Accessories"].map((cat, i) => (
            <li key={i}>
              <button className="w-full text-left hover:text-[#D4AF37]">
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-[#000000]">Price</h3>
        <input
          type="range"
          min="10"
          max="200"
          className="w-full accent-[#D4AF37]"
        />
        <div className="flex justify-between text-sm text-[#1A1A1A]">
          <span>$10</span>
          <span>$200</span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-[#000000]">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {["#D4AF37", "#000000", "#1A1A1A", "#E0E0E0", "#FFFFFF"].map(
            (color, i) => (
              <span
                key={i}
                style={{ backgroundColor: color }}
                className="w-6 h-6 rounded-full border border-[#1A1A1A] cursor-pointer"
              ></span>
            )
          )}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-[#000000]">Size</h3>
        <div className="flex flex-wrap gap-2">
          {["XS", "S", "M", "L"].map((size, i) => (
            <button
              key={i}
              className="px-3 py-1 border border-[#1A1A1A] rounded-md text-sm text-[#1A1A1A] hover:bg-[#D4AF37] hover:text-[#FFFFFF]"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-[#000000]">Dress Style</h3>
        <ul className="space-y-2 text-sm">
          {["Casual", "Party", "Formal"].map((style, i) => (
            <li key={i}>
              <button className="hover:text-[#D4AF37]">{style}</button>
            </li>
          ))}
        </ul>
      </div>
      <button className="w-full bg-[#000000] text-[#FFFFFF] py-2 rounded-full hover:bg-[#1A1A1A]">
        Apply Filter
      </button>
    </>
  );

  return (
    <div className="flex px-4 md:px-12 lg:px-20 py-10 mb-28 gap-10 relative bg-[#FFFFFF]">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="md:hidden fixed top-20 right-4 z-30 p-2 bg-[#000000] text-[#FFFFFF] rounded-full shadow-lg"
      >
        <FiFilter size={22} />
      </button>

      {/* Desktop Filter */}
      <section
        className="w-1/4 hidden md:block border border-[#1A1A1A] rounded-xl p-4 shadow-sm bg-[#FFFFFF]"
        data-aos="fade-right"
      >
        <FilterContent />
      </section>

      {/* Mobile Sidebar Filter */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#FFFFFF] shadow-lg p-6 z-40 transform transition-transform duration-300 ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsFilterOpen(false)}
          className="absolute top-4 right-4 text-xl font-bold text-[#000000]"
        >
          ✕
        </button>
        <FilterContent />
      </div>
      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 bg-[#000000] bg-opacity-40 z-30"
        ></div>
      )}

      {/* Products */}
      <main className="flex-1">
        <h2
          className="text-2xl font-bold mb-6 text-[#000000]"
          data-aos="fade-up"
        >
          Kids Collection
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product, i) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="rounded-2xl border border-[#1A1A1A] bg-[#E0E0E0] p-6 shadow-sm hover:shadow-lg transition"
                data-aos="zoom-in"
                data-aos-delay={i * 150}
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-3"
                />
                <h3 className="text-sm font-medium text-[#000000]">
                  {product.title}
                </h3>
                <p className="text-[#D4AF37] text-sm">
                  ⭐ {product.rating || 4}/5
                </p>
                <p className="font-bold text-lg text-[#1A1A1A]">
                  {product.price}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-[#1A1A1A]">No kids products found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Kids;
