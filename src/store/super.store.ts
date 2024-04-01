import { CompanyThemeType, CompanyType } from "@/util/typeDef/super";
import { atom } from "recoil";

export const CurrentCompanyState = atom({
  key: "currentCompany",
  default: {
    basicInformation: {} as CompanyType,
    themeStyle: {} as CompanyThemeType,
  },
});

export const MenuManagementState = atom({
  key: "menuManagement",
  default: {
    deactivatedMenuIds: [] as string[],
  },
});
