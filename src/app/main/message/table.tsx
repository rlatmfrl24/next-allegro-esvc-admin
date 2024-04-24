import { useEffect, useMemo, useState } from "react";

import { BasicTable } from "@/app/components/table/basic-table";
import { GridSelectComponent } from "@/app/sections/components/grid-select";
import { MdIcon, MdTextButton } from "@/util/md3";
import {
  MessageModule,
  MessageProps,
  MessageType,
} from "@/util/typeDef/message";
import { Add } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";

import { createDummyMessageDataset } from "./util";
import { MdTypography } from "@/app/components/typography";
import { GridStateSelectComponent } from "./components";
import { TableActionButton } from "../components/table-action-button";
import { ConfirmDialog } from "../components/confirm-dialog";
import { faker } from "@faker-js/faker";
import { useSetRecoilState } from "recoil";
import { modifiedDetectState } from "@/store/base.store";

export const MessageManagementTable = ({
  onMessageSelect,
}: {
  onMessageSelect?: (message: MessageProps) => void;
}) => {
  const initialData = useMemo(() => createDummyMessageDataset(), []);
  const columnHelper = createColumnHelper<MessageProps>();
  const modifiedDetect = useSetRecoilState(modifiedDetectState);
  const [tableData, setTableData] = useState<MessageProps[]>(initialData);
  const [targetMessage, setTargetMessage] = useState<MessageProps | null>(null);
  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    useState(false);

  useEffect(() => {
    if (initialData === tableData) {
      modifiedDetect(false);
    } else {
      modifiedDetect(true);
    }
  }, [tableData, modifiedDetect, initialData]);

  useEffect(() => {
    modifiedDetect(false);
  }, [modifiedDetect]);

  const columns = [
    columnHelper.accessor("module", {
      id: "module",
      header: "Module",
      cell: (info) => (
        <GridSelectComponent
          initialSelection={info.getValue()}
          options={Object.values(MessageModule)}
          onChange={(value) => {
            info.table.options.meta?.updateData(
              parseInt(info.row.id),
              "module",
              value
            );
          }}
        />
      ),
      size: 200,
      minSize: 200,
    }),
    columnHelper.accessor("id", {
      id: "id",
      header: "Message ID",
      size: 150,
      minSize: 150,
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium" className="text-outline">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("defaultMessage", {
      id: "defaultMessage",
      header: "Message (Default)",
      size: 320,
    }),
    columnHelper.accessor("type", {
      id: "type",
      header: "Type",
      size: 150,
      minSize: 150,
      cell: (info) => {
        return GridStateSelectComponent(
          info.getValue(),
          (type: MessageType) => {
            info.table.options.meta?.updateData(
              parseInt(info.row.id),
              "type",
              type
            );
          }
        );
      },
    }),
    columnHelper.display({
      id: "action",
      cell: (info) => {
        return (
          <>
            <TableActionButton
              options={["Delete"]}
              onMenuSelect={(option) => {
                if (option === "Delete") {
                  setTargetMessage(info.row.original);
                  setIsDeleteConfirmDialogOpen(true);
                }
              }}
            />
          </>
        );
      },
      header: "",
      size: 56,
      minSize: 56,
    }),
  ];

  return (
    <>
      <ConfirmDialog
        isOpen={isDeleteConfirmDialogOpen}
        onOpenChange={setIsDeleteConfirmDialogOpen}
        title="Delete Message"
        onConfirm={() => {
          setIsDeleteConfirmDialogOpen(false);
          setTableData((prev) =>
            prev.filter((message) => message.uuid !== targetMessage?.uuid)
          );
        }}
      />
      <BasicTable
        ActionComponent={() => {
          return (
            <div className="flex flex-1">
              <MdTextButton
                onClick={() => {
                  modifiedDetect(true);
                  setTableData((prev) => [
                    {
                      uuid: faker.string.uuid(),
                      id: "-",
                      defaultMessage: "",
                      message: {
                        en: "",
                        ja: "",
                        ko: "",
                        zh_CN: "",
                      },
                      module: MessageModule.BOOKING,
                      type: MessageType.CONFIRMATION,
                    },
                    ...prev,
                  ]);
                }}
              >
                <MdIcon slot="icon">
                  <Add fontSize="small" />
                </MdIcon>
                Add Message
              </MdTextButton>
            </div>
          );
        }}
        columns={columns}
        data={tableData}
        isSingleSelect
        ignoreSelectionColumns={["module", "type", "action"]}
        disableColumns={["id"]}
        editableColumns={["defaultMessage"]}
        getSelectionRows={(rows) => {
          onMessageSelect && onMessageSelect(rows[0]?.message);
        }}
        updater={setTableData}
      />
    </>
  );
};
