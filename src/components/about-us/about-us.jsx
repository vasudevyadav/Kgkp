import React from "react";
import JaipurAddresh from "@/assets/images/KGK-black.png";
import bgImage from "@/assets/images/about-main-bg.png"; // Replace with your actual image path

const AboutInfo = () => {
  return (
    <section
      className="w-full container-fluid py-7 lg:py-2 bg-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="mx-auto  p-8">
        <div className="w-full">
          <div className="p-8">
            <div className="text-center mb-2">
              <img
                src={JaipurAddresh}
                alt="Realty Logo"
                className="mx-auto w-24 mb-10"
              />
            </div>

            <h3 className="text-center lg:text-4xl font-normal text-gray-800 mb-6">
              KGK Realty (INDIA) Limited
            </h3>

            <div className="text-gray-700 text-sm leading-relaxed space-y-4 w-full lg:w-[77%] mx-auto">
              <p className="text-center text-base">
                KGK Realty (INDIA) Limited is committed to redefining urban living by delivering exceptional real estate experiences. With a strong focus on innovation, quality, and customer-centricity, the company develops spaces that offer seamless convenience and an elevated lifestyle.
              </p>

              <p className="text-center text-base">
                From residential and commercial developments to industrial and hospitality projects, KGK Realty integrates cutting-edge design with superior execution. Its dedication to excellence has earned a stellar reputation and multiple industry accolades. With every project, the company continues to set new benchmarks in trust, ethics, and leadership within the real estate sector.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
