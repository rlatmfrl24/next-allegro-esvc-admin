import { DividerComponent } from "@/app/components/divider";
import { BasicTable } from "@/app/components/table/basic-table";
import {
  MdDialog,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdTextButton,
} from "@/util/md3";
import {
  CompanyType,
  CustomerUserProps,
  CustomerUserStatus,
} from "@/util/typeDef/user";
import { faker } from "@faker-js/faker";
import { Add, Launch } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { TableActionButton } from "../../components/table-action-button";
import { MdTypography } from "@/app/components/typography";
import Link from "next/link";
import { CustomerActionDialog } from "./dialog";
import { useSetRecoilState } from "recoil";
import { modifiedDetectState } from "@/store/base.store";

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
    password: faker.internet.password(),
  } as CustomerUserProps;
}

export const CustomerUserTable = () => {
  const dummyData = useMemo(() => {
    return Array.from({ length: 70 }, () => createDummyCustomerUser());
  }, []);

  const [initialData, setInitialData] =
    useState<CustomerUserProps[]>(dummyData);
  const [tableData, setTableData] = useState<CustomerUserProps[]>(dummyData);
  const [selectedUser, setSelectedUser] = useState<CustomerUserProps | null>(
    null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    useState(false);
  const columnHelper = createColumnHelper<CustomerUserProps>();
  const modifiedDetect = useSetRecoilState(modifiedDetectState);

  useEffect(() => {
    if (initialData !== tableData) {
      if (tableData.length < initialData.length) {
        modifiedDetect(false);
      } else {
        for (let i = 0; i < tableData.length; i++) {
          if (
            tableData[i].userId !== initialData[i].userId ||
            tableData[i].status !== initialData[i].status ||
            tableData[i].email !== initialData[i].email ||
            tableData[i].companyName !== initialData[i].companyName ||
            tableData[i].companyType !== initialData[i].companyType ||
            tableData[i].customerCode !== initialData[i].customerCode ||
            tableData[i].salesRap !== initialData[i].salesRap ||
            tableData[i].contactOffice !== initialData[i].contactOffice ||
            tableData[i].country !== initialData[i].country ||
            tableData[i].lastLoginDate !== initialData[i].lastLoginDate ||
            tableData[i].updatedAt !== initialData[i].updatedAt
          ) {
            modifiedDetect(true);
            break;
          }
        }
      }
    }

    setInitialData(tableData);
  }, [initialData, modifiedDetect, tableData]);

  const DeleteConfirmDialog = ({
    isOpen,
    onOpenChage,
    targetUser,
  }: {
    isOpen: boolean;
    onOpenChage: Dispatch<SetStateAction<boolean>>;
    targetUser: CustomerUserProps;
  }) => {
    return (
      <MdDialog
        open={isOpen}
        closed={() => {
          onOpenChage(false);
        }}
      >
        <div slot="headline">Do you want to delete the customer user?</div>
        <div slot="content">{targetUser.userId}</div>
        <div slot="actions">
          <MdTextButton
            onClick={() => {
              onOpenChage(false);
            }}
          >
            Cancel
          </MdTextButton>
          <MdFilledButton
            onClick={() => {
              onOpenChage(false);
              setTableData((prev) =>
                prev.filter((item) => item.uuid !== targetUser.uuid)
              );
            }}
          >
            OK
          </MdFilledButton>
        </div>
      </MdDialog>
    );
  };

  const columDefs = [
    columnHelper.accessor("userId", {
      id: "userId",
      header: "User ID",
      minSize: 240,
      cell: (info) => {
        return (
          <div className="flex items-center gap-2 justify-between">
            <MdTypography variant="body" size="medium">
              {info.getValue()}
            </MdTypography>
            <Link
              href={`https://next-allegro-esvc-md3.vercel.app/main/dashboard`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MdIconButton>
                <MdIcon>
                  <Launch />
                </MdIcon>
              </MdIconButton>
            </Link>
          </div>
        );
      },
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      minSize: 120,
      cell: (info) => {
        const bgColor = {
          [CustomerUserStatus.newRegist]: "bg-surfaceContainerHigh",
          [CustomerUserStatus.update]: "bg-surfaceContainerHigh",
          [CustomerUserStatus.confirm]: "bg-[#B4F1BD]",
          [CustomerUserStatus.rejectForRegist]: "bg-errorContainer text-error",
          [CustomerUserStatus.rejectForUpdate]: "bg-errorContainer text-error",
          [CustomerUserStatus.block]: "bg-errorContainer text-error",
          [CustomerUserStatus.withdraw]: "bg-errorContainer text-error",
        }[info.getValue()];

        return (
          <MdTypography
            variant="label"
            size="medium"
            className={`px-2 py-1 rounded-lg w-fit ${bgColor}`}
          >
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: "Email",
      minSize: 120,
      size: 200,
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
            {info.getValue()?.toFormat("yyyy-MM-dd HH:mm") || "Not Login Yet"}
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
              if (option === "Delete") {
                setIsDeleteConfirmDialogOpen(true);
                setSelectedUser(info.row.original);
              }
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
      <DeleteConfirmDialog
        isOpen={isDeleteConfirmDialogOpen}
        onOpenChage={setIsDeleteConfirmDialogOpen}
        targetUser={selectedUser || ({} as CustomerUserProps)}
      />
      <BasicTable
        ActionComponent={(table) => {
          return (
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
              {isAddDialogOpen && (
                <CustomerActionDialog
                  isOpen={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                  mode="add"
                  onConfirm={(data) => {
                    setTableData((prev) => [data, ...prev]);
                  }}
                />
              )}
              {isEditDialogOpen && (
                <CustomerActionDialog
                  isOpen={isEditDialogOpen}
                  onOpenChange={setIsEditDialogOpen}
                  mode="edit"
                  targetUser={selectedUser || ({} as CustomerUserProps)}
                  onConfirm={(data) => {
                    const rowIndex = tableData.findIndex(
                      (item) => item.uuid === data.uuid
                    );
                    rowIndex !== -1 &&
                      table.options.meta?.updateRow(rowIndex, data);
                  }}
                />
              )}
            </div>
          );
        }}
        columns={columDefs}
        data={tableData}
        isSingleSelect
        controlColumns={["action"]}
        ignoreSelectionColumns={["action", "userId"]}
        getSelectionRows={(rows) => {
          setSelectedUser(rows[0]);
        }}
        updater={setTableData}
      />
    </>
  );
};
