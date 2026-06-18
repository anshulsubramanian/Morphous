import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPage from "@/components/AboutPage";

export const metadata = {
  title: "About — Studio Morphous",
  description: "Studio Morphous is a multidisciplinary design practice based in Gurugram, India.",
};

export default function About() {
  return (
    <>
      <Navbar />
      <AboutPage />
      <Footer />
    </>
  );
}
