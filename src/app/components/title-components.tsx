import { MdIcon, MdIconButton } from "@/util/md3";
import { MdTypography } from "./typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const SubTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-center gap-2 ${className ? className : ""}`}>
      <div className="w-1 h-4 bg-primary"></div>
      <MdTypography variant="body" size="large">
        {title}
      </MdTypography>
    </div>
  );
};

export const DetailTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-center gap-2 ${className ? className : ""}`}>
      <div className="h-4 w-1 bg-primary rounded-r-sm"></div>
      <MdTypography variant="body" size="large" prominent>
        {title}
      </MdTypography>
    </div>
  );
};
