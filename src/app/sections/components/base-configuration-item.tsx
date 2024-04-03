import { MdTypography } from "@/app/components/typography";

export const BaseItem = ({
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
