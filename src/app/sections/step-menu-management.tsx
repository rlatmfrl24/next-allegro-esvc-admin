import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/util/md3";
import { ChevronLeft, ChevronRight, Refresh } from "@mui/icons-material";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { defaultMenuItems } from "../constants";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CurrentCompanyState, MenuManagementState } from "@/store/super.store";
import { FirstMenuItem } from "./components/first-menu-item";

export default function MenuManagementStep() {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [companyStore, setCompanyStore] = useRecoilState(CurrentCompanyState);
  const setMenuStore = useSetRecoilState(MenuManagementState);

  return (
    <div className="flex-1 flex flex-col gap-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={companyStore.menuManagement.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {companyStore.menuManagement.map((item) => (
            <FirstMenuItem key={item.id} item={item} />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId &&
          companyStore.menuManagement.find((i) => i.id === activeId) ? (
            <FirstMenuItem
              item={companyStore.menuManagement.find((i) => i.id === activeId)!}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
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
      setCompanyStore((prev) => {
        const newMenu = [...prev.menuManagement];
        const oldIndex = newMenu.findIndex((i) => i.id === active.id);
        const newIndex = newMenu.findIndex((i) => i.id === over.id);
        newMenu.splice(newIndex, 0, newMenu.splice(oldIndex, 1)[0]);
        return {
          ...prev,
          menuManagement: newMenu,
        };
      });
    }
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  function ResetToDefaultMenu() {
    setCompanyStore((prev) => {
      return {
        ...prev,
        menuManagement: defaultMenuItems,
      };
    });
    setMenuStore({
      deactivatedMenuIds: [],
      currentEditingMenuId: "",
    });
  }
}
