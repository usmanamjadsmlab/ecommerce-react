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
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <FiFilter /> Filters
      </h2>

      <div className="mb-6" data-aos="fade-up" data-aos-delay="300">
        <ul className="space-y-2 text-sm">
          {["Suits", "Shirts", "Blazers", "Trousers"].map((cat, i) => (
            <li key={i}>
              <button className="w-full text-left hover:underline">
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6" data-aos="fade-up" data-aos-delay="400">
        <h3 className="font-medium mb-2">Price</h3>
        <input type="range" min="100" max="500" className="w-full" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>$100</span>
          <span>$500</span>
        </div>
      </div>

      <div className="mb-6" data-aos="fade-up" data-aos-delay="500">
        <h3 className="font-medium mb-2">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "bg-gray-700",
            "bg-black",
            "bg-blue-900",
            "bg-yellow-700",
            "bg-white border",
          ].map((color, i) => (
            <span
              key={i}
              className={`w-6 h-6 rounded-full border cursor-pointer ${color}`}
            ></span>
          ))}
        </div>
      </div>
      <div className="mb-6" data-aos="fade-up" data-aos-delay="600">
        <h3 className="font-medium mb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {["Small", "Medium", "Large", "X-Large", "XX-Large"].map(
            (size, i) => (
              <button
                key={i}
                className="px-3 py-1 border rounded-md text-sm hover:bg-black hover:text-white"
              >
                {size}
              </button>
            )
          )}
        </div>
      </div>

      {/* Dress Style */}
      <div className="mb-6" data-aos="fade-up" data-aos-delay="700">
        <h3 className="font-medium mb-2">Dress Style</h3>
        <ul className="space-y-2 text-sm">
          {["Formal", "Party", "Casual", "Gym"].map((style, i) => (
            <li key={i}>
              <button className="hover:underline">{style}</button>
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full bg-black text-white py-2 rounded-full hover:opacity-90">
        Apply Filter
      </button>
    </>
  );

  return (
    <div className="flex px-4 md:px-12 lg:px-20 py-10 mb-28 gap-10 relative">
      <button
        onClick={() => setIsFilterOpen(true)}
        className="md:hidden fixed top-20 right-4 z-30 p-2 bg-black text-white rounded-full shadow-lg"
        data-aos="zoom-in"
        data-aos-delay="100"
      >
        <FiFilter size={22} />
      </button>

      <section
        className="w-1/4 hidden md:block border rounded-xl p-4 shadow-sm"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <FilterContent />
      </section>
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg p-6 z-40 transform transition-transform duration-300 ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsFilterOpen(false)}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ✕
        </button>
        <FilterContent />
      </div>
      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
        ></div>
      )}
      <main className="flex-1" data-aos="fade-up" data-aos-delay="300">
        <h2 className="text-2xl font-bold mb-6">Women Collection</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="rounded-xl p-4 hover:shadow-md cursor-pointer transition block"
              data-aos="zoom-in"
              data-aos-delay={i * 150}
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-48 object-contain mb-3"
              />
              <h3 className="text-sm font-medium">{product.title}</h3>
              <p className="text-yellow-500 text-sm">⭐ {product.rating}/5</p>
              <p className="font-bold text-lg">{product.price}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Women;
