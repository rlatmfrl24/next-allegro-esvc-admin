import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/util/md3";
import { ChevronLeft, ChevronRight, Refresh } from "@mui/icons-material";

export default function MenuManagementStep(props: {
  onStepMove: (step: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large">
          Menu Management
        </MdTypography>
        <div className="flex gap-2 items-center">
          <MdTextButton>
            <MdIcon slot="icon">
              <Refresh fontSize="small" />
            </MdIcon>
            Reset to Default Menu
          </MdTextButton>
          <MdTextButton
            onClick={() => {
              props.onStepMove(2);
            }}
          >
            <MdIcon slot="icon">
              <ChevronLeft />
            </MdIcon>
            Previous
          </MdTextButton>
          <DividerComponent orientation="vertical" className="h-6" />
          <MdTextButton
            onClick={() => {
              props.onStepMove(4);
            }}
            trailingIcon
          >
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
