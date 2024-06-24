"use client";

import Link from "next/link";
import { CSSProperties, useState } from "react";

import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdFilledTonalButton,
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
  Check,
  ChevronLeft,
  ChevronRight,
  RestartAltOutlined,
} from "@mui/icons-material";
import { DividerComponent } from "@/app/components/divider";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CurrentCompanyState, MenuManagementState } from "@/store/super.store";
import { defaultMenuItems } from "../../constants";
import { ConfirmDialog } from "@/app/main/components/confirm-dialog";
import { set } from "lodash";
import { useRouter } from "next/navigation";
import Portal from "@/app/components/portal";
import {
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
} from "@mui/material";
import { BottomFloatingBar } from "@/app/main/components/bottom-floating-bar";

const StepLabelComponent = ({
  label,
  isAcvated = false,
}: {
  label: string;
  isAcvated: boolean;
}) => {
  const CustomStepIcon = (props: StepIconProps) => {
    const { active, completed, className, icon } = props;

    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          active
            ? "bg-primary"
            : completed
            ? "bg-primary"
            : "border border-outlineVariant"
        }`}
      >
        {completed ? (
          <>
            <Check className="text-white" />
          </>
        ) : (
          <MdTypography
            variant="label"
            size="large"
            className={
              active || completed ? "text-white" : "text-outlineVariant"
            }
          >
            {"0" + icon?.toString()}
          </MdTypography>
        )}
      </div>
    );
  };

  return (
    <StepLabel className="flex-1" StepIconComponent={CustomStepIcon}>
      <MdTypography
        variant="label"
        size="large"
        className={`-translate-y-2  ${
          isAcvated ? "text-primary" : "text-outline"
        }`}
      >
        {label}
      </MdTypography>
    </StepLabel>
  );
};

export default function CreateCompany() {
  const [currentStep, setCurrentStep] = useState(0);
  // const setCompanyStore = useSetRecoilState(CurrentCompanyState);
  const [companyStore, setCompanyStore] = useRecoilState(CurrentCompanyState);
  const setMenuStore = useSetRecoilState(MenuManagementState);
  const [isCreateCancelDialogOpen, setIsCreateCancelDialogOpen] =
    useState(false);
  const [isResetDefaultMenuDialogOpen, setIsResetDefaultMenuDialogOpen] =
    useState(false);
  const router = useRouter();

  return (
    <div className="px-12 py-6 flex flex-col flex-1">
      <Portal selector="#main-container">
        <ConfirmDialog
          isOpen={isCreateCancelDialogOpen}
          onOpenChange={setIsCreateCancelDialogOpen}
          title={`Are you sure you want to cancel your input? All entered values will be deleted.`}
          message="Create Company"
          onConfirm={() => {
            router.push("/super");
          }}
        />
        <ConfirmDialog
          isOpen={isResetDefaultMenuDialogOpen}
          onOpenChange={setIsResetDefaultMenuDialogOpen}
          title={`Do you want to reset all menu settings?`}
          message="Menu Management"
          onConfirm={() => {
            setCompanyStore((prev) => ({
              ...prev,
              menuManagement: defaultMenuItems,
            }));
            setMenuStore({
              deactivatedMenuIds: [],
              currentEditingMenuId: "",
            });
          }}
        />
      </Portal>

      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large" className="text-primary">
          Create Company
        </MdTypography>
        <div className="flex items-center gap-2">
          <MdOutlinedButton onClick={() => setIsCreateCancelDialogOpen(true)}>
            Cancel
          </MdOutlinedButton>
        </div>
      </div>

      <div className="bg-surfaceContainerLowest flex-1 rounded-2xl overflow-hidden mt-4 flex flex-col">
        <Stepper
          activeStep={currentStep}
          alternativeLabel
          connector={
            <StepConnector
              sx={{
                mt: 0.5,
                px: 1,
              }}
            />
          }
          className="mt-6 mb-4"
        >
          <Step key={"basic-information"}>
            <StepLabelComponent
              label="Basic Information"
              isAcvated={currentStep >= 0}
            />
          </Step>
          <Step key={"theme-style"}>
            <StepLabelComponent
              label="Theme & Style"
              isAcvated={currentStep >= 1}
            />
          </Step>
          <Step key={"main-page-style"}>
            <StepLabelComponent
              label="Main Page Style"
              isAcvated={currentStep >= 2}
            />
          </Step>
          <Step key={"menu-management"}>
            <StepLabelComponent
              label="Menu Management"
              isAcvated={currentStep >= 3}
            />
          </Step>
          <Step key={"system-configuration"}>
            <StepLabelComponent
              label="System Configuration"
              isAcvated={currentStep >= 4}
            />
          </Step>
          <Step key={"business-configuration"}>
            <StepLabelComponent
              label="Business Configuration"
              isAcvated={currentStep >= 5}
            />
          </Step>
        </Stepper>

        <DividerComponent className="border-dotted" />

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
                      setIsResetDefaultMenuDialogOpen(true);
                    }}
                  >
                    <MdIcon slot="icon">
                      <RestartAltOutlined fontSize="small" />
                    </MdIcon>
                    Reset to Default Menu
                  </MdTextButton>
                )}
                <MdFilledTonalButton
                  disabled={currentStep === 0}
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                  }}
                >
                  Previous
                </MdFilledTonalButton>
                <DividerComponent orientation="vertical" className="h-6" />
                <MdFilledButton
                  trailingIcon
                  disabled={
                    currentStep === 5 ||
                    (currentStep === 0 &&
                      (companyStore.basicInformation.companyName ===
                        undefined ||
                        companyStore.basicInformation.companyName === ""))
                  }
                  onClick={() => {
                    console.log(companyStore.basicInformation.companyName);
                    setCurrentStep(currentStep + 1);
                  }}
                >
                  Next
                </MdFilledButton>
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
