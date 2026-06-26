import About from "../Home/About";
import CoreFeatures from "../Home/CoreFeatures";
import FAQAndStats from "../Home/FAQAndStats";
import Testimonials from "../Home/Testimonials";
import WhyChooseUs from "../Home/WhyChooseUs";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
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
      <FAQAndStats />
      <Footer />
    </div>
  );
};

export default AboutPage;
