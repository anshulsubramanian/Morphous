import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkGrid from "@/components/WorkGrid";

export const metadata = {
  title: "Work — Studio Morphous",
  description: "Selected projects in product design, interior design, furniture, and spatial styling.",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <WorkGrid />
      <Footer />
    </>
  );
}
