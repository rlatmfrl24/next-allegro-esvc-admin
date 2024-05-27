import { MdDialog, MdFilledButton, MdTextButton } from "@/util/md3";
import { Dispatch, SetStateAction, useState } from "react";

export const ConfirmDialog = (props: {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  title: string;
  message?: string;
  onConfirm: () => void;
}) => {
  return (
    <MdDialog
      open={props.isOpen}
      closed={() => {
        props.onOpenChange(false);
      }}
    >
      <div slot="headline">{props.title}</div>
      <div slot="content">{props.message}</div>
      <div slot="actions">
        <MdTextButton onClick={() => props.onOpenChange(false)}>
          Cancel
        </MdTextButton>
        <MdFilledButton
          onClick={() => {
            props.onOpenChange(false);
            props.onConfirm();
          }}
        >
          Confirm
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
