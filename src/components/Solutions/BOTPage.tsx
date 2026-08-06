import HaveQuestions from "./HaveQuestions";
import ModelOverview from "./ModelOverview";
import SolutionBanner from "./SolutionBanner";

const BOTPage = () => {
  return (
    <div>
      <SolutionBanner title="BOT" titleAccent="Model" crumb="BOT Model" />

      <ModelOverview
        badge="Our Solution"
        title="Build-Operate-Transfer"
        titleAccent="Model"
        description="Under the Build-Operate-Transfer (BOT) model, the service provider handles the complete financing, installation, and operation of the solar system for a specified contract period. During this time, the roof owner simply pays for the generated electricity at a pre-agreed tariff. At the end of the contract term, the ownership of the fully operational solar plant is seamlessly transferred to the roof owner at zero additional cost."
        image="/images/aheadsolar/about-3.jpg"
        imageAlt="Rooftop solar plant managed under the Build-Operate-Transfer model"
        features={[
          {
            id: "01.",
            title: "Complete Financing",
            description:
              "The service provider handles the full financing and installation of the solar system, with no capital outlay from the roof owner.",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>
            ),
          },
          {
            id: "02.",
            title: "Pay for Electricity",
            description:
              "The roof owner pays only for the generated electricity at a pre-agreed tariff for the contract period.",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            ),
          },
          {
            id: "03.",
            title: "Seamless Transfer",
            description:
              "At the end of the contract term, ownership of the fully operational solar plant transfers to the roof owner at zero additional cost.",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            ),
          },
        ]}
      />

      <HaveQuestions />
    </div>
  );
};

export default BOTPage;
