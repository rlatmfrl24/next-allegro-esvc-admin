import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import styles from "@/styles/table.module.css";

export const SimpleTable = ({
  data,
  columns,
}: {
  data: any[];
  columns: any[];
}) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <OverlayScrollbarsComponent defer>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>
    </OverlayScrollbarsComponent>
  );
};
