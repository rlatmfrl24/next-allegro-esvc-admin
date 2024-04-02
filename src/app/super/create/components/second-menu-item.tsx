import { MdTypography } from "@/app/components/typography";
import { MenuManagementState } from "@/store/super.store";
import {
  MdIcon,
  MdOutlinedTextField,
  MdRippleEffect,
  MdSwitch,
} from "@/util/md3";
import { useSortable } from "@dnd-kit/sortable";
import { Check, DragHandle, EditOutlined } from "@mui/icons-material";
import { useState, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { CSS } from "@dnd-kit/utilities";
import { MenuItemType } from "@/util/typeDef/super";
import { customerWebLink } from "../constants";
import { NAOutlinedTextField } from "@/app/components/na-textfield";

export const SecondMenuItem = (props: {
  item: MenuItemType;
  parent: MenuItemType;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [menuStore, setMenuStore] = useRecoilState(MenuManagementState);
  const [isActivated, setIsActivated] = useState(
    !menuStore.deactivatedMenuIds.includes(
      props.parent.id + "/" + props.item.id
    )
  );

  const isEditing = useMemo(() => {
    return (
      menuStore.currentEditingMenuId === props.parent.id + "/" + props.item.id
    );
  }, [menuStore.currentEditingMenuId, props.item.id, props.parent.id]);

  useEffect(() => {
    setIsActivated(
      !menuStore.deactivatedMenuIds.includes(
        props.parent.id + "/" + props.item.id
      )
    );
  }, [menuStore.deactivatedMenuIds, props.item.id, props.parent.id]);

  function handleToggle() {
    setMenuStore((prev) => {
      if (
        prev.deactivatedMenuIds.includes(props.parent.id + "/" + props.item.id)
      ) {
        return {
          ...prev,
          deactivatedMenuIds: prev.deactivatedMenuIds.filter(
            (id) =>
              id !== props.parent.id + "/" + props.item.id &&
              !id.startsWith(props.parent.id + "/" + props.item.id)
          ),
        };
      } else {
        return {
          ...prev,
          deactivatedMenuIds: [
            ...prev.deactivatedMenuIds,
            props.parent.id + "/" + props.item.id,
          ],
        };
      }
    });
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-30" : ""}`}
    >
      <div className={`border-2 rounded-lg overflow-hidden`}>
        <div className="border-secondaryContainer h-16 max-h-16 flex items-center px-4">
          <DragHandle
            className="text-outlineVariant outline-none cursor-move"
            {...attributes}
            {...listeners}
          />
          <MdTypography
            variant="label"
            size="large"
            className="ml-2 flex-1"
            prominent
          >
            {props.item.name}
          </MdTypography>
          <MdTypography
            variant="label"
            size="small"
            className="text-outlineVariant mr-4"
          >
            {props.item.originName}
          </MdTypography>
          <MdSwitch
            selected={isActivated}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          />

          <MdIcon
            className={`border border-onSurface rounded-full w-8 h-8 relative cursor-pointer ml-8 mr-10 ${
              isEditing ? "bg-primary text-white border-none" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setMenuStore((prev) => ({
                ...prev,
                currentEditingMenuId: isEditing
                  ? ""
                  : props.parent.id + "/" + props.item.id,
              }));
            }}
          >
            <MdRippleEffect />
            {isEditing ? <Check /> : <EditOutlined />}
          </MdIcon>
        </div>
        {isEditing && (
          <div className="px-4 py-6 flex gap-4">
            <MdOutlinedTextField label="Name" value={props.item.name} />
            <NAOutlinedTextField
              readOnly
              className="flex-1"
              label="URL"
              value={
                customerWebLink + props.parent.link + "/" + props.item.link
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
