import { MdTypography } from "@/app/components/typography";
import { getBasicDropdownStyles } from "@/app/constants";
import {
  MdElevatedCard,
  MdIconButton,
  MdList,
  MdListItem,
  MdMenu,
  MdMenuItem,
} from "@/util/md3";
import { MessageType } from "@/util/typeDef/message";
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
import { ArrowDropDown, MoreVert } from "@mui/icons-material";
import { CSSProperties, useState } from "react";
import { flushSync } from "react-dom";

export const GridStateSelectComponent = (
  state: MessageType,
  onSelect: (type: MessageType) => void
) => {
  function getBgStyles(state: MessageType) {
    return {
      [MessageType.SUCCESS]: "bg-[#B4F1BD]",
      [MessageType.ERROR]: "bg-errorContainer",
      [MessageType.WARNING]: "bg-[#FCE186]",
      [MessageType.CONFIRMATION]: "bg-primaryContainer",
    }[state];
  }

  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  const { refs, floatingStyles, context, placement } = useFloating({
    open: isOptionOpen,
    onOpenChange: setIsOptionOpen,
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: floatingTransitionStyles } = useTransitionStyles(
    context,
    placement === "top"
      ? getBasicDropdownStyles("up")
      : getBasicDropdownStyles("down")
    // getBasicDropdownStyles("down")
  );

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, {
      role: "select",
    }),
  ]);

  return (
    <>
      <div
        className="h-10 flex items-center justify-between cursor-pointer"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <MdTypography
          variant="label"
          size="medium"
          className={`px-2 py-1 ${getBgStyles(state)} rounded-lg`}
        >
          {state}
        </MdTypography>
        <ArrowDropDown />
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
              <MdElevatedCard className="bg-surfaceContainer">
                <MdList
                  style={{ maxHeight } as CSSProperties}
                  className="bg-surfaceContainer rounded-2xl"
                >
                  <MdListItem
                    type="button"
                    onClick={() => {
                      onSelect(MessageType.CONFIRMATION);
                      setIsOptionOpen(false);
                    }}
                  >
                    <MdTypography
                      variant="label"
                      size="medium"
                      className={`px-2 py-1 w-fit ${getBgStyles(
                        MessageType.CONFIRMATION
                      )} rounded-lg`}
                    >
                      Confirmation
                    </MdTypography>
                  </MdListItem>
                  <MdListItem
                    type="button"
                    onClick={() => {
                      onSelect(MessageType.SUCCESS);
                      setIsOptionOpen(false);
                    }}
                  >
                    <MdTypography
                      variant="label"
                      size="medium"
                      className={`px-2 py-1 w-fit ${getBgStyles(
                        MessageType.SUCCESS
                      )} rounded-lg`}
                    >
                      Success
                    </MdTypography>
                  </MdListItem>
                  <MdListItem
                    type="button"
                    onClick={() => {
                      onSelect(MessageType.WARNING);
                      setIsOptionOpen(false);
                    }}
                  >
                    <MdTypography
                      variant="label"
                      size="medium"
                      className={`px-2 py-1 w-fit ${getBgStyles(
                        MessageType.WARNING
                      )} rounded-lg`}
                    >
                      Warning
                    </MdTypography>
                  </MdListItem>
                  <MdListItem
                    type="button"
                    onClick={() => {
                      onSelect(MessageType.ERROR);
                      setIsOptionOpen(false);
                    }}
                  >
                    <MdTypography
                      variant="label"
                      size="medium"
                      className={`px-2 py-1 w-fit ${getBgStyles(
                        MessageType.ERROR
                      )} rounded-lg`}
                    >
                      Error
                    </MdTypography>
                  </MdListItem>
                </MdList>
              </MdElevatedCard>
            </div>
          </FloatingFocusManager>
        )}
      </div>
    </>
  );
};
