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

export const customerWebLink = "https://next-allegro-esvc-md3.vercel.app/";

export const menuItems: MenuItemType[] = [
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

export const MaxPageSizeOptions = ["25", "50", "75", "100"];

export const LanguageOptions = ["English", "Korean", "Chinese", "Japanese"];
