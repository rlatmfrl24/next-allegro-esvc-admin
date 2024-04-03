import { DateTime } from "luxon";
import { PageTitle } from "../../components/page-title";
import MainPageStyleStep from "@/app/sections/step-main-page-style";

export default function MainPageSetup() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle
        title="Main Page Style"
        category="Setting up of System"
        updatedDate={DateTime.now()}
      />
      <MainPageStyleStep />
    </div>
  );
}
