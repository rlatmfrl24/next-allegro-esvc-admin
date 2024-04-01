import { DateTime } from "luxon";

export type CompanyType = {
  companyName: string;
  companyCode: string;
  effectiveDate?: [DateTime, DateTime];
  representative: string;
  location: string;
  locationDetail: string;
  faxNumber: string;
  telNumber: string;
  address: string;
  zipCode: string;
  email: string;
};

export type CompanyThemeType = {
  logo: File | null;
  theme: {
    name: string;
    icon: any;
    primaryColor: string;
  };
  backgroundImages: File[];
  mainText: string;
  subText: string;
};

export type MenuItemType = {
  id: string;
  name: string;
  link?: string;
  isAvailable: boolean;
  subMenu?: MenuItemType[];
};
