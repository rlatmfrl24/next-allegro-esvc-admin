import { useEffect, useState } from "react";

import { NewBasicTable } from "@/app/components/table/new-table";
import { GridSelectComponent } from "@/app/sections/components/grid-select";
import { MdIconButton, MdMenu, MdMenuItem } from "@/util/md3";
import { MessageModule, MessageProps } from "@/util/typeDef/message";
import { MoreVert } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";

import { createDummyMessageDataset } from "./util";

export const MessageManagementTable = () => {
  const columnHelper = createColumnHelper<MessageProps>();
  const [tableData, setTableData] = useState<MessageProps[]>([]);

  useEffect(() => {
    setTableData(createDummyMessageDataset());
  }, []);

  const columns = [
    columnHelper.accessor("module", {
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
      header: "Message ID",
      size: 150,
      minSize: 150,
    }),
    columnHelper.accessor("message", {
      header: "Message (Default)",
      cell: (info) => {
        const message = info.getValue();
        return message.en;
      },
      size: 500,
    }),
    columnHelper.accessor("type", {
      header: "Type",
      size: 150,
      minSize: 150,
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
      size: 32,
      minSize: 32,
    }),
  ];

  return <NewBasicTable columns={columns} data={tableData} isSingleSelect />;
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
