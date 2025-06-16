import React, { useState } from 'react';

import calendar from '@/assets/images/calendar.png';
import whatsapp from '@/assets/images/whatsapp.png';
import { Plus } from 'lucide-react'; // You can keep using Lucide for the main button

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:absolute lg:bottom-[10%] fixed bottom-2 right-6 z-10 flex flex-col items-center">
      {/* Action Buttons */}
      <div
        className={`transition-all duration-300 ease-in-out bg-black/80 backdrop-blur-md rounded-full pt-4 pb-8 px-2 relative -z-[1] -bottom-[22px] flex flex-col items-center gap-5 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        {/* Calendar Button with Label */}
        <div className="group flex items-center gap-2 relative">
          <span className="absolute right-full mr-3 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Calendar
          </span>
          <button className="hover:scale-110 transition">
            <img src={calendar} alt="Calendar" className="w-6 h-6" />
          </button>
        </div>

        {/* WhatsApp Button with Label */}
        <div className="group flex items-center gap-2 relative">
          <span className="absolute right-full mr-3 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            WhatsApp
          </span>
          <button className="hover:scale-110 transition">
            <img src={whatsapp} alt="WhatsApp" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-secondary hover:bg-secondary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition"
      >
        <Plus size={32} />
      </button>
    </div>
  );
};

export default FloatingActionButton;
