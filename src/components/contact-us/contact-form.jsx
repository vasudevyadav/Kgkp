import React, { useState } from "react";
import CommonImage from "@/assets/images/contact-us.png";
import EmailImage from "@/assets/images/email.png";
import WhatappImage from "@/assets/images/whatsapp.png";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    propertyType: "",
    location: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const propertyTypes = ["RESIDENTIAL", "COMMERCIAL", "RENTAL", "INVESTMENT"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePropertyTypeClick = (type) => {
    setFormData((prev) => ({ ...prev, propertyType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { fullName, phone, email, propertyType, location, message } =
      formData;

    if (!fullName || !phone || !email || !propertyType) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload = {
      full_name: fullName,
      email,
      phone,
      property_type: propertyType,
      location,
      message,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed.");
      }

      setSuccess("Form submitted successfully!");
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        propertyType: "",
        location: "",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Submission failed. Please try again.");
    }
  };

  return (
    <section className="w-full container-fluid py-7 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Left (Form) */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl lg:text-4xl font-normal mb-6 leading-snug">
            Reach out to us for personalized assistance <br /> and exceptional
            service.
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="text-red-600 text-sm font-medium">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-sm font-medium">
                {success}
              </div>
            )}

            {/* Full Name */}
            <div className="flex items-end gap-5 !mb-4">
              <label className="text-sm w-20 whitespace-nowrap mb-0 leading-[0px]">
                Full Name*
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-1 mb-0"
              />
            </div>

            {/* Phone */}
            <div className="flex items-end gap-5 !mb-4">
              <label className="text-sm w-20 mb-0 leading-[0px]">Phone*</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                maxLength={10}
                onChange={handleChange}
                className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-1"
              />
            </div>

            {/* Email */}
            <div className="flex items-end gap-5 !mb-4">
              <label className="text-sm w-20 mb-0 leading-[0px]">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-1"
              />
            </div>

            {/* Property Type */}
            <div className="flex items-center gap-5 !mt-9 !mb-8">
              <label className="text-sm mb-0 w-32 leading-[14px] lg:leading-[0px]">
                Property Type*
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={`lg:px-6 px-2.5 py-1.5 border rounded-full text-sm ${
                      formData.propertyType === type
                        ? "border-black font-semibold"
                        : "border-gray-400"
                    }`}
                    onClick={() => handlePropertyTypeClick(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-end gap-5 !mb-2">
              <label className="text-sm mb-0 w-20 leading-[8px]">
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-1"
              >
                <option value="">Select Location</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Jaipur">Jaipur</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex items-end gap-5 !mb-8">
              <label className="text-sm mb-0 w-20 leading-[0px]">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-1"
              />
            </div>

            <button
              type="submit"
              className="bg-[#9A6E3A] text-white px-14 py-2.5 mt-2"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Right (Image) */}
        <div className="w-full md:w-1/3">
          <img
            src={CommonImage}
            alt="Contact Visual"
            className="w-full rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* Contact Options */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-5 md:gap-24 mt-24 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#F2F2F2] p-4 rounded-full">
            <img src={EmailImage} alt="Email Icon" className="w-12 h-12" />
          </div>
          <div>
            <p className="text-lg">E-mail us</p>
            <p className="text-lg">sales@gkrealty.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#F2F2F2] p-4 rounded-full">
            <img src={WhatappImage} alt="WhatsApp Icon" className="w-12 h-12" />
          </div>
          <div>
            <p className="text-lg">Whatsapp chat with us</p>
            <p className="text-lg">+91 82828 26005</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
