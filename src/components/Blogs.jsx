import React, { useEffect, useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";

import defaultBlogImage from "@/assets/images/blog1.jpg";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs`);
        if (response.data && Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          console.error("Invalid blog response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section
      className="lg:py-16 py-10"
      style={{ background: "linear-gradient(to bottom, #e6e6e6 60%, #ffffff 40%)" }}
    >
      <div className="lg:pr-[6rem] px-6 lg:px-0 pl-0 mb-4">
        <div className="flex items-center lg:justify-end mb-2">
          <div className="h-px bg-customGray1 flex-1 hidden sm:block"></div>
          <p className="text-primary uppercase lg:text-base text-sm tracking-[2px] lg:ml-4 ml-6">
            Your Source for Real Estate Insights
          </p>
        </div>
      </div>

      <div className="relative container-fluid">
        <h2 className="text-left lg:text-end lg:text-4xl text-2xl text-dark mb-8">Blogs</h2>

        <Swiper
          modules={[Pagination]}
          slidesPerView={1.2}
          spaceBetween={20}
          style={{ minHeight: "100%" }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination2",
          }}
          className="pb-8"
        >
          {blogs.map((blog, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <div className="h-full flex flex-col">
                <div className="bg-white h-full rounded-xl overflow-hidden shadow-sm border flex flex-col">
                  <img
                    src={blog.image || defaultBlogImage}
                    alt={blog.title}
                    className="w-full h-56 object-cover rounded-xl"
                  />
                  <div className="py-8 px-5 flex flex-col flex-1">
                    <div className="flex-1">
                      <h3 className="text-md font-semibold mb-3 leading-snug">{blog.title}</h3>
                      <p className="text-base text-gray-500">
                        {blog.excerpt || blog.description || "No description available."}
                      </p>
                    </div>
                    <button className="mt-6 self-start border border-black text-black text-base px-8 py-2 hover:bg-black hover:text-white transition hover:border-secondary hover:bg-secondary hover:text-white">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination2 flex justify-center mt-4 space-x-2" />
      </div>
    </section>
  );
};

export default Blogs;
