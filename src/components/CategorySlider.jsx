import React, { useState } from 'react';

// Import images and icons
import cat1 from '@/assets/images/cat-1.jpg';
import cat2 from '@/assets/images/cat-2.jpg';
import cat3 from '@/assets/images/cat-3.jpg';
import cat4 from '@/assets/images/cat-4.jpg';
import cat5 from '@/assets/images/cat-5.jpg';

import icon1 from '@/assets/images/value-proposition.png';
import icon2 from '@/assets/images/medal.png';
import icon3 from '@/assets/images/skyline.png';
import icon4 from '@/assets/images/location-pin.png';
import icon5 from '@/assets/images/talent.png';

const categories = [
  {
    title: 'Smart Value Creation',
    image: cat1,
    subtitle: 'Strategic investments with enduring returns, blending quality and affordability.',
    icon: icon1,
  },
  {
    title: 'Uncompromising Quality',
    image: cat2,
    subtitle: 'Crafted with precision and premium materials to create timeless living experiences.',
    icon: icon2,
  },
  {
    title: 'Inspired Design',
    image: cat3,
    subtitle: 'Luxury reimagined through innovative design, practical functionality, and sustainable vision.',
    icon: icon3,
  },
  {
    title: 'Strategic Locations',
    image: cat4,
    subtitle: 'Carefully chosen sites that enrich life through accessibility, convenience, and community.',
    icon: icon4,
  },
  {
    title: 'Human-Centered Approach',
    image: cat5,
    subtitle: 'Homes built around your lifestyle, priorities, and aspirations.',
    icon: icon5,
  },
];

const CategorySlider = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <section className="lg:py-12 lg:pt-24 pt-28 py-6 bg-white relative overflow-visible">
      <div className="mx-auto px-4 lg:px-0 lg:pl-12 flex flex-col lg:flex-row justify-stretch gap-4">
        <div className="w-full lg:w-2/3 overflow-visible relative lg:order-1 order-2">
          <div className="overflow-visible pt-4 lg:pl-16">
            {/* Desktop View */}
            <div className="hidden md:flex gap-3 justify-center items-end">
              {categories.map((cat, index) => {
                const isActive = hoverIndex !== null ? index === hoverIndex : index === activeIndex;

                let widthClass, heightClass, marginClass, zIndexClass;

                if (isActive) {
                  widthClass = 'w-[36%]';
                  heightClass = 'h-[22.5rem]';
                  marginClass = '-mt-16';
                  zIndexClass = 'z-30';
                } else {
                  widthClass = 'w-[16%]';
                  heightClass = 'h-80';
                  marginClass = 'mt-0';
                  zIndexClass = 'z-10';
                }

                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all duration-700 ease-in-out cursor-pointer ${widthClass} ${marginClass} ${zIndexClass} transform-gpu will-change-transform relative`}
                  >
                    <div
                      className={`relative ${heightClass} shadow-2xl group overflow-hidden transition-all duration-700 ease-in-out`}
                      style={{
                        transform: isActive ? 'scale(1.02) translateY(-12px)' : 'scale(1) translateY(0px)',
                        boxShadow: isActive
                          ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                          : '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                        transitionDelay: isActive ? '100ms' : '0ms',
                      }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
                        style={{
                          filter: isActive
                            ? 'brightness(0.75) contrast(1.1) saturate(1.05)'
                            : 'brightness(0.65) contrast(1) saturate(0.9)',
                          transform: isActive ? 'scale(1.05)' : 'scale(1)',
                          transitionDelay: isActive ? '150ms' : '0ms',
                        }}
                      />

                      <div
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${isActive
                            ? 'bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100'
                            : 'bg-gradient-to-t from-black/70 via-black/40 to-black/20 opacity-90'
                          }`}
                        style={{ transitionDelay: isActive ? '200ms' : '0ms' }}
                      />

                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-white/8 to-transparent transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                        style={{ transitionDelay: isActive ? '250ms' : '0ms' }}
                      />

                      <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center p-4">
                        <div className="transition-all duration-700 ease-in-out">
                          <div
                            className={`mb-3 transition-all transform ${isActive ? 'scale-110 translate-y-0' : 'scale-95 translate-y-2'
                              }`}
                            style={{ transitionDelay: isActive ? '300ms' : '0ms' }}
                          >
                            <div
                              className={`w-10 h-10 flex items-center justify-center mx-auto ${isActive ? 'shadow-lg w-12 h-12' : 'w-10 h-10'
                                }`}
                            >
                              <img
                                src={cat.icon}
                                alt={cat.title}
                                className={`transition-all duration-700 ease-in-out ${isActive ? 'w-10 h-10 opacity-100' : 'w-8 h-8 opacity-80'
                                  }`}
                                style={{ transitionDelay: isActive ? '350ms' : '0ms' }}
                              />
                            </div>
                          </div>

                          <div
                            className={`font-bold transition-all duration-700 ease-in-out ${isActive ? 'text-lg mb-3' : 'text-sm mb-2'
                              }`}
                            style={{ transitionDelay: isActive ? '400ms' : '0ms' }}
                          >
                            {cat.title}
                          </div>

                          <div
                            className={`text-xs leading-relaxed text-gray-200 transition-all overflow-hidden ${isActive
                                ? 'opacity-100 max-h-24 translate-y-0 scale-100'
                                : 'opacity-0 max-h-0 translate-y-4 scale-95'
                              }`}
                            style={{ transitionDelay: isActive ? '450ms' : '0ms' }}
                          >
                            {cat.subtitle}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`absolute inset-0 rounded-lg transition-all duration-700 ease-in-out ${isActive ? 'border-white/50 opacity-100' : 'border-white/20 opacity-0'
                          }`}
                        style={{ transitionDelay: isActive ? '500ms' : '0ms' }}
                      />

                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 transition-all duration-700 ease-in-out ${isActive ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
                          }`}
                        style={{ transitionDelay: isActive ? '550ms' : '0ms' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile View - Horizontal Scroll Slider */}
            <div className="md:hidden overflow-x-auto snap-x snap-mandatory px-1">
              <div className="flex gap-4 w-max">
                {categories.map((cat, index) => (
                  <div
                    key={index}
                    className="snap-center shrink-0 w-72 h-96 rounded-xl shadow-2xl overflow-hidden relative bg-white"
                  >
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-300 ease-out scale-105"
                      style={{
                        filter: 'brightness(0.75) contrast(1.1) saturate(1.05)',
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

                    <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center p-6 z-10">
                      <div className="mb-4">
                        <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                          <img src={cat.icon} alt={cat.title} className="w-10 h-10" />
                        </div>
                      </div>
                      <div className="text-lg font-bold mb-2">{cat.title}</div>
                      <div className="text-xs leading-relaxed text-gray-200">{cat.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Text Block */}
        <div className="lg:w-1/3 flex items-center lg:order-2 order-1 ">
          <div className="flex items-center border-t-2 hidden lg:block border-gray-300 text-gray-800 lg:text-4xl text-2xl pt-8 transition-all duration-300 ease-out">
            Crafting quality <br /> spaces with <br /> innovation since <br /> 13+ Years
          </div>
          <div className="flex items-center border-t-2 lg:hidden block border-gray-300 text-gray-800 lg:text-4xl text-2xl pt-8 transition-all duration-300 ease-out">
            Crafting quality spaces with innovation since 13+ Years
          </div>

        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
