"use client";

import CompanyLogo from "@/../public/logo_transfar_shipping.svg";
import { SettingsOutlined } from "@mui/icons-material";
import Image from "next/image";
import { MdTypography } from "../components/typography";
import { MdRippleEffect } from "@/util/md3";
import { useRouter } from "next/navigation";

export default function SideNavigation() {
  const router = useRouter();

  return (
    <aside className="w-64 flex-shrink-0 p-3 flex flex-col gap-3 ">
      <Image src={CompanyLogo} alt="Company Logo" />
      <button
        className="relative rounded-2xl bg-tertiaryContainer h-14 flex gap-3 justify-center items-center"
        onClick={() => router.push("/super")}
      >
        <MdRippleEffect />
        <SettingsOutlined />
        <MdTypography variant="label" size="large">
          Company Management
        </MdTypography>
      </button>
    </aside>
  );
}
