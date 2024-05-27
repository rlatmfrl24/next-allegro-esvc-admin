import { DividerComponent } from "@/app/components/divider";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { useSimpleTable } from "@/app/components/table/simple-table";
import { MdTypography } from "@/app/components/typography";
import {
  MdDialog,
  MdFilledButton,
  MdIcon,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdRadio,
  MdTextButton,
} from "@/util/md3";
import {
  CompanyType,
  CustomerCodeProps,
  CustomerUserProps,
  CustomerUserStatus,
} from "@/util/typeDef/user";
import { faker } from "@faker-js/faker";
import { Search } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { Dispatch, SetStateAction, use, useMemo, useState } from "react";

export const CustomerActionDialog = ({
  isOpen,
  onOpenChange,
  mode,
  targetUser,
  onConfirm,
}: {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  mode: "add" | "edit";
  targetUser?: CustomerUserProps;
  onConfirm?: (data: CustomerUserProps) => void;
}) => {
  const [isCustomerCodeSearchOpen, setIsCustomerCodeSearchOpen] =
    useState(false);
  const [data, setData] = useState<CustomerUserProps>(
    targetUser ||
      ({
        useCustomerCode: "Yes",
        companyType: CompanyType.ShipperConsignee,
        salesRap: "Import",
        rateOption: "Basic",
      } as CustomerUserProps)
  );
  const bgColor = {
    [CustomerUserStatus.newRegist]: "bg-surfaceContainerHigh",
    [CustomerUserStatus.update]: "bg-surfaceContainerHigh",
    [CustomerUserStatus.confirm]: "bg-[#B4F1BD]",
    [CustomerUserStatus.rejectForRegist]: "bg-errorContainer text-error",
    [CustomerUserStatus.rejectForUpdate]: "bg-errorContainer text-error",
    [CustomerUserStatus.block]: "bg-errorContainer text-error",
    [CustomerUserStatus.withdraw]: "bg-errorContainer text-error",
  }[data.status];

  const isValidationChecked = useMemo(() => {
    if (
      !data.userId ||
      !data.email ||
      !data.firstName ||
      !data.lastName ||
      !data.companyName ||
      !data.companyType ||
      !data.contactOffice ||
      !data.rateOption ||
      !data.city ||
      !data.address ||
      !data.country ||
      !data.password
    ) {
      return false;
    }
    return true;
  }, [
    data.address,
    data.city,
    data.companyName,
    data.companyType,
    data.contactOffice,
    data.country,
    data.email,
    data.firstName,
    data.lastName,
    data.rateOption,
    data.userId,
    data.password,
  ]);

  return (
    <MdDialog
      open={isOpen}
      closed={() => {
        onOpenChange(false);
      }}
      className="min-w-[960px]"
    >
      <div slot="headline">
        {mode === "add" ? "Add Customer User" : "Customer User"}
      </div>
      <div slot="content">
        <CustomerCodeSearch
          isOpen={isCustomerCodeSearchOpen}
          onOpenChange={setIsCustomerCodeSearchOpen}
          onConfirm={(code) => {
            setData({ ...data, customerCode: code.customerCode });
          }}
        />
        {mode === "edit" && (
          <div className="flex gap-4 bg-surface p-4 mb-4 rounded-xl border border-outlineVariant">
            <MdTypography
              variant="label"
              size="medium"
              className={`px-2 py-1 rounded-lg w-fit ${bgColor}`}
            >
              {data.status}
            </MdTypography>
            <div className="flex gap-2">
              <MdTypography variant="body" size="large">
                By
              </MdTypography>
              <MdTypography variant="body" size="large" prominent>
                {data.companyName}
              </MdTypography>
              <MdTypography variant="body" size="large">
                Office
              </MdTypography>
              <MdTypography variant="body" size="large" prominent>
                {data.contactOffice}
              </MdTypography>
              <MdTypography variant="body" size="large">
                at
              </MdTypography>
              <MdTypography variant="body" size="large" prominent>
                {data.updatedAt?.toFormat("yyyy-MM-dd HH:mm")}
              </MdTypography>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 w-full">
          <NAOutlinedTextField
            required
            className="flex-1"
            label="User ID"
            value={data.userId || ""}
            handleValueChange={(value) => {
              setData({ ...data, userId: value });
            }}
          />
          <NAOutlinedTextField
            required
            className="flex-1"
            label="Email"
            value={data.email || ""}
            handleValueChange={(value) => {
              setData({ ...data, email: value });
            }}
          />
          <NAOutlinedTextField
            required
            className="flex-1"
            label="Password"
            type="password"
            value={data.password || ""}
            handleValueChange={(value) => {
              setData({ ...data, password: value });
            }}
          />
          <NAOutlinedTextField
            required
            type="password"
            className="flex-1"
            label="Confirm Password"
            value={""}
          />
        </div>
        <DividerComponent className="my-4 border-dotted" />
        <div className="grid grid-cols-4 gap-4 w-full">
          <NAOutlinedTextField
            required
            className="col-span-2"
            label="First Name"
            value={data.firstName || ""}
            handleValueChange={(value) => {
              setData({ ...data, firstName: value });
            }}
          />
          <NAOutlinedTextField
            required
            className="col-span-2"
            label="Last Name"
            value={data.lastName || ""}
            handleValueChange={(value) => {
              setData({ ...data, lastName: value });
            }}
          />
          <NAOutlinedListBox
            required
            label="Use Customer Code"
            initialValue={data.useCustomerCode || "Yes"}
            options={["Yes", "No"]}
            onSelection={(value) => {
              setData({
                ...data,
                useCustomerCode: value as "Yes" | "No",
              });
            }}
          />
          <MdOutlinedTextField
            readOnly
            label="Customer Code"
            className="cursor-pointer"
            value={data.customerCode || ""}
            hasTrailingIcon
            onClick={() => {
              setIsCustomerCodeSearchOpen(true);
            }}
          >
            <MdIcon slot="trailing-icon">
              <Search />
            </MdIcon>
          </MdOutlinedTextField>
          <NAOutlinedTextField
            label="Company Name"
            required
            className="col-span-2"
            value={data.companyName || ""}
            handleValueChange={(value) => {
              setData({ ...data, companyName: value });
            }}
          />
          <NAOutlinedListBox
            label="Company Type"
            required
            initialValue={CompanyType.ShipperConsignee}
            options={Object.values(CompanyType)}
            onSelection={(value) => {
              setData({ ...data, companyType: value as CompanyType });
            }}
          />
          <NAOutlinedListBox
            required
            label="Contact Office"
            options={["Singapore Branch", "Busan Office", "Tokyo Office"]}
            onSelection={(value) => {
              setData({ ...data, contactOffice: value });
            }}
          />
          <NAOutlinedTextField label="TP ID" disabled value={data.tpId || ""} />
          <NAOutlinedListBox
            label="Sales Rep"
            initialValue="Import"
            options={["Import", "Export", "Both"]}
            onSelection={(value) => {
              setData({
                ...data,
                salesRap: value as "Import" | "Export" | "Both",
              });
            }}
          />
          <NAOutlinedListBox
            required
            label="Rate Option"
            initialValue={data.rateOption || "Basic"}
            options={["Basic", "Block", "All Blocked"]}
            onSelection={(value) => {
              setData({
                ...data,
                rateOption: value as "Basic" | "Block" | "All Blocked",
              });
            }}
          />
          <NAOutlinedTextField
            required
            label="City"
            value={data.city || ""}
            handleValueChange={(value) => {
              setData({ ...data, city: value });
            }}
          />
          <NAOutlinedTextField
            required
            label="Address"
            className="col-span-2"
            value={data.address || ""}
            handleValueChange={(value) => {
              setData({ ...data, address: value });
            }}
          />
          <NAOutlinedTextField
            label="Zip Code"
            value={data.zipCode || ""}
            handleValueChange={(value) => {
              setData({ ...data, zipCode: value });
            }}
          />
          <NAOutlinedTextField
            label="Country"
            required
            value={data.country || ""}
            handleValueChange={(value) => {
              setData({ ...data, country: value });
            }}
          />
          <NAOutlinedTextField
            label="Tel No."
            type="tel"
            value={data.telNumber || ""}
            handleValueChange={(value) => {
              setData({ ...data, telNumber: value });
            }}
          />
          <NAOutlinedTextField
            label="Fax No."
            type="tel"
            value={data.faxNumber || ""}
            handleValueChange={(value) => {
              setData({ ...data, faxNumber: value });
            }}
          />
        </div>
        <DividerComponent className="my-4 border-dotted" />
        <MdOutlinedTextField
          type="textarea"
          label="Comment"
          rows={3}
          className="w-full"
          value={data.comment || ""}
          onInput={(e) => {
            setData({ ...data, comment: e.currentTarget.value });
          }}
        />
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          disabled={!isValidationChecked}
          onClick={() => {
            onOpenChange(false);
            onConfirm?.({
              ...data,
              updatedAt: DateTime.now(),
            });
          }}
        >
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};

export const CustomerCodeSearch = ({
  isOpen,
  onOpenChange,
  onConfirm,
}: {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onConfirm?: (data: CustomerCodeProps) => void;
}) => {
  const tempData = useMemo(() => {
    return Array.from(
      { length: 10 },
      () =>
        ({
          customerCode: faker.string.alphanumeric(7).toUpperCase(),
          countryCode: faker.location.countryCode(),
          customerName: faker.company.name(),
          type: faker.helpers.arrayElement([
            "Non-BCO",
            "BCO",
            "NVOCC",
            "Freight Forwarder",
          ]),
          rofc: faker.helpers.arrayElement(["Import", "Export"]),
          address: faker.location.streetAddress(),
          state: "",
        } as CustomerCodeProps)
    );
  }, []);

  const columnHelper = createColumnHelper<CustomerCodeProps>();
  const [selectedCode, setSelectedCode] = useState<CustomerCodeProps>();

  const columnDefs = [
    columnHelper.display({
      id: "selection",
      cell: (info) => {
        return (
          <div className="flex items-center justify-center">
            <MdRadio checked={info.row.getIsSelected()} />
          </div>
        );
      },
      size: 48,
      maxSize: 48,
    }),
    columnHelper.accessor("customerCode", {
      id: "customerCode",
      header: "Customer Code",
      size: 112,
    }),
    columnHelper.accessor("countryCode", {
      id: "countryCode",
      header: "Country Code",
      size: 80,
    }),
    columnHelper.accessor("customerName", {
      id: "customerName",
      header: "Customer Name",
      size: 240,
    }),
    columnHelper.accessor("type", {
      id: "type",
      header: "Type",
      size: 104,
    }),
    columnHelper.accessor("rofc", {
      id: "rofc",
      header: "R.OFC",
      size: 104,
    }),
    columnHelper.accessor("address", {
      id: "address",
      header: "Address",
      size: 240,
    }),
    columnHelper.accessor("state", {
      id: "state",
      header: "State",
      size: 120,
    }),
  ];

  const { renderTable, clearSelection } = useSimpleTable({
    data: tempData,
    columns: columnDefs,
    getSelectionRows: (rows) => {
      setSelectedCode(rows[0]);
    },
  });

  return (
    <MdDialog
      open={isOpen}
      closed={() => {
        onOpenChange(false);
        clearSelection();
      }}
      className="min-w-[1120px]"
    >
      <div slot="headline">Search Customer Code</div>
      <div slot="content" className="flex flex-col gap-4">
        <div className="flex gap-4">
          <NAOutlinedTextField className="flex-1" label="Country Code" />
          <NAOutlinedTextField className="flex-1" label="Customer Code" />
          <NAOutlinedTextField className="flex-1" label="Sales Office" />
        </div>
        <NAOutlinedTextField label="Customer Code" />
        <div className="flex gap-2 justify-end">
          <MdTextButton>Reset</MdTextButton>
          <MdFilledButton>Search</MdFilledButton>
        </div>
        <DividerComponent />

        {renderTable()}
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          disabled={!selectedCode}
          onClick={() => {
            onOpenChange(false);
            selectedCode && onConfirm?.(selectedCode);
          }}
        >
          Apply
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
