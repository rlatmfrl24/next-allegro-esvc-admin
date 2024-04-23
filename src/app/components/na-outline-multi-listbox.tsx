import {
  MdCheckbox,
  MdElevatedCard,
  MdList,
  MdListItem,
  MdOutlinedTextField,
} from "@/util/md3";
import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useTransitionStyles,
} from "@floating-ui/react";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { getBasicDropdownStyles } from "../constants";
import { ArrowDropDown } from "@mui/icons-material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function NAOutlinedMultiListBox({
  initialValue = [],
  className,
  options,
  onSelectionChange,
  ...props
}: {
  initialValue?: string[];
  className?: string;
  options: string[];
  onSelectionChange?: (value: string[]) => void;
} & ComponentProps<typeof MdOutlinedTextField>) {
  const [maxHeight, setMaxHeight] = useState(0);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<any[]>([]);
  const [selection, setSelection] = useState(initialValue);

  const { refs, floatingStyles, context, placement } = useFloating({
    open: isOptionsOpen,
    onOpenChange: setIsOptionsOpen,
    middleware: [
      offset(2),
      shift(),
      flip(),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
          flushSync(() => setMaxHeight(availableHeight - 10));
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: floatingTransitionStyles } = useTransitionStyles(
    context,
    placement === "top"
      ? getBasicDropdownStyles("up")
      : getBasicDropdownStyles("down")
  );

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useClick(context),
      useDismiss(context),
      useListNavigation(context, {
        listRef,
        activeIndex,
        onNavigate: setActiveIndex,
      }),
    ]
  );

  useEffect(() => {
    onSelectionChange?.(selection);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  return (
    <>
      <div
        className={`relative cursor-pointer h-fit ${
          className ? className : ""
        }`}
      >
        <MdOutlinedTextField
          ref={refs.setReference}
          {...getReferenceProps()}
          {...props}
          required={false}
          readOnly
          value={selection.join(" / ")}
          hasTrailingIcon
          className={`w-full cursor-none ${
            props.readOnly ? "bg-surfaceContainer" : ""
          }`}
        >
          <div slot="trailing-icon">
            <ArrowDropDown fontSize="small" />
          </div>
        </MdOutlinedTextField>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-10"
        >
          {isMounted && options.length > 0 && !props.readOnly && (
            <FloatingFocusManager context={context}>
              <div style={floatingTransitionStyles}>
                <MdElevatedCard className="bg-surfaceContainer">
                  <MdList style={{ maxHeight }} className="rounded-xl min-h-16">
                    <OverlayScrollbarsComponent defer>
                      {options.map((option, index) => (
                        <MdListItem
                          key={option}
                          type="button"
                          ref={(node) => {
                            listRef.current[index] = node;
                          }}
                          tabIndex={activeIndex === index ? 0 : -1}
                          {...getItemProps()}
                          onClick={() => {
                            setSelection((prev) => {
                              const next = [...prev];
                              const i = next.indexOf(option);
                              if (i === -1) {
                                next.push(option);
                              } else {
                                next.splice(i, 1);
                              }
                              return next;
                            });
                          }}
                        >
                          <MdCheckbox
                            slot="start"
                            checked={selection.includes(option)}
                          />
                          {option}
                        </MdListItem>
                      ))}
                    </OverlayScrollbarsComponent>
                  </MdList>
                </MdElevatedCard>
              </div>
            </FloatingFocusManager>
          )}
        </div>
      </div>
    </>
  );
}
