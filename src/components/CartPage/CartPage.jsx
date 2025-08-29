import { useCart } from "../../context/CartContext";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8">YOUR CART</h2>

      {cartItems.length === 0 ? (
        <motion.p
          className="text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your cart is empty 🛒
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 mb-16 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.uniqueId}
                className="flex items-center justify-between border rounded-xl p-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                    <p className="mt-2 font-semibold">
                      ${Number(item.price).toFixed(2)} × {Number(item.quantity)}{" "}
                      = $
                      {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center border rounded-full px-3 py-1">
                    <button
                      onClick={() => decreaseQty(item.uniqueId)}
                      className="px-2 text-lg"
                    >
                      -
                    </button>
                    <span className="px-3">{Number(item.quantity)}</span>
                    <button
                      onClick={() => increaseQty(item.uniqueId)}
                      className="px-2 text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.uniqueId)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="border rounded-xl p-6 h-fit"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Discount (-20%)</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center border rounded-full mt-5 overflow-hidden">
              <input
                type="text"
                placeholder="Add promo code"
                className="flex-1 px-4 py-2 outline-none"
              />
              <button className="bg-black text-white px-5 py-2">Apply</button>
            </div>
            <motion.button
              onClick={() => navigate("/customer-info")}
              className="mt-6 w-full bg-black text-white py-3 rounded-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Checkout <FaArrowRight />
            </motion.button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;
