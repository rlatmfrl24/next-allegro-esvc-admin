"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import BackgroudImage from "@/../public/img/transfar_1.png";
import LogoImage from "@/../public/logo_transfar_shipping.svg";
import { MdCheckbox, MdElevatedCard, MdFilledButton } from "@/util/md3";

import Logo from "../components/logo";
import { NAOutlinedTextField } from "../components/na-textfield";
import { MdTypography } from "../components/typography";
import NAOutlinedListBox from "../components/na-outline-listbox";
import {
  AdminUserProps,
  AdminUserStatus,
  AdminUserType,
} from "@/util/typeDef/user";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/store/user.store";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

function createDummyAdminUser(userType?: AdminUserType): AdminUserProps {
  return {
    uuid: faker.string.uuid(),
    userId: faker.internet.userName(),
    email: faker.internet.email(),
    updatedAt: DateTime.fromJSDate(faker.date.recent()),
    userName: faker.person.fullName(),
    office: faker.string.alphanumeric(5).toUpperCase(),
    type: userType || faker.helpers.enumValue(AdminUserType),
    status: faker.helpers.enumValue(AdminUserStatus),
    noficication: {
      booking: faker.datatype.boolean(),
      si: faker.datatype.boolean(),
      officeNotification: faker.helpers.arrayElements([
        "Seoul",
        "Busan",
        "Incheon",
        "Vietnam",
        "Singapore",
      ]),
    },
    authorization: {
      userManagement: {
        customerUser: faker.datatype.boolean(),
      },
      noticeManagement: {
        notice: faker.datatype.boolean(),
        regionalContactPerson: faker.datatype.boolean(),
      },
      notificationSetup: {
        emailSetting: faker.datatype.boolean(),
        emailSendingSummary: faker.datatype.boolean(),
        officeGroupEmailSetting: faker.datatype.boolean(),
      },
    },
  };
}

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [userType, setUserType] = useState(AdminUserType.SystemAdmin);
  const [currentUserStore, setCurrentUserStore] =
    useRecoilState(currentUserState);
  const router = useRouter();

  function doLogin() {
    switch (userType) {
      case AdminUserType.SystemAdmin:
        setCurrentUserStore(createDummyAdminUser(AdminUserType.SystemAdmin));
        router.push("/super");
        break;
      case AdminUserType.CompanyAdmin:
        setCurrentUserStore(createDummyAdminUser(AdminUserType.CompanyAdmin));
        router.push("/main");
        break;
      case AdminUserType.GeneralStaff:
        setCurrentUserStore(createDummyAdminUser(AdminUserType.GeneralStaff));
        router.push("/main");
        break;
      default:
        setCurrentUserStore(createDummyAdminUser(AdminUserType.SystemAdmin));
        break;
    }
  }

  return (
    <div className="bg-surfaceContainerHigh h-screen flex flex-col">
      <header className="h-16 flex items-center">
        <Logo className="ml-5" />
      </header>
      <div className="bg-surfaceContainerLowest flex-auto h-0 flex relative rounded-3xl overflow-hidden">
        <Image
          src={BackgroudImage}
          alt="Background Image"
          className="flex-1"
          objectFit="cover"
        />
        <MdElevatedCard className="absolute top-1/2 left-1/2 w-[450px] -translate-x-1/2 -translate-y-1/2 py-12 px-9 flex flex-col gap-6 items-center">
          <Image src={LogoImage} alt="Logo" />
          <MdTypography
            variant="headline"
            size="large"
            className="whitespace-nowrap"
          >
            Login to your Account
          </MdTypography>
          <NAOutlinedListBox
            className="w-full mt-12"
            initialValue={userType}
            options={Object.values(AdminUserType)}
            onSelection={(value) => setUserType(value as AdminUserType)}
          />
          <NAOutlinedTextField
            label="ID"
            className="w-full"
            value={id}
            handleValueChange={(value) => setId(value)}
          />
          <NAOutlinedTextField
            label="PW"
            type="password"
            className="w-full"
            value={pw}
            handleValueChange={(value) => setPw(value)}
          />
          <MdTypography
            tag="label"
            variant="title"
            size="small"
            className="flex items-center gap-2 flex-start w-full text-left ml-2 cursor-pointer"
          >
            <MdCheckbox />
            Remember me
          </MdTypography>
          <MdFilledButton
            className="w-full"
            disabled={!id || !pw}
            onClick={() => {
              doLogin();
              // router.push("/super");
            }}
          >
            Log in
          </MdFilledButton>
          <div className="text-center">
            <MdTypography variant="body" size="small">
              When you have any problem to login,
            </MdTypography>
            <div className="flex">
              <MdTypography variant="body" size="small">
                please email
              </MdTypography>
              <MdTypography
                variant="body"
                size="small"
                prominent
                className="ml-1 underline cursor-pointer"
                onClick={() =>
                  (location.href = "mailto:MLKK.ESVCADMIN@tsneishi.com")
                }
              >
                MLKK.ESVCADMIN@tsneishi.com
              </MdTypography>
            </div>
          </div>
        </MdElevatedCard>
      </div>
      <footer className="h-10 flex items-center justify-end pr-6">
        <MdTypography variant="body" size="small" className="text-outline">
          Copyright © CyberLogitec All Rights Reserved.
        </MdTypography>
      </footer>
    </div>
  );
}
