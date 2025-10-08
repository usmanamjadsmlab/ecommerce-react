import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getAllProducts, normalizeProduct } from "../../services/productsApi";

const Women = () => {
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        const normalized = data.map((p, i) => normalizeProduct(p, i));

        const formalProducts = normalized.filter(
          (item) => item.category === "women"
        );

        setProducts(formalProducts);
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

      <div className="mb-6" data-aos="fade-up" data-aos-delay="300">
        <ul className="space-y-2 text-sm">
          {["Suits", "Shirts", "Blazers", "Trousers"].map((cat, i) => (
            <li key={i}>
              <button className="w-full text-left hover:text-[#D4AF37]">
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="mb-6" data-aos="fade-up" data-aos-delay="400">
        <h3 className="font-medium mb-2 text-[#000000]">Price</h3>
        <input
          type="range"
          min="100"
          max="500"
          className="w-full accent-[#D4AF37]"
        />
        <div className="flex justify-between text-sm text-[#1A1A1A]">
          <span>$100</span>
          <span>$500</span>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6" data-aos="fade-up" data-aos-delay="500">
        <h3 className="font-medium mb-2 text-[#000000]">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {["#000000", "#1A1A1A", "#D4AF37", "#E0E0E0", "#FFFFFF"].map(
            (color, i) => (
              <span
                key={i}
                className="w-6 h-6 rounded-full border cursor-pointer"
                style={{ backgroundColor: color }}
              ></span>
            )
          )}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6" data-aos="fade-up" data-aos-delay="600">
        <h3 className="font-medium mb-2 text-[#000000]">Size</h3>
        <div className="flex flex-wrap gap-2">
          {["Small", "Medium", "Large", "X-Large", "XX-Large"].map(
            (size, i) => (
              <button
                key={i}
                className="px-3 py-1 border border-[#1A1A1A] rounded-md text-sm hover:bg-[#000000] hover:text-[#FFFFFF]"
              >
                {size}
              </button>
            )
          )}
        </div>
      </div>

      {/* Dress Style */}
      <div className="mb-6" data-aos="fade-up" data-aos-delay="700">
        <h3 className="font-medium mb-2 text-[#000000]">Dress Style</h3>
        <ul className="space-y-2 text-sm">
          {["Formal", "Party", "Casual", "Gym"].map((style, i) => (
            <li key={i}>
              <button className="hover:text-[#D4AF37]">{style}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Apply Filter */}
      <button className="w-full bg-[#D4AF37] text-[#000000] py-2 rounded-full hover:bg-[#1A1A1A] hover:text-[#FFFFFF]">
        Apply Filter
      </button>
    </>
  );

  return (
    <div className="flex px-4 md:px-12 lg:px-20 py-10 mb-28 gap-10 relative">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="md:hidden fixed top-20 right-4 z-30 p-2 bg-[#000000] text-[#FFFFFF] rounded-full shadow-lg"
        data-aos="zoom-in"
        data-aos-delay="100"
      >
        <FiFilter size={22} />
      </button>

      {/* Sidebar */}
      <section
        className="w-1/4 hidden md:block border border-[#E0E0E0] rounded-xl p-4 shadow-sm bg-[#FFFFFF]"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <FilterContent />
      </section>

      {/* Mobile Drawer */}
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

      {/* Main Content */}
      <main className="flex-1" data-aos="fade-up" data-aos-delay="300">
        <h2 className="text-2xl font-bold mb-6 text-[#000000]">
          Women Collection
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="rounded-2xl border border-[#E0E0E0] bg-[#FFFFFF] p-6 shadow-sm hover:shadow-lg transition"
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
              <p className="text-sm text-[#D4AF37]">
                ⭐ {product.rating ?? "4.5"}/5
              </p>
              <p className="font-bold text-lg text-[#1A1A1A]">
                {product.price}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Women;
