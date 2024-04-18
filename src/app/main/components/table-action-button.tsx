import { getBasicDropdownStyles } from "@/app/constants";
import {
  MdElevatedCard,
  MdIcon,
  MdIconButton,
  MdList,
  MdListItem,
} from "@/util/md3";
import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { flushSync } from "react-dom";

export const TableActionButton = ({
  options,
  onMenuSelect,
}: {
  options: string[];
  onMenuSelect?: (option: string) => void;
}) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  const { refs, floatingStyles, context } = useFloating({
    open: isOptionOpen,
    onOpenChange: setIsOptionOpen,
    placement: "bottom-end",
    middleware: [
      flip(),
      size({
        apply({ rects, elements, availableHeight }) {
          flushSync(() => setMaxHeight(availableHeight));
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: floatingTransitionStyles } = useTransitionStyles(
    context,
    getBasicDropdownStyles("down")
  );

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, {
      role: "menu",
    }),
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <MdIconButton>
          <MdIcon>
            <MoreVert />
          </MdIcon>
        </MdIconButton>
      </div>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className="z-20"
      >
        {isMounted && (
          <FloatingFocusManager context={context}>
            <div style={floatingTransitionStyles}>
              <MdElevatedCard className="my-2">
                <MdList
                  style={{ maxHeight }}
                  className="bg-surfaceContainer rounded-xl"
                >
                  {options.map((option) => (
                    <MdListItem
                      type="button"
                      key={option}
                      className="w-24"
                      onClick={() => {
                        setIsOptionOpen(false);
                        onMenuSelect?.(option);
                      }}
                    >
                      {option}
                    </MdListItem>
                  ))}
                </MdList>
              </MdElevatedCard>
            </div>
          </FloatingFocusManager>
        )}
      </div>
    </>
  );
};
