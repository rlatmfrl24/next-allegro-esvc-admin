import { DividerComponent } from "@/app/components/divider";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import {
  MdDialog,
  MdFilledButton,
  MdIcon,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdTextButton,
} from "@/util/md3";
import { CompanyType, CustomerUserProps } from "@/util/typeDef/user";
import { Search } from "@mui/icons-material";
import { DateTime } from "luxon";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

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
      !data.country
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
        />
        <div className="flex gap-2 w-full">
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
          OK
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};

export const CustomerCodeSearch = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <MdDialog
      open={isOpen}
      closed={() => {
        onOpenChange(false);
      }}
      className="min-w-[960px]"
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
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Apply
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
