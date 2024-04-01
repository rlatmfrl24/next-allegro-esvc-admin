"use client";

import { DividerComponent } from "@/app/components/divider";
import RemovableChip from "@/app/components/removable-chip";
import { MdTypography } from "@/app/components/typography";
import LandingPreview from "@/app/preview/landing/page";
import { CurrentCompanyState } from "@/store/super.store";

import {
  MdChipSet,
  MdIcon,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdTextButton,
} from "@/util/md3";
import { faker } from "@faker-js/faker";
import { ChevronLeft, ChevronRight, Upload } from "@mui/icons-material";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";

export default function MainPageStyleStep(props: {
  onStepMove: (step: number) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [currentCompanyStore, setCurrentCompanyStore] =
    useRecoilState(CurrentCompanyState);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large">
          Main Page Style
        </MdTypography>
        <div className="flex gap-2 items-center">
          <MdTextButton
            onClick={() => {
              props.onStepMove(1);
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
              props.onStepMove(3);
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
              console.log(e.target.files);
              const files = e.target.files;
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
                  setCurrentCompanyStore((prev) => {
                    return {
                      ...prev,
                      themeStyle: {
                        ...prev.themeStyle,
                        backgroundImages:
                          prev.themeStyle.backgroundImages.filter(
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
    </div>
  );
}
