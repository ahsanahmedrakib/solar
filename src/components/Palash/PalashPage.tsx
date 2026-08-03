import BatteryPackages from "./BatteryPackages";
import DealershipForm from "./DealershipForm";
import PalashAbout from "./PalashAbout";
import PalashBanner from "./PalashBanner";
import PalashContact from "./PalashContact";

const PalashPage = () => {
  return (
    <div>
      <PalashBanner />
      <PalashAbout />
      <BatteryPackages />
      <DealershipForm />
      <PalashContact />
    </div>
  );
};

export default PalashPage;

