"use client";

import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { PageTitle } from "../../components/page-title";
import { DatePicker } from "@/app/components/datepicker/date-picker";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { useMemo } from "react";
import { faker } from "@faker-js/faker";
import { CompanyType, CustomerUserStatus } from "@/util/typeDef/user";
import { MdFilledButton, MdTextButton } from "@/util/md3";
import { CustomerUserTable } from "./table";

export default function CustomerUserPage() {
  const tempCodeSet = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      return faker.string.alphanumeric(7).toUpperCase();
    });
  }, []);

  const tempCountrySet = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      return faker.location.country();
    })
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort();
  }, []);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle title="Customer User" category="User Management" />
      <div className="flex gap-4">
        <div className="flex gap-2">
          <NAOutlinedListBox
            className="w-44"
            initialValue="Update Date"
            options={["Update Date", "Lastest Login Date"]}
          />
          <DatePicker className="w-44" />
        </div>
        <NAOutlinedTextField label="User ID" />
        <NAOutlinedListBox
          label="Status"
          initialValue="All"
          options={["All", ...Object.values(CustomerUserStatus)]}
        />

        <NAOutlinedTextField label="Email " />
        <div className="flex gap-2">
          <NAOutlinedListBox
            className="w-36"
            label="RHQ / Office"
            initialValue="All"
            options={["All", ...tempCodeSet]}
          />
          <NAOutlinedListBox
            className="w-36"
            initialValue="All"
            options={["All", ...tempCodeSet]}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <NAOutlinedListBox
          label="Country"
          className="w-44"
          initialValue="All"
          options={["All", ...tempCountrySet]}
        />
        <div className="flex gap-2">
          <NAOutlinedListBox
            className="w-36"
            label="User Customer Code"
            initialValue="All"
            options={["All", "Yes", "No"]}
          />
          <NAOutlinedTextField placeholder="Customer Code" />
        </div>
        <NAOutlinedTextField label="Company Name" className="flex-1" value="" />
        <NAOutlinedListBox
          label="Company Type"
          className="flex-1"
          options={Object.values(CompanyType)}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <MdTextButton>Reset</MdTextButton>
        <MdFilledButton>Search</MdFilledButton>
      </div>
      <div className="px-6 py-4 rounded-lg border border-outlineVariant flex flex-1">
        <div className="relative flex flex-1 w-full">
          <div className="basis-0 flex-auto w-0">
            <CustomerUserTable />
          </div>
        </div>
      </div>
    </div>
  );
}
