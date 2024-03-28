import {
  MdFilledTonalIconButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
} from "@/util/md3";
import {
  FavoriteBorderOutlined,
  InfoOutlined,
  Menu,
  SettingsOutlined,
} from "@mui/icons-material";

import DashboardIcon from "@/../public/icon_menu_dashboard.svg";
import ScheduleIcon from "@/../public/icon_menu_schedule.svg";
import BookingIcon from "@/../public/icon_menu_booking.svg";
import PricingIcon from "@/../public/icon_menu_pricing.svg";
import DocumentsIcon from "@/../public/icon_menu_documents.svg";
import TrackTraceIcon from "@/../public/icon_menu_tracktrace.svg";
import ImportIcon from "@/../public/icon_menu_import.svg";
import ManageShipmentIcon from "@/../public/icon_menu_manage_shipment.svg";
import DententionIcon from "@/../public/icon_menu_dentention.svg";
import Image from "next/image";
import Logo from "@/app/components/logo";
import { MdTypography } from "@/app/components/typography";
import { DividerComponent } from "@/app/components/divider";

export default function DashboardPreview() {
  return (
    <div className="flex-auto bg-surfaceDim flex h-0 overflow-hidden relative ">
      {/* <div className="absolute top-0 left-0 w-full h-full z-10"></div> */}
      <div className="w-20 flex flex-col items-center h-full gap-4 py-1">
        <MdIcon className="w-12 h-12 rounded-full p-2">
          <Menu fontSize="small" />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-2 bg-secondaryContainer">
          <Image src={DashboardIcon} alt="dashboard-icon" className="w-6" />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-2">
          <Image src={ScheduleIcon} alt="schedule-icon" className="w-6" />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-2">
          <Image src={BookingIcon} alt="booking-icon" className="w-6" />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-2">
          <Image src={PricingIcon} alt="pricing-icon" className="w-6" />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-2">
          <Image src={DocumentsIcon} alt="documents-icon" className="w-6" />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-2">
          <Image src={TrackTraceIcon} alt="track-trace-icon" className="w-6" />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-2">
          <Image src={ImportIcon} alt="import-icon" className="w-6" />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-2">
          <Image
            src={ManageShipmentIcon}
            alt="manage-shipment-icon"
            className="w-6"
          />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-2">
          <Image src={DententionIcon} alt="dentention-icon" className="w-6" />
        </MdIcon>
      </div>
      <div className="flex-1 bg-surfaceContainerHighest flex flex-col rounded-3xl">
        <div className="min-h-12 flex items-center px-5">
          <DividerComponent orientation="vertical" />
          <MdTypography variant="title" size="large" className="text-onSurface">
            E-SERVICE
          </MdTypography>
        </div>
        <div className="bg-surfaceContainer flex-1 rounded-3xl flex flex-col items-center">
          <div className="max-w-[1000px] w-full py-4 px-6">
            <div className="flex items-center gap-2">
              <MdTypography
                variant="title"
                size="large"
                className="text-onSurface"
              >
                Dashboard
              </MdTypography>
              <MdIconButton>
                <FavoriteBorderOutlined fontSize="small" />
              </MdIconButton>
              <div className="flex-1"></div>
              <MdOutlinedButton className="h-fit">Custom</MdOutlinedButton>
              <MdFilledTonalIconButton>
                <SettingsOutlined fontSize="small" />
              </MdFilledTonalIconButton>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DashboardCard = (props: { title: string; children: React.ReactNode }) => {
  return (
    <div className="h-56 rounded-lg border-2 border-secondaryContainer bg-surfaceContainerLowest overflow-hidden">
      <div className="h-12 flex items-center bg-surfaceContainerLow px-4 py-2 justify-between text-secondary">
        <MdTypography variant="body" size="medium" prominent>
          {props.title}
        </MdTypography>
        <InfoOutlined fontSize="small" />
      </div>
      {props.children}
    </div>
  );
};

const DashboardCardItem = (props: { title: string }) => {
  return <DashboardCard title={props.title}>123</DashboardCard>;
};
