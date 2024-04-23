"use client";

import { DateRangePicker } from "@/app/components/datepicker/date-range-picker";
import { PageTitle } from "../../components/page-title";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { EmailType } from "@/util/typeDef/notification";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdFilledButton, MdTextButton } from "@/util/md3";

export default function EmailHistoryPage() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle title="Email Sending History" category="Notification Setup" />
      <div className="flex gap-4">
        <DateRangePicker />
        <NAOutlinedListBox
          label="Type"
          initialValue="All Type"
          options={["All Type", ...Object.values(EmailType)]}
        />
        <NAOutlinedTextField label="Mail Title" className="flex-1" />
      </div>
      <div className="flex gap-4">
        <NAOutlinedTextField label="User ID" />
        <NAOutlinedTextField label="Sender Email" />
        <NAOutlinedTextField label="Receiver" />
        <NAOutlinedTextField label="Mail Key" />
      </div>
      <div className="flex gap-2 justify-end">
        <MdTextButton>Reset</MdTextButton>
        <MdFilledButton>Search</MdFilledButton>
      </div>
      <div className="border border-outlineVariant p-4 rounded-lg"></div>
    </div>
  );
}
