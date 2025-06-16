import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import management from "@/assets/images/about-us-main.png";

const AboutLeadership = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const leaders = [
  
     {
      name: "Navrattan Kothari",
      title: "Patriarch",
      description1:
        "Since 1962, Mr. Navrattan Kothari has led KGK to global prominence, transforming it into an industry leader with cutting-edge infrastructure and world-class standards. His visionary leadership has driven the group’s expansion across diverse markets, establishing KGK as a name synonymous with trust, integrity, and excellence. ",
       description2:" Under his guidance, the company continues to uphold its core values of ethical business practices and corporate responsibility.",
      image: management,
      socialLinks: [
        { icon: Facebook, url: "https://facebook.com/navrattankothari" },
        { icon: Twitter, url: "https://twitter.com/navrattankothari" },
        { icon: Instagram, url: "https://instagram.com/navrattankothari" },
        { icon: Linkedin, url: "https://linkedin.com/in/navrattankothari" },
      ],
    },

     {
      name: "Sanjay Kothari",
      title: "Vice Chairman",
              
      description1: "Operating from Hong Kong, Sanjay Kothari has been instrumental in KGK’s expansion into new markets. He has played a pivotal role in overseeing the entire gems and jewelry spectrum—from mining to retail—while also driving initiatives in real estate and IT. His leadership has contributed to advancements in diamond manufacturing, global sales, and corporate identity, reinforcing KGK’s standing as a diversified global enterprise.",
    
      image: management,
      socialLinks: [
        { icon: Facebook, url: "https://facebook.com/navrattankothari" },
        { icon: Twitter, url: "https://twitter.com/navrattankothari" },
        { icon: Instagram, url: "https://instagram.com/navrattankothari" },
        { icon: Linkedin, url: "https://linkedin.com/in/navrattankothari" },
      ],
    },
  
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % leaders.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + leaders.length) % leaders.length);
  };

  const currentLeader = leaders[currentSlide];

  return (
    <section className="w-full lg:py-16 py-10 lg:px-0 px-2 bg-[#e6e6e6]">
      <div>
        <div className="text-center lg:mb-12 mb-6">
          <h1 className="text-2xl md:text-[43px] font-semibold text-[#966326] mb-3 leading-[45px]">
            VISIONARY LEADERSHIP,
            <br />
            TIMELESS LEGACY
          </h1>
          <p className="text-gray-600 text-xl font-light lg:mb-8 mb-4">
         Inspiring Progress Across Industries 
          </p>
        </div>

        <div className="lg:pl-[6rem] px-6 lg:px-0 pr-0">
          <div className="flex items-center mb-3">
            <h2 className="lg:text-[42px] text-2xl text-dark mr-6">
              {currentLeader.name}
            </h2>
            <div className="h-px bg-customGray1 flex-1"></div>
          </div>

          <p className="text-primary uppercase lg:text-lg mb-2 mt-2 text-sm tracking-[2px]">
            {currentLeader.title}
          </p>
        </div>

        <div className="px-4 lg:px-[6rem]">
          <div className="overflow-hidden">
            <div className="flex flex-col items-center lg:flex-row lg:gap-20 gap-4">
              {/* Left Content */}
              <div className="lg:w-1/2 py-4 lg:py-6 flex flex-col justify-center">
                <div className="lg:mb-8 mb-2 space-y-4">
                  <p className="text-black leading-relaxed text-justify text-sm lg:text-lg lg:mb-3 mb-1">
                    {currentLeader.description1}
                  </p>
                  <p className="text-black leading-relaxed text-justify font-semibold text-sm lg:w-[80%] lg:text-lg">
                    {currentLeader.description2}
                  </p>
                </div>

                {/* Social Icons (clickable links) */}
                <div className="flex space-x-3 bg-white w-fit rounded-full px-3 py-1.5">
                  {currentLeader.socialLinks.map(({ icon: Icon, url }, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 border border-[#c3ad92] text-[#c3ad92] rounded-full flex items-center justify-center hover:bg-[#D2691E] hover:text-white transition-all duration-300 cursor-pointer group"
                    >
                      <Icon size={18} className="group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:w-1/2 relative">
                <div className="lg:h-64 lg:h-full flex items-center justify-center lg:p-0 p-0">
                  <div className="relative">
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={currentLeader.image}
                        alt={`Photo of ${currentLeader.name}`}
                        className="w-full h-full lg:object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 hidden items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                            <svg
                              className="w-10 h-10 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-500 text-sm font-medium">
                            {currentLeader.name}
                          </span>
                          <p className="text-gray-400 text-xs mt-1">
                            Photo Coming Soon
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end lg:mr-8 mt-10 space-x-4">
            <button
              onClick={prevSlide}
              className="lg:w-12 lg:h-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#D2691E] hover:text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={leaders.length <= 1}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="lg:w-12 lg:h-12 w-10 h-10 bg-[#D2691E] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#B8631C] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={leaders.length <= 1}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLeadership;
