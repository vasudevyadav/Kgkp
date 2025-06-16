import React from "react";
import {
  FaBus,
  FaBuilding,
  FaShoppingCart,
  FaSchool,
  FaDumbbell,
  FaChild,
  FaFilm,
  FaGlassCheers,
} from "react-icons/fa";

// Mapping for icons based on lowercase label
const iconMap = {
  transportation: <FaBus />,
  "commercial hub": <FaBuilding />,
  "shopping centre": <FaShoppingCart />,
  "educational hub": <FaSchool />,
  gym: <FaDumbbell />,
  "kids play area": <FaChild />,
  cinema: <FaFilm />,
  "club house": <FaGlassCheers />,
};

const LocationExcellence = ({ data = {} }) => {
  const {
    subHeading = "A Landmark Address for Refined Urban Living",
    mapImage,
    highlights = [],
  } = data;

  // Get icon based on label
  const getIconComponent = (label) => {
    const key = label?.toLowerCase()?.trim();
    return iconMap[key] || <FaBuilding />;
  };

  return (
    <section className="w-full px-6 lg:px-20 bg-white">
      <div className="flex flex-col lg:flex-row lg:gap-16 gap-8 items-start">
        {/* Map Image */}
        <div className="w-full lg:w-5/12">
          <img
            src={mapImage}
            alt="Location Map"
            className="w-full lg:h-[27.5rem] object-cover rounded-md"
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-7/12">
          <p className="text-sm text-[#b2784a] mb-3 lg:mt-6 uppercase tracking-widest">
            {subHeading}
          </p>
          <h2 className="text-2xl lg:text-4xl font-medium text-gray-800 mb-6">
            Location Excellence
          </h2>

          {highlights.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 flex-shrink-0 flex justify-center items-center bg-[#b2784a] text-white text-2xl rounded-full">
                    {getIconComponent(item.label)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-600 leading-snug">
                      {item.distance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Location information is not available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationExcellence;
