"use client";
import { useRouter } from "next/navigation";
import { CSSProperties, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { MdTypography } from "@/app/components/typography";
import { modifiedDetectState } from "@/store/base.store";
import { CurrentCompanyState } from "@/store/super.store";
import { MdCheckbox, MdElevation, MdFilledButton } from "@/util/md3";

import { BaseItem } from "./components/base-configuration-item";

export default function BusinessConfigurationStep() {
  const [companyStore, setCompanyStore] = useRecoilState(CurrentCompanyState);
  const modifiedDetect = useSetRecoilState(modifiedDetectState);
  const signupTermsFileRef = useRef<HTMLInputElement>(null);
  const onlineQuotesTermsFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    modifiedDetect(false);
  }, [modifiedDetect]);

  return (
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
            modifiedDetect(true);
            setCompanyStore({
              ...companyStore,
              configuration: {
                ...companyStore.configuration,
                useSignUpTerms: !companyStore.configuration.useSignUpTerms,
                signUpTermsFile: null,
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
            modifiedDetect(true);
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
            modifiedDetect(true);
            setCompanyStore({
              ...companyStore,
              configuration: {
                ...companyStore.configuration,
                useOnlineQuotesTerms:
                  !companyStore.configuration.useOnlineQuotesTerms,
                onlineQuotesTermsFile: null,
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
            modifiedDetect(true);
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
      <input
        value={companyStore.configuration.dormantPeriod}
        type="number"
        className="appearance-none border-b border-b-outlineVariant text-right w-full p-2 outline-none focus:border-2 focus:border-primary focus:rounded-sm"
        onFocus={(e) => {
          e.currentTarget.select();
        }}
        onInput={(e) => {
          modifiedDetect(true);
          setCompanyStore({
            ...companyStore,
            configuration: {
              ...companyStore.configuration,
              dormantPeriod: parseInt(e.currentTarget.value),
            },
          });
        }}
      />

      <div
        className="fixed bottom-3 left-4 w-[calc(100%-2rem)] p-2 rounded-full flex justify-end bg-surfaceContainer z-10"
        style={
          {
            "--md-elevation-level": 2,
          } as CSSProperties
        }
      >
        <MdElevation />
        <MdFilledButton
          onClick={() => {
            router.push("/super");
          }}
        >
          Create
        </MdFilledButton>
      </div>
    </div>
  );
}
