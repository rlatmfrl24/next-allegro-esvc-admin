"use client";

import CompanyLogo from "@/../public/logo_transfar_shipping.svg";
import { ArrowDropDown, SettingsOutlined } from "@mui/icons-material";
import Image from "next/image";
import { MdTypography } from "../components/typography";
import { MdIcon, MdRippleEffect } from "@/util/md3";
import { useRouter } from "next/navigation";
import { mainMenuItems } from "../constants";
import { MenuItemType } from "@/util/typeDef/super";
import SystemSetupIcon from "@/../public/icon_menu_system_setup.svg";
import UserManagementIcon from "@/../public/icon_menu_user_management.svg";
import NoticeManagementIcon from "@/../public/icon_menu_notice_management.svg";
import NotificationSetupIcon from "@/../public/icon_menu_notification_setup.svg";
import { useState } from "react";

export default function SideNavigation() {
  const router = useRouter();

  return (
    <aside className="w-[360px] flex-shrink-0 p-3 flex flex-col gap-3 ">
      <Image src={CompanyLogo} alt="Company Logo" />
      <button
        className="relative rounded-2xl bg-tertiaryContainer h-14 flex gap-3 justify-center items-center"
        onClick={() => router.push("/super")}
      >
        <MdRippleEffect />
        <SettingsOutlined />
        <MdTypography variant="label" size="large">
          Company Management
        </MdTypography>
      </button>
      <div className="flex flex-col gap-1">
        {mainMenuItems.map((item) => (
          <MainItemComponent key={item.id} item={item} />
        ))}
      </div>
    </aside>
  );
}

const MainItemComponent = ({ item }: { item: MenuItemType }) => {
  const menuIcon = {
    setup: SystemSetupIcon,
    user: UserManagementIcon,
    notice: NoticeManagementIcon,
    notification: NotificationSetupIcon,
  }[item.id];

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        className="flex items-center h-14 p-4 relative overflow-hidden rounded-full cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <MdRippleEffect />
        <Image src={menuIcon} alt={item.name} />
        <MdTypography variant="label" size="large" className="ml-2 flex-1">
          {item.name}
        </MdTypography>
        {item.subMenu && item.subMenu.length > 0 && (
          <MdIcon
            className={`transform ${
              isExpanded ? "rotate-180" : "rotate-0"
            } transition-transform duration-300`}
          >
            <ArrowDropDown fontSize="small" />
          </MdIcon>
        )}
      </div>
    </>
  );
};
