// src/pages/blog-details.js
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import HeroSectionMain from "@/components/common/HeroSectionMain";

import LetestBlog from '../components/blog/related-blog';
import BlogRight from '../components/blog/blog-right';
import BlogContact from '../components/blog/blog-contact';
import BlogDetailsContent from '../components/blog-details/BlogDetailsContent';
import RelatedBlog from '../components/blog/related-blog';

const BlogDetails = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]); // This ensures it scrolls to top whenever the slug changes

  return (
    <MainLayout title="Blog Details">
      <HeroSectionMain title="Blog Details" />
      <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto py-12 px-5">
        <div className="lg:col-span-8">
          <BlogDetailsContent slug={slug} /> 
          <RelatedBlog />
        </div>
        <div className="lg:col-span-4">
          <BlogRight />
          <BlogContact />
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogDetails;
