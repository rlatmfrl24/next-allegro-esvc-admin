import { MdTypography } from "@/app/components/typography";
import { DateTime } from "luxon";

export const PageTitle = ({
  title,
  category,
  updatedDate,
}: {
  category: string;
  title: string;
  updatedDate: DateTime;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <MdTypography
          variant="body"
          size="medium"
          prominent
          className="text-primary"
        >
          {category}
        </MdTypography>
        <MdTypography variant="title" size="large" className="text-onSurface">
          {title}
        </MdTypography>
      </div>
      <MdTypography variant="body" size="medium" className="text-outline">
        {`Updated at ${updatedDate.toFormat("yyyy-MM-dd HH:mm:ss")}`}
      </MdTypography>
    </div>
  );
};
