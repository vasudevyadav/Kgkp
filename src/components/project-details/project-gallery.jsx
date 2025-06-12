import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectGallery = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const images = data?.images || [];

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen]);

  if (images.length < 6) return null;

  return (
    <>
      <section className="w-full lg:py-16 py-6 bg-white">
        <div className="text-center mb-6">
          <p className="text-amber-700 uppercase text-sm tracking-widest mb-6 bg-white inline-block px-10 py-2">
            Lorem ipsum dolor sit amet
          </p>

          <div className="bg-[#e8e8e8] w-full h-[2px] rounded-full mb-10 relative">
            <p className="text-2xl lg:text-4xl font-light text-gray-800 absolute -top-6 left-1/2 -translate-x-1/2 bg-white lg:px-10 px-2 py-2">
              Project Gallery
            </p>
          </div>

          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed px-5 lg:px-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
            gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
          </p>
        </div>

        <div className="px-4 py-6 md:px-12">
          <div className="mx-auto">
            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div onClick={() => openModal(0)} className="col-span-8 h-[220px] md:h-[450px] rounded-md overflow-hidden block cursor-pointer hover:shadow-lg transition-shadow">
                  <img src={images[0].thumbUrl} alt="Gallery 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div onClick={() => openModal(1)} className="col-span-4 h-[220px] md:h-[450px] rounded-md overflow-hidden block cursor-pointer hover:shadow-lg transition-shadow">
                  <img src={images[1].thumbUrl} alt="Gallery 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 h-[250px] md:h-[450px]">
                <div onClick={() => openModal(2)} className="row-span-2 rounded-md overflow-hidden block cursor-pointer hover:shadow-lg transition-shadow">
                  <img src={images[2].thumbUrl} alt="Gallery 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div onClick={() => openModal(3)} className="row-span-1 rounded-md overflow-hidden block cursor-pointer hover:shadow-lg transition-shadow">
                  <img src={images[3].thumbUrl} alt="Gallery 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div onClick={() => openModal(4)} className="row-span-2 rounded-md overflow-hidden block cursor-pointer hover:shadow-lg transition-shadow">
                  <img src={images[4].thumbUrl} alt="Gallery 5" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div onClick={() => openModal(5)} className="row-start-2 col-start-2 rounded-md overflow-hidden block cursor-pointer hover:shadow-lg transition-shadow">
                  <img src={images[5].thumbUrl} alt="Gallery 6" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="block md:hidden">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[0, 1].map((i) => (
                  <div key={i} onClick={() => openModal(i)} className="h-[180px] rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <img src={images[i].thumbUrl} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>

              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showMore ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[2, 3].map((i) => (
                    <div key={i} onClick={() => openModal(i)} className="h-[180px] rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                      <img src={images[i].thumbUrl} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[4, 5].map((i) => (
                    <div key={i} onClick={() => openModal(i)} className="h-[180px] rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                      <img src={images[i].thumbUrl} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={toggleShowMore}
                  className="border border-amber-700 text-amber-700 text-sm px-6 py-2 hover:bg-amber-700 hover:text-white transition-colors duration-300 font-medium tracking-wide rounded-md"
                >
                  {showMore ? 'SHOW LESS' : 'SHOW MORE'}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button className="border border-black text-sm px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300 font-medium tracking-wide">
              BOOK A SITE VISIT
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" onClick={closeModal}>
          <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10">
            <X size={28} className="md:w-8 md:h-8" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10">
            <ChevronLeft size={32} className="md:w-12 md:h-12" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10">
            <ChevronRight size={32} className="md:w-12 md:h-12" />
          </button>

          <div className="max-w-full max-h-screen p-2 md:p-4" onClick={(e) => e.stopPropagation()}>
            <img src={images[currentImageIndex].fullUrl} alt={`Gallery ${currentImageIndex + 1}`} className="max-w-full max-h-full object-contain" />
          </div>

          <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex space-x-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); goToImage(index); }}
                className={`w-8 h-8 md:w-12 md:h-12 rounded-md overflow-hidden border-2 transition-all ${
                  index === currentImageIndex ? 'border-white' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={image.thumbUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectGallery;
