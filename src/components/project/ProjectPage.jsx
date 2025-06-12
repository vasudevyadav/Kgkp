import React, { useState, useEffect } from 'react';
import { CheckIcon, MapPin, Building2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import allProjects from '../../data/projectsData';

const projectContent = {
  Residential: {
    subheading: 'Creating Elevated Living with Thoughtfully Designed Residences',
    heading: 'Explore Our Premium Residential Projects in Jaipur',
  },
  Commercial: {
    subheading: 'TRANSFORMING JAIPUR’S SKYLINE WITH PREMIUM COMMERCIAL SPACES',
    heading: 'Our Landmark Commercial Developments in Jaipur',
  },
  Industrial: {
    subheading: 'REVOLUTIONIZING JAIPUR’S INDUSTRIAL LANDSCAPE',
    heading: 'Setting New Standards in Premium Industrial Infrastructure',
  },
  Default: {
   subheading: 'Creating Elevated Living with Thoughtfully Designed Residences',
    heading: 'Explore Our Premium Residential Projects in Jaipur',
  },
};


const ProjectPage = ({ projectType }) => {
  const [filters, setFilters] = useState({
    residential: '',
    location: '',
    propertyType: '',
    budget: '',
    availability: '',
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projects,setProjects] =useState([]);
console.log('projects',projects);


  useEffect(() => {
  fetchProjects();
}, [projectType]);

const fetchProjects = async () => {
  try {
    setLoading(true);

    // Build the URL with query params
    const url = new URL(`${process.env.REACT_APP_API_BASE_URL}/projects`);
    url.searchParams.append('type', projectType.toLowerCase());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setProjects(data?.projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  } finally {
    setLoading(false);
  }
};


  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleOptionSelect = (category, value) => {
    setFilters({ ...filters, [category]: value });
    setOpenDropdown(null);
  };

  const handleReset = () => {
    setFilters({
      residential: '',
      location: '',
      propertyType: '',
      budget: '',
      availability: '',
    });
  };

  const renderDropdown = (title, options, category) => {
    const isOpen = openDropdown === category;
    return (
      <div className="relative">
        <button
          onClick={() => handleDropdownToggle(category)}
          className="flex items-center justify-between px-4 py-3 w-full border-r border-gray-200 bg-white focus:outline-none"
        >
          <span className="font-medium">{title}</span>
          <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 shadow-lg z-10">
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleOptionSelect(category, option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const residentialOptions = ['All', 'Apartments', 'Villas', 'Penthouses'];
  const locationOptions = ['All', 'C Scheme', 'Mansarovar', 'Jagatpura', 'Vaishali Nagar', 'Pratap Nagar'];
  const propertyTypeOptions = ['All', '2 BHK', '3 BHK', '4 BHK', '5 BHK'];
  const budgetOptions = ['All', 'Under 50L', '50L - 1Cr', '1Cr - 2Cr', 'Above 2Cr'];
  const availabilityOptions = ['All', 'Ready to Move', 'Under Construction'];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { subheading, heading } = projectContent[projectType] || projectContent.Default;

  let filteredProjects = projects.filter((p) => {
   if (p.type?.toLowerCase() != projectType?.toLowerCase()) return false;
    const hasName = p.name && p.name.trim() != '' && p.name != '-';
    const hasImage = p.image && p.image.trim() != '';    
    if (projectType?.toLowerCase() == 'industrial') return hasName || hasImage;
    const hasLocation = (p.address && p.address != '-') || (p.locality && p.locality != '-') || (p.city && p.city != '-');
    const hasUnits = p.units && p.units != '-' && p.units.toString().trim() != '';
    console.log("b",hasImage,hasName);
    return hasName && hasImage && (hasLocation || hasUnits);
  });

  console.log("filteredProjects",filteredProjects);
  

  // Apply all filters
  filteredProjects = filteredProjects.filter((p) => {
    const matchLocation =
      filters.location === '' || filters.location === 'All' ||
      [p.locality, p.city].some(loc => loc?.toLowerCase() === filters.location.toLowerCase());

    const matchPropertyType =
      filters.propertyType === '' || filters.propertyType === 'All' ||
      (p.units && p.units.toLowerCase().includes(filters.propertyType.toLowerCase()));

    const matchResidential =
      filters.residential === '' || filters.residential === 'All' ||
      (p.residentialType && p.residentialType.toLowerCase() === filters.residential.toLowerCase());

    const matchBudget =
      filters.budget === '' || filters.budget === 'All' || (() => {
        const price = p.price || 0;
        switch (filters.budget) {
          case 'Under 50L': return price < 5000000;
          case '50L - 1Cr': return price >= 5000000 && price <= 10000000;
          case '1Cr - 2Cr': return price > 10000000 && price <= 20000000;
          case 'Above 2Cr': return price > 20000000;
          default: return true;
        }
      })();

    const matchAvailability =
      filters.availability === '' || filters.availability === 'All' ||
      (p.availability && p.availability.toLowerCase() === filters.availability.toLowerCase());

    return matchLocation && matchPropertyType && matchResidential && matchBudget && matchAvailability;
  });

  const visibleProjects = isMobile && !showAll ? filteredProjects.slice(0, 4) : filteredProjects;

  return (
    <section className="lg:py-16 py-10 bg-[#F1F1F1]">
      
      <div className="container-fluid !pr-0 mb-6">
         <p className="text-primary uppercase text-sm tracking-[2px] mr-4 mb-3">{subheading}</p>
        <div className="flex items-center mb-2">
                  <h2 className="text-2xl lg:text-4xl text-dark mr-4">{heading}</h2>
          <div className="h-px bg-customGray1 flex-1"></div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="lg:flex bg-white my-5 items-center">
          <div className="flex-1 min-w-0">{renderDropdown(filters.residential || 'RESIDENTIAL', residentialOptions, 'residential')}</div>
          <div className="flex-1 min-w-0">{renderDropdown(filters.location || 'LOCATION', locationOptions, 'location')}</div>
          <div className="flex-1 min-w-0">{renderDropdown(filters.propertyType || 'PROPERTY TYPE', propertyTypeOptions, 'propertyType')}</div>
          <div className="flex-1 min-w-0">{renderDropdown(filters.budget || 'BUDGET', budgetOptions, 'budget')}</div>
          <div className="flex-1 min-w-0">{renderDropdown(filters.availability || 'AVAILABILITY', availabilityOptions, 'availability')}</div>
          <button
            onClick={handleReset}
            className="px-2 py-3 bg-black lg:w-36 w-[93%] text-center text-white font-medium hover:bg-gray-800 focus:outline-none m-3"
          >
            RESET
          </button>
        </div>

        {/* Project Cards */}
        {visibleProjects.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-10 mt-8">
              {visibleProjects.map((proj, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="w-full h-80 object-cover rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                    {proj.logo && (
                      <img
                        src={proj.logo}
                        alt="Project Logo"
                        className="absolute top-4 left-4 w-24 h-24 rounded-full bg-white p-1 object-contain"
                      />
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-bold">{proj.name}</h4>
                      {projectType?.toLowerCase() != 'industrial' && (
                        <div className="mt-1 flex gap-1 items-start text-sm text-gray-700">
                          <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
                          <div>
                            <p>{proj.address && proj.address !== '-' ? proj.address : 'Address not available'}</p>
                            <p>{[proj.locality, proj.city].filter(val => val && val !== '-').join(', ') || 'Location not specified'}</p>
                          </div>
                        </div>
                      )}
                      {projectType?.toLowerCase() == 'industrial' ? (
                        <div className="mt-2">
                          {proj.status ? (
                            <p className="text-green-600 text-sm flex items-center gap-1">
                              <CheckIcon strokeWidth={4.5} className="text-green-500 text-xs" />
                              Rera Approved
                            </p>
                          ):""}
                        </div>
                      ) : (
                        <div className="flex justify-between items-center mt-2">
                          <p className="flex items-center gap-1">
                            <Building2 size={16} className="text-primary" />
                            Unit: {proj.units && proj.units !== '-' ? proj.units : 'Not specified'}
                          </p>
                           {proj.status ? (
                          <p className="text-green-600 text-sm flex items-center gap-1">
                            <CheckIcon strokeWidth={4.5} className="text-green-500 text-xs" />
                            Rera Approved
                          </p>
                           ):""}
                        </div>
                      )}
                    </div>
                    <Link
                      to={`/project-details/${proj.slug}`}
                      className="border border-customGray3 px-8 py-2 hover:border-secondary hover:bg-secondary hover:text-white transition self-center mt-6 mb-4 text-center"
                    >
                      Know More
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {isMobile && filteredProjects.length > 4 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="px-6 py-2 bg-[#B17C47] text-white text-sm rounded"
                >
                  {showAll ? 'Show Less' : 'Show More'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">No {projectType.toLowerCase()} projects available at the moment.</p>
            <p className="text-gray-400 text-sm">Please check back later for updates.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectPage;
