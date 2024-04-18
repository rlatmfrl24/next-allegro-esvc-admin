import { DividerComponent } from "@/app/components/divider";
import { NewBasicTable } from "@/app/components/table/new-table";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/util/md3";
import {
  AdminUserProps,
  AdminUserStatus,
  AdminUserType,
} from "@/util/typeDef/user";
import { faker } from "@faker-js/faker";
import { Add } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { TableActionButton } from "../../components/table-action-button";
import { AdminUserDialog } from "./dialog";

function createDummyAdminUser(): AdminUserProps {
  return {
    uuid: faker.string.uuid(),
    userId: faker.internet.userName(),
    email: faker.internet.email(),
    updatedAt: DateTime.fromJSDate(faker.date.recent()),
    userName: faker.person.fullName(),
    office: faker.string.alphanumeric(5).toUpperCase(),
    type: faker.helpers.enumValue(AdminUserType),
    status: faker.helpers.enumValue(AdminUserStatus),
    noficication: {
      booking: faker.datatype.boolean(),
      si: faker.datatype.boolean(),
      officeNotification: faker.helpers.arrayElements([
        "Seoul",
        "Busan",
        "Incheon",
        "Vietnam",
        "Singapore",
      ]),
    },
    authorization: {
      userManagement: {
        customerUser: faker.datatype.boolean(),
      },
      noticeManagement: {
        notice: faker.datatype.boolean(),
        regionalContactPerson: faker.datatype.boolean(),
      },
      notificationSetup: {
        emailSetting: faker.datatype.boolean(),
        emailSendingSummary: faker.datatype.boolean(),
        officeGroupEmailSetting: faker.datatype.boolean(),
      },
    },
  };
}

export const AdminUserTable = () => {
  const dummyData = useMemo(() => {
    return Array.from({ length: 70 }, () => createDummyAdminUser());
  }, []);

  const [tableData, setTableData] = useState<AdminUserProps[]>(dummyData);
  const [selectedUser, setSelectedUser] = useState<AdminUserProps | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const columnHelper = createColumnHelper<AdminUserProps>();

  const columnDefs = [
    columnHelper.accessor("userId", {
      id: "userId",
      header: "User ID",
      minSize: 120,
    }),
    columnHelper.accessor("userName", {
      id: "userName",
      header: "User Name",
      minSize: 120,
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: "Email",
      size: 240,
      minSize: 120,
    }),
    columnHelper.accessor("office", {
      id: "office",
      header: "Office",
      minSize: 120,
    }),
    columnHelper.accessor("type", {
      id: "type",
      header: "User Type",
      minSize: 120,
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      cell: (info) => {
        return (
          <MdTypography
            variant="label"
            size="medium"
            className={`px-2 py-1 rounded-lg w-fit ${
              info.getValue() === AdminUserStatus.Confirm
                ? "bg-primaryContainer text-onPrimaryContainer"
                : "bg-surfaceContainerHigh"
            }`}
          >
            {info.getValue()}
          </MdTypography>
        );
      },
      minSize: 120,
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
                setTableData((prev) =>
                  prev.filter((item) => item.uuid !== info.row.original.uuid)
                );
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
        data={tableData}
        columns={columnDefs}
        isSingleSelect
        controlColumns={["action"]}
        ignoreSelectionColumns={["action"]}
        getSelectionRows={(rows) => {
          setSelectedUser(rows[0]);
        }}
      />
      {isAddDialogOpen && (
        <AdminUserDialog
          isOpen={isAddDialogOpen}
          mode="add"
          onOpenChage={() => {
            setIsAddDialogOpen(false);
          }}
          onConfirm={(data) => {
            setSelectedUser(null);
            setTableData((prev) => [data, ...prev]);
          }}
        />
      )}
      {selectedUser && isEditDialogOpen && (
        <AdminUserDialog
          isOpen={isEditDialogOpen}
          mode="edit"
          onOpenChage={() => {
            setIsEditDialogOpen(false);
          }}
          initialData={selectedUser}
          onConfirm={(data) => {
            setSelectedUser(data);
            setTableData((prev) =>
              prev.map((item) =>
                item.uuid === data.uuid ? { ...item, ...data } : item
              )
            );
          }}
        />
      )}
    </>
  );
};
