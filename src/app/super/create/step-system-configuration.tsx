import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/util/md3";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

type SystemConfigurationStepProps = {
  dateFormat: string;
  searchPeriod: string;
  maxPageSize: number;
  timeZone: string;
  language: string[];
};

export default function SystemConfigurationStep(props: {
  onStepMove: (step: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large">
          System Configuration
        </MdTypography>
        <div className="flex gap-2 items-center">
          <MdTextButton
            onClick={() => {
              props.onStepMove(3);
            }}
          >
            <MdIcon slot="icon">
              <ChevronLeft />
            </MdIcon>
            Previous
          </MdTextButton>
          <DividerComponent orientation="vertical" className="h-6" />
          <MdTextButton
            onClick={() => {
              props.onStepMove(5);
            }}
            trailingIcon
          >
            Next
            <MdIcon slot="icon">
              <ChevronRight />
            </MdIcon>
          </MdTextButton>
        </div>
      </div>
      <div className="grid grid-cols-[80px_1fr_1fr]">
        <BaseItem isHeader>No</BaseItem>
        <BaseItem isHeader>Item</BaseItem>
        <BaseItem isHeader>Value</BaseItem>
        <BaseItem>1</BaseItem>
        <BaseItem>Date Format</BaseItem>
        <BaseItem>Date Format</BaseItem>
        <BaseItem>2</BaseItem>
        <BaseItem>Search Period</BaseItem>
        <BaseItem>Search Period</BaseItem>
        <BaseItem>3</BaseItem>
        <BaseItem>Max Page Size</BaseItem>
        <BaseItem>Max Page Size</BaseItem>
        <BaseItem>4</BaseItem>
        <BaseItem>Time Zone</BaseItem>
        <BaseItem>Time Zone</BaseItem>
        <BaseItem>5</BaseItem>
        <BaseItem>Language</BaseItem>
        <BaseItem>Language</BaseItem>
      </div>
    </div>
  );
}

const BaseItem = ({
  children,
  isHeader,
  className,
}: {
  children: React.ReactNode;
  isHeader?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`h-12 p-2 flex items-center border-b border-b-outlineVariant ${
        className ? className : ""
      } ${isHeader ? "bg-surfaceVariant" : ""}`}
    >
      <MdTypography variant="body" size="medium">
        {children}
      </MdTypography>
    </div>
  );
};
