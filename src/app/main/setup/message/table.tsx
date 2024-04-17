import { useEffect, useState } from "react";

import { NewBasicTable } from "@/app/components/table/new-table";
import { GridSelectComponent } from "@/app/sections/components/grid-select";
import {
  MdIcon,
  MdIconButton,
  MdMenu,
  MdMenuItem,
  MdTextButton,
} from "@/util/md3";
import {
  MessageModule,
  MessageProps,
  MessageType,
} from "@/util/typeDef/message";
import { Add, ArrowDropDown, MoreVert } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";

import { createDummyMessageDataset } from "./util";
import { MdTypography } from "@/app/components/typography";

export const MessageManagementTable = ({
  onMessageSelect,
}: {
  onMessageSelect?: (message: MessageProps) => void;
}) => {
  const columnHelper = createColumnHelper<MessageProps>();
  const [tableData, setTableData] = useState<MessageProps[]>([]);

  useEffect(() => {
    setTableData(createDummyMessageDataset());
  }, []);

  const columns = [
    columnHelper.accessor("module", {
      id: "module",
      header: "Module",
      cell: (info) => (
        <GridSelectComponent
          initialSelection={info.getValue()}
          options={Object.values(MessageModule)}
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
    columnHelper.accessor("message", {
      id: "message",
      header: "Message (Default)",
      cell: (info) => {
        const message = info.getValue();
        return message.en;
      },
      size: 320,
    }),
    columnHelper.accessor("type", {
      id: "type",
      header: "Type",
      size: 150,
      minSize: 150,
      cell: (info) => {
        return GridStateSelectComponent(info.getValue());
      },
    }),
    columnHelper.display({
      id: "action",
      cell: (info) => {
        return (
          <DeleteActionButton
            onClick={() => {
              const id = info.row.original.id;
              setTableData((prev) => prev.filter((data) => data.id !== id));
            }}
          />
        );
      },
      header: "",
      size: 56,
      minSize: 56,
    }),
  ];

  return (
    <NewBasicTable
      actionComponent={
        <div className="flex flex-1">
          <MdTextButton>
            <MdIcon slot="icon">
              <Add fontSize="small" />
            </MdIcon>
            Add Message
          </MdTextButton>
        </div>
      }
      columns={columns}
      data={tableData}
      isSingleSelect
      ignoreSelectionColumns={["module", "type"]}
      getSelectionRows={(rows) => {
        onMessageSelect && onMessageSelect(rows[0]?.message);
      }}
    />
  );
};

const GridStateSelectComponent = (state: MessageType) => {
  const bgStyles = {
    [MessageType.SUCCESS]: "bg-primaryContainer",
    [MessageType.ERROR]: "bg-errorContainer",
    [MessageType.WARNING]: "bg-[#FCE186]",
    [MessageType.CONFIRMATION]: "bg-[#B4F1BD]",
  }[state];

  return (
    <>
      <div className="h-10 flex items-center justify-between cursor-pointer">
        <MdTypography
          variant="label"
          size="medium"
          className={`px-2 py-1 ${bgStyles} rounded-lg`}
        >
          {state}
        </MdTypography>
        <ArrowDropDown />
      </div>
    </>
  );
};

const DeleteActionButton = ({ onClick }: { onClick?: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <MdIconButton
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        id="menu-anchor"
      >
        <MoreVert />
      </MdIconButton>
      <MdMenu
        open={isMenuOpen}
        anchor="menu-anchor"
        anchorCorner="end-end"
        menuCorner="start-end"
        close={() => setIsMenuOpen(false)}
      >
        <MdMenuItem
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
            onClick && onClick();
          }}
        >
          <div slot="headline">Delete</div>
        </MdMenuItem>
      </MdMenu>
    </div>
  );
};
