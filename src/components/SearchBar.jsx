import React, { useState } from 'react';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const allLocations = [
    'Jaipur', 'Mumbai', 'Delhi', ];

  const allTypes = [
    'Residential', 'Commercial', 'Industrial'
  ];

  const handleSearch = () => {
    console.log('Searching for:', { location, type });
    // Add your search logic here
  };

  return (
    <div className="bg-black/40 rounded-2xl p-1 text-left">
      <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row items-center w-full gap-4 md:gap-0">
        
        {/* Location Dropdown */}
        <div className="flex flex-col flex-1 w-full px-4">
          <label htmlFor="location" className="text-sm font-semibold text-gray-800 mb-1">Location</label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent text-sm text-gray-600 border-none focus:outline-none"
          >
            <option value="">Select Property Location</option>
            {allLocations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block h-12 w-0.5 bg-customGray1"></div>

        {/* Type Dropdown */}
        <div className="flex flex-col flex-1 w-full px-4">
          <label className="text-sm font-semibold text-gray-800 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-transparent text-sm text-gray-600 border-none focus:outline-none"
          >
            <option value="">Select Property Type</option>
            {allTypes.map((typeOption, idx) => (
              <option key={idx} value={typeOption}>{typeOption}</option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="w-full md:w-auto px-4">
          <button
            onClick={handleSearch}
            className="bg-secondary text-white font-semibold px-7 py-2 rounded-xl w-full"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
