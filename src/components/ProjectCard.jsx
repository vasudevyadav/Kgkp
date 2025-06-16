import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, MapPin, Building2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  // only core CSS now

const tabs = ['Residential', 'Commercial', 'Industrial'];

const ProjectCard = () => {
  const [activeTab, setActiveTab] = useState('Residential');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const url = new URL(`${process.env.REACT_APP_API_BASE_URL}/projects`);
      url.searchParams.append('type', activeTab);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Network response was not ok');
      const json = await res.json();
      setProjects(json.projects || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeTab]);

  return (
    <section className="bg-[#e6e6e6] py-8 lg:py-16">
      <div className="lg:pl-[6rem] px-6">
        <div className="flex items-center mb-3">
          <p className="text-primary uppercase text-base tracking-[2px] mr-4">Luxury. Precision. Expertise.</p>
          <div className="h-px bg-customGray1 flex-1" />
        </div>
        <h2 className="text-2xl lg:text-4xl text-dark mb-8">Our Projects</h2>

        <div className="flex gap-8 mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 font-normal ${activeTab === tab
                ? 'text-black lg:text-lg font-medium'
                : 'lg:text-base text-gray-500 hover:text-black'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 lg:px-[6rem]">
        {loading ? (
          <div className="text-center py-10">Loading projects...</div>
        ) : (
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{ 1024: { slidesPerView: 3 } }}
          >
            {projects.map((proj, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-xl  overflow-hidden flex flex-col h-full">
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
                        className="absolute top-4 left-4 w-24 h-24 md:w-16 md:h-16 object-contain rounded-full bg-white p-1"
                      />
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between mt-2">
                    <div>
                      <h3 className="text-xl md:text-2xl font-nexa font-bold line-clamp-2 mb-2">
                        {proj.name}
                      </h3>
                      {(proj.address || proj.locality || proj.city) && (
                        <div className="mt-1 flex gap-1 items-start text-sm md:text-base text-gray-700">
                          <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
                          <div className="flex flex-col">
                            {proj.address && <p>{proj.address}</p>}
                            {(proj.locality || proj.city) && (
                              <p className="line-clamp-2">
                                {[proj.locality, proj.city].filter(Boolean).join(', ')}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        {proj.units && (
                          <p className="flex items-center gap-1">
                            <Building2 size={16} className="text-primary" />
                            Unit: <span className="line-clamp-1">{proj.units}</span>
                          </p>
                        )}
                        <p className="text-green-600 flex items-center gap-1 whitespace-nowrap">
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
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default ProjectCard;
