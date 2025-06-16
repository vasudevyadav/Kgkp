import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, User, Eye } from 'lucide-react';
import whatsapp from '@/assets/images/whatsapp.png';
import linkedin from '@/assets/images/linkedin.png';
import pinterest from '@/assets/images/pinterest.png';
import Facebook from '@/assets/images/facebook.png';

const BlogDetailsContent = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/blog/${slug}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    if (blog) {
      const fetchAuthorImage = async () => {
        try {
          const res = await fetch('https://randomuser.me/api/');
          const data = await res.json();
          setAuthorImage(data.results[0].picture.medium);
        } catch (error) {
          setAuthorImage(null);
        }
      };
      fetchAuthorImage();
    }
  }, [blog]);

  if (!blog) {
    return <p className="text-center py-20 text-lg text-gray-500">Loading blog...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-6">{blog.title}</h1>

      <div className="flex gap-4 text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-1"><User size={16} />{blog.author}</div>
        <div className="flex items-center gap-1"><Calendar size={16} />{blog.date}</div>
        <div className="flex items-center gap-1"><Eye size={16} />{blog.views} views</div>
      </div>

      <img src={blog.image} alt={blog.title} className="w-full h-[380px] object-cover mb-6" />

      <div className="space-y-4 mb-12">
        {blog.content?.map((p, i) => p && (
          <p key={i} className="text-base text-gray-700 leading-7">{p}</p>
        ))}
         {blog.content?.map((p, i) => p && (
          <p key={i} className="text-base text-gray-700 leading-7">{p}</p>
        ))}
      </div>

      {blog.tableOfContents?.length > 0 && (
        <div className="bg-gray-100 rounded-xl w-fit p-6 mb-10">
          <h3 className="text-2xl text-gray-800 mb-4">Table of Contents</h3>
          <ol className="list-decimal pl-4 space-y-2 text-sm text-gray-700">
            {blog.tableOfContents.map((item, idx) => (
              <li key={idx}><a href={`#section-${idx}`}>{item}</a></li>
            ))}
          </ol>
        </div>
      )}

      {blog.sections?.map((section, index) => (
        <div key={index} id={`section-${index}`} className="mb-10 ">
          <h2 className="text-2xl  lg:text-3xl font-medium text-gray-900 mb-3">{section.title}</h2>
          {Array.isArray(section.content) ? (
            section.content.map((p, i) => <p key={i} className="text-gray-700 mb-2">{p}</p>)
          ) : (
            <p className="text-gray-700 lg:mb-8">{section.content}</p>
          )}
          <hr />
        </div>
      ))}

      {blog.conclusion && (
        <div className="bg-gray-100 p-6 rounded-xl mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Conclusion</h2>
          <p className="text-gray-700">{blog.conclusion}</p>
        </div>
      )}

      <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-t pt-6">
      <div>
          <h4 className="font-semibold text-xl text-gray-800 mb-3">Tags:</h4>
          <div className="flex flex-wrap gap-4">
            {/* {blog.tags?.map((tag, idx) => (
              <span key={idx} className="bg-gray-200 text-sm px-3 py-1 rounded">{tag}</span>
            ))} */}
            <span className="border-2 text-base px-6 py-2 rounded-md"> Residential Projects </span>
            <span className="border-2 text-base px-6 py-2 rounded-md"> Best Projects Jaipur </span>
          </div>
        </div>

        <div>
          <h4 className=" text-xl  font-semibold text-gray-800 mb-2"> Share This Post: </h4>
          <div className="flex gap-3">
            <img src={Facebook} className="w-6 h-6 cursor-pointer" />
            <img src={linkedin} className="w-6 h-6 cursor-pointer" />
            <img src={pinterest} className="w-6 h-6 cursor-pointer" />
            <img src={whatsapp} className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-10">
        {authorImage ? (
          <img src={authorImage} className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
        )}
        <div>
          <p className=" text-xl  font-semibold text-gray-900 mb-2">Author: {blog.author}</p>
          <p className="text-sm text-gray-500">{blog.date}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsContent;
