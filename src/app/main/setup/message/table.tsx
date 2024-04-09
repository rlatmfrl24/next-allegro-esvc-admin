import { BasicTable } from "@/app/components/basic-table";
import { MessageProps } from "@/util/typeDef/message";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
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
    }),
    columnHelper.accessor("id", {
      header: "Message ID",
    }),
    columnHelper.accessor("message", {
      header: "Message (Default)",
    }),
    columnHelper.accessor("type", {
      header: "Type",
    }),
  ];

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  return <BasicTable table={table} />;
};
