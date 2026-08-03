import BatteryPackages from "./BatteryPackages";
import DealershipForm from "./DealershipForm";
import PalashAbout from "./PalashAbout";
import PalashBanner from "./PalashBanner";
import PalashContact from "./PalashContact";
import PalashGallery from "./PalashGallery";
import PalashVideo from "./PalashVideo";

const PalashPage = () => {
  return (
    <div>
      <PalashBanner />
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

