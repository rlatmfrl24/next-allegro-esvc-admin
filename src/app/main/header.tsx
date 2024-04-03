"use client";

import {
  MdElevatedCard,
  MdIcon,
  MdList,
  MdListItem,
  MdRippleEffect,
} from "@/util/md3";
import { MdTypography } from "../components/typography";
import { ExpandMore } from "@mui/icons-material";
import { CSSProperties, useState } from "react";
import CompanyLogo from "@/../public/logo_transfar_shipping.svg";
import Image from "next/image";
import {
  autoUpdate,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";

export const HeaderComponent = () => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const options = ["KRPUS", "CNSHA", "CNSGH", "CNSHK"];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOptionOpen,
    onOpenChange: setIsOptionOpen,
    middleware: [
      offset(2),
      shift(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
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

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  return (
    <header className="h-16 flex items-center">
      <div
        className="px-6 relative h-full flex items-center rounded-3xl select-none cursor-pointer"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <MdRippleEffect />
        <Image src={CompanyLogo} alt="Company Logo" className="mr-2" />
        <MdTypography
          variant="title"
          size="large"
          className="mr-4 text-outline"
        >
          {selectedOption}
        </MdTypography>
        <MdIcon
          className={`transform ${
            isOptionOpen ? "rotate-180" : "rotate-0"
          } transition-transform`}
        >
          <ExpandMore />
        </MdIcon>
      </div>
      {isMounted && (
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={{ ...floatingStyles }}
        >
          <MdElevatedCard style={{ ...styles }}>
            <MdList className="rounded-2xl overflow-hidden">
              {options.map((option) => (
                <MdListItem
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOptionOpen(false);
                  }}
                >
                  <div slot="headline">{option}</div>
                  <div slot="supporting-text">Cyberlogitec</div>
                </MdListItem>
              ))}
            </MdList>
          </MdElevatedCard>
        </div>
      )}
    </header>
  );
};
