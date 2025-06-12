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
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <MainLayout title="Loading...">
        <div className="text-center py-20">Loading project details...</div>
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
    <MainLayout title={project.name || 'Project'}>
      <HeroSectionDetails
        data={{
          title: project.name,
          background: project.image,
          address: project.address,
          unitInfo: project.units,
          reraApproved: !!project.reraNo,
        }}
      />

      <AboutDetails
        data={{
          breadcrumb: project.breadcrumb,
          logo: project.logo,
          image: project.image,
          fullWidthImage: project.fullWidthImage,
          brochureLink: project.brochureLink,
          about: project.about
        }}
      />

      {project.Construction && (
        <ConstructionUpdate
          data={{
            Constructiontitle: project.Construction?.Constructiontitle,
            Constructionsubtitle: project.Construction?.Constructionsubtitle,
            Constructiondescription: project.Construction?.Constructiondescription,
            ConstructionbuttonText: project.Construction?.ConstructionbuttonText,
            Constructionimage: project.Construction?.Constructionimage,
          }}
        />
      )}

     {project.ModernFacilitiesSection && (
  <ModernFacilities data={project.ModernFacilitiesSection} />)}
    <ProjectGallery data={project.GallerySection} />
     
    <FloorPlan data={project.FloorPlanSection} />
<BookVisitSite
  data={project.BookVisitSite}
  slug={slug}
  projectName={project.title}
/>
      <ClientSpeaks />
      <Faq />
    </MainLayout>
  );
};

export default ProjectDetailsPage;
