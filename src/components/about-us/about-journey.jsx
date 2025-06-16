import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import Aboutvideo from "@/assets/images/kgk-about-vidoe.png";
import bgImage from "@/assets/images/kgk-about-bg.png";


const journeyData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Groundbreaking Ceremony",
    description: "KGK Realty (INDIA) Limited, an extension of the century-old KGK Group, carries forward a legacy of trust, integrity, and excellence in Jaipur's real estate development."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Construction Progress",
    description: "Rooted in a culture of precision and innovation, we strive to exceed expectations while embracing transparency and sustainable development across all our projects."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    title: "Project Completion",
    description: "Each project exemplifies our commitment to delivering quality lifestyle landmarks that redefine industry living and sustainable excellence in modern architecture."
  }
];

const moralCodeData = [
  {
    title: " Principles That Define Us ",
    description: " KGK Realty (INDIA) Limited is built on a foundation of trust, transparency, and tenacity. Dedicated to becoming one of the most respected names in real estate, the company embraces continuous innovation and learning to maintain excellence across all projects. ",
    description2: " With a commitment to ethical practices, KGK Realty invests in advanced systems, ongoing team development, and elevated service standards to ensure exceptional customer experiences. Integrity and professionalism remain at the core of the company’s operations, with every team member dedicated to upholding the highest standards in the industry. ",
    image: Aboutvideo,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
];

const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
        >
          <X className="w-5 h-5 text-gray-800" />
        </button>

        {/* Video container */}
        <div className="aspect-video">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Title */}
        {title && (
          <div className="p-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

const AboutJourney = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % journeyData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + journeyData.length) % journeyData.length);
  };

  const openVideoModal = (item) => {
    setSelectedVideo(item);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="bg-white relative ">
      <section className="bg-[#77787a] pt-12 w-full">

        <div className="flex items-center justify-center mb-96">
          <div className="flex-grow h-px bg-white mr-6"></div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white whitespace-nowrap">
            The Journey So Far
          </h2>
          <div className="flex-grow h-px bg-white ml-6"></div>
        </div>

        <div className=" absolute top-32 w-full z-20">

          <div className="lg:max-w-5xl max-w-[24rem] mx-auto">
            <div className="relative">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={journeyData[currentSlide].image}
                  alt={journeyData[currentSlide].title}
                  className="w-full h-full object-cover"
                />

              
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all z-10"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all z-10"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
              </div>

            </div>
          </div>
        </div>

        <div className="bg-white relative z-10 px-8 md:px-12 w-full  mt-0 lg:pt-48 pt-20 pb-4">
          <div className='max-w-5xl mx-auto'>
            <div className="text-gray-700 text-sm md:text-base text-center leading-relaxed space-y-4">
              <p>
              KGK Realty (INDIA) Limited, an extension of the century-old KGK Group, carries forward a legacy of trust, integrity, and excellence. Established in 2010, the company has emerged as a distinguished real estate developer, specializing in premium properties across industrial, residential, commercial, and hospitality sectors.
</p>
              <p>
             Rooted in the values of inclusivity and diversity, KGK Realty reflects the principles of its parent group while embracing innovation and sustainable growth. With a strategic vision for the future, the company remains committed to delivering high-quality developments that redefine modern living and business landscapes.
              </p>
            
            </div>
          </div>
        </div>

      </section>
<section
  className="bg-white lg:pt-12 lg:pb-36 bg-contain bg-no-repeat"
  style={{ backgroundImage: `url(${bgImage})`,backgroundPosition: '0px 510px' }}>
        <div className="flex items-center mb-8 px-5 lg:px-0 lg:pl-[5.7rem] ">
          <h2 className="lg:text-4xl text-2xl text-dark mr-6">
  Principles That Define Us
          </h2>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        <div className="max-w-7xl mx-auto px-5">


          <div className="space-y-12">
            {moralCodeData.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                <div className="w-full lg:w-5/12">

                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {item.description2}
                  </p>
                </div>

                <div className="w-full lg:w-7/12 lg:mb-0 mb-5">
                  <div
                    className="relative aspect-video lg:min-h-[470px] w-full overflow-hidden cursor-pointer"
                    onClick={() => openVideoModal(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white bg-opacity-90 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all">
                        <Play className="w-5 h-5 text-gray-800 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeVideoModal}
        videoUrl={selectedVideo?.videoUrl}
        title={selectedVideo?.title}
      />

    </div>
  );
};

export default AboutJourney;