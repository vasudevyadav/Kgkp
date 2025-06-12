import React, { useEffect, useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogRight = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [popularPosts, setPopularPosts] = useState([]);
  const [tags, setTags] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

  useEffect(() => {
    // Fetch Tags
    axios
      .get(`${API_BASE_URL}/tags`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTags(res.data);
        } else if (Array.isArray(res.data?.data)) {
          setTags(res.data.data);
        } else {
          console.warn('Unexpected tags format:', res.data);
        }
      })
      .catch((err) => console.error('Error fetching tags:', err));

    // Fetch Popular Posts
    axios
      .get(`${API_BASE_URL}/popular-posts`)
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setPopularPosts(data);
        } else if (Array.isArray(data?.popularPosts)) {
          setPopularPosts(data.popularPosts);
        } else {
          console.warn('Unexpected popular posts format:', data);
        }
      })
      .catch((err) => console.error('Error fetching popular posts:', err));
  }, [API_BASE_URL]);

  const filteredPosts = Array.isArray(popularPosts)
    ? popularPosts.filter((post) =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <aside className="w-full">
      {/* Search Input */}
      <div className="relative mb-10">
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 pr-12 rounded-md text-sm"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#C78B36] text-white px-3 py-2 rounded-md">
          <Search size={18} />
        </button>
      </div>

      {/* Tags Section */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-black mb-6">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <button
                key={tag.id}
                className="border border-gray-300 px-4 py-1.5 text-sm rounded text-gray-800 hover:bg-gray-100"
              >
                {tag.name}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500">No tags found.</p>
          )}
        </div>
      </div>

      {/* Popular Posts Section */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-black mb-6">Popular Posts</h3>
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.id}
                className="flex items-center gap-4"
              >
                <img
                  src={
                    post.image?.startsWith('http')
                      ? post.image
                      : `${IMAGE_BASE_URL}${post.image}`
                  }
                  alt={post.title}
                  className="w-24 h-16 object-cover rounded-sm"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">No posts found.</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default BlogRight;
