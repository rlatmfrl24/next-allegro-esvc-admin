import {
  CSSProperties,
  Dispatch,
  memo,
  SetStateAction,
  useRef,
  useState,
} from "react";

import { Cell, flexRender, Row, Table } from "@tanstack/react-table";

import { getCommonPinningStyles } from "./util";
import { MdTypography } from "../typography";

export const TableBody = ({
  table,
  selectedCell,
  onCellSelected,
  ignoreSelectionColumns,
  disableColumns,
  editableColumns,
}: {
  table: Table<any>;
  selectedCell?: Cell<any, unknown> | null;
  onCellSelected?: Dispatch<SetStateAction<any>>;
  ignoreSelectionColumns?: string[];
  disableColumns?: string[];
  editableColumns?: string[];
}) => {
  const inputRef = useRef<any>(null);
  const [hoverInfo, setHoverInfo] = useState<{
    row: Row<any>;
    cell: Cell<any, unknown>;
  } | null>(null);

  const [currentEditCell, setCurrentEditCell] = useState<Cell<
    any,
    unknown
  > | null>(null);

  function getCellStyles(cell: Cell<any, unknown>) {
    if (selectedCell?.id === cell.id) {
      return {
        backgroundColor: `color-mix(in srgb, var(--md-sys-color-primary) 12%, white)`,
        border: `2px solid var(--md-sys-color-primary)`,
        // zIndex: 10,
      } as CSSProperties;
    } else {
      if (cell.row.getIsSelected()) {
        return {
          backgroundColor: `color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
          borderTop: `1px solid color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
          borderLeft: `1px solid color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
          borderRight: `1px solid color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
          borderBottom: `1px solid var(--md-sys-color-outline-variant)`,
        } as CSSProperties;
      } else {
        if (hoverInfo?.cell === cell) {
          return {
            backgroundColor: `color-mix(in srgb, var(--md-sys-color-on-surface) 12%, white)`,
            border: `1px solid var(--md-sys-color-outline)`,
          } as CSSProperties;
        } else {
          if (hoverInfo?.row === cell.row) {
            return {
              backgroundColor: `color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
              borderTop: `1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
              borderLeft: `1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
              borderRight: `1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
              borderBottom: `1px solid var(--md-sys-color-outline-variant)`,
            } as CSSProperties;
          } else {
            return {
              backgroundColor: disableColumns?.includes(cell.column.id)
                ? `var(--md-sys-color-surface-container-low)`
                : `var(--md-sys-color-surface)`,
              borderBottom: `1px solid var(--md-sys-color-outline-variant)`,
            } as CSSProperties;
          }
        }
      }
    }
  }

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return cell.id !== currentEditCell?.id ? (
                <td
                  key={cell.id}
                  style={{
                    // width: cell.column.getSize(),
                    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                    ...getCommonPinningStyles(cell.column),
                    ...getCellStyles(cell),
                    color: disableColumns?.includes(cell.column.id)
                      ? "var(--md-sys-color-outline)"
                      : "",
                  }}
                  className="p-2 border-box border-x border-x-transparent border-y border-y-transparent overflow-x-hidden"
                  onMouseEnter={(e) => {
                    setHoverInfo({ row, cell });
                  }}
                  onMouseLeave={(e) => {
                    setHoverInfo((prev) => (prev?.row === row ? null : prev));
                  }}
                  onDoubleClick={(e) => {
                    row.toggleSelected();
                    row.getIsSelected()
                      ? onCellSelected?.(null)
                      : onCellSelected?.(cell);
                    if (editableColumns?.includes(cell.column.id))
                      setCurrentEditCell(cell);
                  }}
                  onClick={(e) => {
                    if (ignoreSelectionColumns?.includes(cell.column.id))
                      return;
                    // if (editableColumns?.includes(cell.column.id)) return;
                    row.getIsSelected()
                      ? onCellSelected?.(null)
                      : onCellSelected?.(cell);
                    row.toggleSelected();
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ) : (
                <td className="h-full relative" key={cell.id}>
                  <div className="absolute flex top-0 w-full h-full left-0 p-px">
                    <input
                      autoFocus
                      ref={inputRef}
                      className="flex-1 px-4 outline-primary"
                      placeholder="Enter value"
                      defaultValue={
                        (cell.getContext().getValue() as string) || ""
                      }
                      onBlur={() => {
                        table.options.meta?.updateData(
                          parseInt(row.id),
                          cell.column.id,
                          inputRef.current.value
                        );

                        setCurrentEditCell(null);
                      }}
                    />
                  </div>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

// Upgrade Performance by memoizing the TableBody component
export const MemoizedTableBody = memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data
) as typeof TableBody;
