import React, { useRef, useState, useEffect } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const NewLaunches = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/homepage`);
        const items = res.data?.new_launches;
        if (Array.isArray(items)) {
          setLaunches(items);
        }
      } catch (error) {
        console.error('Error fetching new launches:', error);
      }
    };

    fetchLaunches();
  }, []);

  return (
    <section className="bg-[#77787a] text-white py-16">
      <div className="flex items-center justify-center mb-8">
        <div className="flex-grow border-t border-white mr-12"></div>
        <h2 className="text-2xl lg:text-4xl font-light whitespace-nowrap">New Launches</h2>
        <div className="flex-grow border-t border-white ml-12"></div>
      </div>

      <div className="relative">
        <div
          ref={prevRef}
          className="absolute top-[38%] left-[34%] -translate-y-1/2 -translate-x-[calc(50%+230px)] w-10 h-10 flex items-center justify-center bg-white rounded-full shadow cursor-pointer z-10"
        >
          <span className="text-black text-xl">&#10094;</span>
        </div>

        <div
          ref={nextRef}
          className="absolute top-[38%] right-[34%] -translate-y-1/2 translate-x-[calc(50%+230px)] w-10 h-10 flex items-center justify-center bg-white rounded-full shadow cursor-pointer z-10"
        >
          <span className="text-black text-xl">&#10095;</span>
        </div>

        {/* ✅ Only render Swiper when data is ready */}
        {launches.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1.5}
            spaceBetween={50}
            loop
            centeredSlides
            pagination={{
              clickable: true,
              el: '.custom-pagination',
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
              setActiveIndex(swiper.realIndex);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1.5,
              },
            }}
            className="px-4"
          >
            {launches.map((launch, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img
                    src={launch.image}
                    alt={launch.title}
                    className="w-full h-[40vh] md:h-[60vh] min-h-60 md:min-h-68 object-cover rounded-md"
                  />
                  {activeIndex === index && (
                    <div className="flex flex-col md:flex-row md:justify-between items-center mt-6">
                      <div>
                        <h3 className="text-2xl font-nexa font-bold">{launch.title}</h3>
                        <p className="text-lg lg:mb-0 mb-5">{launch.location}</p>
                      </div>
                      <button className=" bg-white text-gray-800  w-fit px-14 h-fit text-lg py-2 hover:bg-gray-100 transition hover:border-secondary hover:bg-secondary hover:text-white font-semibold">
                        Know More
                      </button>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="custom-pagination flex justify-center mt-10 space-x-2"></div>
      </div>
    </section>
  );
};

export default NewLaunches;
