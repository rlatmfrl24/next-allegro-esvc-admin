"use client";

import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { PageTitle } from "../../components/page-title";
import { DatePicker } from "@/app/components/datepicker/date-picker";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import { CompanyType, CustomerUserStatus } from "@/util/typeDef/user";
import {
  MdFilledButton,
  MdIcon,
  MdOutlinedTextField,
  MdTextButton,
} from "@/util/md3";
import { CustomerUserTable } from "./table";
import { DateTime } from "luxon";
import { Search } from "@mui/icons-material";
import { CustomerCodeSearch } from "./dialog";

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

  const [isCustomerCodeSearchOpen, setIsCustomerCodeSearchOpen] =
    useState(false);
  const [searchCondition, setSearchCondition] = useState({
    dateType: "Lastest Login Date",
    date: DateTime.now(),
    userId: "",
    status: "All",
    email: "",
    rhq: "All",
    office: "All",
    country: "All",
    userCustomerCode: "All",
    customerCode: "",
    companyName: "",
    companyType: "All",
  });

  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle title="Customer User" category="User Management" />
      <div className="flex gap-4">
        <CustomerCodeSearch
          isOpen={isCustomerCodeSearchOpen}
          onOpenChange={setIsCustomerCodeSearchOpen}
          onConfirm={(value) => {
            setSearchCondition({
              ...searchCondition,
              customerCode: value.customerCode,
            });
          }}
        />
        <div className="flex gap-2">
          <NAOutlinedListBox
            className="w-44"
            label="Date"
            initialValue={searchCondition.dateType}
            options={["Update Date", "Lastest Login Date"]}
            onSelection={(value) =>
              setSearchCondition({ ...searchCondition, dateType: value })
            }
          />
          <DatePicker
            className="w-44"
            initialDate={searchCondition.date}
            onDateChange={(date) =>
              setSearchCondition({ ...searchCondition, date })
            }
          />
        </div>
        <NAOutlinedTextField
          label="User ID"
          value={searchCondition.userId}
          handleValueChange={(value) => {
            setSearchCondition({ ...searchCondition, userId: value });
          }}
        />
        <NAOutlinedListBox
          label="Status"
          initialValue={searchCondition.status}
          options={["All", ...Object.values(CustomerUserStatus)]}
          onSelection={(value) =>
            setSearchCondition({ ...searchCondition, status: value })
          }
        />

        <NAOutlinedTextField
          label="Email"
          value={searchCondition.email}
          handleValueChange={(value) => {
            setSearchCondition({ ...searchCondition, email: value });
          }}
        />
        <div className="flex gap-2">
          <NAOutlinedListBox
            className="w-36"
            label="RHQ / Office"
            initialValue={searchCondition.rhq}
            options={["All", ...tempCodeSet]}
            onSelection={(value) => {
              setSearchCondition({ ...searchCondition, rhq: value });
            }}
          />
          <NAOutlinedListBox
            className="w-36"
            readOnly={searchCondition.rhq === "All"}
            initialValue={searchCondition.office}
            options={["All", ...tempCodeSet]}
            onSelection={(value) => {
              setSearchCondition({ ...searchCondition, office: value });
            }}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <NAOutlinedListBox
          label="Country"
          className="w-44"
          initialValue={searchCondition.country}
          options={["All", ...tempCountrySet]}
          onSelection={(value) =>
            setSearchCondition({ ...searchCondition, country: value })
          }
        />
        <div className="flex gap-2">
          <NAOutlinedListBox
            className="w-36"
            label="User Customer Code"
            initialValue={searchCondition.userCustomerCode}
            options={["All", "Yes", "No"]}
            onSelection={(value) => {
              setSearchCondition({
                ...searchCondition,
                userCustomerCode: value,
              });
            }}
          />
          <MdOutlinedTextField
            readOnly
            label="Customer Code"
            hasTrailingIcon
            value={searchCondition.customerCode}
            onClick={() => {
              setIsCustomerCodeSearchOpen(true);
            }}
          >
            <MdIcon slot="trailing-icon">
              <Search />
            </MdIcon>
          </MdOutlinedTextField>
        </div>
        <NAOutlinedTextField
          label="Company Name"
          className="flex-1"
          value={searchCondition.companyName}
          handleValueChange={(value) => {
            setSearchCondition({ ...searchCondition, companyName: value });
          }}
        />
        <NAOutlinedListBox
          label="Company Type"
          className="flex-1"
          options={["All", ...(Object.values(CompanyType) as string[])]}
          initialValue={searchCondition.companyType}
          onSelection={(value) =>
            setSearchCondition({ ...searchCondition, companyType: value })
          }
        />
      </div>
      <div className="flex gap-2 justify-end">
        <MdTextButton
          onClick={() => {
            setSearchCondition({
              dateType: "Lastest Login Date",
              date: DateTime.now(),
              userId: "",
              status: "All",
              email: "",
              rhq: "All",
              office: "All",
              country: "All",
              userCustomerCode: "All",
              customerCode: "",
              companyName: "",
              companyType: "All",
            });
          }}
        >
          Reset
        </MdTextButton>
        <MdFilledButton
          onClick={() => {
            console.log(searchCondition);
          }}
        >
          Search
        </MdFilledButton>
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
