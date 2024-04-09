import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdChipSet,
  MdElevation,
  MdFilterChip,
  MdIcon,
  MdList,
  MdListItem,
} from "@/util/md3";
import {
  FloatingFocusManager,
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
import { ArrowDropDown } from "@mui/icons-material";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { LanguageOptions } from "../../constants";
import { flushSync } from "react-dom";
import { DividerComponent } from "@/app/components/divider";

export const GridMultiSelect = ({
  className,
  onChange,
  primarySelection,
  options,
}: {
  className?: string;
  onChange?: (result: { main: string; selections: string[] }) => void;
  primarySelection?: string;
  options?: string[];
}) => {
  const defaultSelectionRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const [mainSelection, setMainSelection] = useState<string>(
    primarySelection ? primarySelection : ""
  );
  const [selections, setSelections] = useState<string[]>(
    options ? options : []
  );
  const [isOptionOpen, setIsOptionOpen] = useState(false);
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
          flushSync(() => {
            return setMaxHeight(
              availableHeight -
                defaultSelectionRef.current?.getBoundingClientRect().height! -
                20
            );
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

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  useEffect(() => {
    if (!selections.includes(mainSelection)) {
      setMainSelection("");
    }
    onChange?.({ main: mainSelection, selections });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainSelection, selections]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`relative h-full flex items-center p-2 cursor-pointer ${
          className ? className : ""
        } ${isOptionOpen ? "bg-surfaceContainerLowest" : ""}`}
      >
        <MdTypography variant="body" size="medium" className="flex-1">
          {selections
            .map((selection, index) => {
              if (mainSelection === selection) {
                return `${selection} (Default)`;
              } else {
                return selection;
              }
            })
            .join(", ") || "Select Languages"}
        </MdTypography>
        <MdIcon>
          <ArrowDropDown
            className={`transition duration-300 ${
              isOptionOpen ? "transform rotate-180 " : ""
            }`}
          />
        </MdIcon>
      </div>
      {isMounted && (
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-10"
          >
            <div
              style={
                {
                  "--md-elevation-level": 3,
                  ...styles,
                } as CSSProperties
              }
              className="relative rounded outline-none"
            >
              <MdElevation />
              <div
                ref={defaultSelectionRef}
                className="bg-surfaceContainerLow px-3 py-4"
              >
                <MdTypography variant="body" size="large">
                  Select Default Values
                </MdTypography>
                <MdChipSet className="mt-2">
                  {selections.map((selection, index) => (
                    <MdFilterChip
                      key={selection}
                      label={selection}
                      selected={mainSelection === selection}
                      onClick={() => {
                        setMainSelection(selection);
                        // sort the selections by main selection is first
                        setSelections([
                          selection,
                          ...selections.filter((item) => item !== selection),
                        ]);
                      }}
                    />
                  ))}
                </MdChipSet>
              </div>
              <DividerComponent className="py-1 bg-surfaceContainerLow" />
              <MdList
                className="relative rounded overflow-y-auto"
                style={{ maxHeight } as CSSProperties}
              >
                {options &&
                  options.map((option, index) => (
                    <MdListItem
                      key={option}
                      type="button"
                      onClick={() => {
                        if (selections.includes(option)) {
                          setSelections(
                            selections.filter((item) => item !== option)
                          );
                        } else {
                          setSelections([...selections, option]);
                        }
                      }}
                    >
                      <MdCheckbox
                        slot="start"
                        checked={selections.includes(option)}
                      />
                      {option}
                    </MdListItem>
                  ))}
              </MdList>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
