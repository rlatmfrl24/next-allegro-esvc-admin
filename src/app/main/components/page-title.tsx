import { MdTypography } from "@/app/components/typography";
import { DateTime } from "luxon";

export const PageTitle = ({
  title,
  category,
  updatedDate,
  className,
}: {
  category?: string;
  title: string;
  updatedDate?: DateTime;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-between ${
        className ? className : ""
      }`}
    >
      <div>
        {category && (
          <MdTypography
            variant="body"
            size="medium"
            prominent
            className="text-primary"
          >
            {category}
          </MdTypography>
        )}
        <MdTypography variant="title" size="large" className="text-onSurface">
          {title}
        </MdTypography>
      </div>
      {updatedDate && (
        <MdTypography variant="body" size="medium" className="text-outline">
          {`Updated at ${updatedDate.toFormat("yyyy-MM-dd HH:mm:ss")}`}
        </MdTypography>
      )}
    </div>
  );
};
