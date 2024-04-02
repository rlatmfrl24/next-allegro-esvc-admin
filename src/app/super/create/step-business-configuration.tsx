import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/util/md3";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function BusinessConfigurationStep(props: {
  onStepMove: (step: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large">
          Business Configuration
        </MdTypography>
        <div className="flex gap-2 items-center">
          <MdTextButton
            onClick={() => {
              props.onStepMove(4);
            }}
          >
            <MdIcon slot="icon">
              <ChevronLeft />
            </MdIcon>
            Previous
          </MdTextButton>
          <DividerComponent orientation="vertical" className="h-6" />
          <MdTextButton disabled trailingIcon>
            Next
            <MdIcon slot="icon">
              <ChevronRight />
            </MdIcon>
          </MdTextButton>
        </div>
      </div>
    </div>
  );
}
