"use client";

import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { PageTitle } from "../../components/page-title";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { faker } from "@faker-js/faker";
import { useMemo } from "react";
import { MdFilledButton, MdTextButton } from "@/util/md3";

export default function AdminUserPage() {
  const tempOfficeOptions = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) =>
      faker.string.alphanumeric(7).toUpperCase()
    );
  }, []);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle title="Admin User" category="User Management" />
      <div className="flex gap-4">
        <NAOutlinedTextField label="User ID or Name" className="flex-1" />
        <NAOutlinedListBox
          label="Office"
          options={["All Office", ...tempOfficeOptions]}
          initialValue="All Office"
        />
        <NAOutlinedListBox
          label="User Type"
          options={["All Type"]}
          initialValue="All Type"
        />
        <NAOutlinedListBox
          label="Status"
          options={["All Status"]}
          initialValue="All Status"
        />
      </div>
      <div className="flex gap-2">
        <MdTextButton>Reset</MdTextButton>
        <MdFilledButton>Search</MdFilledButton>
      </div>
    </div>
  );
}
