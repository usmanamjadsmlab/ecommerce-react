import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CustomerInfo = () => {
  const { cartItems, setCustomer } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.state.trim()) newErrors.state = "State/Region is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setCustomer(formData);
      navigate("/shipping");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="max-w-7xl mb-28 mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 text-[#000000]">
      {/* Left Form Section */}
      <div className="lg:col-span-2 space-y-8">
        <div data-aos="fade-up">
          <h2 className="text-3xl font-bold">Customer Information</h2>
          <p className="text-[#1A1A1A]">Let’s create your account</p>
        </div>

        {/* Email */}
        <div data-aos="fade-up" data-aos-delay="100" className="space-y-2">
          <label className="block font-semibold">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#E0E0E0] rounded-lg px-4 py-2 bg-[#FFFFFF]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* First & Last Name */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <label className="block font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-[#E0E0E0] rounded-lg px-4 py-2 bg-[#FFFFFF]"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-[#E0E0E0] rounded-lg px-4 py-2 bg-[#FFFFFF]"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Shipping Address */}
        <div data-aos="fade-up" data-aos-delay="300" className="space-y-5">
          <h3 className="text-lg font-semibold">Shipping Address</h3>

          <div>
            <label className="block font-semibold">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-[#E0E0E0] rounded-lg px-4 py-2 bg-[#FFFFFF]"
            >
              <option value="">Select Country</option>
              <option>Australia</option>
              <option>USA</option>
              <option>Pakistan</option>
              <option>India</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">State/Region</label>
            <input
              type="text"
              name="state"
              placeholder="Enter state/region"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-[#E0E0E0] rounded-lg px-4 py-2 bg-[#FFFFFF]"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-[#E0E0E0] rounded-lg px-4 py-2 bg-[#FFFFFF]"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-[#E0E0E0] rounded-lg px-4 py-2 bg-[#FFFFFF]"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Order Summary */}
      <div
        data-aos="zoom-in"
        data-aos-delay="400"
        className="border border-[#E0E0E0] rounded-xl p-6 h-fit shadow-md bg-[#FFFFFF]"
      >
        <h3 className="text-xl font-semibold mb-4 text-[#000000]">
          Order Summary
        </h3>
        <div className="space-y-3 text-[#1A1A1A]">
          <div className="flex justify-between">
            <span>Price</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between text-[#D4AF37]">
            <span>Discount</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
          <hr className="my-3 border-[#E0E0E0]" />
          <div className="flex justify-between text-lg font-bold text-[#000000]">
            <span>Total Price</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="mt-6 w-full bg-gradient-to-r from-[#D4AF37] to-[#b38b2b] text-black border border-transparent hover:bg-black hover:text-white hover:border-[#D4AF37] py-3 rounded-lg flex items-center justify-center gap-2 font-semibold shadow-md hover:scale-105 transition-transform duration-300"
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default CustomerInfo;
