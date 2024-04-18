import { DividerComponent } from "@/app/components/divider";
import { NewBasicTable } from "@/app/components/table/new-table";
import { MdIcon, MdTextButton } from "@/util/md3";
import {
  CompanyType,
  CustomerUserProps,
  CustomerUserStatus,
} from "@/util/typeDef/user";
import { faker } from "@faker-js/faker";
import { Add } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useState } from "react";
import { TableActionButton } from "../../components/table-action-button";
import { MdTypography } from "@/app/components/typography";

function createDummyCustomerUser(): CustomerUserProps {
  return {
    uuid: faker.string.uuid(),
    userId: faker.internet.userName(),
    email: faker.internet.email(),
    updatedAt: DateTime.fromJSDate(faker.date.recent()),
    lastLoginDate: DateTime.fromJSDate(faker.date.recent()),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    status: faker.helpers.enumValue(CustomerUserStatus),
    address: faker.location.streetAddress(),
    country: faker.location.country(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    telNumber: faker.phone.number(),
    faxNumber: faker.phone.number(),
    companyName: faker.company.name(),
    companyType: faker.helpers.enumValue(CompanyType),
    useCustomerCode: faker.helpers.arrayElement(["Yes", "No"]),
    contactOffice: faker.location.city() + ` Branch`,
    tpId: "",
    salesRap: faker.helpers.arrayElement(["Import", "Export", "Both"]),
    rateOption: faker.helpers.arrayElement([
      "Basic",
      "All",
      "Block",
      "All Blocked",
    ]),
    comment: faker.lorem.sentence(),
    customerCode: faker.string.alphanumeric(7).toUpperCase(),
  } as CustomerUserProps;
}

export const CustomerUserTable = () => {
  const dummyData = Array.from({ length: 70 }, () => createDummyCustomerUser());
  const [tableData, setTableData] = useState<CustomerUserProps[]>(dummyData);
  const [selectedUser, setSelectedUser] = useState<CustomerUserProps | null>(
    null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const columnHelper = createColumnHelper<CustomerUserProps>();

  const columDefs = [
    columnHelper.accessor("userId", {
      id: "userId",
      header: "User ID",
      minSize: 120,
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      minSize: 120,
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: "Email",
      minSize: 120,
    }),
    columnHelper.accessor("companyName", {
      id: "companyName",
      header: "Company Name",
      minSize: 120,
    }),
    columnHelper.accessor("companyType", {
      id: "companyType",
      header: "Company Type",
      minSize: 120,
    }),
    columnHelper.accessor("customerCode", {
      id: "customerCode",
      header: "Customer Code",
      minSize: 120,
    }),
    columnHelper.accessor("salesRap", {
      id: "salesRap",
      header: "Trade",
      minSize: 120,
    }),
    columnHelper.accessor("contactOffice", {
      id: "contactOffice",
      header: "Contact Office",
      minSize: 120,
    }),
    columnHelper.accessor("country", {
      id: "country",
      header: "Country",
      minSize: 120,
    }),
    columnHelper.accessor("lastLoginDate", {
      id: "lastLoginDate",
      header: "Last Login Date",
      minSize: 120,
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("updatedAt", {
      id: "updatedAt",
      header: "Update Date",
      minSize: 120,
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
          </MdTypography>
        );
      },
    }),
    columnHelper.display({
      id: "action",
      cell: (info) => {
        return (
          <TableActionButton
            options={["Delete"]}
            onMenuSelect={(option) => {
              console.log(option);
            }}
          />
        );
      },
      size: 52,
      minSize: 52,
      maxSize: 52,
    }),
  ];

  return (
    <>
      <NewBasicTable
        actionComponent={
          <div className="flex flex-1 items-center gap-2">
            <MdTextButton
              onClick={() => {
                setIsAddDialogOpen(true);
              }}
            >
              <MdIcon slot="icon">
                <Add fontSize="small" />
              </MdIcon>
              Add Admin
            </MdTextButton>
            {selectedUser && (
              <>
                <DividerComponent orientation="vertical" className="h-6" />
                <MdTextButton
                  onClick={() => {
                    setIsEditDialogOpen(true);
                  }}
                >
                  Edit
                </MdTextButton>
              </>
            )}
          </div>
        }
        columns={columDefs}
        data={tableData}
        isSingleSelect
        controlColumns={["action"]}
        ignoreSelectionColumns={["action"]}
        getSelectionRows={(rows) => {
          setSelectedUser(rows[0]);
        }}
      />
    </>
  );
};
