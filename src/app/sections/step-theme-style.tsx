"use client";

import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import {
  MdChipSet,
  MdElevatedCard,
  MdElevation,
  MdIcon,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdRippleEffect,
} from "@/util/md3";
import { Upload } from "@mui/icons-material";
import Image from "next/image";

import DashboardPreview from "@/app/preview/dashboard/dashboard";
import { CSSProperties, useEffect, useRef, useState } from "react";
import {
  addCustomThemeToken,
  applyPresetTheme,
  createMDTheme,
} from "@/util/theme";
// import ColorPicker from "@/app/components/color-picker";
import { CurrentCompanyState } from "@/store/super.store";
import { useRecoilState, useSetRecoilState } from "recoil";
import RemovableChip from "@/app/components/removable-chip";
import { colorThemes } from "../constants";
import { modifiedDetectState } from "@/store/base.store";
import ColorPicker from "react-best-gradient-color-picker";
import { rgbToHex } from "@mui/material/styles";
import SimpleHuePicker from "../components/color-picker";
import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";

export default function ThemeStyleStep({
  previewOption = {
    width: 1280,
    height: 840,
    zoom: 0.6,
  },
}: {
  previewOption?: {
    width: number;
    height: number;
    zoom: number;
  };
}) {
  const [isPointColorPickerOpen, setIsPointColorPickerOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const modifiedDetect = useSetRecoilState(modifiedDetectState);
  const [currentCompanyStore, setCurrentCompanyStore] =
    useRecoilState(CurrentCompanyState);
  const [selectedTheme, setSelectedTheme] = useState(
    currentCompanyStore.themeStyle.theme
      ? currentCompanyStore.themeStyle.theme
      : undefined
  );
  const [selectedPointColor, setSelectedPointColor] = useState(
    getHexCodeFromToken("--md-sys-point-color") || "#000000"
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isPointColorPickerOpen,
    onOpenChange: setIsPointColorPickerOpen,
    placement: "bottom-start",
    middleware: [shift(), offset(12), flip()],
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  useEffect(() => {
    if (selectedPointColor) {
      addCustomThemeToken("--md-sys-point-color", selectedPointColor);
      modifiedDetect(true);
    }
  }, [selectedPointColor, modifiedDetect]);

  useEffect(() => {
    if (selectedTheme) {
      if (selectedTheme.name !== "custom" && selectedTheme.name !== "one") {
        applyPresetTheme(selectedTheme.preset);
      } else {
        createMDTheme(selectedTheme.primaryColor);

        if (selectedTheme.name === "one") {
          addCustomThemeToken("--md-sys-point-color", "#FFDBE4");
        }
      }
      setSelectedPointColor(getHexCodeFromToken("--md-sys-point-color"));
      modifiedDetect(true);
      setCurrentCompanyStore({
        ...currentCompanyStore,
        themeStyle: {
          ...currentCompanyStore.themeStyle,
          theme: selectedTheme,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme, setCurrentCompanyStore]);

  useEffect(() => {
    modifiedDetect(false);
  }, [modifiedDetect]);

  return (
    <div className="flex flex-1 gap-6">
      <div className="min-w-[480px] border border-outlineVariant rounded-lg px-6 py-4 flex flex-col gap-4">
        <MdTypography variant="body" size="large" prominent>
          Logo Upload
        </MdTypography>
        <div className="flex items-center gap-2">
          <MdOutlinedButton
            className="w-fit"
            disabled={currentCompanyStore.themeStyle.logo ? true : false}
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <MdIcon slot="icon">
              <Upload fontSize="small" />
            </MdIcon>
            Upload
          </MdOutlinedButton>
          <MdChipSet>
            {currentCompanyStore.themeStyle.logo && (
              <RemovableChip
                label={currentCompanyStore.themeStyle.logo.name}
                onRemove={() => {
                  modifiedDetect(true);
                  setCurrentCompanyStore((prev) => {
                    return {
                      ...prev,
                      themeStyle: {
                        ...prev.themeStyle,
                        logo: null,
                      },
                    };
                  });
                }}
              />
            )}
          </MdChipSet>
        </div>

        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              modifiedDetect(true);
              setCurrentCompanyStore((prev) => {
                return {
                  ...prev,
                  themeStyle: {
                    ...prev.themeStyle,
                    logo: file,
                  },
                };
              });

              e.target.value = "";
            }
          }}
        />
        <DividerComponent className="border-dotted my-2" />
        <MdTypography variant="body" size="large" prominent>
          Color Theme
        </MdTypography>
        <div className="grid grid-cols-4 gap-4">
          {colorThemes.map((theme) => {
            return (
              <div
                key={theme.name}
                className={`relative rounded-lg flex cursor-pointer ${
                  selectedTheme?.name === theme.name
                    ? "bg-surfaceContainerLowest border-2 border-primary"
                    : "bg-surfaceContainerLow border border-outlineVariant"
                }`}
                onClick={() => setSelectedTheme(theme)}
              >
                <MdRippleEffect />
                <Image
                  src={theme.icon}
                  alt={theme.name}
                  className="m-6 flex-1 w-12 h-12"
                />
              </div>
            );
          })}
        </div>
        {selectedTheme?.name === "custom" && (
          <SimpleHuePicker
            color={selectedTheme.primaryColor}
            onColorChange={(color) => {
              createMDTheme(color);
              if (selectedTheme.primaryColor !== color) {
                modifiedDetect(true);
                setSelectedTheme({
                  name: "custom",
                  preset: "CU",
                  icon: undefined,
                  primaryColor: color,
                });
              }
            }}
          />
        )}
        <DividerComponent className="border-dashed mt-4" />
        <MdTypography variant="body" size="large" prominent>
          Point Color
        </MdTypography>
        <div
          className="flex gap-4 items-center mb-4"
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <div
            className="relative rounded-full w-12 h-12 cursor-pointer p-px"
            style={
              {
                "--md-elevation-level": 1,
              } as CSSProperties
            }
            onClick={() => setIsPointColorPickerOpen((prev) => !prev)}
          >
            <div className="w-full h-full bg-pointColor rounded-full"></div>
            <MdElevation />
          </div>
          <MdOutlinedTextField
            label="Hex Color Code"
            value={rgbToHex(selectedPointColor)}
            readOnly
          />
        </div>

        {isPointColorPickerOpen && (
          <FloatingFocusManager context={context}>
            <MdElevatedCard
              className="w-fit p-3"
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <ColorPicker
                hideColorTypeBtns
                hideAdvancedSliders
                hideEyeDrop
                hideColorGuide
                hideInputType
                hidePresets
                hideOpacity
                value={selectedPointColor}
                onChange={setSelectedPointColor}
              />
            </MdElevatedCard>
          </FloatingFocusManager>
        )}
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
        <div className="flex justify-center py-12 px-12 overflow-hidden flex-auto h-0">
          <DashboardPreview
            width={previewOption.width}
            height={previewOption.height}
            zoom={previewOption.zoom}
          />
        </div>
      </div>
    </div>
  );
}

function getHexCodeFromToken(token: string) {
  return window
    .getComputedStyle(document.documentElement.querySelector("body") as Element)
    .getPropertyValue(token);
}
