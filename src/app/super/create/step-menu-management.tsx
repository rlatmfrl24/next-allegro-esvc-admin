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
import { menuItems } from "./constants";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CurrentCompanyState, MenuManagementState } from "@/store/super.store";
import { FirstMenuItem } from "./components/first-menu-item";

export default function MenuManagementStep(props: {
  onStepMove: (step: number) => void;
}) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [companyStore, setCompanyStore] = useRecoilState(CurrentCompanyState);
  const setMenuStore = useSetRecoilState(MenuManagementState);

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
                item={
                  companyStore.menuManagement.find((i) => i.id === activeId)!
                }
              />
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
        menuManagement: menuItems,
      };
    });
    setMenuStore({
      deactivatedMenuIds: [],
      currentEditingMenuId: "",
    });
  }
}
