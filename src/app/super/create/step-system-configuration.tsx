import { GridSelectComponent } from "./components/grid-select";
import {
  DateFormatOptions,
  MaxPageSizeOptions,
  SearchPeriodOptions,
  TimeZoneOptions,
} from "./constants";
import { BaseItem } from "./components/base-configuration-item";
import { useRecoilState } from "recoil";
import { CurrentCompanyState } from "@/store/super.store";
import { LanguageSelect } from "./components/language-select";

export default function SystemConfigurationStep() {
  const [companyStore, setCompanyStore] = useRecoilState(CurrentCompanyState);

  return (
    <div className="grid grid-cols-[80px_1fr_1fr]">
      <BaseItem isHeader>No</BaseItem>
      <BaseItem isHeader>Item</BaseItem>
      <BaseItem isHeader>Value</BaseItem>
      <BaseItem>1</BaseItem>
      <BaseItem>Date Format</BaseItem>
      <div className="border-b border-b-outlineVariant">
        <GridSelectComponent
          initialSelection={companyStore.configuration.dateFormat}
          options={DateFormatOptions}
          onChange={(selection) => {
            setCompanyStore((prev) => ({
              ...prev,
              configuration: {
                ...prev.configuration,
                dateFormat: selection,
              },
            }));
          }}
        />
      </div>
      <BaseItem>2</BaseItem>
      <BaseItem>Search Period</BaseItem>
      <div className="border-b border-b-outlineVariant">
        <GridSelectComponent
          initialSelection={companyStore.configuration.searchPeriod}
          options={SearchPeriodOptions}
          onChange={(selection) => {
            setCompanyStore((prev) => ({
              ...prev,
              configuration: {
                ...prev.configuration,
                searchPeriod: selection,
              },
            }));
          }}
        />
      </div>
      <BaseItem>3</BaseItem>
      <BaseItem>Max Page Size</BaseItem>
      <div className="border-b border-b-outlineVariant">
        <GridSelectComponent
          initialSelection={companyStore.configuration.maxPageSize.toString()}
          onChange={(selection) => {
            setCompanyStore((prev) => ({
              ...prev,
              configuration: {
                ...prev.configuration,
                maxPageSize: parseInt(selection),
              },
            }));
          }}
          options={MaxPageSizeOptions}
        />
      </div>
      <BaseItem>4</BaseItem>
      <BaseItem>Time Zone</BaseItem>
      <div className="border-b border-b-outlineVariant">
        <GridSelectComponent
          initialSelection={companyStore.configuration.timeZone}
          onChange={(selection) => {
            setCompanyStore((prev) => ({
              ...prev,
              configuration: {
                ...prev.configuration,
                timeZone: selection,
              },
            }));
          }}
          options={TimeZoneOptions}
        />
      </div>
      <BaseItem>5</BaseItem>
      <BaseItem>Language</BaseItem>
      <div className="border-b border-b-outlineVariant">
        <LanguageSelect
          mainLanguage={companyStore.configuration.mainLanguage}
          languages={companyStore.configuration.languages}
          onChange={(result) => {
            setCompanyStore((prev) => ({
              ...prev,
              configuration: {
                ...prev.configuration,
                mainLanguage: result.main,
                languages: result.selections,
              },
            }));
          }}
        />
      </div>
    </div>
  );
}
