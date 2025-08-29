import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getAllProducts, normalizeProduct } from "../../services/productsApi";

const Men = () => {
  const [products, setProducts] = useState([]);
  const [allCasualProducts, setAllCasualProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        const normalized = data.map((p, i) => normalizeProduct(p, i));
        console.log(
          "All Categories:",
          normalized.map((p) => p.category)
        );

        const menProducts = normalized.filter(
          (item) => item.category === "men"
        );

        setAllCasualProducts(menProducts);
        setProducts(menProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleFilter = (category) => {
    if (category === "all") {
      setProducts(allCasualProducts);
    } else {
      setProducts(
        allCasualProducts.filter((item) => item.category === category)
      );
    }
    setIsFilterOpen(false);
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        <p className="animate-pulse text-gray-500">Loading products...</p>
      </div>
    );
  }

  const FilterContent = () => (
    <>
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <FiFilter /> Filters
      </h2>
      <div className="mb-6">
        <ul className="space-y-2 text-sm">
          {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((cat, i) => (
            <li key={i}>
              <button
                onClick={() => handleFilter(cat.toLowerCase())}
                className="w-full text-left hover:underline"
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price</h3>
        <input type="range" min="50" max="200" className="w-full" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>$50</span>
          <span>$200</span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "bg-green-500",
            "bg-red-500",
            "bg-yellow-400",
            "bg-orange-400",
            "bg-cyan-400",
            "bg-blue-600",
            "bg-pink-500",
            "bg-purple-600",
            "bg-black",
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
          {[
            "XX-Small",
            "X-Small",
            "Small",
            "Medium",
            "Large",
            "X-Large",
            "XX-Large",
            "3X-Large",
            "4X-Large",
          ].map((size, i) => (
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
          {["Casual", "Formal", "Party", "Gym"].map((style, i) => (
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
      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
        ></div>
      )}
      <main className="flex-1">
        <h2 className="text-2xl font-bold mb-6" data-aos="fade-up">
          Men Collection
        </h2>
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
              <p className="text-yellow-500 text-sm">
                ⭐ {product.rating ?? "4.5"}/5
              </p>
              <p className="font-bold text-lg">{product.price}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Men;
