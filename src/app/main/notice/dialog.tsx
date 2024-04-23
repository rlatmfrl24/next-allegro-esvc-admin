import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import {
  MdDialog,
  MdFilledButton,
  MdIcon,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdSwitch,
} from "@/util/md3";
import { NoticeProps } from "@/util/typeDef/notice";
import { Upload } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";

export const AddNoticeDialog = (props: {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  target: NoticeProps | null;
  mode: "add" | "edit";
}) => {
  return (
    <MdDialog
      open={props.isOpen}
      closed={() => {
        props.onOpenChange(false);
      }}
      className="min-w-[800px]"
    >
      <div slot="headline">Add Notice</div>
      <div slot="content" className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 flex-1">
            <MdTypography variant="body" size="large">
              Posted by
            </MdTypography>
            <MdTypography variant="body" size="large" prominent>
              {props.target?.postedBy}
            </MdTypography>
          </div>
          <MdTypography
            tag="label"
            variant="label"
            size="medium"
            className="flex items-center gap-2"
          >
            Post to all companies
            <MdSwitch />
          </MdTypography>
          <MdTypography
            tag="label"
            variant="label"
            size="medium"
            className="flex items-center gap-2"
          >
            Pop-up alert
            <MdSwitch />
          </MdTypography>
        </div>
        <NAOutlinedTextField label="Title" />
        <MdOutlinedTextField type="textarea" rows={5} label="Contents" />
        <MdOutlinedButton className="w-fit">
          <MdIcon slot="icon">
            <Upload fontSize="small" />
          </MdIcon>
          Upload
        </MdOutlinedButton>
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange(false);
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            props.onOpenChange(false);
          }}
        >
          {props.mode === "add" ? "Add" : "Save"}
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
