import { MessageProps } from "@/util/typeDef/message";
import { createColumnHelper } from "@tanstack/react-table";

export const MessageManagementTable = () => {
  const columnHelper = createColumnHelper<MessageProps>();

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
};
