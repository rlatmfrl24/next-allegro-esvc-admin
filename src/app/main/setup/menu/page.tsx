"use client";

import MenuManagementStep from "@/app/sections/step-menu-management";
import { PageTitle } from "../../components/page-title";
import { DateTime } from "luxon";
import { MdIcon, MdTextButton } from "@/util/md3";
import { RestartAltOutlined } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";
import { CurrentCompanyState, MenuManagementState } from "@/store/super.store";
import { defaultMenuItems } from "@/app/constants";

export default function MenuManagementSetup() {
  const setCompanyStore = useSetRecoilState(CurrentCompanyState);
  const setMenuStore = useSetRecoilState(MenuManagementState);

  function ResetMenu() {
    setCompanyStore((prev) => ({
      ...prev,
      menuManagement: defaultMenuItems,
    }));
    setMenuStore({
      currentEditingMenuId: "",
      deactivatedMenuIds: [],
    });
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center">
        <PageTitle
          title="Menu Management"
          category="Setting up of System"
          updatedDate={DateTime.now()}
          className="flex-1 "
        />
        <MdTextButton className="ml-4" onClick={ResetMenu}>
          <MdIcon slot="icon">
            <RestartAltOutlined fontSize="small" />
          </MdIcon>
          Reset to Default Menu
        </MdTextButton>
      </div>
      <MenuManagementStep />
    </div>
  );
}
