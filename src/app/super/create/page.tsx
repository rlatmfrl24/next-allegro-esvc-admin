"use client";

import Link from "next/link";
import { CSSProperties, useState } from "react";

import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdIcon,
  MdOutlinedButton,
  MdPrimaryTab,
  MdTabs,
  MdTextButton,
} from "@/util/md3";

import BasicInformationStep from "../../sections/step-basic-information";
import ThemeStyleStep from "../../sections/step-theme-style";
import MainPageStyleStep from "../../sections/step-main-page-style";
import MenuManagementStep from "../../sections/step-menu-management";
import SystemConfigurationStep from "../../sections/step-system-configuration";
import BusinessConfigurationStep from "../../sections/step-business-configuration";
import {
  ChevronLeft,
  ChevronRight,
  RestartAltOutlined,
} from "@mui/icons-material";
import { DividerComponent } from "@/app/components/divider";
import { useSetRecoilState } from "recoil";
import { CurrentCompanyState } from "@/store/super.store";
import { defaultMenuItems } from "../../constants";

export default function CreateCompany() {
  const tabBackgroundStyle = {
    "--md-primary-tab-container-color": "#fff",
  } as CSSProperties;

  const [currentStep, setCurrentStep] = useState(0);
  const setCompanyStore = useSetRecoilState(CurrentCompanyState);

  return (
    <div className="px-12 py-6 flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large" className="text-primary">
          Create Company
        </MdTypography>
        <div className="flex items-center gap-2">
          <Link href={`/super`}>
            <MdOutlinedButton>Cancel</MdOutlinedButton>
          </Link>
          <Link href={`/super`}>
            <MdFilledButton>Create</MdFilledButton>
          </Link>
        </div>
      </div>

      <div className="bg-surfaceContainerLowest flex-1 rounded-2xl overflow-hidden mt-4 flex flex-col">
        <MdTabs
          className="bg-surfaceContainerLowest"
          onchange={(e) => {
            const index = (e.currentTarget as any).activeTabIndex;
            setCurrentStep(index);
          }}
        >
          <MdPrimaryTab style={tabBackgroundStyle} selected={currentStep === 0}>
            Basic Information
          </MdPrimaryTab>
          <MdPrimaryTab style={tabBackgroundStyle} selected={currentStep === 1}>
            Theme & Style
          </MdPrimaryTab>
          <MdPrimaryTab style={tabBackgroundStyle} selected={currentStep === 2}>
            Main Page Style
          </MdPrimaryTab>
          <MdPrimaryTab style={tabBackgroundStyle} selected={currentStep === 3}>
            Menu Management
          </MdPrimaryTab>
          <MdPrimaryTab style={tabBackgroundStyle} selected={currentStep === 4}>
            System Configuration
          </MdPrimaryTab>
          <MdPrimaryTab style={tabBackgroundStyle} selected={currentStep === 5}>
            Business Configuration
          </MdPrimaryTab>
        </MdTabs>
        <div className="px-8 py-6 flex-1 flex flex-col">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between">
              <MdTypography variant="title" size="large">
                {
                  {
                    0: "Basic Information",
                    1: "Theme & Style",
                    2: "Main Page Style",
                    3: "Menu Management",
                    4: "System Configuration",
                    5: "Business Configuration",
                  }[currentStep]
                }
              </MdTypography>
              <div className="flex gap-2 items-center">
                {currentStep === 3 && (
                  <MdTextButton
                    onClick={() => {
                      setCompanyStore((prev) => ({
                        ...prev,
                        menuManagement: defaultMenuItems,
                      }));
                    }}
                  >
                    <MdIcon slot="icon">
                      <RestartAltOutlined fontSize="small" />
                    </MdIcon>
                    Reset to Default Menu
                  </MdTextButton>
                )}
                <MdTextButton
                  disabled={currentStep === 0}
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                  }}
                >
                  <MdIcon slot="icon">
                    <ChevronLeft />
                  </MdIcon>
                  Previous
                </MdTextButton>
                <DividerComponent orientation="vertical" className="h-6" />
                <MdTextButton
                  trailingIcon
                  disabled={currentStep === 5}
                  onClick={() => {
                    setCurrentStep(currentStep + 1);
                  }}
                >
                  Next
                  <MdIcon slot="icon">
                    <ChevronRight />
                  </MdIcon>
                </MdTextButton>
              </div>
            </div>
            {
              {
                0: <BasicInformationStep />,
                1: <ThemeStyleStep />,
                2: <MainPageStyleStep />,
                3: <MenuManagementStep />,
                4: <SystemConfigurationStep />,
                5: <BusinessConfigurationStep />,
              }[currentStep]
            }
          </div>
        </div>
      </div>
    </div>
  );
}
