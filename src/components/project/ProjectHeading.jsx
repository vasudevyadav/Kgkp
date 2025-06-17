import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const DEFAULT_COORDINATES = [26.9124, 75.7873]; // Jaipur fallback

const ProjectHeading = ({ variant }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const headingContent = {
    commercial: {
      label: 'EXPERIENCE ELEVATED WORKSPACES',
      title: 'Purpose-driven structures designed for success.',
      description:
        'Explore thoughtfully crafted commercial environments that balance functionality with sophistication...',
    },
    residential: {
      label: 'EXPERIENCE REFINED LIVING',
      title: 'Discover Timeless Residences Developed with Care',
      description:
        'At KGK Realty, thoughtful design meets modern elegance...',
    },
    industrial: {
      label: 'EXPERIENCE ADVANCED INDUSTRIAL SPACES',
      title: 'Engineered for Efficiency. Designed for Growth.',
      description:
        'Discover industrial facilities thoughtfully planned to optimize operational workflows...',
    },
  };

  const { label, title, description } = headingContent[variant] || {
    label: 'PROJECTS',
    title: 'Our Projects',
    description: 'Explore the diverse projects we have completed and ongoing.',
  };

  const getCoordinates = (project) => {
    const lat = parseFloat(project?.latitude);
    const lng = parseFloat(project?.longitude);
    return !isNaN(lat) && !isNaN(lng) ? [lat, lng] : DEFAULT_COORDINATES;
  };

  const fetchProjects = async () => {
    try {
      const url = new URL(`${process.env.REACT_APP_API_BASE_URL}/projects`);
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data.projects)) {
        const filtered = data.projects.filter(p => p.type === variant); // Optional filter
        setProjects(filtered);
        setSelectedProject(filtered[0]);
      } else {
        console.error('projects is not an array:', data);
        setProjects([]);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [variant]);

  return (
    <section className="lg:py-16 py-10 bg-white">
      <div className="text-center mb-10">
        <div className="bg-[#e8e8e8] w-full h-[2px] rounded-full mb-8 relative">
          <p className="text-amber-700 uppercase w-fit whitespace-nowrap text-sm tracking-widest mb-2 absolute -top-4 left-1/2 -translate-x-1/2 bg-white p-2 px-10">
            {label}
          </p>
        </div>
        <h2 className="text-2xl lg:text-4xl font-light text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto lg:px-10 px-4 items-center">
        {/* Map Section */}
        <div className="rounded-2xl overflow-hidden h-[480px] border border-gray-200 z-10">
          {selectedProject ? (
            <MapContainer
              center={getCoordinates(selectedProject)}
              zoom={15}
              style={{ width: '100%', height: '100%' }}
              scrollWheelZoom={false}
              key={selectedProject.slug}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={getCoordinates(selectedProject)}>
                <Popup>{selectedProject.name}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Loading map...
            </div>
          )}
        </div>

        {/* Projects List */}
        <div className="grid grid-cols-1 gap-4 max-h-[590px] overflow-y-auto pr-2">
          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-500">No projects available.</p>
          ) : (
            projects.map((project, index) => {
              const location = [project.address, project.locality, project.city]
                .filter(Boolean)
                .join(', ');

              const isSelected = selectedProject?.slug === project.slug;

              return (
                <div
                  key={project.id || index}
                  onClick={() => setSelectedProject(project)}
                  className={`cursor-pointer p-3 rounded-2xl overflow-hidden shadow-sm bg-white sm:flex flex-row gap-x-6 transition-all duration-300 ${isSelected
                    ? 'border-2 border-[#956325]'
                    : 'border border-gray-200'
                    }`}
                >
                  <div className="w-full lg:mb-0 mb-4 lg:w-1/3 relative">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div className="w-full lg:w-2/3 flex flex-col justify-between">
                    <div className="flex items-center gap-5 justify-between">
                      <div>
                        <h3 className="text-amber-800 font-bold text-[17px] leading-tight line-clamp-1 mb-1">
                          {project.name}
                        </h3>
                        <p className="text-gray-700 text-[13px]">{location || 'Location not available'}</p>
                        {project.reraApproved && (
                          <div className="flex items-center gap-1 mt-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <p className="text-green-600 text-[11px] font-semibold uppercase">
                              Rera Approved
                            </p>
                          </div>
                        )}
                      </div>
                      <Link
                        to={`/project-details/${project.slug.replace(/^kgk-/, '')}`}
                        className="border border-black text-black px-5 py-1.5 text-[12px] uppercase font-medium hover:bg-amber-800 hover:text-white transition duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        EXPLORE
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="flex flex-col items-center">
                        <div className="p-2 bg-gray-100 rounded-full mb-1">
                          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <p className="text-[11px] text-black font-normal mb-1">Bedroom</p>
                        <p className="text-[13px] text-black font-semibold line-clamp-1">
                          {project.bedroom || '-'}
                        </p>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="p-2 bg-gray-100 rounded-full mb-1">
                          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <p className="text-[11px] text-black font-normal mb-1">Total Units</p>
                        <p className="text-[13px] text-black font-semibold line-clamp-1">
                          {project.units || '-'}
                        </p>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="p-2 bg-gray-100 rounded-full mb-1">
                          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                          </svg>
                        </div>
                        <p className="text-[11px] text-black font-normal mb-1">Project Size</p>
                        <p className="text-[13px] text-black font-semibold">{project.size || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectHeading;
