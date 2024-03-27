"use client";

import { MdFilledButton } from "@/util/md3";

export default function SuperHome() {
  return (
    <div className="flex-1 flex flex-col p-8">
      <MdFilledButton className="w-fit self-end">Create Company</MdFilledButton>
      <div className="grid grid-cols-4"> </div>
    </div>
  );
}

const CompanyCard = ({}: {
  companyName: string;
  companyCode: string;
  isActivated: boolean;
  companyLogo?: React.ReactNode;
}) => {
  return <div className="h-64"></div>;
};
