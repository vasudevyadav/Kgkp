import React from 'react';
import FloatingActionButton from '@/components/FloatingActionButton';
import { Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import heroImage1 from '@/assets/images/hero.webp';
import heroImage2 from '@/assets/images/hero.webp';
import heroImage3 from '@/assets/images/hero.webp';

import SearchBar from '@/components/SearchBar';

const HeroSection = () => {
  return (
    <section className="hero-section relative lg:h-[90vh] h-[71vh] min-h-[500px] mb-0 lg:mb-12 relative">

      <Swiper
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          reverseDirection: false,
          waitForTransition: true,
        }}
        pagination={{
          clickable: true,
          type: 'bullets',
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet" data-index="${index}">
              ${String(index + 1).padStart(2, '0')}
            </span>`;
          }
        }}
        modules={[Pagination, A11y, Autoplay]}
        className="h-full relative"
        allowTouchMove={true}
        grabCursor={true}
        onSlideChange={(swiper) => {
          console.log('Slide changed to:', swiper.activeIndex);
        }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="w-full h-full bg-cover bg-center relative" style={{ backgroundImage: `url(${heroImage1})` }}>
            <div className="absolute inset-0 bg-black/60" />

          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-full bg-cover bg-center relative" style={{ backgroundImage: `url(${heroImage2})` }}>
            <div className="absolute inset-0 bg-black/60" />

          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-full bg-cover bg-center relative" style={{ backgroundImage: `url(${heroImage3})` }}>
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 flex items-center justify-center z-10 text-center text-white px-4 flex-col">

            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="mt-6 w-full max-w-5xl mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">

        <div className="absolute inset-0 flex items-center justify-center z-10 text-center text-white px-4 flex-col">
          <div>
            <h1 className="text-2xl md:text-[42px] font-light lg:mb-10 mb-4">Elevated Living, Redefined</h1>
            <h2 className="text-2xl md:text-[42px] font-light lg:mb-10 mb-4">
              Where Modern Luxury Meets Timeless Comfort.
            </h2>
          </div>
          {/* <div className="mt-6 w-full max-w-4xl mx-auto lg:hidden block">
            <SearchBar />
          </div> */}
        </div>

      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
      <div className='block'>
        <div className="absolute lg:-bottom-10 -bottom-20 left-[50%]  lg:w-[60%] w-full translate-x-[-50%] flex items-center justify-center z-10 text-center text-white px-4 flex-col">

          <div className=" w-full max-w-4xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
