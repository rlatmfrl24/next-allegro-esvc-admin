import { DividerComponent } from "@/app/components/divider";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdDialog, MdFilledButton, MdOutlinedButton } from "@/util/md3";
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
      className="min-w-[960px]"
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
