"use client";

import { faker, id_ID } from "@faker-js/faker";
import { PageTitle } from "../../components/page-title";
import { OfficeEmailSettingProps } from "@/util/typeDef/notification";
import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { TableActionButton } from "../../components/table-action-button";
import { BasicTable } from "@/app/components/table/basic-table";

export default function OfficeEmailSettingPage() {
  const tempOfficeEmailSettingData = Array.from(
    { length: 900 },
    (_, i) =>
      ({
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
      cell: (info) => <TableActionButton options={["Delete"]} />,
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
                return <div className="flex-1"></div>;
              }}
              data={tableData}
              columns={columnDefs}
              isSingleSelect
              disableColumns={["officeName"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
