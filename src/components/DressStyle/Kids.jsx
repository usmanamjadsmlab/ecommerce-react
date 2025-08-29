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
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <FiFilter /> Filters
      </h2>
      <div className="mb-6">
        <ul className="space-y-2 text-sm">
          {["Shoes", "Clothes", "Toys", "Accessories"].map((cat, i) => (
            <li key={i}>
              <button className="w-full text-left hover:underline">
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price</h3>
        <input type="range" min="10" max="200" className="w-full" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>$10</span>
          <span>$200</span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-400",
            "bg-pink-400",
          ].map((color, i) => (
            <span
              key={i}
              className={`w-6 h-6 rounded-full border cursor-pointer ${color}`}
            ></span>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {["XS", "S", "M", "L"].map((size, i) => (
            <button
              key={i}
              className="px-3 py-1 border rounded-md text-sm hover:bg-black hover:text-white"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2">Dress Style</h3>
        <ul className="space-y-2 text-sm">
          {["Casual", "Party", "Formal"].map((style, i) => (
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
      >
        <FiFilter size={22} />
      </button>
      <section
        className="w-1/4 hidden md:block border rounded-xl p-4 shadow-sm"
        data-aos="fade-right"
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

      {/* Overlay */}
      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
        ></div>
      )}
      <main className="flex-1">
        <h2 className="text-2xl font-bold mb-6" data-aos="fade-up">
          Kids Collection
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product, i) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="rounded-xl p-4 hover:shadow-md cursor-pointer transition"
                data-aos="zoom-in"
                data-aos-delay={i * 150}
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-3"
                />
                <h3 className="text-sm font-medium">{product.title}</h3>
                <p className="text-yellow-500 text-sm">
                  ⭐ {product.rating || 4}/5
                </p>
                <p className="font-bold text-lg">{product.price}</p>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No kids products found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Kids;
