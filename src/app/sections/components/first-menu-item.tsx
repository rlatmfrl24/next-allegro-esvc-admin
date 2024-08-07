import { AnimatePresence, m, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import BookingIcon from "@/../public/icon_menu_booking.svg?url";
import DashboardIcon from "@/../public/icon_menu_dashboard.svg?url";
import DententionIcon from "@/../public/icon_menu_dentention.svg?url";
import DocumentsIcon from "@/../public/icon_menu_documents.svg?url";
import ImportIcon from "@/../public/icon_menu_import.svg?url";
import ManageShipmentIcon from "@/../public/icon_menu_manage_shipment.svg?url";
import PricingIcon from "@/../public/icon_menu_pricing.svg?url";
import ScheduleIcon from "@/../public/icon_menu_schedule.svg?url";
import TrackTraceIcon from "@/../public/icon_menu_tracktrace.svg?url";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import { CurrentCompanyState, MenuManagementState } from "@/store/super.store";
import {
  MdIcon,
  MdOutlinedTextField,
  MdRippleEffect,
  MdSwitch,
} from "@/util/md3";
import { MenuItemType } from "@/util/typeDef/super";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowDropDown,
  Check,
  DragHandle,
  EditOutlined,
} from "@mui/icons-material";

import { customerWebLink } from "../../constants";
import { SecondMenuItem } from "./second-menu-item";
import { modifiedDetectState } from "@/store/base.store";

export const FirstMenuItem = (props: { item: MenuItemType }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.item.id });

  const itemIcon = {
    dashboard: DashboardIcon,
    schedule: ScheduleIcon,
    booking: BookingIcon,
    pricing: PricingIcon,
    documents: DocumentsIcon,
    tracking: TrackTraceIcon,
    import: ImportIcon,
    shipment: ManageShipmentIcon,
    tariff: DententionIcon,
  }[props.item.id];

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [newMenuName, setNewMenuName] = useState(props.item.name);
  const [isExpanded, setIsExpanded] = useState(false);
  const currentEditingMenuId =
    useRecoilValue(MenuManagementState).currentEditingMenuId;
  const [companyStore, setCompanyStore] = useRecoilState(CurrentCompanyState);
  const [menuStore, setMenuStore] = useRecoilState(MenuManagementState);
  const modifiedDetect = useSetRecoilState(modifiedDetectState);

  const isEditing = useMemo(() => {
    return currentEditingMenuId === props.item.id;
  }, [currentEditingMenuId, props.item.id]);

  const subItems = companyStore.menuManagement.find(
    (item) => item.id === props.item.id
  )!.subMenu!;

  const [isActivated, setIsActivated] = useState(
    subItems.length > 0
      ? !subItems.every((item) =>
          menuStore.deactivatedMenuIds.includes(props.item.id + "/" + item.id)
        )
      : menuStore.deactivatedMenuIds.includes(props.item.id)
  );

  function handleDragOver(event: any) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      modifiedDetect(true);
      setCompanyStore((prev) => {
        const newSubItems = [
          ...prev.menuManagement.find((i) => i.id === props.item.id)!.subMenu!,
        ];
        const oldIndex = newSubItems.findIndex((i) => i.id === active.id);
        const newIndex = newSubItems.findIndex((i) => i.id === over.id);
        newSubItems.splice(newIndex, 0, newSubItems.splice(oldIndex, 1)[0]);
        const newMenu = [...prev.menuManagement];
        const index = newMenu.findIndex((i) => i.id === props.item.id);
        return {
          ...prev,
          menuManagement: [
            ...newMenu.slice(0, index),
            {
              ...newMenu[index],
              subMenu: newSubItems,
            },
            ...newMenu.slice(index + 1),
          ],
        };
      });
    }
  }

  useEffect(() => {
    if (subItems.length > 0) {
      setIsActivated(
        !subItems.every((item) =>
          menuStore.deactivatedMenuIds.includes(props.item.id + "/" + item.id)
        )
      );
    } else {
      setIsActivated(!menuStore.deactivatedMenuIds.includes(props.item.id));
    }
  }, [menuStore.deactivatedMenuIds, props.item.id, subItems]);

  function handleToggle(e: any) {
    modifiedDetect(true);
    if (e.currentTarget.selected) {
      setMenuStore((prev) => {
        if (subItems.length === 0) {
          return {
            ...prev,
            deactivatedMenuIds: [...prev.deactivatedMenuIds, props.item.id],
          };
        } else {
          return {
            ...prev,
            deactivatedMenuIds: [
              ...prev.deactivatedMenuIds,
              ...subItems.map((item) => props.item.id + "/" + item.id),
            ],
          };
        }
      });
    } else {
      setMenuStore((prev) => {
        if (subItems.length === 0) {
          return {
            ...prev,
            deactivatedMenuIds: prev.deactivatedMenuIds.filter(
              (id) => id !== props.item.id
            ),
          };
        } else {
          return {
            ...prev,
            deactivatedMenuIds: prev.deactivatedMenuIds.filter(
              (id) => !id.startsWith(props.item.id + "/")
            ),
          };
        }
      });
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-30" : ""}`}
    >
      <div className={`border-2 rounded-lg  overflow-hidden`}>
        <div
          className={`h-16 max-h-16 flex items-center px-4 ${
            isEditing || isExpanded ? "bg-secondaryContainer" : "bg-[#F0F4F8]"
          }`}
          onClick={() => {
            !isEditing &&
              props.item.subMenu &&
              props.item.subMenu.length > 0 &&
              setIsExpanded(!isExpanded);
          }}
        >
          <DragHandle
            {...attributes}
            {...listeners}
            className="text-outlineVariant outline-none cursor-move"
          />
          <Image src={itemIcon} alt="Menu Icon" className="ml-2" />
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
            className="text-outlineVariant "
          >
            {props.item.originName}
          </MdTypography>
          {!isEditing && (
            <MdSwitch
              className="ml-4"
              selected={isActivated}
              onClick={(e) => {
                e.stopPropagation();
                handleToggle(e);
              }}
            />
          )}
          <MdIcon
            className={`border border-onSurface rounded-full w-8 h-8 relative cursor-pointer ml-8 ${
              currentEditingMenuId !== ""
                ? isEditing
                  ? "bg-primary text-white border-none"
                  : "text-outlineVariant border-outlineVariant"
                : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();

              currentEditingMenuId === "" &&
                setMenuStore((prev) => ({
                  ...prev,
                  currentEditingMenuId: props.item.id,
                }));

              if (isEditing) {
                setMenuStore((prev) => ({
                  ...prev,
                  currentEditingMenuId: "",
                }));

                //update new menu name
                modifiedDetect(true);
                setCompanyStore((prev) => {
                  const newMenu = [...prev.menuManagement];
                  const index = newMenu.findIndex(
                    (i) => i.id === props.item.id
                  );
                  return {
                    ...prev,
                    menuManagement: [
                      ...newMenu.slice(0, index),
                      {
                        ...newMenu[index],
                        name: newMenuName,
                      },
                      ...newMenu.slice(index + 1),
                    ],
                  };
                });
              }
            }}
          >
            <MdRippleEffect />
            {isEditing ? <Check /> : <EditOutlined />}
          </MdIcon>
          <ArrowDropDown
            className={`ml-4 transform ${
              isExpanded ? "rotate-180" : ""
            } transition-transform duration-300 ${
              subItems.length === 0 || isEditing ? "invisible" : ""
            }`}
          />
        </div>
        {isEditing && (
          <div className="px-4 py-6 flex gap-4">
            <MdOutlinedTextField
              label="Name"
              value={newMenuName}
              onInput={(e) => {
                setNewMenuName(e.currentTarget.value);
              }}
            />
            {!props.item.subMenu ||
              (props.item.subMenu.length === 0 && (
                <NAOutlinedTextField
                  readOnly
                  className="flex-1"
                  label="URL"
                  value={customerWebLink + props.item.link}
                />
              ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {isExpanded && subItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: { duration: 0.3 },
            }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
            className="ml-8 flex flex-col gap-4 "
          >
            <DndContext onDragOver={handleDragOver}>
              <SortableContext
                items={subItems.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div></div>
                {subItems.map((item) => (
                  <SecondMenuItem
                    key={item.id}
                    item={item}
                    parent={props.item}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
