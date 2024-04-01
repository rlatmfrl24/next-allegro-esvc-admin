import { CompanyThemeType, CompanyType } from "@/util/typeDef/super";
import { atom } from "recoil";

export const CurrentCompanyState = atom({
  key: "currentCompany",
  default: {
    basicInformation: {} as CompanyType,
    themeStyle: {} as CompanyThemeType,
  },
});
