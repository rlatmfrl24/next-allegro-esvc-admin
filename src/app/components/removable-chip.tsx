import { MdIcon, MdIconButton, MdRippleEffect } from "@/util/md3";
import { MdTypography } from "./typography";
import { Close } from "@mui/icons-material";

export default function RemovableChip(props: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <div className="pl-3 pr-1.5 py-1.5 bg-secondaryContainer h-fit flex rounded-lg gap-2 items-center">
      <MdTypography variant="label" size="large">
        {props.label}
      </MdTypography>
      <div
        className="flex items-center rounded-full relative p-0.5 cursor-pointer"
        onClick={() => props.onRemove()}
      >
        <MdRippleEffect />
        <Close fontSize="small" />
      </div>
    </div>
  );
}
