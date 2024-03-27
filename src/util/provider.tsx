"use client";

import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { applyPresetTheme, createMDTheme } from "./theme";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    applyPresetTheme("default");
  }, []);

  return <RecoilRoot>{children}</RecoilRoot>;
}
