import React from "react";

const ConstructionUpdate = ({ data }) => {
  if (!data) return null;

  const {
  Constructiontitle,
  Constructionsubtitle,
  Constructiondescription,
  ConstructionbuttonText,
  Constructionimage
}
 = data;

  return (
    <section className="bg-[#e6e6e6] lg:pt-16 pt-8 pl-4 md:pl-8 lg:mb-10">
      <div className="pl-0 lg:pl-20">
        <div className="pr-0">
          <p className="text-primary uppercase text-sm tracking-[2px] mr-4 mb-3">
            Lorem ipsum Dolor Sit Amet
          </p>
          <div className="flex items-center mb-4">
            <h2 className="lg:text-4xl text-2xl text-black lg:mr-[6rem] mr-[1rem]">{Constructiontitle}</h2>
            <div className="h-px bg-customGray1 flex-1"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 lg:gap-16 gap-10 items-center">
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h3 className="lg:text-2xl text-lg lg:font-semibold text-gray-800 lg:mb-6 mb-2">{Constructionsubtitle}</h3>
              <p className="text-gray-600 leading-relaxed lg:text-lg mb-8 lg:w-11/12 pr-4 lg:pr-0">
                {Constructiondescription}
              </p>
              <button className="bg-[#966326] text-white px-10 py-3 font-medium tracking-wide transition-colors duration-300">
                {ConstructionbuttonText}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 relative lg:pl-8">
            <div className="overflow-hidden">
              <img
                src={Constructionimage}
                alt="Construction update"
                className="w-full h-[450px] object-cover lg:pr-10 pr-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionUpdate;
