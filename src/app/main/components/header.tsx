"use client";

import { MdTypography } from "../../components/typography";
import CompanyLogo from "@/../public/logo_transfar_shipping.svg";
import Image from "next/image";

export const HeaderComponent = ({ branch }: { branch: string }) => {
  return (
    <header className="min-h-16 flex items-center">
      <div className="px-6 relative h-full flex items-center rounded-3xl select-none">
        <Image src={CompanyLogo} alt="Company Logo" className="mr-2" />
        <MdTypography
          variant="title"
          size="large"
          className="mr-4 text-outline"
        >
          {branch}
        </MdTypography>
      </div>
    </header>
  );
};
