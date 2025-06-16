import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import mapJaipur from '@/assets/images/Map_Jaipur.png';
import mapMumbai from '@/assets/images/Map_Mumbai.png';
import mapDelhi from '@/assets/images/Map_Delhi.png';

const locations = {
  JAIPUR: [
    { name: 'KGK Aarohan', address: '4, Sardar Patel Marg, C Scheme, Jaipur' },
    { name: 'KGK Akshar', address: 'Vande Mataram Road, Mansarovar, Jaipur' },
    { name: 'KGK Amulya', address: 'Near 7 Number Stand, Airport Road, Jaipur' },
    { name: 'KGK Aayam', address: 'Tonk Road, Near Choki Dhani, Jaipur' },
  ],
  MUMBAI: [
    { name: 'RSM Niyati', address: 'Andheri East, Mumbai, Maharashtra' },
    { name: 'RSM Diamond', address: 'Bandra Kurla Complex, Mumbai, Maharashtra' },
  ],
  DELHI: [
    { name: 'KGK Capital Towers', address: 'Connaught Place, New Delhi' },
    { name: 'KGK Business Square', address: 'Saket, New Delhi' },
  ],
};

const cityMaps = {
  JAIPUR: mapJaipur,
  MUMBAI: mapMumbai,
  DELHI: mapDelhi,
};

const LocationMap = () => {
  const [openCity, setOpenCity] = useState('JAIPUR');
  const [lastCity, setLastCity] = useState('JAIPUR');
  const [fade, setFade] = useState(false);

  // Initialize AOS once on mount
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  const toggleAccordion = (city) => {
    if (openCity === city) {
      setOpenCity(null);
    } else {
      setFade(true);
      setTimeout(() => {
        setOpenCity(city);
        setLastCity(city);
        setFade(false);
        // Refresh AOS animations after state change
        AOS.refresh();
      }, 300);
    }
  };

  return (
    <section className="py-12 bg-white relative">
      <div className=" pl-0 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="h-px bg-customGray1 flex-1"></div>
        <p className="text-primary uppercase lg:text-base text-sm px-6 lg:px-0  tracking-[2px] text-center lg:text-left">
          {`Rajasthan’s Premier Real Estate Developer`}
        </p>
      </div>

      <div className="container-fluid md:pl-0 grid grid-cols-1 md:grid-cols-2 gap-10 items-start pt-4">
        {/* Left: Map */}
        <div className="p-4 lg:pl-[5rem] ">
            <div className='lg:hidden block'>
          <h2 className="lg:text-4xl text-2xl mb-6" data-aos="fade-up">
            Our Locations
          </h2>
          <p className="text-gray-600 mb-10" data-aos="fade-up" data-aos-delay="100">
            {`Each location is chosen for convenience, growth potential, and a better lifestyle, providing opportunities for families and professionals alike.
`}
          </p>
          </div>

          <img
            key={lastCity}
            src={cityMaps[lastCity]}
            alt={`${lastCity} Map`}
            className={`w-full max-w-xl mx-auto transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'
              }`}
          />
        </div>

        <div className='lg:pl-10'>
         
         <div className='lg:block hidden'>
          <h2 className="lg:text-4xl text-2xl mb-6" data-aos="fade-up">
            Our Locations
          </h2>
          <p className="text-gray-600 mb-10" data-aos="fade-up" data-aos-delay="100">
            {`Each location is chosen for convenience, growth potential, and a better lifestyle, providing opportunities for families and professionals alike.
`}
          </p>
          </div>

          <div className="px-0 md:max-w-md mx-auto">
            {Object.entries(locations).map(([city, places]) => (
              <div key={city} className="mb-4" data-aos="fade-left" data-aos-delay="150">
                <button
                  onClick={() => toggleAccordion(city)}
                  className={`w-full flex justify-between items-center px-4 py-3 text-left font-nexa font-bold border transition-all ${openCity === city
                    ? 'border-primary text-primary'
                    : 'border-customGray1 hover:border-primary hover:text-primary'
                    }`}
                >
                  <span className='uppercase'>{city.charAt(0) + city.slice(1).toLowerCase()}</span>
                  <span>{openCity === city ? '−' : '+'}</span>
                </button>

                {openCity === city && places.length > 0 && (
                  <div className="px-4 pb-3 space-y-4 text-gray-700" data-aos="fade-down" data-aos-delay="200">
                    {places.map((place, idx) => (
                      <div key={idx} className="border-t pt-2">
                        <div className="font-nexa font-bold">{place.name}</div>
                        <div>{place.address}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
