import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { MdTypography } from "@/app/components/typography";
import { MdElevation, MdIcon, MdList, MdListItem } from "@/util/md3";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
} from "@floating-ui/react";
import { ArrowDropDown, Check } from "@mui/icons-material";

export const GridSelectComponent = ({
  className,
  options,
  onChange,
}: {
  className?: string;
  options: string[];
  onChange?: (value: string) => void;
}) => {
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  const [selection, setSelection] = useState(options[0]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const listRef = useRef<any[]>([]);
  const { refs, floatingStyles, context } = useFloating({
    open: isOptionOpen,
    onOpenChange: setIsOptionOpen,
    middleware: [
      offset(2),
      shift(),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
          flushSync(() => setMaxHeight(availableHeight));
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps, getReferenceProps, getItemProps } = useInteractions(
    [
      useClick(context),
      useDismiss(context),
      useListNavigation(context, {
        listRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
      }),
    ]
  );

  useEffect(() => {
    if (onChange) {
      onChange(selection);
    }
  }, [onChange, selection]);

  return (
    <>
      <div
        className={`relative h-full flex items-center p-2 cursor-pointer ${
          className ? className : ""
        } ${isOptionOpen ? "bg-surfaceContainerLowest" : ""}`}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <MdTypography variant="body" size="medium" className="flex-1">
          {selection}
        </MdTypography>
        <MdIcon>
          <ArrowDropDown
            className={`transition duration-300 ${
              isOptionOpen ? "transform rotate-180 " : ""
            }`}
          />
        </MdIcon>
      </div>
      {isOptionOpen && (
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            style={
              {
                "--md-elevation-level": 3,
                ...floatingStyles,
              } as CSSProperties
            }
            {...getFloatingProps()}
            className="relative rounded outline-none z-10"
          >
            <MdElevation />
            <MdList
              className="relative rounded overflow-y-auto"
              style={{ maxHeight } as CSSProperties}
            >
              <OverlayScrollbarsComponent defer>
                {options.map((option, index) => (
                  <MdListItem
                    key={option}
                    tabIndex={activeIndex === index ? 0 : -1}
                    ref={(node) => {
                      listRef.current[index] = node;
                    }}
                    {...getItemProps()}
                    className={`hover:bg-surfaceDim cursor-pointer select-none ${
                      activeIndex === index ? "bg-surfaceDim" : ""
                    } ${selection === option ? "bg-surfaceDim" : ""}`}
                    onClick={() => {
                      setSelectedIndex(index);
                      setSelection(option);
                      setIsOptionOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelectedIndex(index);
                        setSelection(option);
                        setIsOptionOpen(false);
                      }
                    }}
                  >
                    <MdIcon slot="start">
                      {selection === option && <Check />}
                    </MdIcon>
                    {option}
                  </MdListItem>
                ))}
              </OverlayScrollbarsComponent>
            </MdList>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
