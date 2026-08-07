import Hero from "@/components/Common/Hero";
import BatteryPackages from "./BatteryPackages";
import DealershipForm from "./DealershipForm";
import PalashAbout from "./PalashAbout";
import PalashContact from "./PalashContact";
import PalashGallery from "./PalashGallery";
import PalashVideo from "./PalashVideo";

const PalashPage = () => {
  return (
    <div>
      <Hero site="palash" />
      <PalashAbout />
      <BatteryPackages />
      <PalashVideo />
      <PalashGallery />
      <DealershipForm />
      <PalashContact />
    </div>
  );
};

export default PalashPage;

