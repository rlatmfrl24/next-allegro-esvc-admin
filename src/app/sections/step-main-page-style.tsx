"use client";

import { DividerComponent } from "@/app/components/divider";
import RemovableChip from "@/app/components/removable-chip";
import { MdTypography } from "@/app/components/typography";
import LandingPreview from "@/app/preview/landing/landing";
import { modifiedDetectState } from "@/store/base.store";
import { CurrentCompanyState } from "@/store/super.store";

import {
  MdChipSet,
  MdIcon,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/util/md3";
import { faker } from "@faker-js/faker";
import { Upload } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function MainPageStyleStep() {
  const fileRef = useRef<HTMLInputElement>(null);
  const modifiedDetect = useSetRecoilState(modifiedDetectState);
  const [currentCompanyStore, setCurrentCompanyStore] =
    useRecoilState(CurrentCompanyState);

  useEffect(() => {
    modifiedDetect(false);
  }, [modifiedDetect]);

  return (
    <div className="flex flex-1 gap-6">
      <div className="min-w-[480px] max-w-[480px] border border-outlineVariant rounded-lg px-6 py-4 flex flex-col gap-4">
        <MdTypography variant="body" size="large" prominent>
          Background Image
        </MdTypography>
        <MdOutlinedButton
          className="w-fit"
          onClick={() => {
            fileRef.current?.click();
          }}
        >
          <MdIcon slot="icon">
            <Upload fontSize="small" />
          </MdIcon>
          Upload
        </MdOutlinedButton>
        <input
          type="file"
          ref={fileRef}
          hidden
          multiple
          accept="image/*"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            modifiedDetect(true);
            setCurrentCompanyStore((prev) => {
              return {
                ...prev,
                themeStyle: {
                  ...prev.themeStyle,
                  backgroundImages: Array.from(files || []),
                },
              };
            });
          }}
        />
        <MdChipSet>
          {currentCompanyStore.themeStyle.backgroundImages?.map((file) => (
            <RemovableChip
              key={faker.string.uuid()}
              label={file.name}
              onRemove={() => {
                modifiedDetect(true);
                setCurrentCompanyStore((prev) => {
                  return {
                    ...prev,
                    themeStyle: {
                      ...prev.themeStyle,
                      backgroundImages: prev.themeStyle.backgroundImages.filter(
                        (f) => f !== file
                      ),
                    },
                  };
                });
              }}
            />
          ))}
        </MdChipSet>
        <DividerComponent className="border-dotted border-b-outlineVariant" />
        <MdTypography variant="body" size="large" prominent>
          Slogan
        </MdTypography>
        <MdOutlinedTextField
          type="textarea"
          label="Main Text"
          className="resize-y"
          rows={2}
          value={currentCompanyStore.themeStyle.mainText || ""}
          onInput={(e) => {
            modifiedDetect(true);
            setCurrentCompanyStore((prev) => {
              return {
                ...prev,
                themeStyle: {
                  ...prev.themeStyle,
                  mainText: e.currentTarget.value,
                },
              };
            });
          }}
        />
        <MdOutlinedTextField
          type="textarea"
          label="Sub Text"
          className="resize-y"
          rows={4}
          value={currentCompanyStore.themeStyle.subText || ""}
          onInput={(e) => {
            modifiedDetect(true);
            setCurrentCompanyStore((prev) => {
              return {
                ...prev,
                themeStyle: {
                  ...prev.themeStyle,
                  subText: e.currentTarget.value,
                },
              };
            });
          }}
        />
      </div>
      <div className="flex-1 rounded-lg bg-surfaceContainerLow px-6 py-4 flex flex-col">
        <MdTypography
          variant="body"
          size="large"
          prominent
          className="text-outlineVariant"
        >
          Preview
        </MdTypography>
        <div className="flex justify-center p-6 overflow-hidden flex-auto h-0">
          <LandingPreview />
        </div>
      </div>
    </div>
  );
}
