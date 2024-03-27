import Image from "next/image";
import { MdTypography } from "./typography";

export default function Logo({
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center ${className}`} {...props}>
      <div className="flex items-center mr-5">
        <Image
          aria-label="company logo"
          src="/logo_transfar_shipping.svg"
          alt="logo"
          sizes="100vw"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <MdTypography variant="title" size="large">
        Company Management
      </MdTypography>
    </div>
  );
}
