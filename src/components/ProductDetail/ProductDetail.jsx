import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getAllProducts, normalizeProduct } from "../../services/productsApi";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedColor, setSelectedColor] = useState("green");
  const [thumbnails, setThumbnails] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getAllProducts();
        const normalized = data.map((p, i) => normalizeProduct(p, i));
        const found = normalized.find((item) => item.id === id);

        if (found) {
          setProduct(found);

          let thumbImages = [];

          if (found.images && found.images.length > 0) {
            thumbImages.push(...found.images);
          }
          while (thumbImages.length < 3) {
            const random =
              normalized[Math.floor(Math.random() * normalized.length)];
            if (
              random &&
              random.images?.[0] &&
              !thumbImages.includes(random.images[0])
            ) {
              thumbImages.push(random.images[0]);
            }
          }
          const finalThumbs = thumbImages.slice(0, 3);

          setThumbnails(finalThumbs);
          setMainImage(finalThumbs[0]);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-[#1A1A1A] animate-pulse">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#D4AF37]">
          Product not found!
        </h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    const uniqueId = `${product.id}-${mainImage}-${selectedSize}-${selectedColor}`;

    const productWithOptions = {
      ...product,
      img: mainImage,
      size: selectedSize,
      color: selectedColor,
      quantity,
      uniqueId,
      price: product.price
        ? Number(product.price.toString().replace("$", ""))
        : 0,
    };

    addToCart(productWithOptions);
    toast.success(`${product.title} added to cart 🛒`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      {/* Breadcrumbs */}
      <div
        className="text-[#1A1A1A] text-sm mb-6 flex items-center gap-1"
        data-aos="fade-up"
      >
        <span>Home</span>
        <HiOutlineChevronRight className="inline text-[#E0E0E0]" />
        <span>Shop</span>
        <HiOutlineChevronRight className="inline text-[#E0E0E0]" />
        <span className="text-[#000000] font-medium">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left side: Images */}
        <div data-aos="zoom-in" data-aos-delay="100">
          <img
            src={mainImage}
            alt={product.title}
            className="w-full rounded-lg mb-4 h-[500px] object-cover border border-[#E0E0E0]"
          />
          <div className="flex gap-3">
            {thumbnails.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-24 h-24 object-cover border rounded cursor-pointer ${
                  mainImage === img
                    ? "border-[#D4AF37]"
                    : "hover:border-[#1A1A1A]"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right side: Product Info */}
        <div data-aos="fade-up" data-aos-delay="300">
          <h2 className="text-2xl font-bold mb-2 text-[#000000]">
            {product.title}
          </h2>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) =>
                i < product.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
              )}
            </div>
            <span className="ml-2 text-[#1A1A1A]">{product.rating}/5</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-[#D4AF37]">
              {product.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-[#1A1A1A] mb-4">{product.description}</p>

          {/* Colors */}
          <div className="mb-4" data-aos="fade-up" data-aos-delay="400">
            <h4 className="font-medium mb-2 text-[#000000]">Select Colors</h4>
            <div className="flex gap-3">
              {["green", "black", "blue"].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === color
                      ? "border-[#D4AF37]"
                      : "border-[#E0E0E0]"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-4" data-aos="fade-up" data-aos-delay="500">
            <h4 className="font-medium mb-2 text-[#000000]">Choose Size</h4>
            <div className="flex gap-3">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md transition ${
                    selectedSize === size
                      ? "bg-[#000000] text-[#FFFFFF] border-[#000000]"
                      : "border-[#E0E0E0] hover:bg-[#1A1A1A] hover:text-[#FFFFFF]"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div
            className="flex items-center gap-4 mb-4"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="px-3 py-1 border rounded-md border-[#E0E0E0] hover:bg-[#1A1A1A] hover:text-[#FFFFFF]"
            >
              -
            </button>
            <span className="text-[#000000]">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border rounded-md border-[#E0E0E0] hover:bg-[#1A1A1A] hover:text-[#FFFFFF]"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            data-aos="zoom-in"
            data-aos-delay="700"
            className="bg-gradient-to-r from-[#D4AF37] to-[#b38b2b] text-black font-semibold px-6 py-3 rounded-full w-full md:w-auto border border-transparent hover:bg-black hover:text-white hover:border-[#D4AF37] shadow-md transition-transform duration-300 hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
