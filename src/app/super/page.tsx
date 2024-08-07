"use client";

import {
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdMenu,
  MdMenuItem,
  MdOutlinedButton,
  MdRippleEffect,
  MdSwitch,
} from "@/util/md3";
import { MdTypography } from "../components/typography";
import { MoreVert } from "@mui/icons-material";
import { DividerComponent } from "../components/divider";
import EserviceLogo from "@/../public/logo_esvc.svg?url";
import TransfarShippingLogo from "@/../public/logo_transfar_shipping.svg?url";
import CyberlogitecLogo from "@/../public/logo_cyberlogitec.svg?url";
import TSLineLogo from "@/../public/logo_tsline.svg?url";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SuperHome() {
  return (
    <div className="flex-1 flex flex-col p-8">
      <Link href="/super/create" className="self-end">
        <MdFilledButton>Create Company</MdFilledButton>
      </Link>
      <div className="grid grid-cols-4 gap-6 mt-6 ">
        <CompanyCard
          companyName="E-Service"
          companyCode="ESVC"
          companyLogo={<Image src={EserviceLogo} alt="E-Service Logo" />}
          isActivated={true}
        />
        <CompanyCard
          companyName="Transfar Shipping"
          companyCode="TFSH"
          companyLogo={
            <Image src={TransfarShippingLogo} alt="Transfar Shipping Logo" />
          }
          isActivated={true}
        />
        <CompanyCard
          companyName="Cyberlogtiec"
          companyCode="CBLT"
          companyLogo={<Image src={CyberlogitecLogo} alt="Cyberlogtiec Logo" />}
        />
        <CompanyCard
          companyName="TS Line"
          companyCode="TSLN"
          companyLogo={<Image src={TSLineLogo} alt="TS Line Logo" />}
          isActivated={true}
        />
      </div>
    </div>
  );
}

const CompanyCard = (props: {
  companyName: string;
  companyCode: string;
  isActivated?: boolean;
  isTemporarySaved?: boolean;
  companyLogo?: React.ReactNode;
}) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="h-72 rounded-lg flex flex-col bg-surfaceContainerLowest border-2 border-secondaryContainer overflow-hidden relative cursor-pointer "
      onClick={() => {
        router.push("/main?companyCode=" + props.companyCode);
      }}
    >
      <div className="bg-surfaceContainerLow h-14 flex justify-between items-center pl-4 pr-2">
        <MdTypography variant="body" size="medium" prominent>
          {props.companyName}
        </MdTypography>
        <div className="flex items-center relative">
          {props.isTemporarySaved && (
            <MdTypography
              variant="label"
              size="medium"
              className="bg-errorContainer text-onErrorContainer px-2 py-0.5 rounded-lg"
            >
              Temporary Saved
            </MdTypography>
          )}
          <div className="relative z-10">
            <MdIconButton
              id="menu-anchor"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <MdIcon>
                <MoreVert />
              </MdIcon>
            </MdIconButton>
            <MdMenu
              open={isMenuOpen}
              anchor="menu-anchor"
              anchorCorner="end-end"
              menuCorner="start-end"
              close={() => setIsMenuOpen(false)}
            >
              <MdMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                }}
              >
                <div slot="headline">Copy</div>
              </MdMenuItem>
              <MdMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                }}
              >
                <div slot="headline">Delete</div>
              </MdMenuItem>
            </MdMenu>
          </div>
        </div>
      </div>
      <div className="flex-1 flex-col flex justify-center items-center">
        <MdTypography variant="title" size="medium" className="text-primary">
          {props.companyCode}
        </MdTypography>
        {props.companyLogo && (
          <div className="h-16 flex items-center">{props.companyLogo}</div>
        )}
      </div>
      <div className="p-4 text-right">
        <DividerComponent className="mb-4 border-dotted" />
        <MdTypography
          variant="label"
          size="medium"
          tag="label"
          className="text-outline"
        >
          Active
          <MdSwitch
            className="ml-2"
            selected={props.isActivated}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </MdTypography>
      </div>
    </div>
  );
};
