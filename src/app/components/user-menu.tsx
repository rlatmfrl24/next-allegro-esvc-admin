"use client";

import { MdElevatedCard, MdIcon, MdIconButton, MdMenuItem } from "@/util/md3";
import UserProfileIcon from "@/../public/icon_user_default_profile.svg";
import Image from "next/image";
import { CSSProperties, useState } from "react";
import {
  autoUpdate,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { MdTypography } from "./typography";
import Link from "next/link";

export const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    middleware: [shift()],
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: {
      open: 200,
      close: 100,
    },
    initial: { opacity: 0, transform: "translateY(-8px)" },
    open: { opacity: 1, transform: "translateY(0)" },
    close: { opacity: 0, transform: "translateY(-8px)" },
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  return (
    <>
      <MdIconButton
        ref={refs.setReference}
        {...getReferenceProps()}
        className="mr-4"
      >
        <MdIcon className="text-primary">
          <Image src={UserProfileIcon} alt="User Profile" />
        </MdIcon>
      </MdIconButton>
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-20"
        >
          <MdElevatedCard
            style={
              {
                ...styles,
              } as CSSProperties
            }
            className="w-60 bg-surfaceContainerHigh py-2"
          >
            <div className="w-full flex flex-col justify-center items-center p-6 gap-4">
              <MdTypography variant="headline" size="small" className="w-fit">
                Wy_lee
              </MdTypography>
              <MdTypography variant="body" size="medium">
                Jsahn@cyberlogitec.com
              </MdTypography>
            </div>
            <MdMenuItem>Account Profile</MdMenuItem>
            <Link href={"/login"}>
              <MdMenuItem>Sign Out</MdMenuItem>
            </Link>
          </MdElevatedCard>
        </div>
      )}
    </>
  );
};
