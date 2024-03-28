import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdIcon,
  MdOutlinedButton,
  MdRippleEffect,
} from "@/util/md3";
import { Upload } from "@mui/icons-material";
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
import { useEffect, useState } from "react";
import { createMDTheme } from "@/util/theme";
import ColorPicker from "@/app/components/color-picker";

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

  const [selectedTheme, setSelectedTheme] = useState(colorThemes[8]);

  useEffect(() => {
    createMDTheme(selectedTheme.primaryColor);
  }, [selectedTheme]);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large">
          Theme & Style
        </MdTypography>
        <div className="flex gap-2">
          <MdOutlinedButton
            onClick={() => {
              props.onStepMove(0);
            }}
          >
            Previous
          </MdOutlinedButton>
          <MdFilledButton
            onClick={() => {
              props.onStepMove(2);
            }}
          >
            Next
          </MdFilledButton>
        </div>
      </div>
      <div className="flex flex-1 gap-6">
        <div className="min-w-[480px] border border-outlineVariant rounded-lg px-6 py-4 flex flex-col gap-4">
          <MdTypography variant="body" size="large" prominent>
            Logo Upload
          </MdTypography>
          <MdOutlinedButton className="w-fit">
            <MdIcon slot="icon">
              <Upload fontSize="small" />
            </MdIcon>
            Upload
          </MdOutlinedButton>
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
