import React, { useState } from "react";
import axios from "axios";
import CommonImage from "@/assets/images/project-details.png";

const BlogContact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    contact: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/book-visit`,
        formData
      );

      if (res.status === 200) {
        setResponseMessage("✅ Thank you! Your site visit has been booked.");
        setFormData({ name: "", email: "", date: "", contact: "" });
      } else {
        setResponseMessage("⚠️ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setResponseMessage("❌ Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="h-auto w-full">
      {/* Left Image */}
      <div className="w-full lg:h-[250px] h-[300px]">
        <img
          src={data?.image || CommonImage}
          alt="Project View"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-full bg-[#666666] text-white flex items-center justify-center py-4 md:py-8 px-6 md:px-8 pr-6">
        <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
          <h2 className="text-2xl text-center font-bold mb-2">Book A Site Visit</h2>
          <p className="text-sm mb-8 text-center">Enter Your Details To Get Callback</p>

          <div className="mb-8">
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b border-white bg-transparent outline-none placeholder-white text-white"
              placeholder="NAME*"
              required
            />
          </div>

          <div className="mb-8">
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-white bg-transparent outline-none placeholder-white text-white"
              placeholder="EMAIL*"
              required
            />
          </div>

          <div className="mb-8">
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full border-b border-white bg-transparent outline-none text-white ${!formData.date ? "text-transparent" : ""}`}
              required
            />
          </div>

          <div className="mb-8">
            <input
              id="contact"
              type="tel"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border-b border-white bg-transparent outline-none placeholder-white text-white"
              placeholder="CONTACT*"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black py-2.5 px-10 mx-auto flex justify-center font-semibold tracking-wide"
          >
            {isSubmitting ? "Submitting..." : "SUBMIT"}
          </button>

          {responseMessage && (
            <p className="mt-4 text-center text-sm">{responseMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default BlogContact;
