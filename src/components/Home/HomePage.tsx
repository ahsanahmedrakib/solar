import Hero from "@/components/Common/Hero";
import About from "./About";
import Blogs from "./Blogs";
import FAQAndStats from "./FAQAndStats";
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
      {/* <CoreFeatures /> */}
      {/* <FunFacts /> */}
      {/* <HowItWorks /> */}
      <FAQAndStats />
      <Testimonials />
      <Blogs />
    </div>
  );
};

export default HomePage;
