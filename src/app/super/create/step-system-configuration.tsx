import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/util/md3";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { GridSelectComponent } from "./components/grid-select";
import {
  DateFormatOptions,
  LanguageOptions,
  MaxPageSizeOptions,
  SearchPeriodOptions,
  TimeZoneOptions,
} from "./constants";
import { BaseItem } from "./components/base-configuration-item";
import { useRecoilState } from "recoil";
import { CurrentCompanyState } from "@/store/super.store";

export default function SystemConfigurationStep(props: {
  onStepMove: (step: number) => void;
}) {
  const [companyStore, setCompanyStore] = useRecoilState(CurrentCompanyState);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large">
          System Configuration
        </MdTypography>
        <div className="flex gap-2 items-center">
          <MdTextButton
            onClick={() => {
              props.onStepMove(3);
            }}
          >
            <MdIcon slot="icon">
              <ChevronLeft />
            </MdIcon>
            Previous
          </MdTextButton>
          <DividerComponent orientation="vertical" className="h-6" />
          <MdTextButton
            onClick={() => {
              props.onStepMove(5);
            }}
            trailingIcon
          >
            Next
            <MdIcon slot="icon">
              <ChevronRight />
            </MdIcon>
          </MdTextButton>
        </div>
      </div>
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
          <GridSelectComponent options={LanguageOptions} />
        </div>
      </div>
    </div>
  );
}
