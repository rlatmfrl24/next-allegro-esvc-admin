import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import SubsumIndicator from "@/../public/icon_subsum_indicator.svg";
import { DividerComponent } from "@/app/components/divider";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import NAOutlinedMultiListBox from "@/app/components/na-outline-multi-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdDialog,
  MdFilledButton,
  MdOutlinedButton,
} from "@/util/md3";
import {
  AdminUserProps,
  AdminUserStatus,
  AdminUserType,
} from "@/util/typeDef/user";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

export const AdminUserDialog = ({
  isOpen,
  onOpenChage,
  mode = "add",
  initialData,
  onConfirm,
}: {
  isOpen: boolean;
  onOpenChage: () => void;
  mode?: "add" | "edit";
  initialData?: AdminUserProps;
  onConfirm?: (data: AdminUserProps) => void;
}) => {
  const [currentInfo, setCurrentInfo] = useState<AdminUserProps>(
    initialData ||
      ({
        type: AdminUserType.CompanyAdmin,
      } as AdminUserProps)
  );

  const tempOfficeCodeSet = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) =>
      faker.string.alphanumeric(5).toUpperCase()
    );
  }, []);

  function CheckValidity() {
    const invalid =
      !currentInfo.userId ||
      !currentInfo.userName ||
      !currentInfo.email ||
      !currentInfo.type ||
      !currentInfo.office;
    return !invalid;
  }

  useEffect(() => {
    setCurrentInfo(
      initialData ||
        ({
          type: AdminUserType.CompanyAdmin,
        } as AdminUserProps)
    );
  }, [initialData, isOpen]);

  return (
    <MdDialog
      className="min-w-[960px] min-h-fit"
      open={isOpen}
      closed={() => {
        setCurrentInfo({
          type: AdminUserType.CompanyAdmin,
        } as AdminUserProps);
        onOpenChage();
      }}
    >
      <div slot="headline">
        {
          {
            add: "Add Admin User",
            edit: "Admin Detail",
          }[mode]
        }
      </div>
      <div slot="content">
        <div className="grid grid-cols-2 gap-4">
          <NAOutlinedTextField
            label="User ID"
            className="h-fit"
            required
            value={currentInfo.userId || ""}
            handleValueChange={(value) => {
              setCurrentInfo((prev: AdminUserProps) => ({
                ...prev,
                userId: value,
              }));
            }}
            errorText="This field is required."
          />
          <NAOutlinedTextField
            label="User Name"
            className="h-fit"
            required
            value={currentInfo.userName || ""}
            handleValueChange={(value) => {
              setCurrentInfo((prev: AdminUserProps) => ({
                ...prev,
                userName: value,
              }));
            }}
            errorText="This field is required."
          />
          {mode === "add" && (
            <>
              <NAOutlinedTextField label="Password" />
              <NAOutlinedTextField label="Confirm Password" />
            </>
          )}
        </div>
        <DividerComponent className="border-dotted my-4" />
        <div className="flex gap-4 z-10">
          <NAOutlinedListBox
            className="flex-1"
            required
            options={Object.values(AdminUserType)}
            initialValue={currentInfo.type || AdminUserType.CompanyAdmin}
            onSelection={(value) => {
              setCurrentInfo((prev: AdminUserProps) => ({
                ...prev,
                type: value as AdminUserType,
              }));
            }}
          />
          <NAOutlinedAutoComplete
            className="flex-1"
            label="Office Code"
            required
            itemList={tempOfficeCodeSet}
            initialValue={currentInfo.office || ""}
            showAllonFocus
            onItemSelection={(value) => {
              setCurrentInfo((prev: AdminUserProps) => ({
                ...prev,
                office: value,
              }));
            }}
          />
          <NAOutlinedTextField
            className="flex-1"
            label="Email"
            required
            value={currentInfo.email || ""}
            handleValueChange={(value) => {
              setCurrentInfo((prev: AdminUserProps) => ({
                ...prev,
                email: value,
              }));
            }}
          />
        </div>
        <div className="bg-surfaceContainerHighest rounded-lg flex flex-col mt-4 p-4 ">
          <DetailTitle title="Notification" />
          <MdTypography
            variant="label"
            size="large"
            tag="label"
            className="flex items-center gap-2 p-4 cursor-pointer w-fit"
          >
            <MdCheckbox
              checked={currentInfo?.noficication?.booking || false}
              onClick={() => {
                setCurrentInfo((prev: AdminUserProps) => ({
                  ...prev,
                  noficication: {
                    ...prev.noficication,
                    booking: !prev.noficication?.booking,
                  },
                }));
              }}
            />
            Booking
          </MdTypography>
          <MdTypography
            variant="label"
            size="large"
            tag="label"
            className="flex items-center gap-2 p-4 cursor-pointer w-fit"
          >
            <MdCheckbox
              checked={currentInfo?.noficication?.si || false}
              onClick={() => {
                setCurrentInfo((prev: AdminUserProps) => ({
                  ...prev,
                  noficication: {
                    ...prev.noficication,
                    si: !prev.noficication?.si,
                  },
                }));
              }}
            />
            S/I
          </MdTypography>
          <div className="pl-3">
            <MdTypography
              variant="body"
              size="medium"
              prominent
              className="text-primary"
            >
              Office Notification
            </MdTypography>
            <NAOutlinedMultiListBox
              options={["Seoul", "Busan", "Incheon", "Vietnam", "Singapore"]}
              initialValue={currentInfo?.noficication?.officeNotification || []}
              onSelectionChange={(selection) => {
                setCurrentInfo((prev: AdminUserProps) => ({
                  ...prev,
                  noficication: {
                    ...prev.noficication,
                    officeNotification: selection,
                  },
                }));
              }}
            />
          </div>
        </div>
        {currentInfo.type === AdminUserType.GeneralStaff && (
          <div className="bg-surfaceContainerHighest rounded-lg flex flex-col mt-4 p-4 ">
            <DetailTitle title="Authorization" />
            <div className="flex flex-col gap-3 p-3">
              <MdTypography
                variant="label"
                size="large"
                tag="label"
                className="flex items-center gap-2 cursor-pointer w-fit"
              >
                <MdCheckbox
                  checked={
                    currentInfo?.authorization?.userManagement?.customerUser ||
                    false
                  }
                  onClick={() => {
                    setCurrentInfo((prev: AdminUserProps) => ({
                      ...prev,
                      authorization: {
                        ...prev.authorization,
                        userManagement: {
                          ...prev.authorization?.userManagement,
                          customerUser:
                            !prev.authorization?.userManagement?.customerUser,
                        },
                      },
                    }));
                  }}
                />
                User Management
              </MdTypography>
              <MdTypography
                variant="label"
                size="large"
                tag="label"
                className="flex items-center gap-2 cursor-pointer w-fit"
              >
                <Image src={SubsumIndicator} alt="subsum" />
                <MdCheckbox
                  checked={
                    currentInfo?.authorization?.userManagement?.customerUser ||
                    false
                  }
                  onClick={() => {
                    setCurrentInfo((prev: AdminUserProps) => ({
                      ...prev,
                      authorization: {
                        ...prev.authorization,
                        userManagement: {
                          ...prev.authorization?.userManagement,
                          customerUser:
                            !prev.authorization?.userManagement?.customerUser,
                        },
                      },
                    }));
                  }}
                />
                Customer User
              </MdTypography>
              <MdTypography
                variant="label"
                size="large"
                tag="label"
                className="flex items-center gap-2 cursor-pointer w-fit"
              >
                <MdCheckbox
                  checked={currentInfo?.authorization?.noticeManagement}
                  onClick={() => {
                    setCurrentInfo((prev: AdminUserProps) => ({
                      ...prev,
                      authorization: {
                        ...prev.authorization,
                        noticeManagement: !prev.authorization?.noticeManagement,
                      },
                    }));
                  }}
                />
                Notice Management
              </MdTypography>

              <MdTypography
                variant="label"
                size="large"
                tag="label"
                className="flex items-center gap-2 cursor-pointer w-fit"
              >
                <MdCheckbox
                  checked={
                    currentInfo?.authorization?.notificationSetup
                      ?.emailSetting &&
                    currentInfo?.authorization?.notificationSetup
                      ?.emailSendingHistory &&
                    currentInfo?.authorization?.notificationSetup
                      ?.emailSendingReport &&
                    currentInfo?.authorization?.notificationSetup
                      ?.officeGroupEmailSetting
                  }
                  indeterminate={
                    currentInfo?.authorization?.notificationSetup
                      ?.emailSetting !==
                      currentInfo?.authorization?.notificationSetup
                        ?.emailSendingHistory ||
                    currentInfo?.authorization?.notificationSetup
                      ?.emailSetting !==
                      currentInfo?.authorization?.notificationSetup
                        ?.emailSendingReport ||
                    currentInfo?.authorization?.notificationSetup
                      ?.emailSetting !==
                      currentInfo?.authorization?.notificationSetup
                        ?.officeGroupEmailSetting
                  }
                  onClick={() => {
                    // if indeterminate is true, then all are false
                    if (
                      currentInfo?.authorization?.notificationSetup
                        ?.emailSetting !==
                        currentInfo?.authorization?.notificationSetup
                          ?.emailSendingHistory ||
                      currentInfo?.authorization?.notificationSetup
                        ?.emailSetting !==
                        currentInfo?.authorization?.notificationSetup
                          ?.emailSendingReport ||
                      currentInfo?.authorization?.notificationSetup
                        ?.emailSetting !==
                        currentInfo?.authorization?.notificationSetup
                          ?.officeGroupEmailSetting
                    ) {
                      setCurrentInfo((prev: AdminUserProps) => ({
                        ...prev,
                        authorization: {
                          ...prev.authorization,
                          notificationSetup: {
                            emailSetting: false,
                            emailSendingHistory: false,
                            emailSendingReport: false,
                            officeGroupEmailSetting: false,
                          },
                        },
                      }));
                    } else {
                      // switch previous value to opposite
                      setCurrentInfo((prev: AdminUserProps) => ({
                        ...prev,
                        authorization: {
                          ...prev.authorization,
                          notificationSetup: {
                            emailSetting:
                              !prev.authorization?.notificationSetup
                                ?.emailSetting,
                            emailSendingHistory:
                              !prev.authorization?.notificationSetup
                                ?.emailSendingHistory,
                            emailSendingReport:
                              !prev.authorization?.notificationSetup
                                ?.emailSendingReport,
                            officeGroupEmailSetting:
                              !prev.authorization?.notificationSetup
                                ?.officeGroupEmailSetting,
                          },
                        },
                      }));
                    }
                  }}
                />
                Notification Setup
              </MdTypography>
              <MdTypography
                variant="label"
                size="large"
                tag="label"
                className="flex items-center gap-2 cursor-pointer w-fit"
              >
                <Image src={SubsumIndicator} alt="subsum" />
                <MdCheckbox
                  checked={
                    currentInfo?.authorization?.notificationSetup
                      ?.emailSetting || false
                  }
                  onClick={() => {
                    setCurrentInfo((prev: AdminUserProps) => ({
                      ...prev,
                      authorization: {
                        ...prev.authorization,
                        notificationSetup: {
                          ...prev.authorization?.notificationSetup,
                          emailSetting:
                            !prev.authorization?.notificationSetup
                              ?.emailSetting,
                        },
                      },
                    }));
                  }}
                />
                Email Setting
              </MdTypography>
              <MdTypography
                variant="label"
                size="large"
                tag="label"
                className="flex items-center gap-2 cursor-pointer w-fit"
              >
                <Image src={SubsumIndicator} alt="subsum" />
                <MdCheckbox
                  checked={
                    currentInfo?.authorization?.notificationSetup
                      ?.emailSendingHistory || false
                  }
                  onClick={() => {
                    setCurrentInfo((prev: AdminUserProps) => ({
                      ...prev,
                      authorization: {
                        ...prev.authorization,
                        notificationSetup: {
                          ...prev.authorization?.notificationSetup,
                          emailSendingHistory:
                            !prev.authorization?.notificationSetup
                              ?.emailSendingHistory,
                        },
                      },
                    }));
                  }}
                />
                Email Sending History
              </MdTypography>
              <MdTypography
                variant="label"
                size="large"
                tag="label"
                className="flex items-center gap-2 cursor-pointer w-fit"
              >
                <Image src={SubsumIndicator} alt="subsum" />
                <MdCheckbox
                  checked={
                    currentInfo?.authorization?.notificationSetup
                      ?.emailSendingReport || false
                  }
                  onClick={() => {
                    setCurrentInfo((prev: AdminUserProps) => ({
                      ...prev,
                      authorization: {
                        ...prev.authorization,
                        notificationSetup: {
                          ...prev.authorization?.notificationSetup,
                          emailSendingReport:
                            !prev.authorization?.notificationSetup
                              ?.emailSendingReport,
                        },
                      },
                    }));
                  }}
                />
                Email Sending Report
              </MdTypography>
              <MdTypography
                variant="label"
                size="large"
                tag="label"
                className="flex items-center gap-2 cursor-pointer w-fit"
              >
                <Image src={SubsumIndicator} alt="subsum" />
                <MdCheckbox
                  checked={
                    currentInfo?.authorization?.notificationSetup
                      ?.officeGroupEmailSetting || false
                  }
                  onClick={() => {
                    setCurrentInfo((prev: AdminUserProps) => ({
                      ...prev,
                      authorization: {
                        ...prev.authorization,
                        notificationSetup: {
                          ...prev.authorization?.notificationSetup,
                          officeGroupEmailSetting:
                            !prev.authorization?.notificationSetup
                              ?.officeGroupEmailSetting,
                        },
                      },
                    }));
                  }}
                />
                Office Group Email Setting
              </MdTypography>
            </div>
          </div>
        )}
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            onOpenChage();
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          disabled={!CheckValidity()}
          onClick={() => {
            onConfirm &&
              onConfirm({
                ...currentInfo,
                uuid: currentInfo.uuid || faker.string.uuid(),
                status: AdminUserStatus.Confirm,
                updatedAt: DateTime.now(),
              });
            setCurrentInfo({} as AdminUserProps);
            onOpenChage();
          }}
        >
          {
            {
              add: "Add",
              edit: "Save",
            }[mode]
          }
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
