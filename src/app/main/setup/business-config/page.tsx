import { DateTime } from "luxon";
import { PageTitle } from "../../components/page-title";
import BusinessConfigurationStep from "@/app/sections/step-business-configuration";

export default function BusinessConfigurationSetup() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle
        title="Business Configuration"
        category="Setting up of System"
        updatedDate={DateTime.now()}
      />
      <BusinessConfigurationStep />
    </div>
  );
}
