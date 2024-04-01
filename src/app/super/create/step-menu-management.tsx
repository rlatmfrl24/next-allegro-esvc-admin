import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdRippleEffect, MdSwitch, MdTextButton } from "@/util/md3";
import {
  ArrowDropDown,
  ChevronLeft,
  ChevronRight,
  DragHandle,
  EditOutlined,
  Refresh,
} from "@mui/icons-material";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { menuItems } from "./constants";
import { MenuItemType } from "@/util/typeDef/super";
import { CSS } from "@dnd-kit/utilities";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MenuManagementState } from "@/store/super.store";
import { Item } from "@material/web/labs/item/internal/item";
import { de } from "@faker-js/faker";

export default function MenuManagementStep(props: {
  onStepMove: (step: number) => void;
}) {
  const [items, setItems] = useState(menuItems);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const [menuStore, setMenuStore] = useRecoilState(MenuManagementState);

  useEffect(() => {
    console.log(menuStore);
  }, [menuStore]);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large">
          Menu Management
        </MdTypography>
        <div className="flex gap-2 items-center">
          <MdTextButton onClick={ResetToDefaultMenu}>
            <MdIcon slot="icon">
              <Refresh fontSize="small" />
            </MdIcon>
            Reset to Default Menu
          </MdTextButton>
          <MdTextButton
            onClick={() => {
              props.onStepMove(2);
            }}
          >
            <MdIcon slot="icon">
              <ChevronLeft />
            </MdIcon>
            Previous
          </MdTextButton>
          <DividerComponent orientation="vertical" className="h-6" />
          <MdTextButton
            onClick={() => {
              props.onStepMove(4);
            }}
            trailingIcon
          >
            Next
            <MdIcon slot="icon">
              <ChevronRight />
            </MdIcon>
          </MdTextButton>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <FirstMenuItem key={item.id} item={item} />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeId && items.find((i) => i.id === activeId) ? (
              <FirstMenuItem item={items.find((i) => i.id === activeId)!} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: any) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  function ResetToDefaultMenu() {
    setItems(menuItems);
  }
}

const FirstMenuItem = (props: { item: MenuItemType }) => {
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [subItems, setSubItems] = useState(props.item.subMenu || []);
  const [menuStore, setMenuStore] = useRecoilState(MenuManagementState);
  const [isActivated, setIsActivated] = useState(
    !subItems.every((item) =>
      menuStore.deactivatedMenuIds.includes(props.item.id + "/" + item.id)
    )
  );

  function handleDragOver(event: any) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      setSubItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  useEffect(() => {
    setIsActivated(
      !subItems.every((item) =>
        menuStore.deactivatedMenuIds.includes(props.item.id + "/" + item.id)
      )
    );
  }, [menuStore.deactivatedMenuIds, props.item.id, subItems]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-30" : ""}`}
    >
      <div
        className="border-2 rounded-lg border-secondaryContainer bg-[#F0F4F8] h-16 max-h-16 flex items-center px-4"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <DragHandle
          {...attributes}
          {...listeners}
          focusable={false}
          className="text-outlineVariant "
        />
        <MdTypography
          variant="label"
          size="large"
          className="ml-2 flex-1"
          prominent
        >
          {props.item.name}
        </MdTypography>
        <MdSwitch
          selected={isActivated}
          onClick={(e) => {
            e.stopPropagation();
            if (e.currentTarget.selected) {
              console.log("deactivate");

              setMenuStore((prev) => {
                return {
                  ...prev,
                  deactivatedMenuIds: [
                    ...prev.deactivatedMenuIds,
                    ...subItems.map((item) => props.item.id + "/" + item.id),
                  ],
                };
              });
            } else {
              console.log("active");

              setMenuStore((prev) => {
                return {
                  ...prev,
                  deactivatedMenuIds: prev.deactivatedMenuIds.filter(
                    (id) => !id.startsWith(props.item.id + "/")
                  ),
                };
              });
            }
          }}
        />
        <MdIcon className="border border-onSurface rounded-full w-8 h-8 relative cursor-pointer ml-8">
          <MdRippleEffect />
          <EditOutlined />
        </MdIcon>
        <ArrowDropDown
          className={`ml-4 transform ${
            isExpanded ? "rotate-180" : ""
          } transition-transform duration-300 ${
            subItems.length === 0 ? "invisible" : ""
          }`}
        />
      </div>
      {isExpanded && subItems.length > 0 && (
        <div className="ml-8 flex flex-col gap-4 mt-4">
          <DndContext onDragOver={handleDragOver}>
            <SortableContext
              items={subItems.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {subItems.map((item) => (
                <SecondMenuItem
                  key={item.id}
                  item={item}
                  parentId={props.item.id}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};

const SecondMenuItem = (props: { item: MenuItemType; parentId: string }) => {
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

  useEffect(() => {
    setIsActivated(
      !menuStore.deactivatedMenuIds.includes(
        props.parentId + "/" + props.item.id
      )
    );
  }, [menuStore.deactivatedMenuIds, props.item.id, props.parentId]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-30" : ""}`}
    >
      <div className="border-2 rounded-lg border-secondaryContainer h-16 max-h-16 flex items-center px-4">
        <DragHandle
          className="text-outlineVariant"
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
        <MdSwitch
          selected={isActivated}
          onClick={(e) => {
            e.stopPropagation();
            setMenuStore((prev) => {
              if (
                prev.deactivatedMenuIds.includes(
                  props.parentId + "/" + props.item.id
                )
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
