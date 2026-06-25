import About from "./About";
import CoreFeatures from "./CoreFeatures";
import FunFacts from "./FunFacts";
import Hero from "./Hero";
import Pricing from "./Pricing";
import Services from "./Services";
import WhyChooseUs from "./WhyChooseUs";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Pricing />
      <CoreFeatures />
      <FunFacts />
    </div>
  );
};

export default HomePage;
