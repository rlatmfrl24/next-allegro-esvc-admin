"use client";

import MenuManagementStep from "@/app/sections/step-menu-management";
import { PageTitle } from "../../components/page-title";
import { DateTime } from "luxon";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function MenuManagementSetup() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <OverlayScrollbarsComponent>
        <PageTitle
          title="Menu Management"
          category="Setting up of System"
          updatedDate={DateTime.now()}
        />
        <MenuManagementStep />
      </OverlayScrollbarsComponent>
    </div>
  );
}
