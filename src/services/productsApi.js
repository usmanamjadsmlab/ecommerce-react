const API_BASE = "https://fakestoreapiserver.reactbd.org";

// ✅ API se products laane ka function
export async function getAllProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const json = await res.json();
  const items = Array.isArray(json) ? json : json.data || json.products || [];
  return items;
}

// ✅ Product normalize karna
export function normalizeProduct(p, index = 0) {
  const id = String(p._id ?? p.id ?? index);

  // ✅ Single main image
  const img =
    (Array.isArray(p.images) && p.images[0]) ||
    p.image ||
    p.thumbnail ||
    p.img ||
    "";

  // ✅ Multiple images
  let images = [];
  if (Array.isArray(p.images) && p.images.length > 0) {
    images = p.images;
  } else if (p.image) {
    images = [p.image];
  } else if (img) {
    images = [img];
  }

  const priceNum =
    typeof p.price === "number"
      ? p.price
      : Number(String(p.price || "0").replace(/[^\d.]/g, ""));

  const category =
    p.category?.toLowerCase() ||
    p.type?.toLowerCase() ||
    p.gender?.toLowerCase() ||
    "uncategorized";

  return {
    id,
    title: p.title || p.name || "Untitled",
    img,
    images, // 👈 multiple images
    price: `$${priceNum}`,
    rawPrice: priceNum,
    category,
    rating: p.rating?.rate || p.rating || "N/A", // ✅ API rating
    type: p.type || "N/A", // ✅ API type
    _source: p,
  };
}

// ✅ Default export
export default {
  getAllProducts,
  normalizeProduct,
};
