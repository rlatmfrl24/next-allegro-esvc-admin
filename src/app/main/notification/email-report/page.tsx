"use client";

import { DateRangePicker } from "@/app/components/datepicker/date-range-picker";
import { PageTitle } from "../../components/page-title";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import {
  EmailSendingReportProps,
  EmailType,
} from "@/util/typeDef/notification";
import { MdFilledButton, MdIcon, MdTextButton } from "@/util/md3";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { BasicTable } from "@/app/components/table/basic-table";
import { Download } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";
import { modifiedDetectState } from "@/store/base.store";

export default function EmailReportPage() {
  const tempEmailSendingReportData = Array.from(
    { length: 900 },
    (_, i) =>
      ({
        sentDate: {
          from: DateTime.fromJSDate(faker.date.past()),
          to: DateTime.fromJSDate(faker.date.recent()),
        },
        type: faker.helpers.arrayElement(Object.values(EmailType)),
        totalSent: faker.number.int(100),
      } as EmailSendingReportProps)
  );

  const [tableData, setTableData] = useState<EmailSendingReportProps[]>(
    tempEmailSendingReportData
  );
  const columnHelper = createColumnHelper<EmailSendingReportProps>();
  const modifiedDetect = useSetRecoilState(modifiedDetectState);

  useEffect(() => {
    if (tableData !== tempEmailSendingReportData) {
      modifiedDetect(true);
    } else {
      modifiedDetect(false);
    }
  }, [modifiedDetect, tableData, tempEmailSendingReportData]);

  useEffect(() => {
    modifiedDetect(false);
  }, [modifiedDetect]);

  const columnDefs = [
    columnHelper.accessor("sentDate", {
      id: "sentDate",
      header: "Sent Date",
      cell: (info) => {
        return `${info.getValue().from.toFormat("yyyy-MM-dd")} ~ ${info
          .getValue()
          .to.toFormat("yyyy-MM-dd")}`;
      },
    }),
    columnHelper.accessor("type", { id: "type", header: "Type" }),
    columnHelper.accessor("totalSent", {
      id: "totalSent",
      header: "Total Sent",
      cell: (info) => <div className="text-right">{info.getValue()}</div>,
    }),
  ];

  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle title="Email Sending Report" category="Notification Setup" />
      <div className="flex gap-4">
        <DateRangePicker label="Sent Date" />
        <NAOutlinedListBox
          initialValue="All Type"
          options={["All Type", ...Object.values(EmailType)]}
        />
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
              data={tableData}
              columns={columnDefs}
              isSingleSelect
            />
          </div>
        </div>
      </div>
    </div>
  );
}
