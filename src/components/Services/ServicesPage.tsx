import CoreFeatures from "../Home/CoreFeatures";
import FAQAndStats from "../Home/FAQAndStats";
import Testimonials from "../Home/Testimonials";
import WhyChooseUs from "../Home/WhyChooseUs";
import AllServices from "./AllServices";
import ServicesBanner from "./ServicesBanner";

const ServicesPage = () => {
  return (
    <div>
      <ServicesBanner />
      <AllServices />
      <CoreFeatures />
      <WhyChooseUs />
      <Testimonials />
      <FAQAndStats />
    </div>
  );
};

export default ServicesPage;
