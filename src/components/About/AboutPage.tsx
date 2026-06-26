import About from "../Home/About";
import CoreFeatures from "../Home/CoreFeatures";
import Testimonials from "../Home/Testimonials";
import WhyChooseUs from "../Home/WhyChooseUs";
import Navbar from "../UI/Navbar";
import AboutBanner from "./AboutBanner";
import Advantages from "./Advantages";
import Approach from "./Approach";
import Teams from "./Teams";
import WhatWeDo from "./WhatWeDo";

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <AboutBanner />
      <About />
      <Approach />
      <WhyChooseUs />
      <WhatWeDo />
      <Advantages />
      <CoreFeatures />
      <Teams />
      <Testimonials />
    </div>
  );
};

export default AboutPage;
