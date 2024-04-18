import { DividerComponent } from "@/app/components/divider";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdDialog,
  MdFilledButton,
  MdOutlinedButton,
} from "@/util/md3";
import { AdminUserType } from "@/util/typeDef/user";

export const AddAdminUserDialog = ({
  isOpen,
  onOpenChage,
}: {
  isOpen: boolean;
  onOpenChage: () => void;
}) => {
  return (
    <MdDialog
      className="min-w-[960px] min-h-[720px]"
      open={isOpen}
      closed={() => {
        onOpenChage();
      }}
    >
      <div slot="headline">Add Admin User</div>
      <div slot="content">
        <div className="grid grid-cols-2 gap-4">
          <NAOutlinedTextField label="User ID" required />
          <NAOutlinedTextField label="User Name" required />
          <NAOutlinedTextField label="Password" />
          <NAOutlinedTextField label="Confirm Password" />
        </div>
        <DividerComponent className="border-dotted my-4" />
        <div className="flex gap-4 z-10">
          <NAOutlinedListBox
            className="flex-1"
            required
            options={Object.values(AdminUserType)}
            initialValue={AdminUserType.CompanyAdmin}
          />
          <NAOutlinedTextField
            className="flex-1"
            label="Office Code"
            required
          />
          <NAOutlinedTextField className="flex-1" label="Email" required />
        </div>
        <div className="bg-surfaceContainerHighest rounded-lg flex flex-col mt-4 p-4 ">
          <MdTypography variant="title" size="medium">
            Notification
          </MdTypography>
          <MdTypography
            variant="label"
            size="large"
            tag="label"
            className="flex items-center gap-2 p-4"
          >
            <MdCheckbox />
            Booking
          </MdTypography>
          <MdTypography
            variant="label"
            size="large"
            tag="label"
            className="flex items-center gap-2 p-4"
          >
            <MdCheckbox />
            S/I
          </MdTypography>
        </div>
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            onOpenChage();
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            onOpenChage();
          }}
        >
          Add
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
