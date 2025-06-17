import React from "react";
import AarohanJaipur from "@/assets/images/aarohan-Jaipur.png";

const AboutDetails = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full py-8 bg-white">
      <div className="w-full px-6 lg:px-16 bg-white">
        <div className="flex flex-col lg:flex-row justify-between lg:gap-24 gap-5 mt-2 lg:mt-0 mb-8 lg:px-8">
          <div className="lg:w-7/12 w-full">
            {/* Breadcrumb */}
            {data.breadcrumb && (
              <div className="text-base text-gray-500 mb-5 lg:mb-10">
                {Array.isArray(data.breadcrumb) ? data.breadcrumb.join(" > ") : data.breadcrumb}
              </div>
            )}

            {/* Logo */}
            {data.logo && (
              <div className="mb-4">
                <img
                  src={data.logo}
                  alt="Project Logo"
                  className="w-[10rem] mb-3 object-contain"
                />
              </div>
            )}

            {/* About Text */}
            <p className="text-lg text-[#3a3a3a] leading-9 mb-7 lg:w-11/12 whitespace-pre-line">
              {data.about || "No description available."}
            </p>

            {/* Brochure Download */}
            {data.brochureLink && (
              <a
                href={data.brochureLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#996633] text-white px-12 py-4 text-base font-medium hover:bg-[#7a512a] transition inline-block"
              >
                DOWNLOAD BROCHURE
              </a>
            )}
          </div>

          {/* Right-side image */}
          {data.image && (
            <div className="lg:w-5/12 w-full">
              <img
                src={data.image}
                alt="Project Detail"
                className="w-full object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Full-width image */}
      {data.fullWidthImage && (
        <div className="w-full px-6 lg:px-10">
          <div className="w-full">
            <img
              src={data.fullWidthImage}
              // src={AarohanJaipur}
              alt="Full Width Detail"
              className="w-full lg:h-[500px] object-cover"
            />
          </div>
        </div>
      )}

      {/* <div className="w-full px-6 lg:px-10">
          <div className="w-full">
            <img
              // src={data.fullWidthImage}
              src={AarohanJaipur}
              alt="Full Width Detail"
              className="w-full lg:h-[500px] object-cover"
            />
          </div>
        </div> */}
    </section>
  );
};

export default AboutDetails;
