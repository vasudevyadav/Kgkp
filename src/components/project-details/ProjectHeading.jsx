import React from 'react';
import projectHead from '@/assets/images/project-heading.png';
import proj1 from '@/assets/images/proj1.jpg';
import proj2 from '@/assets/images/proj2.jpg';
import proj3 from '@/assets/images/proj3.jpg';
import projLogo1 from '@/assets/images/proj-logo1.png';
import projLogo2 from '@/assets/images/proj-logo2.png';
import projLogo3 from '@/assets/images/proj-logo3.png';

const ProjectHeading = () => {
  const projects = [
    {
      id: 1,
      name: "KGK AAROHAN",
      location: "4, Sardar Patel Marg, C Scheme, Jaipur",
      image: proj1,
      logo: projLogo1,
      bedroom: "4-5",
      units: "64",
      size: "4564 Sq-m"
    },
    {
      id: 2,
      name: "KGK AAKSHAR",
      location: "Vande Mataram Road, Mansarovar, Jaipur",
      image: proj2,
      logo: projLogo2,
      bedroom: "3-4",
      units: "500",
      size: "24000 Sq-yrd"
    },
    {
      id: 3,
      name: "KGK AAKSHAR",
      location: "Vande Mataram Road, Mansarovar, Jaipur",
      image: proj3,
      logo: projLogo3,
      bedroom: "3-4",
      units: "500",
      size: "24000 Sq-yrd"
    },
    {
      id: 4,
      name: "KGK NEW LAUNCH",
      location: "Ajmer Road, Jaipur",
      image: proj1,
      logo: projLogo1,
      bedroom: "3",
      units: "100",
      size: "15000 Sq-yrd"
    }
  ];

  return (
    <section id="projects" className="lg:py-16 py-10 bg-white">
      <div className="mx-auto lg:px-10 px-4">
        {/* Header section */}
        <div className="text-center mb-10">
          <div className="bg-[#e8e8e8] w-full h-[2px] rounded-full mb-8 relative">
            <p className="text-amber-700 uppercase w-fit whitespace-nowrap lg:whitespace-normal text-sm tracking-widest mb-2 absolute -top-4 left-1/2 -translate-x-1/2 bg-white p-2 px-10">
              LOREM IPSUM DOLOR SIT AMET
            </p>
          </div>
          <h2 className="text-4xl font-light text-gray-800 mb-4">Sample Heading</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
          </p>
        </div>

        {/* Project showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6 lg:mb-1 items-center">
          {/* Left side image */}
          <div className="rounded-2xl overflow-hidden bg-white border border-gray-100">
            <img
              src={projectHead}
              alt="Project Location Map"
              className="w-full sm:h-[480px] object-cover"
            />
          </div>

          {/* Right side scrollable list */}
          <div className="grid grid-cols-1 gap-4 max-h-[616px] overflow-y-auto pr-2">
            {projects.map((project) => (
              <div key={project.id} className="border border-gray-200 p-3 rounded-2xl overflow-hidden shadow-sm bg-white sm:flex flex-row gap-x-6">
                <div className="w-full lg:mb-0 mb-4 lg:w-1/3 relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="w-full lg:w-2/3 flex flex-col justify-between">
                  <div className='flex items-center gap-5 justify-between'>
                    <div>
                      <h3 className="text-amber-800 font-medium text-xl mb-1">{project.name}</h3>
                      <p className="text-gray-700 text-sm">{project.location}</p>
                    </div>
                    <button className="border border-amber-800 text-amber-800 px-6 py-2 text-sm uppercase font-medium rounded hover:bg-amber-800 hover:text-white transition duration-300">
                      EXPLORE
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-gray-100 rounded-full mb-1">
                        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <p className="text-xs text-black font-semibold mb-1">Bedroom</p>
                      <p className="text-sm text-black font-semibold">{project.bedroom}</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-gray-100 rounded-full mb-1">
                        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <p className="text-xs text-black font-semibold mb-1">Total Units</p>
                      <p className="text-sm text-black font-semibold">{project.units}</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-gray-100 rounded-full mb-1">
                        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                      </div>
                      <p className="text-xs text-black font-semibold mb-1">Project Size</p>
                      <p className="text-sm text-black font-semibold">{project.size}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectHeading;
