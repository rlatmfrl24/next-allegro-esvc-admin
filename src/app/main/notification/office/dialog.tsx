import { DividerComponent } from "@/app/components/divider";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { useSimpleTable } from "@/app/components/table/simple-table";
import {
  MdDialog,
  MdFilledButton,
  MdOutlinedButton,
  MdRadio,
  MdTextButton,
} from "@/util/md3";
import { OfficeCodeSearchProps } from "@/util/typeDef/notification";
import { faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from "react";

export const OfficeCodeSearchDialog = (props: {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onApply: (officeCode: OfficeCodeSearchProps) => void;
}) => {
  const tempOfficeCodeData = Array.from(
    { length: 10 },
    (_, i) =>
      ({
        officeCode: faker.string.alphanumeric(5).toUpperCase(),
        officeName: faker.company.name(),
        officeType: faker.helpers.arrayElement([
          "Non-BCO",
          "BCO",
          "Agent",
          "Carrier",
          "NVOCC",
          "Other",
        ]),
        location: faker.location.countryCode(),
        address: faker.location.streetAddress(),
      } as OfficeCodeSearchProps)
  );

  const [tableData, setTableData] =
    useState<OfficeCodeSearchProps[]>(tempOfficeCodeData);
  const [selectedRow, setSelectedRow] = useState<OfficeCodeSearchProps | null>(
    null
  );
  const columnHelper = createColumnHelper<OfficeCodeSearchProps>();
  const columnDefs = [
    columnHelper.display({
      id: "radio",
      cell: (info) => {
        return (
          <div className="flex items-center justify-center">
            <MdRadio checked={info.row.getIsSelected()} />
          </div>
        );
      },
      size: 40,
    }),
    columnHelper.accessor("officeCode", {
      id: "officeCode",
      header: "Office Code",
      size: 120,
    }),
    columnHelper.accessor("officeName", {
      id: "officeName",
      header: "Office Name",
      size: 200,
    }),
    columnHelper.accessor("officeType", {
      id: "officeType",
      header: "Office Type",
      size: 120,
    }),
    columnHelper.accessor("location", {
      id: "location",
      header: "Location",
      size: 120,
    }),
    columnHelper.accessor("address", {
      id: "address",
      header: "Address",
      size: 200,
    }),
  ];

  const { renderTable, clearSelection } = useSimpleTable({
    data: tableData,
    columns: columnDefs,
    getSelectionRows: (rows) => {
      setSelectedRow(rows[0]);
    },
  });

  return (
    <MdDialog
      open={props.isOpen}
      closed={() => {
        props.onOpenChange(false);
        clearSelection();
      }}
      className="min-w-[960px]"
    >
      <div slot="headline">Office Code</div>
      <div slot="content" className="flex flex-col gap-4">
        <div className="flex gap-4">
          <NAOutlinedTextField label="Location Code" />
          <NAOutlinedListBox
            label="Office Level"
            initialValue="All"
            options={["All"]}
          />
          <NAOutlinedTextField label="Parent Office" />
          <NAOutlinedTextField label="Office Code" />
        </div>
        <NAOutlinedTextField label="Office Name" />
        <div className="flex gap-2 justify-end">
          <MdTextButton>Reset</MdTextButton>
          <MdFilledButton>Search</MdFilledButton>
        </div>
        <DividerComponent />
        <>{renderTable()}</>
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange(false);
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          disabled={!selectedRow}
          onClick={() => {
            props.onOpenChange(false);
            props.onApply(selectedRow!);
          }}
        >
          Apply
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
