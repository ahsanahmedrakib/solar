import AboutHeroBanner from "@/components/About/AboutHeroBanner";
import About from "@/components/Home/About";
import Navbar from "@/components/UI/Navbar";

const page = () => {
  return (
    <div>
      <Navbar />
      <AboutHeroBanner />
      <About />
    </div>
  );
};

export default page;
