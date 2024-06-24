import { NAOutlinedTextField } from "@/app/components/na-textfield";
import RemovableChip from "@/app/components/removable-chip";
import { MdTypography } from "@/app/components/typography";
import {
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdIcon,
  MdInputChip,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdSwitch,
} from "@/util/md3";
import { NoticeProps } from "@/util/typeDef/notice";
import { faker } from "@faker-js/faker";
import { Upload } from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export const AddNoticeDialog = (props: {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  target: NoticeProps | null;
  mode: "add" | "edit";
}) => {
  const [attachment, setAttachment] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (props.target) {
      setAttachment(props.target.attachment || []);
    }
  }, [props.target]);

  return (
    <MdDialog
      open={props.isOpen}
      closed={() => {
        props.onOpenChange(false);
      }}
      className="min-w-[800px]"
      cancel={(e) => {
        e.preventDefault();
      }}
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
        <NAOutlinedTextField label="Title" value={props.target?.title || ""} />
        <MdOutlinedTextField
          type="textarea"
          rows={5}
          label="Contents"
          value={props.target?.contents || ""}
        />
        <div className="flex gap-2 items-center">
          <MdOutlinedButton
            className="w-fit"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <MdIcon slot="icon">
              <Upload fontSize="small" />
            </MdIcon>
            Upload
          </MdOutlinedButton>
          <input
            type="file"
            ref={fileInputRef}
            hidden
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setAttachment((prev) => {
                  return [
                    ...prev,
                    ...Array.from(files).map((file) => file.name),
                  ];
                });
              }
            }}
          />
          <MdChipSet>
            {attachment.map((item) => (
              <RemovableChip
                key={item}
                label={item}
                onRemove={() => {
                  setAttachment((prev) => {
                    return prev.filter((i) => i !== item);
                  });
                }}
              />
            ))}
          </MdChipSet>
        </div>
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
