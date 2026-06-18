import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BrandStatement from "@/components/BrandStatement";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-matte-black text-warm-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <BrandStatement />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
