"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";

import NoticeManagementIcon from "@/../public/icon_menu_notice_management.svg";
import NotificationSetupIcon from "@/../public/icon_menu_notification_setup.svg";
import SystemSetupIcon from "@/../public/icon_menu_system_setup.svg";
import UserManagementIcon from "@/../public/icon_menu_user_management.svg";
import CompanyLogo from "@/../public/logo_transfar_shipping.svg";
import { MdIcon, MdRippleEffect } from "@/util/md3";
import { MenuItemType } from "@/util/typeDef/super";
import { ArrowDropDown, SettingsOutlined } from "@mui/icons-material";

import { MdTypography } from "../../components/typography";
import { mainMenuItems } from "../../constants";

export default function SideNavigation() {
  const router = useRouter();

  return (
    <aside className="w-[360px] flex-shrink-0 p-3 flex flex-col gap-3 ">
      <Image src={CompanyLogo} alt="Company Logo" />
      <button
        className="relative rounded-2xl bg-tertiaryContainer min-h-14 flex gap-3 justify-center items-center"
        onClick={() => router.push("/super")}
      >
        <MdRippleEffect />
        <SettingsOutlined />
        <MdTypography variant="label" size="large">
          Company Management
        </MdTypography>
      </button>
      <div className="flex-auto h-0 overflow-y-auto flex flex-col">
        <OverlayScrollbarsComponent className="flex-1">
          {mainMenuItems.map((item) => (
            <MainItemComponent key={item.id} item={item} />
          ))}
        </OverlayScrollbarsComponent>
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
  const isLeaf = !item.subMenu || item.subMenu.length === 0;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div
        className={`flex items-center min-h-14 p-4 relative overflow-hidden rounded-full cursor-pointer select-none mt-1 ${
          pathname.includes(item.link || "") ? "bg-secondaryContainer" : ""
        }`}
        onClick={() => {
          if (isLeaf && item.link) {
            router.push("/main/" + item.link);
          } else {
            setIsExpanded((prev) => !prev);
          }
        }}
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
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: { duration: 0.3 },
            }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
            className="flex flex-col gap-1 min-h-fit mt-1"
          >
            {item.subMenu?.map((subItem) => (
              <SubItemComponent
                key={subItem.id}
                item={subItem}
                parentPath={"main/" + item.link || "main/"}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SubItemComponent = ({
  item,
  parentPath,
}: {
  item: MenuItemType;
  parentPath: string;
}) => {
  const isLeaf = !item.subMenu || item.subMenu.length === 0;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`flex items-center min-h-14 p-4 relative overflow-hidden rounded-full cursor-pointer ml-4 select-none ${
        pathname.includes(item.link || "") ? "bg-secondaryContainer" : ""
      }`}
      onClick={() => {
        if (isLeaf && item.link) {
          router.push("/" + parentPath + "/" + item.link);
        }
      }}
    >
      <MdRippleEffect />
      <MdTypography variant="label" size="large" className="ml-2 flex-1">
        {item.name}
      </MdTypography>
    </div>
  );
};