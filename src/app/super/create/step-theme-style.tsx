import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import {
  MdChipSet,
  MdFilledButton,
  MdIcon,
  MdInputChip,
  MdOutlinedButton,
  MdRippleEffect,
  MdTextButton,
} from "@/util/md3";
import { ChevronLeft, ChevronRight, Upload } from "@mui/icons-material";
import Image from "next/image";
import IconThemeViolet from "@/../public/assets/img_theme_violet.svg";
import IconThemePurple from "@/../public/assets/img_theme_purple.svg";
import IconThemeBlue from "@/../public/assets/img_theme_blue.svg";
import IconThemeGreen from "@/../public/assets/img_theme_green.svg";
import IconThemeYellow from "@/../public/assets/img_theme_yellow.svg";
import IconThemeOrange from "@/../public/assets/img_theme_orange.svg";
import IconThemeRed from "@/../public/assets/img_theme_red.svg";
import IconThemeDarkBlue from "@/../public/assets/img_theme_darkblue.svg";
import IconThemeJeal from "@/../public/assets/img_theme_jeal.svg";
import IconThemeCustom from "@/../public/assets/img_theme_custom.svg";
import DashboardPreview from "@/app/preview/dashboard/page";
import { use, useEffect, useRef, useState } from "react";
import { createMDTheme } from "@/util/theme";
import ColorPicker from "@/app/components/color-picker";
import { CurrentCompanyState } from "@/store/super.store";
import { useRecoilState } from "recoil";
import { faker } from "@faker-js/faker";
import RemovableChip from "@/app/components/removable-chip";

export default function ThemeStyleStep(props: {
  onStepMove: (step: number) => void;
}) {
  const colorThemes = [
    {
      name: "violet",
      icon: IconThemeViolet,
      primaryColor: "#6B4EB8",
    },
    {
      name: "purple",
      icon: IconThemePurple,
      primaryColor: "#BE489D",
    },
    {
      name: "blue",
      icon: IconThemeBlue,
      primaryColor: "#00A3FF",
    },
    {
      name: "green",
      icon: IconThemeGreen,
      primaryColor: "#20B266",
    },
    {
      name: "yellow",
      icon: IconThemeYellow,
      primaryColor: "#EBA900",
    },
    {
      name: "orange",
      icon: IconThemeOrange,
      primaryColor: "#F17B2F",
    },
    {
      name: "red",
      icon: IconThemeRed,
      primaryColor: "#D13044",
    },
    {
      name: "dark blue",
      icon: IconThemeDarkBlue,
      primaryColor: "#174FA0",
    },
    {
      name: "jeal",
      icon: IconThemeJeal,
      primaryColor: "#196584",
    },
    {
      name: "custom",
      icon: IconThemeCustom,
      primaryColor: "#000000",
    },
  ];

  const fileRef = useRef<HTMLInputElement>(null);
  const [currentCompanyStore, setCurrentCompanyStore] =
    useRecoilState(CurrentCompanyState);
  const [selectedTheme, setSelectedTheme] = useState(
    currentCompanyStore.themeStyle.theme
      ? currentCompanyStore.themeStyle.theme
      : colorThemes[0]
  );

  useEffect(() => {
    createMDTheme(selectedTheme.primaryColor);
    setCurrentCompanyStore({
      ...currentCompanyStore,
      themeStyle: {
        ...currentCompanyStore.themeStyle,
        theme: selectedTheme,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme, setCurrentCompanyStore]);

  useEffect(() => {
    console.log(currentCompanyStore.themeStyle.logo);
  }, [currentCompanyStore]);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large">
          Theme & Style
        </MdTypography>
        <div className="flex gap-2 items-center">
          <MdTextButton
            onClick={() => {
              props.onStepMove(0);
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
              props.onStepMove(2);
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
                    selectedTheme.name === theme.name
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
          {selectedTheme.name === "custom" && (
            <ColorPicker
              className="mt-4"
              color="#000000"
              onColorChange={(color) => {
                createMDTheme(color);
              }}
            />
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
            <DashboardPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
