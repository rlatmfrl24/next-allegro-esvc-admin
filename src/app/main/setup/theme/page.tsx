import { DateTime } from "luxon";
import { PageTitle } from "../../components/page-title";
import ThemeStyleStep from "@/app/sections/step-theme-style";

export default function ThemeStyleSetup() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle
        title="Theme & Style"
        category="Setting up of System"
        updatedDate={DateTime.now()}
      />
      <ThemeStyleStep
        previewOption={{
          width: 1280,
          height: 960,
          zoom: 0.6,
        }}
      />
    </div>
  );
}
