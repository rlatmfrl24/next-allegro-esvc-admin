import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import { GridSelectComponent } from "@/app/sections/components/grid-select";
import { modifiedDetectState } from "@/store/base.store";
import { MdDialog, MdIcon, MdTextButton } from "@/util/md3";
import {
  MessageModule,
  MessageProps,
  MessageType,
} from "@/util/typeDef/message";
import { faker } from "@faker-js/faker";
import { Add } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";

import { ConfirmDialog } from "../components/confirm-dialog";
import { TableActionButton } from "../components/table-action-button";
import { GridStateSelectComponent } from "./components";
import { createDummyMessageDataset } from "./util";
import Portal from "@/app/components/portal";
import { BottomFloatingBar } from "../components/bottom-floating-bar";

export const MessageManagementTable = ({
  onMessageSelect,
}: {
  onMessageSelect?: (message: MessageProps) => void;
}) => {
  const [initialData, setInitialData] = useState<MessageProps[]>(
    createDummyMessageDataset()
  );
  const columnHelper = createColumnHelper<MessageProps>();
  const [modifiedDetect, setModifiedDetect] =
    useRecoilState(modifiedDetectState);
  const [tableData, setTableData] = useState<MessageProps[]>(initialData);
  const [targetMessage, setTargetMessage] = useState<MessageProps | null>(null);
  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    useState(false);
  const [isSaveConfirmDialogOpen, setIsSaveConfirmDialogOpen] = useState(false);

  useEffect(() => {
    if (initialData !== tableData) {
      if (tableData.length < initialData.length) {
        setModifiedDetect(false);
      } else {
        for (let i = 0; i < tableData.length; i++) {
          if (
            tableData[i].defaultMessage !== initialData[i].defaultMessage ||
            tableData[i].module !== initialData[i].module ||
            tableData[i].type !== initialData[i].type
          ) {
            console.log(tableData[i], initialData[i]);
            setModifiedDetect(true);
            break;
          }
        }
      }
    }

    setInitialData(tableData);
  }, [initialData, modifiedDetect, setModifiedDetect, tableData]);

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
            setModifiedDetect(true);
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
      <MdDialog
        open={isSaveConfirmDialogOpen}
        closed={() => setIsSaveConfirmDialogOpen(false)}
      >
        <div slot="headline">
          Mandatory field is empty. Please fill in the field.
        </div>
        <div slot="actions">
          <MdTextButton
            onClick={() => {
              setIsSaveConfirmDialogOpen(false);
            }}
          >
            OK
          </MdTextButton>
        </div>
      </MdDialog>
      <Portal selector="#nav-container">
        <BottomFloatingBar
          onSave={() => {
            tableData.every((message) => {
              if (message.defaultMessage === "") {
                setIsSaveConfirmDialogOpen(true);
              } else {
                modifiedDetect && setModifiedDetect(false);
              }
            });
          }}
        />
      </Portal>
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
        requiredColumns={["defaultMessage"]}
        getSelectionRows={(rows) => {
          onMessageSelect && onMessageSelect(rows[0]?.message);
        }}
        updater={setTableData}
      />
    </>
  );
};
