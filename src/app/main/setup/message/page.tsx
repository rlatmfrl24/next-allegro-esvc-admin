"use client";

import { DateTime } from "luxon";
import { PageTitle } from "../../components/page-title";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdFilledButton, MdIcon, MdTextButton } from "@/util/md3";
import { Add } from "@mui/icons-material";
import { MdTypography } from "@/app/components/typography";

const ModuleOptions = [
  "All Module",
  "Booking",
  "Import",
  "Track & Trace",
  "Management Setup",
  "Dumrrage & Detention",
  "Document",
];

const TypeOptions = ["Success", "Error", "Warning", "Confirmation"];

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
          options={ModuleOptions}
        />
        <NAOutlinedTextField className="flex-1" label="Message or ID" />
        <NAOutlinedListBox label="Type" options={TypeOptions} />
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
        <div className="flex">
          <div>table</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
