import React, { useEffect, useState } from 'react';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ITEMS_PER_PAGE = 6;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

const LetestBlog = () => {
  const [blogData, setBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/latest-posts`);
        if (Array.isArray(response.data.latestPosts)) {
          setBlogData(response.data.latestPosts);
        } else {
          console.error('Unexpected API response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBlogs = blogData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getImageUrl = (image) => {
    if (typeof image === 'string') {
      return image.startsWith('http') ? image : `${IMAGE_BASE_URL}${image}`;
    }
    return '/fallback.jpg'; // optional fallback image
  };

  return (
    <section className="py-8">
      <div className="mb-12">
        <h2 className="lg:text-4xl text-2xl text-black mb-4">Latest Blogs</h2>
        <div className="h-px bg-customGray1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
        {currentBlogs.map((blog) => (
          <div key={blog.id}>
            <img
              src={getImageUrl(blog.image)}
              alt={blog.title || 'Blog Image'}
              className="w-full h-64 object-cover"
            />
            <div className="py-8 px-3 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight line-clamp-2">
                {blog.title}
              </h2>
              <div className="h-[1px] bg-[#c1c1c1] w-full mb-6" />
              <p className="text-gray-700 text-base leading-6 mb-4 line-clamp-3">
                {blog.description1}
              </p>
              <div className="flex justify-center items-center gap-6 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-1 text-black">
                  <User size={14} />
                  <span>{blog.author_name || 'Admin'}</span>
                </div>
                <div className="flex items-center gap-1 text-black">
                  <Calendar size={14} />
                  <span>{blog.date}</span>
                </div>
              </div>
              <Link
                to={`/blog/${blog.slug}`}
                className="inline-block bg-[#C78B36] text-white px-8 py-2 text-base font-medium hover:bg-[#a9742d] transition"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`w-9 h-9 flex items-center justify-center text-2xl rounded-full border border-[#A77A3A] ${
              currentPage === 1
                ? 'text-[#A77A3A] opacity-50 cursor-not-allowed'
                : 'text-[#A77A3A]'
            }`}
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            const isActive = currentPage === pageNum;

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 flex items-center justify-center rounded-full border border-[#A77A3A] ${
                  isActive
                    ? 'text-[#7B4F1D] font-bold'
                    : 'text-[#000000] hover:bg-[#f5f5f5]'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`w-9 h-9 flex items-center justify-center rounded-full text-2xl border border-[#A77A3A] ${
              currentPage === totalPages
                ? 'text-[#A77A3A] opacity-50 cursor-not-allowed'
                : 'bg-[#7B4F1D] text-white'
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </section>
  );
};

export default LetestBlog;
