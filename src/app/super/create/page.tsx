"use client";

import Link from "next/link";
import { CSSProperties, useState } from "react";

import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdOutlinedButton,
  MdPrimaryTab,
  MdTabs,
} from "@/util/md3";

import BasicInformationStep from "./step-basic-information";
import ThemeStyleStep from "./step-theme-style";
import MainPageStyle from "./step-main-page-style";

export default function CreateCompany() {
  const tabBackgroundStyle = {
    "--md-primary-tab-container-color": "#fff",
  } as CSSProperties;

  const [currentStep, setCurrentStep] = useState(0);

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
          {
            {
              0: (
                <BasicInformationStep
                  onStepMove={(step) => setCurrentStep(step)}
                />
              ),
              1: <ThemeStyleStep onStepMove={(step) => setCurrentStep(step)} />,
              2: <MainPageStyle onStepMove={(step) => setCurrentStep(step)} />,
              3: "Menu Management",
              4: "System Configuration",
              5: "Business Configuration",
            }[currentStep]
          }
        </div>
      </div>
    </div>
  );
}
