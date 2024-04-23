"use client";

import { faker } from "@faker-js/faker";
import { PageTitle } from "../../components/page-title";
import { OfficeEmailSettingProps } from "@/util/typeDef/notification";
import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { TableActionButton } from "../../components/table-action-button";
import { BasicTable } from "@/app/components/table/basic-table";
import { OfficeCodeSearchDialog } from "./dialog";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/util/md3";
import { Add, Search } from "@mui/icons-material";

const OffcieCodeCell = (info: any) => {
  const [isOfficeCodeSearchDialogOpen, setIsOfficeCodeSearchDialogOpen] =
    useState(false);

  return (
    <>
      <OfficeCodeSearchDialog
        isOpen={isOfficeCodeSearchDialogOpen}
        onOpenChange={setIsOfficeCodeSearchDialogOpen}
        onApply={(selectedRow) => {
          info.table.options.meta?.updateData(
            info.row.index,
            "officeCode",
            selectedRow.officeCode
          );
          info.table.options.meta?.updateData(
            info.row.index,
            "officeName",
            selectedRow.officeName
          );
        }}
      />
      {info.getValue() !== "" ? (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer"
          onClick={() => setIsOfficeCodeSearchDialogOpen(true)}
        >
          {info.getValue()}
        </MdTypography>
      ) : (
        <div
          className="flex items-center cursor-pointer h-full"
          onClick={() => {
            setIsOfficeCodeSearchDialogOpen(true);
          }}
        >
          <MdTypography
            variant="body"
            size="medium"
            className="flex-1 text-outlineVariant"
          >
            Office Code
          </MdTypography>
          <MdIcon>
            <Search fontSize="small" />
          </MdIcon>
        </div>
      )}
    </>
  );
};

export default function OfficeEmailSettingPage() {
  const tempOfficeEmailSettingData = Array.from(
    { length: 900 },
    (_, i) =>
      ({
        uuid: faker.string.uuid(),
        officeCode: faker.string.alphanumeric(5).toUpperCase(),
        officeName: faker.company.name(),
        bookingNotificationReceiver: faker.internet.email(),
        siNotificationReceiver: faker.internet.email(),
      } as OfficeEmailSettingProps)
  );
  const [tableData, setTableData] = useState<OfficeEmailSettingProps[]>(
    tempOfficeEmailSettingData
  );

  const columnHelper = createColumnHelper<OfficeEmailSettingProps>();
  const columnDefs = [
    columnHelper.accessor("officeCode", {
      id: "officeCode",
      header: "Office Code",
      size: 120,
      cell: (info) => <OffcieCodeCell {...info} />,
    }),
    columnHelper.accessor("officeName", {
      id: "officeName",
      header: "Office Name",
      size: 240,
    }),
    columnHelper.accessor("bookingNotificationReceiver", {
      id: "bookingNotificationReceiver",
      header: "Booking Notification Receiver",
      size: 300,
    }),
    columnHelper.accessor("siNotificationReceiver", {
      id: "siNotificationReceiver",
      header: "SI Notification Receiver",
      size: 300,
    }),
    columnHelper.display({
      id: "action",
      cell: (info) => (
        <TableActionButton
          options={["Delete"]}
          onMenuSelect={(option) => {
            if (option === "Delete") {
              const newData = tableData.filter(
                (data) => data.uuid !== info.row.original.uuid
              );
              setTableData(newData);
            }
          }}
        />
      ),
      size: 56,
      maxSize: 56,
    }),
  ];

  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle
        title="Office Email Setting (Booking & S/I)"
        category="Notification Setup"
      />

      <div className="px-6 py-4 rounded-lg border border-outlineVariant flex flex-col flex-1">
        <div className="relative flex gap-8 flex-1 w-full">
          <div className="basis-0 flex-auto w-0">
            <BasicTable
              ActionComponent={() => {
                return (
                  <div className="flex-1">
                    <MdTextButton
                      onClick={() => {
                        const newOfficeEmailSettingData = {
                          uuid: faker.string.uuid(),
                          officeCode: "",
                          officeName: "",
                          bookingNotificationReceiver: "",
                          siNotificationReceiver: "",
                        };
                        setTableData([newOfficeEmailSettingData, ...tableData]);
                      }}
                    >
                      <MdIcon slot="icon">
                        <Add fontSize="small" />
                      </MdIcon>
                      Add Office Email
                    </MdTextButton>
                  </div>
                );
              }}
              data={tableData}
              columns={columnDefs}
              isSingleSelect
              disableColumns={["officeName"]}
              editableColumns={[
                "bookingNotificationReceiver",
                "siNotificationReceiver",
              ]}
              updater={setTableData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
