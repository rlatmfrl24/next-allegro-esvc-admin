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
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { ArrowDropDown, MoreVert } from "@mui/icons-material";
import { useState } from "react";
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
  const [maxHeight, setMaxHeight] = useState(0);

  const { refs, floatingStyles, context } = useFloating({
    open: isOptionOpen,
    onOpenChange: setIsOptionOpen,
    middleware: [
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
              <MdElevatedCard className="bg-surfaceContainer my-2">
                <MdList style={{ maxHeight }} className="bg-surfaceContainer">
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

export const DeleteActionButton = ({ onClick }: { onClick?: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <MdIconButton
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        id="menu-anchor"
      >
        <MoreVert />
      </MdIconButton>
      <MdMenu
        open={isMenuOpen}
        anchor="menu-anchor"
        anchorCorner="end-end"
        menuCorner="start-end"
        close={() => setIsMenuOpen(false)}
      >
        <MdMenuItem
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
            onClick && onClick();
          }}
        >
          <div slot="headline">Delete</div>
        </MdMenuItem>
      </MdMenu>
    </div>
  );
};
