import Hero from "@/components/Common/Hero";
import About from "./About";
import Services from "./Services";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";
import WorkProcess from "./WorkProcess";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <WorkProcess />
      <Testimonials />
    </div>
  );
};

export default HomePage;
