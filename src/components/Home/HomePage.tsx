import About from "./About";
import Banner from "./Banner";
import Blogs from "./Blogs";
import CoreFeatures from "./CoreFeatures";
import FAQAndStats from "./FAQAndStats";
import FunFacts from "./FunFacts";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Services from "./Services";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Banner />
      <Pricing />
      <CoreFeatures />
      <FunFacts />
      <HowItWorks />
      <FAQAndStats />
      <Testimonials />
      <Blogs />
    </div>
  );
};

export default HomePage;
