import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import { MdCheckbox, MdFilledButton, MdIcon, MdTextButton } from "@/util/md3";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { BaseItem } from "./components/base-configuration-item";
import { use, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentCompanyState } from "@/store/super.store";

export default function BusinessConfigurationStep(props: {
  onStepMove: (step: number) => void;
}) {
  const [companyStore, setCompanyStore] = useRecoilState(CurrentCompanyState);
  const signupTermsFileRef = useRef<HTMLInputElement>(null);
  const onlineQuotesTermsFileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large">
          Business Configuration
        </MdTypography>
        <div className="flex gap-2 items-center">
          <MdTextButton
            onClick={() => {
              props.onStepMove(4);
            }}
          >
            <MdIcon slot="icon">
              <ChevronLeft />
            </MdIcon>
            Previous
          </MdTextButton>
          <DividerComponent orientation="vertical" className="h-6" />
          <MdTextButton disabled trailingIcon>
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
        <BaseItem>Use Terms & Condition (Sign Up)</BaseItem>
        <div className="flex border-b border-outlineVariant items-center">
          <MdCheckbox
            className="ml-2 mr-3"
            checked={companyStore.configuration.useSignUpTerms}
            onClick={() => {
              setCompanyStore({
                ...companyStore,
                configuration: {
                  ...companyStore.configuration,
                  useSignUpTerms: !companyStore.configuration.useSignUpTerms,
                },
              });
            }}
          />
          <MdTypography
            variant="body"
            size="medium"
            className={`flex-1 ${
              companyStore.configuration.signUpTermsFile === null
                ? "text-outlineVariant"
                : ""
            }`}
          >
            {companyStore.configuration.signUpTermsFile?.name ?? "File Name"}
          </MdTypography>
          <input
            type="file"
            ref={signupTermsFileRef}
            hidden
            onChange={(e) => {
              setCompanyStore({
                ...companyStore,
                configuration: {
                  ...companyStore.configuration,
                  signUpTermsFile: e.target.files?.[0] ?? null,
                },
              });
            }}
          />
          <MdFilledButton
            disabled={!companyStore.configuration.useSignUpTerms}
            onClick={() => {
              signupTermsFileRef.current?.click();
            }}
          >
            Upload
          </MdFilledButton>
        </div>
        <BaseItem>2</BaseItem>
        <BaseItem>Use Terms & Condition (Online Quotes)</BaseItem>
        <div className="flex border-b border-outlineVariant items-center">
          <MdCheckbox
            className="ml-2 mr-3"
            checked={companyStore.configuration.useOnlineQuotesTerms}
            onClick={() => {
              setCompanyStore({
                ...companyStore,
                configuration: {
                  ...companyStore.configuration,
                  useOnlineQuotesTerms:
                    !companyStore.configuration.useOnlineQuotesTerms,
                },
              });
            }}
          />
          <MdTypography
            variant="body"
            size="medium"
            className={`flex-1 ${
              companyStore.configuration.onlineQuotesTermsFile === null
                ? "text-outlineVariant"
                : ""
            }`}
          >
            {companyStore.configuration.onlineQuotesTermsFile?.name ??
              "File Name"}
          </MdTypography>
          <input
            type="file"
            ref={onlineQuotesTermsFileRef}
            hidden
            onChange={(e) => {
              setCompanyStore({
                ...companyStore,
                configuration: {
                  ...companyStore.configuration,
                  onlineQuotesTermsFile: e.target.files?.[0] ?? null,
                },
              });
            }}
          />
          <MdFilledButton
            disabled={!companyStore.configuration.useOnlineQuotesTerms}
            onClick={() => {
              onlineQuotesTermsFileRef.current?.click();
            }}
          >
            Upload
          </MdFilledButton>
        </div>
        <BaseItem>3</BaseItem>
        <BaseItem>Dormant Period</BaseItem>
        <BaseItem>{companyStore.configuration.dormantPeriod}</BaseItem>
      </div>
    </div>
  );
}
