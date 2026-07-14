import SiteNavbar from "./components/SiteNavbar";
import PosterHero from "./components/PosterHero";
import PosterServices from "./components/PosterServices";
import PosterAbout from "./components/PosterAbout";
import ConsultationFlow from "./components/ConsultationFlow";
import ClientPortalPreview from "./components/ClientPortalPreview";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import AppointmentSection from "./components/AppointmentSection";
import BlogSection from "./components/BlogSection";
import ClientLoginSection from "./components/ClientLoginSection";
import PosterFooter from "./components/PosterFooter";

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <PosterHero />
      <PosterServices />
      <PosterAbout />
      <ConsultationFlow />
      <ClientPortalPreview />
      <TestimonialsSection />
      <FaqSection />
      <AppointmentSection />
      <BlogSection />
      <ClientLoginSection />
      <ContactSection />
      <PosterFooter />
    </>
  );
}