"use client";

import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { PageTitle } from "../../components/page-title";
import { EmailSettingProps, EmailType } from "@/util/typeDef/notification";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdFilledButton, MdIcon, MdTextButton } from "@/util/md3";
import { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";
import { BasicTable } from "@/app/components/table/basic-table";
import { TableActionButton } from "../../components/table-action-button";
import { GridSelectComponent } from "@/app/sections/components/grid-select";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { Add } from "@mui/icons-material";

export default function EmailSettingPage() {
  const tempEmailSettingData = useMemo(() => {
    return Array.from(
      { length: 900 },
      (_, i) =>
        ({
          uuid: faker.string.uuid(),
          type: faker.helpers.arrayElement(Object.values(EmailType)),
          template: faker.string.alphanumeric(7).toUpperCase(),
          title: faker.lorem.sentence(),
          senderName: faker.person.fullName(),
          senderEmail: faker.internet.email(),
        } as EmailSettingProps)
    );
  }, []);

  const tempTemplageDataset = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) =>
      faker.string.alphanumeric(7).toUpperCase()
    );
  }, []);

  const columnHelper = createColumnHelper<EmailSettingProps>();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [target, setTarget] = useState<EmailSettingProps | null>(null);
  const [tableData, setTableData] =
    useState<EmailSettingProps[]>(tempEmailSettingData);
  const columnDefs = [
    columnHelper.accessor("type", {
      id: "type",
      header: "Type",
      cell: (info) => {
        return (
          <GridSelectComponent
            initialSelection={info.getValue() || "None"}
            options={Object.values(EmailType)}
            onChange={(value) => {
              info.table.options.meta?.updateData(
                info.row.index,
                "type",
                value
              );
            }}
          />
        );
      },
      size: 200,
    }),
    columnHelper.accessor("template", {
      id: "template",
      header: "Template",
      size: 160,
      cell: (info) => {
        return (
          <GridSelectComponent
            initialSelection={info.getValue() || "None"}
            options={tempTemplageDataset}
            onChange={(value) => {
              info.table.options.meta?.updateData(
                info.row.index,
                "template",
                value
              );
            }}
          />
        );
      },
    }),
    columnHelper.accessor("title", {
      id: "title",
      header: "Title",
      size: 560,
    }),
    columnHelper.accessor("senderName", {
      id: "senderName",
      header: "Sender Name",
      size: 240,
    }),
    columnHelper.accessor("senderEmail", {
      id: "senderEmail",
      header: "Sender Email",
      size: 240,
    }),
    columnHelper.display({
      id: "action",
      cell: (info) => {
        return (
          <>
            <TableActionButton
              options={["Delete"]}
              onMenuSelect={() => {
                setTarget(info.row.original);
                setIsConfirmDialogOpen(true);
              }}
            />
          </>
        );
      },
      size: 56,
    }),
  ];

  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle title="Email Setting" category="Notification Setup" />
      <div className="flex gap-4">
        <NAOutlinedListBox
          label="Type"
          initialValue="All"
          options={["All", ...Object.values(EmailType)]}
        />
        <NAOutlinedTextField className="flex-1" label="Email Title" />
        <NAOutlinedTextField label="Sender Name" />
      </div>
      <div className="flex gap-2 justify-end">
        <MdTextButton>Reset</MdTextButton>
        <MdFilledButton>Search</MdFilledButton>
      </div>
      <div className="border border-outlineVariant rounded-lg p-4">
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
          title="Delete Email Setting"
          onConfirm={() => {
            setTableData((prev) =>
              prev.filter((data) => data.uuid !== target?.uuid)
            );
            setTarget(null);
          }}
        />
        <BasicTable
          ActionComponent={() => {
            return (
              <div className="flex-1">
                <MdTextButton
                  onClick={() => {
                    setTableData((prev) => [
                      {
                        uuid: faker.string.uuid(),
                        title: "",
                        senderName: "",
                        senderEmail: "",
                      } as EmailSettingProps,
                      ...prev,
                    ]);
                  }}
                >
                  <MdIcon slot="icon">
                    <Add fontSize="small" />
                  </MdIcon>
                  Add Email
                </MdTextButton>
              </div>
            );
          }}
          data={tableData}
          columns={columnDefs}
          ignoreSelectionColumns={["template", "action "]}
          editableColumns={["title", "senderName", "senderEmail"]}
          isSingleSelect
          updater={setTableData}
        />
      </div>
    </div>
  );
}
