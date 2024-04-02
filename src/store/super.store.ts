import { menuItems } from "@/app/super/create/constants";
import { CompanyThemeType, CompanyType } from "@/util/typeDef/super";
import { atom } from "recoil";

export const CurrentCompanyState = atom({
  key: "currentCompany",
  default: {
    basicInformation: {} as CompanyType,
    themeStyle: {} as CompanyThemeType,
    menuManagement: menuItems,
    configuration: {
      dateFormat: "YYYY-MM-DD",
      searchPeriod: "1 Week",
      maxPageSize: 25,
      timeZone: "GMT-12:00",
      mainLanguage: "English",
      languages: ["English"],
      useSignUpTerms: false,
      signUpTermsFile: null as File | null,
      useOnlineQuotesTerms: false,
      onlineQuotesTermsFile: null as File | null,
      dormantPeriod: 180,
    },
  },
});

export const MenuManagementState = atom({
  key: "menuManagement",
  default: {
    deactivatedMenuIds: [] as string[],
    currentEditingMenuId: "",
  },
});
