import { DateTime } from "luxon";
import { PageTitle } from "../../components/page-title";
import SystemConfigurationStep from "@/app/sections/step-system-configuration";

export default function SystemConfigurationSetup() {
  return (
    <div className="flex flex-col gap-4 ">
      <PageTitle
        title="System Configuration"
        category="Setting up of System"
        updatedDate={DateTime.now()}
      />
      <SystemConfigurationStep />
    </div>
  );
}
