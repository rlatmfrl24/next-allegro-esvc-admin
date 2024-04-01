import IconThemeViolet from "@/../public/assets/img_theme_violet.svg";
import IconThemePurple from "@/../public/assets/img_theme_purple.svg";
import IconThemeBlue from "@/../public/assets/img_theme_blue.svg";
import IconThemeGreen from "@/../public/assets/img_theme_green.svg";
import IconThemeYellow from "@/../public/assets/img_theme_yellow.svg";
import IconThemeOrange from "@/../public/assets/img_theme_orange.svg";
import IconThemeRed from "@/../public/assets/img_theme_red.svg";
import IconThemeDarkBlue from "@/../public/assets/img_theme_darkblue.svg";
import IconThemeJeal from "@/../public/assets/img_theme_jeal.svg";
import IconThemeCustom from "@/../public/assets/img_theme_custom.svg";
import { MenuItemType } from "@/util/typeDef/super";

export const colorThemes = [
  {
    name: "violet",
    icon: IconThemeViolet,
    primaryColor: "#6B4EB8",
  },
  {
    name: "purple",
    icon: IconThemePurple,
    primaryColor: "#BE489D",
  },
  {
    name: "blue",
    icon: IconThemeBlue,
    primaryColor: "#00A3FF",
  },
  {
    name: "green",
    icon: IconThemeGreen,
    primaryColor: "#20B266",
  },
  {
    name: "yellow",
    icon: IconThemeYellow,
    primaryColor: "#EBA900",
  },
  {
    name: "orange",
    icon: IconThemeOrange,
    primaryColor: "#F17B2F",
  },
  {
    name: "red",
    icon: IconThemeRed,
    primaryColor: "#D13044",
  },
  {
    name: "dark blue",
    icon: IconThemeDarkBlue,
    primaryColor: "#174FA0",
  },
  {
    name: "jeal",
    icon: IconThemeJeal,
    primaryColor: "#196584",
  },
  {
    name: "custom",
    icon: IconThemeCustom,
    primaryColor: "#000000",
  },
];

export const menuItems: MenuItemType[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    link: "dashboard",
    isAvailable: true,
    subMenu: [],
  },
  {
    id: "schedule",
    name: "Schedule",
    link: "schedule",
    isAvailable: true,
    subMenu: [
      {
        id: "ptp",
        name: "Point to Point Schedule",
        link: "ptp",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "vessel",
        name: "Vessel Schedule",
        link: "vessel",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "port",
        name: "Port Schedule",
        link: "port",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "long_range",
        name: "Long Range Schedule",
        link: "long-range",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "my",
        name: "My Schedule",
        link: "my",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "pricing",
    name: "Pricing",
    link: "pricing",
    isAvailable: true,
    subMenu: [
      {
        id: "online_quote",
        name: "Online Quote",
        link: "online-quote",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "surcharge",
        name: "Surcharge Search",
        link: "surchage-search",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "booking",
    name: "Booking",
    link: "booking",
    isAvailable: true,
    subMenu: [
      {
        id: "request",
        name: "Booking Request",
        link: "request",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "status",
        name: "Booking Status",
        link: "status",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "template",
        name: "Booking Template",
        link: "template",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "special_cargo",
        name: "Search Cargo Status Search",
        link: "special-cargo",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "dg_restriction",
        name: "DG Restriction Search",
        link: "dg-restriction",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "documents",
    name: "Documents",
    link: "documents",
    isAvailable: true,
    subMenu: [
      {
        id: "si",
        name: "Shipping Instruction",
        link: "si",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "template",
        name: "Shipping Instruction Template",
        link: "template",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "draft",
        name: "Draft N/N B/L",
        link: "draft",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "sea_waybill",
        name: "Sea Waybill Print",
        link: "sea-waybill",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "vgm",
        name: "VGM",
        link: "vgm",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "tare",
        name: "Container Tare Finder",
        link: "tare",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "log",
        name: "Advanced Manifest Log",
        link: "log",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "tracking",
    name: "Track & Trace",
    link: "tracking",
    isAvailable: true,
    subMenu: [
      {
        id: "cargo",
        name: "Cargo Tracking",
        link: "cargo",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "my",
        name: "My Tracking",
        link: "my",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "import",
    name: "Import (Inbound)",
    link: "import",
    isAvailable: true,
    subMenu: [
      {
        id: "master",
        name: "Inbound Master",
        link: "master",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "surrender",
        name: "BL Surrender Check",
        link: "surrunder",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "notice",
        name: "Arrival Notice",
        link: "notice",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "check",
        name: "B/L Check",
        link: "check",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "invoice",
        name: "Invoice",
        link: "invoice",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "shipment",
    name: "Manage Shipment",
    link: "shipment",
    isAvailable: true,
    subMenu: [
      {
        id: "overview",
        name: "Shipment Overview",
        link: "overview",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "report",
        name: "Report",
        link: "report",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "my_report",
        name: "My Report",
        link: "my-report",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
  {
    id: "tariff",
    name: "Detention & Demurrage",
    link: "tariff",
    isAvailable: true,
    subMenu: [
      {
        id: "dem_det",
        name: "DEM/DET Tariff",
        link: "dem-det",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "inquiry",
        name: "Charge Inquiry",
        link: "inquiry",
        isAvailable: true,
        subMenu: [],
      },
      {
        id: "status",
        name: "Detention Status",
        link: "status",
        isAvailable: true,
        subMenu: [],
      },
    ],
  },
];
