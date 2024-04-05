"use client";

import { DateTime } from "luxon";
import { PageTitle } from "../../components/page-title";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import {
  MdFilledButton,
  MdIcon,
  MdOutlinedTextField,
  MdTextButton,
} from "@/util/md3";
import { Add } from "@mui/icons-material";
import { MdTypography } from "@/app/components/typography";
import { MessageModule, MessageType } from "@/util/typeDef/message";

// const ModuleOptions = [
//   "All Module",
//   "Booking",
//   "Import",
//   "Track & Trace",
//   "Management Setup",
//   "Dumrrage & Detention",
//   "Document",
// ];

// const TypeOptions = ["Success", "Error", "Warning", "Confirmation"];

export default function MessageManagementSetup() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle
        title="Message Management"
        category="Setting up of System"
        updatedDate={DateTime.now()}
      />
      <div aria-label="contdition-area" className="flex gap-4 items-center">
        <NAOutlinedListBox
          label="Module"
          initialValue="All Module"
          options={Object.values(MessageModule)}
        />
        <NAOutlinedTextField className="flex-1" label="Message or ID" />
        <NAOutlinedListBox label="Type" options={Object.values(MessageType)} />
      </div>
      <div className="flex items-center justify-end gap-2">
        <MdTextButton>Reset</MdTextButton>
        <MdFilledButton>Search</MdFilledButton>
      </div>
      <div className="px-6 py-4 rounded-lg border border-outlineVariant flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <MdTextButton>
            <MdIcon slot="icon">
              <Add fontSize="small" />
            </MdIcon>
            Add Message
          </MdTextButton>
          <MdTypography variant="label" size="large" className="text-outline">
            Total: 0
          </MdTypography>
        </div>
        <div className="flex gap-8 flex-1 ">
          <div className="basis-2/3">table</div>
          <div className="basis-1/3 px-6 py-4 rounded-lg h-full flex flex-col gap-4 bg-surface border-2 border-secondaryContainer">
            <MdTypography variant="label" size="large" prominent>
              Language Detail
            </MdTypography>
            <MdOutlinedTextField
              label="English"
              className="flex-1 resize-none"
              type="textarea"
              placeholder="Notify name, Notify Address is mandatory field."
            />
            <MdOutlinedTextField
              label="Korean"
              className="flex-1 resize-none"
              type="textarea"
              placeholder="이름, 주소는 필수 입력란입니다."
            />
            <MdOutlinedTextField
              label="Japanese"
              className="flex-1 resize-none"
              type="textarea"
              placeholder="通知名、通知先は必須項目です。"
            />
            <MdOutlinedTextField
              label="Chinese"
              className="flex-1 resize-none"
              type="textarea"
              placeholder="通知名称、通知地址为必填字段。"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
