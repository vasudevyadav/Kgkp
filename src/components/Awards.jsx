import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AwardsSection = () => {
  const [awards, setAwards] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/homepage`);
        const data = res.data?.awards;
        if (data) {
          setTitle(data.title || '');
          setDescription(data.description || '');
          setAwards(data.awards || []);
        }
      } catch (error) {
        console.error("Failed to fetch awards:", error);
      }
    };

    fetchAwards();
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 lg:py-16 py-8">
      {/* ====== Desktop Heading ====== */}
      <div className="hidden md:flex flex-col md:flex-row lg:gap-20 gap-4 relative z-10 md:px-[40px]">
        {/* Yellow Box */}
        <div className="bg-[#966326] text-white p-6 md:p-8 pb-12 md:pb-44 rounded-3xl md:w-6/12 w-full shadow-md">
          <h2 className="text-2xl lg:text-4xl font-light mb-4">{title}</h2>
          <p className="text-sm leading-relaxed line-clamp-4 w-80">{description}</p>
        </div>

        {/* Grey Box */}
        <div className="bg-white lg:bg-[#777779] h-28 md:h-[18rem] md:w-5/12 w-full rounded-xl mt-4 md:mt-24"></div>
      </div>

      {/* ===== MOBILE SCROLL SECTION (Title + Images in one row) ===== */}
      {awards.length > 0 && (
        <div className="md:hidden relative z-20 overflow-x-auto">
          <div className="flex flex-nowrap gap-4 w-max pr-4">
            {/* Title Box in scroll */}
            <div className="min-w-[280px] max-w-[280px] h-64 rounded-3xl bg-[#966326] text-white p-4 shadow-md flex flex-col justify-center">
              <h2 className="text-lg font-semibold mb-2">{title}</h2>
              <p className="text-sm leading-relaxed">{description}</p>
            </div>

            {/* Award Images */}
            {awards.map((img, i) => (
              <div key={i} className="w-[280px] h-64 shrink-0 rounded-3xl overflow-hidden shadow-lg">
                <img src={img} alt={`Award ${i + 1}`} className="w-full h-full object-cover object-top" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== DESKTOP IMAGE GRID ===== */}
      {awards.length >= 6 && (
        <>
          {/* Top Row */}
          <div className="hidden md:flex mt-[-279px] flex-row gap-4 items-end justify-center relative z-20 lg:-ml-4">
            <div className="w-[37%] h-64 rounded-3xl overflow-hidden shadow-lg">
              <img src={awards[0]} alt="Award 1" className="w-full h-full object-cover object-top" />
            </div>
            <div className="w-[31%] h-[23rem] rounded-3xl overflow-hidden shadow-lg">
              <img src={awards[1]} alt="Award 2" className="w-full h-full object-cover object-top" />
            </div>
            <div className="w-[28%] h-64 rounded-3xl overflow-hidden shadow-lg">
              <img src={awards[2]} alt="Award 3" className="w-full h-full object-cover object-top" />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="hidden md:flex flex-row gap-4 items-start justify-center relative z-20 mt-3 lg:mb-4 lg:ml-6">
            <div className="h-64 w-[30%] rounded-3xl overflow-hidden shadow-lg">
              <img src={awards[3]} alt="Award 4" className="w-full h-full object-cover object-top" />
            </div>
            <div className="h-80 w-1/4 rounded-3xl overflow-hidden shadow-lg">
              <img src={awards[4]} alt="Award 5" className="w-full h-full object-cover object-top" />
            </div>
            <div className="h-64 w-[40%] rounded-3xl overflow-hidden shadow-lg">
              <img src={awards[5]} alt="Award 6" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AwardsSection;
