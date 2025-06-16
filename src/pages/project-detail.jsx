import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

import HeroSectionDetails from '../components/project-details/HeroSectionDetails';
import AboutDetails from '../components/project-details/about-details';
import LocationExcellence from '../components/project-details/location-excellence';
import ModernFacilities from '../components/project-details/modern-facilities';
import ProjectGallery from '../components/project-details/project-gallery';
import ConstructionUpdate from '../components/project-details/construction-update';
import FloorPlan from '../components/project-details/floor-plan';
import BookVisitSite from '../components/project-details/book-visit-site';
import ClientSpeaks from '../components/ClientSpeaks';
import Faq from '../components/Faq';

const ProjectDetailsPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false); // For smooth transition

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/project/${slug}`
        );
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setProject(null);
      } finally {
        setLoading(false);
        // Wait a moment before showing content (smooth transition)
        setTimeout(() => setShowContent(true), 300);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading && !showContent) {
    return (
      <MainLayout title="Loading...">
        <div className="flex items-center justify-center h-[60vh] transition-opacity duration-500 opacity-100">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout title="Project Not Found">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">404 - Project Not Found</h1>
          <Link to="/" className="text-blue-600 underline">
            ← Back to all projects
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={project.Hero?.name || 'Project'}>
      <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <HeroSectionDetails
          data={{
            title: project.Hero?.name,
            background: project.Hero?.image || undefined,
            address: project.Hero?.address,
            unitInfo: project.Hero?.units,
            reraApproved: !!project.Hero?.reraNo,
          }}
        />

        {/* About Section */}
        <AboutDetails
          data={{
            breadcrumb: project.About?.breadcrumb,
            logo: project.About?.logo || undefined,
            image: project.About?.image || undefined,
            fullWidthImage: project.About?.fullWidthImage || false,
            brochureLink: project.About?.brochureLink,
            about: project.About?.about,
          }}
        />

      <LocationExcellence data={project.LocationSection} />


        {/* Modern Facilities */}
        {project.ModernFacilitiesSection && (
          <ModernFacilities data={project.ModernFacilitiesSection} />
        )}

        <ProjectGallery data={project?.GallerySection} />


        {/* Construction Update */}
        {project.Construction?.title && (
          <ConstructionUpdate
            data={{
              Constructiontitle: project.Construction.title,
              Constructionsubtitle: project.Construction.status || '',
              Constructiondescription: project.Construction.description || '',
              ConstructionbuttonText: '',
              Constructionimage: project.Construction.image || undefined,
            }}
          />
        )}

        {/* Floor Plan */}
        <FloorPlan data={project} />

        {/* Static Components */}
        <BookVisitSite />
        <ClientSpeaks />
        <Faq />
      </div>
    </MainLayout>
  );
};

export default ProjectDetailsPage;
