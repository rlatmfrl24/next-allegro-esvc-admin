"use client";

import { GridSelectComponent } from "./components/grid-select";
import {
  DateFormatOptions,
  LanguageOptions,
  MaxPageSizeOptions,
  SearchPeriodOptions,
  TimeZoneOptions,
} from "../constants";
import { BaseItem } from "./components/base-configuration-item";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CurrentCompanyState } from "@/store/super.store";
import { GridMultiSelect } from "./components/grid-multi-select";
import { modifiedDetectState } from "@/store/base.store";
import { useEffect } from "react";

export default function SystemConfigurationStep() {
  const [companyStore, setCompanyStore] = useRecoilState(CurrentCompanyState);
  const modifiedDetect = useSetRecoilState(modifiedDetectState);

  useEffect(() => {
    modifiedDetect(false);
  }, [modifiedDetect]);

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
            modifiedDetect(true);
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
            modifiedDetect(true);
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
        <GridMultiSelect
          primarySelection={companyStore.configuration.maxPageSize.toString()}
          options={MaxPageSizeOptions}
          onChange={(result) => {
            modifiedDetect(true);
            setCompanyStore((prev) => ({
              ...prev,
              configuration: {
                ...prev.configuration,
                maxPageSize: parseInt(result.main),
              },
            }));
          }}
        />
      </div>
      <BaseItem>4</BaseItem>
      <BaseItem>Time Zone</BaseItem>
      <div className="border-b border-b-outlineVariant">
        <GridSelectComponent
          initialSelection={companyStore.configuration.timeZone}
          onChange={(selection) => {
            modifiedDetect(true);
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
        <GridMultiSelect
          primarySelection={companyStore.configuration.mainLanguage}
          options={LanguageOptions}
          onChange={(result) => {
            modifiedDetect(true);
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
