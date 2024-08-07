import IconThemeCustom from "@/../public/assets/img_theme_custom.svg?url";
import IconThemePU from "@/../public/assets/img_theme_pu.svg?url";
import IconThemeONE from "@/../public/assets/img_theme_one.svg?url";
import IconThemePK from "@/../public/assets/img_theme_pk.svg?url";
import IconThemeBL from "@/../public/assets/img_theme_bl.svg?url";
import IconThemeNA from "@/../public/assets/img_theme_na.svg?url";
import IconThemeGR from "@/../public/assets/img_theme_gr.svg?url";
import IconThemeYG from "@/../public/assets/img_theme_yg.svg?url";
import IconThemeOR from "@/../public/assets/img_theme_or.svg?url";
import IconThemeRE from "@/../public/assets/img_theme_re.svg?url";
import { MenuItemType } from "@/util/typeDef/super";

export const colorThemes = [
  {
    name: "violet",
    preset: "PU",
    icon: IconThemePU,
    primaryColor: "#6B4EB8",
  },
  {
    name: "one",
    preset: "ONE",
    icon: IconThemeONE,
    primaryColor: "#BE489D",
  },
  {
    name: "blue",
    preset: "BL",
    icon: IconThemeBL,
    primaryColor: "#3F51B5",
  },
  {
    name: "nx",
    preset: "NA",
    icon: IconThemeNA,
    primaryColor: "#1A237E",
  },
  {
    name: "green",
    preset: "GR",
    icon: IconThemeGR,
    primaryColor: "#4CAF50",
  },
  {
    name: "yellow",
    preset: "YG",
    icon: IconThemeYG,
    primaryColor: "#FFC107",
  },
  {
    name: "orange",
    preset: "OR",
    icon: IconThemeOR,
    primaryColor: "#FF5722",
  },
  {
    name: "pink",
    preset: "PK",
    icon: IconThemePK,
    primaryColor: "#E91E63",
  },
  {
    name: "red",
    preset: "RE",
    icon: IconThemeRE,
    primaryColor: "#F44336",
  },
  {
    name: "custom",
    preset: "CU",
    icon: IconThemeCustom,
    primaryColor: "#000000",
  },
];

export const customerWebLink = "https://next-allegro-esvc-md3.vercel.app/";

export const mainMenuItems: MenuItemType[] = [
  {
    id: "setup",
    name: "Setting up of System",
    originName: "Setting up of System",
    link: "setup",
    isAvailable: true,
    subMenu: [
      {
        id: "basic",
        name: "Basic Information",
        originName: "Basic Information",
        link: "basic",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "theme",
        name: "Theme & Style",
        originName: "Theme & Style",
        link: "theme",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "main-page",
        name: "Main Page Style",
        originName: "Main Page Style",
        link: "main-page",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "menu",
        name: "Menu Management",
        originName: "Menu Management",
        link: "menu",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "system-config",
        name: "System Configuration",
        originName: "System Configuration",
        link: "system-config",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "business-config",
        name: "Business Configuration",
        originName: "Business Configuration",
        link: "business-config",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "message",
    name: "Message Management",
    originName: "Message Management",
    link: "message",
    isAvailable: true,
    subMenu: [],
  },
  {
    id: "user",
    name: "User Management",
    originName: "User Management",
    link: "user",
    isAvailable: true,
    subMenu: [
      {
        id: "admin",
        name: "Admin User",
        originName: "Admin User",
        link: "admin",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "customer",
        name: "Customer User",
        originName: "Customer User",
        link: "customer",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "notice",
    name: "Notice Management",
    originName: "Notice Management",
    link: "notice",
    isAvailable: true,
    subMenu: [],
  },
  {
    id: "notification",
    name: "Notification Setup",
    originName: "Notification Setup",
    link: "notification",
    isAvailable: true,
    subMenu: [
      {
        id: "email-setting",
        name: "Email Setting",
        originName: "Email Setting",
        link: "email-setting",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "email-history",
        name: "Email Sending History",
        originName: "Email Sending History",
        link: "email-history",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "email-report",
        name: "Email Sending Report",
        originName: "Email Sending Report",
        link: "email-report",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "office",
        name: "Office Email Setting (Booking & SI)",
        originName: "Office Email Setting (Booking & SI)",
        link: "office",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
];

export const defaultMenuItems: MenuItemType[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    originName: "Dashboard",
    link: "dashboard",
    isAvailable: true,
    subMenu: [],
  },
  {
    id: "schedule",
    name: "Schedule",
    link: "schedule",
    originName: "Schedule",
    isAvailable: true,
    subMenu: [
      {
        id: "ptp",
        name: "Point to Point Schedule",
        originName: "Point to Point Schedule",
        link: "ptp",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "vessel",
        name: "Vessel Schedule",
        originName: "Vessel Schedule",
        link: "vessel",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "port",
        name: "Port Schedule",
        originName: "Port Schedule",
        link: "port",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "long_range",
        name: "Long Range Schedule",
        originName: "Long Range Schedule",
        link: "long-range",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "my",
        name: "My Schedule",
        originName: "My Schedule",
        link: "my",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "pricing",
    name: "Pricing",
    originName: "Pricing",
    link: "pricing",
    isAvailable: true,
    subMenu: [
      {
        id: "online_quote",
        name: "Online Quote",
        originName: "Online Quote",
        link: "online-quote",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "surcharge",
        name: "Surcharge Search",
        originName: "Surcharge Search",
        link: "surchage-search",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "booking",
    name: "Booking",
    originName: "Booking",
    link: "booking",
    isAvailable: true,
    subMenu: [
      {
        id: "request",
        name: "Booking Request",
        originName: "Booking Request",
        link: "request",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "status",
        name: "Booking Status",
        originName: "Booking Status",
        link: "status",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "template",
        name: "Booking Template",
        originName: "Booking Template",
        link: "template",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "special_cargo",
        name: "Search Cargo Status Search",
        originName: "Search Cargo Status Search",
        link: "special-cargo",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "dg_restriction",
        name: "DG Restriction Search",
        originName: "DG Restriction Search",
        link: "dg-restriction",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "documents",
    name: "Documents",
    originName: "Documents",
    link: "documents",
    isAvailable: true,
    subMenu: [
      {
        id: "si",
        name: "Shipping Instruction",
        originName: "Shipping Instruction",
        link: "si",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "template",
        name: "Shipping Instruction Template",
        originName: "Shipping Instruction Template",
        link: "template",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "draft",
        name: "Draft N/N B/L",
        originName: "Draft N/N B/L",
        link: "draft",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "sea_waybill",
        name: "Sea Waybill Print",
        originName: "Sea Waybill Print",
        link: "sea-waybill",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "vgm",
        name: "VGM",
        originName: "VGM",
        link: "vgm",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "tare",
        name: "Container Tare Finder",
        originName: "Container Tare Finder",
        link: "tare",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "log",
        name: "Advanced Manifest Log",
        originName: "Advanced Manifest Log",
        link: "log",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "tracking",
    name: "Track & Trace",
    originName: "Track & Trace",
    link: "tracking",
    isAvailable: true,
    subMenu: [
      {
        id: "cargo",
        name: "Cargo Tracking",
        originName: "Cargo Tracking",
        link: "cargo",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "my",
        name: "My Tracking",
        originName: "My Tracking",
        link: "my",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "import",
    name: "Import (Inbound)",
    originName: "Import (Inbound)",
    link: "import",
    isAvailable: true,
    subMenu: [
      {
        id: "master",
        name: "Inbound Master",
        originName: "Inbound Master",
        link: "master",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "surrender",
        name: "BL Surrender Check",
        originName: "BL Surrender Check",
        link: "surrunder",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "notice",
        name: "Arrival Notice",
        originName: "Arrival Notice",
        link: "notice",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "check",
        name: "B/L Check",
        originName: "B/L Check",
        link: "check",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "invoice",
        name: "Invoice",
        originName: "Invoice",
        link: "invoice",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "shipment",
    name: "Manage Shipment",
    originName: "Manage Shipment",
    link: "shipment",
    isAvailable: true,
    subMenu: [
      {
        id: "overview",
        name: "Shipment Overview",
        originName: "Shipment Overview",
        link: "overview",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "report",
        name: "Report",
        originName: "Report",
        link: "report",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "my_report",
        name: "My Report",
        originName: "My Report",
        link: "my-report",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "tariff",
    name: "Detention & Demurrage",
    originName: "Detention & Demurrage",
    link: "tariff",
    isAvailable: true,
    subMenu: [
      {
        id: "dem_det",
        name: "DEM/DET Tariff",
        originName: "DEM/DET Tariff",
        link: "dem-det",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "inquiry",
        name: "Charge Inquiry",
        originName: "Charge Inquiry",
        link: "inquiry",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "status",
        name: "Detention Status",
        originName: "Detention Status",
        link: "status",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
];

export const DateFormatOptions = [
  "YYYY-MM-DD",
  "YY-MM-DD",
  "YY-MON-DD",
  "MM-DD-YYYY",
  "MM-DD-YY",
  "MON-DD-YY",
  "DD-MM-YYYY",
  "DD-MM-YY",
  "DD-MON-YY",
  "YYYY/MM/DD",
  "YY/MM-DD",
  "YY/MON/DD",
  "MM/DD/YYYY",
  "MM/DD/YY",
  "MON/DD-YY",
  "DD/MM/YYYY",
  "DD/MON/YY",
];

export const SearchPeriodOptions = [
  "1 Week",
  "2 Weeks",
  "3 Weeks",
  "1 Month",
  "2 Months",
  "3 Months",
];

export const TimeZoneOptions = [
  "GMT-12:00",
  "GMT-11:00",
  "GMT-10:00",
  "GMT-09:00",
  "GMT-08:00",
  "GMT-07:00",
  "GMT+09:00",
  "GMT+10:00",
  "GMT+11:00",
  "GMT+12:00",
  "GMT+13:00",
  "GMT+14:00",
];

export const MaxPageSizeOptions = [
  "10",
  "20",
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "100",
];

export const LanguageOptions = ["English", "Korean", "Chinese", "Japanese"];

export const basicPopoverStyles = {
  duration: {
    open: 200,
    close: 150,
  },
  initial: { opacity: 0, transform: "translateY(-8px)" },
  open: { opacity: 1, transform: "translateY(0px)" },
  close: { opacity: 0, transform: "translateY(-8px)" },
};

export const getBasicDropdownStyles = (direction: "down" | "up") => {
  return {
    duration: {
      open: 200,
      close: 100,
    },
    initial: {
      opacity: 0,
      transformOrigin: direction === "down" ? "top" : "bottom",
      transform:
        direction === "down"
          ? "scaleY(0.55) translateY(-10px)"
          : "scaleY(0.55) translateY(10px)",
    },
    open: {
      opacity: 1,
      transformOrigin: direction === "down" ? "top" : "bottom",
      transform: "scaleY(1) translateY(0)",
    },
    close: {
      opacity: 0,
      transformOrigin: direction === "down" ? "top" : "bottom",
      transform:
        direction === "down"
          ? "scaleY(0.55) translateY(-10px)"
          : "scaleY(0.55) translateY(10px)",
    },
  };
};
