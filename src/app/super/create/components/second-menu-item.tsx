import { MdTypography } from "@/app/components/typography";
import { MenuManagementState } from "@/store/super.store";
import { MdIcon, MdRippleEffect, MdSwitch } from "@/util/md3";
import { useSortable } from "@dnd-kit/sortable";
import { DragHandle, EditOutlined } from "@mui/icons-material";
import { useState, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { CSS } from "@dnd-kit/utilities";
import { MenuItemType } from "@/util/typeDef/super";

export const SecondMenuItem = (props: {
  item: MenuItemType;
  parentId: string;
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
    !menuStore.deactivatedMenuIds.includes(props.parentId + "/" + props.item.id)
  );

  const isEditing = useMemo(() => {
    return menuStore.currentEditingMenuId === props.item.id;
  }, [menuStore.currentEditingMenuId, props.item.id]);

  useEffect(() => {
    setIsActivated(
      !menuStore.deactivatedMenuIds.includes(
        props.parentId + "/" + props.item.id
      )
    );
  }, [menuStore.deactivatedMenuIds, props.item.id, props.parentId]);

  function handleToggle() {
    setMenuStore((prev) => {
      if (
        prev.deactivatedMenuIds.includes(props.parentId + "/" + props.item.id)
      ) {
        return {
          ...prev,
          deactivatedMenuIds: prev.deactivatedMenuIds.filter(
            (id) =>
              id !== props.parentId + "/" + props.item.id &&
              !id.startsWith(props.parentId + "/" + props.item.id)
          ),
        };
      } else {
        return {
          ...prev,
          deactivatedMenuIds: [
            ...prev.deactivatedMenuIds,
            props.parentId + "/" + props.item.id,
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
      <div className="border-2 rounded-lg border-secondaryContainer h-16 max-h-16 flex items-center px-4">
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
        <MdIcon className="border border-onSurface rounded-full w-8 h-8 relative cursor-pointer ml-8 mr-10">
          <MdRippleEffect />
          <EditOutlined />
        </MdIcon>
      </div>
    </div>
  );
};
