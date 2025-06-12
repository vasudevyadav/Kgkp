import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, MapPin, Building2, ChevronDown, ChevronUp } from 'lucide-react';

const tabs = ['Residential', 'Commercial', 'Industrial'];

const ProjectCard = () => {
  const [activeTab, setActiveTab] = useState('Residential');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const url = new URL(`${process.env.REACT_APP_API_BASE_URL}/projects`);
      url.searchParams.append('type', activeTab);

      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const result = await res.json();
      setProjects(result?.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeTab]);

  const displayProjects = (isMobile) =>
    isMobile ? (showAll ? projects : projects.slice(0, 2)) : projects;

  return (
    <section id="projects" className="lg:py-16 py-8 bg-[#F1F1F1]">
      <div className="lg:pl-[6rem] lg:px-0 px-6">
        <div className="flex items-center mb-2">
          <p className="text-primary uppercase text-base tracking-[2px] mr-4">
            Luxury. Precision. Expertise.
          </p>
          <div className="h-px bg-customGray1 flex-1"></div>
        </div>
        <h2 className="text-2xl lg:text-4xl text-dark mb-8">Our Projects</h2>

        <div className="flex gap-12 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowAll(false);
              }}
              className={`pb-1 font-normal ${activeTab === tab ? 'text-black font-medium' : 'text-gray-500 hover:text-black'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="container-fluid">
        {loading ? (
          <div className="text-center py-10">Loading projects...</div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-3 gap-10">
              {projects.map((proj, i) => (
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
                        className="absolute top-4 left-4 w-24 h-24 object-contain rounded-full bg-white p-1"
                      />
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-nexa font-bold line-clamp-1">{proj.name}</h3>
                      {(proj.address || proj.locality || proj.city) && (
                        <div className="mt-1 flex gap-1 items-start text-sm text-gray-700">
                          <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
                          <div className="flex flex-col line-clamp-2">
                            {proj.address && <p>{proj.address}</p>}
                            {(proj.locality || proj.city) && (
                              <p >{[proj.locality, proj.city].filter(Boolean).join(', ')}</p>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        {proj.units && (
                          <p className="flex items-center gap-1 " >
                            <Building2 size={16} className="text-primary" />
                            Unit:
                            <p className='line-clamp-1'>{proj.units}</p>
                          </p>
                        )}
                        <p className="text-green-600 text-sm flex items-center gap-1">
                          <CheckIcon strokeWidth={4.5} className="text-green-500 text-xs" />
                          Rera Approved
                        </p>
                      </div>
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

            {/* Mobile View */}
            <div className="md:hidden">
              <div className="grid grid-cols-1 gap-6">
                {displayProjects(true).map((proj, i) => (
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
                          className="absolute top-4 left-4 w-16 h-16 object-contain rounded-full bg-white p-1"
                        />
                      )}
                    </div>
                    <div className="p-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-nexa font-bold line-clamp-2">{proj.name}</h3>
                        {(proj.address || proj.locality || proj.city) && (
                          <div className="mt-1 flex gap-1 items-start text-sm text-gray-700">
                            <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
                            <div className="flex flex-col">
                              {proj.address && <p>{proj.address}</p>}
                              {(proj.locality || proj.city) && (
                                <p className='line-clamp-2'>{[proj.locality, proj.city].filter(Boolean).join(', ')}</p>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-2">
                          {proj.units && (
                            <p className="flex items-center gap-1">
                              <Building2 size={16} className="text-primary" />
                              Unit:
                              <p className='line-clamp-1'> {proj.units} </p>
                            </p>
                          )}
                          <p className="text-green-600 flex items-center gap-1">
                            <CheckIcon strokeWidth={4.5} size={16} className="text-green-500" />
                            Rera Approved
                          </p>
                        </div>
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

              {projects.length > 2 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="flex items-center bg-yellow-800 gap-2 text-white px-6 py-3 rounded-md shadow-sm border border-gray-200 font-medium mt-6"
                  >
                    {showAll ? (
                      <>
                        Show Less <ChevronUp size={18} />
                      </>
                    ) : (
                      <>
                        Show More <ChevronDown size={18} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectCard;
