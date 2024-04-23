"use client";

import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { PageTitle } from "../components/page-title";
import { MdFilledButton, MdIcon, MdTextButton } from "@/util/md3";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import { BasicTable } from "@/app/components/table/basic-table";
import { createColumnHelper } from "@tanstack/react-table";
import { TableActionButton } from "../components/table-action-button";
import { Add } from "@mui/icons-material";
import { ConfirmDialog } from "../components/confirm-dialog";

export default function NoticeManagement() {
  type NoticeProps = {
    uuid: string;
    title: string;
    attachment: string;
    postedBy: string;
    updatedAt: DateTime;
  };

  const tempNoticeList = useMemo<NoticeProps[]>(() => {
    return Array.from({ length: 900 }, (_, index) => ({
      uuid: faker.string.uuid(),
      title: faker.lorem.sentence(),
      attachment: faker.system.fileName(),
      postedBy: faker.internet.userName(),
      updatedAt: DateTime.fromJSDate(faker.date.recent()),
    }));
  }, []);

  const [tableData, setTableData] = useState<NoticeProps[]>(tempNoticeList);
  const [selectedNotice, setSelectedNotice] = useState<NoticeProps | null>(
    null
  );
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const columnHelper = createColumnHelper<NoticeProps>();
  const columnDefs = [
    columnHelper.accessor("title", {
      id: "title",
      header: "Title",
      size: 540,
    }),
    columnHelper.accessor("attachment", {
      id: "attachment",
      header: "Attachment",
      size: 540,
    }),
    columnHelper.accessor("postedBy", {
      id: "postedBy",
      header: "Posted By",
      size: 144,
    }),
    columnHelper.accessor("updatedAt", {
      id: "updatedAt",
      header: "Updated At",
      cell: (info) => {
        return info.getValue().toFormat("yyyy-MM-dd HH:mm:ss");
      },
      size: 160,
    }),
    columnHelper.display({
      id: "action",
      cell: (info) => {
        return (
          <TableActionButton
            options={["Delete"]}
            onMenuSelect={(option) => {
              console.log(option);
              if (option === "Delete") {
                setSelectedNotice(info.row.original);
                setIsDeleteConfirmOpen(true);
              }
            }}
          />
        );
      },
      size: 56,
    }),
  ];

  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle title="Notice Management" />
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        title="Do you want to delete this notice?"
        message={selectedNotice?.title}
        onConfirm={() => {
          if (selectedNotice) {
            setTableData((prev) =>
              prev.filter((item) => item.uuid !== selectedNotice.uuid)
            );
          }
          setIsDeleteConfirmOpen(false);
        }}
      />
      <div className="flex gap-4 w-full">
        <NAOutlinedTextField className="flex-1" label="Title" />
        <NAOutlinedTextField className="flex-1" label="Contents" />
        <NAOutlinedTextField className="flex-1" label="Posted by" />
      </div>
      <div className="flex gap-2 justify-end">
        <MdTextButton>Reset</MdTextButton>
        <MdFilledButton>Search</MdFilledButton>
      </div>
      <div className="border border-outlineVariant rounded-lg p-4">
        <BasicTable
          actionComponent={
            <div className="flex-1">
              <MdTextButton hasIcon>
                <MdIcon slot="icon">
                  <Add fontSize="small" />
                </MdIcon>
                Add Notice
              </MdTextButton>
            </div>
          }
          columns={columnDefs}
          data={tableData}
          isSingleSelect
        />
      </div>
    </div>
  );
}
