import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Brands from "./components/Brands/Brands";
import Arrivals from "./components/Arrivals/Arrivals";
import Selling from "./components/Selling/Selling";
import DressStyle from "./components/DressStyle/DressStyle";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import CartPage from "./components/CartPage/CartPage";
import Men from "./components/DressStyle/Men";
import Women from "./components/DressStyle/Women";
import Kids from "./components/DressStyle/Kids";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import CustomerInfo from "./components/CustomerInfo/CustomerInfo";
import ShippingPayment from "./components/ShippingPayment/ShippingPayment";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import OrderSuccess from "./components/OrderSuccess/OrderSuccess";
import AOS from "aos";
import "aos/dist/aos.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="bg-white dark:text-white">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Brands />
                  <Arrivals />
                  <Selling />
                  <DressStyle />
                  <Testimonials />
                </>
              }
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/customer-info" element={<CustomerInfo />} />
            <Route path="/shipping" element={<ShippingPayment />} />{" "}
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/kids" element={<Kids />} />
          </Routes>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </CartProvider>
    </Router>
  );
}

export default App;
