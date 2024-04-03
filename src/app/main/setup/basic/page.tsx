import BasicInformationStep from "@/app/sections/step-basic-information";
import { PageTitle } from "../../components/page-title";
import { DateTime } from "luxon";

export default function BasicInformationSetup() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle
        title="Basic Information"
        category="Setting up of System"
        updatedDate={DateTime.now()}
      />
      <BasicInformationStep />
    </div>
  );
}
