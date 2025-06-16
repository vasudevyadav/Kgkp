import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/images/logo.webp';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const mainMenu = [
    { id: 'about', label: 'About', url: '/kgk-test/about-us' },
    {
      id: 'project',
      label: 'PROJECTS',
      dropdown: [
        { id: 'residential', label: 'Residential', url: '/project' },
        { id: 'commercial', label: 'Commercial', url: '/commercial-project' },
        { id: 'Luxury', label: 'Industrial', url: '/industrial-project' },
      ],
    },
    { id: 'connect', label: 'Connect', url: '/kgk-test/contact-us' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Initial check
    onScroll();

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Re-check scroll position on route change
    setScrolled(window.scrollY > 50);
  }, [location.pathname]);

  useEffect(() => {
    const sectionIds = ['about', 'residential', 'commercial', 'luxury', 'connect'];
    const observers = [];

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { threshold: 0.6 }
        );
        observer.observe(section);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const isActive = (id) => activeSection === id;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 z-60 
        bg-[#956325]
        lg:transition-colors
        ${scrolled ? 'lg: bg-[#956325] lg:backdrop-blur-sm lg:shadow-md' : 'lg:bg-transparent'}
      `}
    >
      <div className="container-fluid py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="KGK Realty"
            className={`transition-all duration-300 ease-in-out ${scrolled ? 'h-20' : 'lg:h-24 h-12'
              }`}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-16 relative">
          <nav className="flex items-center space-x-10 text-white font-medium uppercase text-lg tracking-wider relative">
            {mainMenu.map((item) =>
              item.dropdown ? (
                <div key={item.id} className="relative group">
                  <button className="text-white px-3 pt-1 border-b-2 border-transparent hover:border-secondary flex items-center gap-1">
                    {item.label} <ChevronDown size={18} />
                  </button>
                  <div className="absolute top-[26px] px-3 py-3 left-0 mt-2 w-48 bg-black/95 backdrop-blur-md shadow-lg rounded-md hidden group-hover:block">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.id}
                        to={sub.url}
                        className={`block px-4 py-2 text-sm rounded mb-1 ${isActive(sub.id)
                            ? 'text-secondary bg-secondary/20'
                            : 'text-white hover:bg-secondary/30'
                          }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.id}
                  href={item.url}
                  className={`px-3 pt-1 border-b-2 ${isActive(item.id)
                      ? 'text-secondary border-secondary'
                      : 'border-transparent hover:border-secondary text-white'
                    }`}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
          <button className="bg-secondary text-white px-10 py-2 rounded font-bold text-md uppercase">
            Enquire
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            {isOpen ? <X className="text-white h-6 w-6" /> : <Menu className="text-white h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 top-20 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <nav
        className={`fixed top-20 right-0 h-full w-[70%] bg-black/90 backdrop-blur-sm shadow-md transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col pt-6 pb-6 space-y-2 text-white text-sm font-medium uppercase h-full">
          {mainMenu.map((item) =>
            item.dropdown ? (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => setProjectOpen(!projectOpen)}
                  className="w-full text-left px-5 py-2 border-b border-secondary flex justify-between items-center"
                >
                  {item.label}
                  <ChevronDown
                    className={`transition-transform duration-300 ease-in-out ${projectOpen ? 'rotate-180' : ''
                      }`}
                    size={18}
                  />
                </button>
                <div
                  className={`pl-4 flex flex-col space-y-1 overflow-hidden transition-all duration-500 ease-in-out ${projectOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  style={{ transitionProperty: 'max-height, opacity' }}
                >
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.id}
                      to={sub.url}
                      onClick={() => setIsOpen(false)}
                      className={`py-1 ${isActive(sub.id) ? 'text-secondary' : 'text-white'
                        } transition-opacity duration-300`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </React.Fragment>
            ) : (
              <a
                key={item.id}
                href={item.url}
                onClick={() => setIsOpen(false)}
                className={`block px-2 py-2 border-b px-5 ${isActive(item.id)
                    ? 'border-secondary text-secondary'
                    : 'border-secondary text-white'
                  }`}
              >
                {item.label}
              </a>
            )
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="mt-auto bg-secondary text-white px-6 py-2 rounded-full font-semibold text-sm uppercase !mt-8 mx-4"
          >
            Enquire
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
