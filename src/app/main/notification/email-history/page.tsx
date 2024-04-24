"use client";

import { DateRangePicker } from "@/app/components/datepicker/date-range-picker";
import { PageTitle } from "../../components/page-title";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import {
  EmailSendingHistoryProps,
  EmailType,
} from "@/util/typeDef/notification";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdFilledButton, MdIcon, MdTextButton } from "@/util/md3";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { BasicTable } from "@/app/components/table/basic-table";
import { Download } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";
import { modifiedDetectState } from "@/store/base.store";

export default function EmailHistoryPage() {
  const tempEmailHistoryData = Array.from(
    { length: 900 },
    (_, i) =>
      ({
        uuid: faker.string.uuid(),
        sentDate: DateTime.fromJSDate(faker.date.recent()),
        type: faker.helpers.arrayElement(Object.values(EmailType)),
        title: faker.lorem.sentence(),
        userId: faker.internet.userName(),
        senderEmail: faker.internet.email(),
        receiverEmail: faker.internet.email(),
        mailKey: faker.database.mongodbObjectId(),
      } as EmailSendingHistoryProps)
  );
  const [tableData, setTableData] =
    useState<EmailSendingHistoryProps[]>(tempEmailHistoryData);
  const columnHelper = createColumnHelper<EmailSendingHistoryProps>();
  const modifiedDetect = useSetRecoilState(modifiedDetectState);

  useEffect(() => {
    if (tableData !== tempEmailHistoryData) {
      modifiedDetect(true);
    } else {
      modifiedDetect(false);
    }
  }, [modifiedDetect, tableData, tempEmailHistoryData]);

  useEffect(() => {
    modifiedDetect(false);
  }, [modifiedDetect]);

  const columnDefs = [
    columnHelper.accessor("sentDate", {
      id: "sentDate",
      header: "Sent Date",
      cell: (info) => info.getValue().toFormat("yyyy-MM-dd"),
      size: 120,
    }),
    columnHelper.accessor("type", { id: "type", header: "Type", size: 150 }),
    columnHelper.accessor("title", {
      id: "title",
      header: "Email Title",
      size: 360,
    }),
    columnHelper.accessor("userId", {
      id: "userId",
      header: "User ID",
      size: 160,
    }),
    columnHelper.accessor("senderEmail", {
      id: "senderEmail",
      header: "Sender Email",
      size: 240,
    }),
    columnHelper.accessor("receiverEmail", {
      id: "receiverEmail",
      header: "Receiver",
      size: 240,
    }),
    columnHelper.accessor("mailKey", {
      id: "mailKey",
      header: "Mail Key",
    }),
  ];

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
      <div className="px-6 py-4 rounded-lg border border-outlineVariant flex flex-col flex-1">
        <div className="relative flex gap-8 flex-1 w-full">
          <div className="basis-0 flex-auto w-0">
            <BasicTable
              ActionComponent={() => {
                return (
                  <div className="flex-1">
                    <MdTextButton>
                      <MdIcon slot="icon">
                        <Download fontSize="small" />
                      </MdIcon>
                      Download
                    </MdTextButton>
                  </div>
                );
              }}
              columns={columnDefs}
              data={tableData}
              isSingleSelect
            />
          </div>
        </div>
      </div>
    </div>
  );
}
