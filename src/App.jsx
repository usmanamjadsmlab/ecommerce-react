import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AuthForm from "./components/AuthForm/AuthForm";
import Hero from "./components/Hero/Hero";
import Brands from "./components/Brands/Brands";
import Arrivals from "./components/Arrivals/Arrivals";
import Selling from "./components/Selling/Selling";
import DressStyle from "./components/DressStyle/DressStyle";
import Testimonials from "./components/Testimonials/Testimonials";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import CartPage from "./components/CartPage/CartPage";
import Men from "./components/DressStyle/Men";
import Women from "./components/DressStyle/Women";
import Kids from "./components/DressStyle/Kids";
import CustomerInfo from "./components/CustomerInfo/CustomerInfo";
import ShippingPayment from "./components/ShippingPayment/ShippingPayment";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import OrderSuccess from "./components/OrderSuccess/OrderSuccess";
import TrackOrder from "./components/TrackOrder/TrackOrder"; // ✅ Track Order page import
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Admin Pages
import Dashboard from "./admin/Dashboard";
import Products from "./admin/Products";
import Sidebar from "./admin/Sidebar";
import AdminNavbar from "./admin/AdminNavbar";
import ManageOrders from "./admin/ManageOrders";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ✅ Normal Store Layout
function Layout({ children }) {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/auth"; // auth page pe hide

  return (
    <div className="bg-white dark:text-white">
      {!hideNavbarFooter && <Navbar />}
      {children}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

// ✅ Admin Layout (Sidebar + AdminNavbar fixed)
function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar (Logout button) */}
        <AdminNavbar />

        {/* ✅ Yeh jagah page ke hisaab se change hoti hai */}
        <div className="p-6 bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

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

        <Routes>
          {/* ✅ Store Layout Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <Hero />
                <Brands />
                <Arrivals />
                <Selling />
                <DressStyle />
                <Testimonials />
              </Layout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Layout>
                <ProductDetail />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <CartPage />
              </Layout>
            }
          />
          <Route
            path="/customer-info"
            element={
              <Layout>
                <CustomerInfo />
              </Layout>
            }
          />
          <Route
            path="/shipping"
            element={
              <Layout>
                <ShippingPayment />
              </Layout>
            }
          />
          <Route
            path="/order-confirmation"
            element={
              <Layout>
                <OrderConfirmation />
              </Layout>
            }
          />
          <Route
            path="/order-success"
            element={
              <Layout>
                <OrderSuccess />
              </Layout>
            }
          />

          {/* ✅ Track Order Route */}
          <Route
            path="/track-order"
            element={
              <Layout>
                <TrackOrder />
              </Layout>
            }
          />

          <Route
            path="/men"
            element={
              <Layout>
                <Men />
              </Layout>
            }
          />
          <Route
            path="/women"
            element={
              <Layout>
                <Women />
              </Layout>
            }
          />
          <Route
            path="/kids"
            element={
              <Layout>
                <Kids />
              </Layout>
            }
          />
          <Route
            path="/auth"
            element={
              <Layout>
                <AuthForm />
              </Layout>
            }
          />

          {/* ✅ Admin Routes with AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="manage_orders" element={<ManageOrders />} />
          </Route>
        </Routes>

        {/* ✅ Global Toaster */}
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
