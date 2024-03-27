"use client";

import { MdTypography } from "@/app/components/typography";
import { MdOutlinedButton, MdPrimaryTab, MdTabs } from "@/util/md3";
import { CSSProperties, useState } from "react";
import BasicInformationStep from "./basic-information-step";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
        <Link href={`/super`}>
          <MdOutlinedButton>Cancel</MdOutlinedButton>
        </Link>
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
        <div className="px-8 py-6 flex-1">
          {
            {
              0: (
                <BasicInformationStep
                  onNextStep={() => {
                    setCurrentStep(1);
                  }}
                />
              ),
              1: "Theme & Style",
              2: "Main Page Style",
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
