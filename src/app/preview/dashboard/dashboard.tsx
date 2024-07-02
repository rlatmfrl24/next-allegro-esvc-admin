"use client";

import Image from "next/image";

import BookingIcon from "@/../public/icon_menu_booking.svg";
import DashboardIcon from "@/../public/icon_menu_dashboard.svg";
import DententionIcon from "@/../public/icon_menu_dentention.svg";
import DocumentsIcon from "@/../public/icon_menu_documents.svg";
import ImportIcon from "@/../public/icon_menu_import.svg";
import ManageShipmentIcon from "@/../public/icon_menu_manage_shipment.svg";
import PricingIcon from "@/../public/icon_menu_pricing.svg";
import ScheduleIcon from "@/../public/icon_menu_schedule.svg";
import TrackTraceIcon from "@/../public/icon_menu_tracktrace.svg";
import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdFilledTonalIconButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdOutlinedTextField,
} from "@/util/md3";
import {
  FavoriteBorderOutlined,
  FmdGoodOutlined,
  InfoOutlined,
  Menu,
  SettingsOutlined,
} from "@mui/icons-material";

import QuickChart from "./chart";
import { useRecoilValue } from "recoil";
import { CurrentCompanyState } from "@/store/super.store";

export default function DashboardPreview({
  width = 1280,
  height = 840,
  zoom = 0.6,
}: {
  width?: number;
  height?: number;
  zoom?: number;
}) {
  const logo = useRecoilValue(CurrentCompanyState).themeStyle.logo;

  return (
    <div
      className="bg-primary flex overflow-hidden relative rounded-3xl shadow-lg flex-1"
      style={{
        width: width,
        height: height,
        zoom: zoom,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full z-10"></div>
      <div className="w-20 flex flex-col items-center h-full gap-4 py-1">
        <MdIcon className="w-12 h-12 rounded-full p-2 text-white">
          <Menu fontSize="small" />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-3 bg-pointColor">
          <DashboardIcon />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-3 text-white">
          <ScheduleIcon />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-3 text-white">
          <BookingIcon />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-3 text-white">
          <PricingIcon />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-3 text-white">
          <DocumentsIcon />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-3 text-white">
          <TrackTraceIcon />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-3 text-white">
          <ImportIcon />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-3 text-white">
          <ManageShipmentIcon />
        </MdIcon>
        <MdIcon className="w-12 h-12 rounded-full p-3 text-white">
          <DententionIcon />
        </MdIcon>
      </div>
      <div className="flex-1 bg-surfaceContainerLowest flex flex-col rounded-2xl">
        <div className="min-h-12 flex items-center px-5">
          {logo && (
            <Image
              src={URL.createObjectURL(logo)}
              alt="logo"
              objectFit="contain"
              className="max-h-12"
              width={120}
              height={48}
            />
          )}
          <DividerComponent orientation="vertical" className="mx-2" />
          <MdTypography variant="title" size="large" className="text-onSurface">
            E-SERVICE
          </MdTypography>
        </div>
        <div className="bg-surfaceContainerLow flex-1 rounded-3xl flex flex-col items-center">
          <div className="w-full py-4 px-6">
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
            <div className="grid grid-cols-4 gap-4 mt-4">
              <ChartItem title="B/L Information" />
              <ChartItem title="Booking" />
              <ChartItem title="Shipping Instruction" />
              <ChartItem title="Shipping Instruction" />
              <InputItem title="B/L Status" />
              <InputItem title="Surrender B/L" />
              <InputItem title="Demurrage & Detention" />
              <InputItem title="Delivery Order" />
              <InputItem title="Tracking" width={2} />
              <DashboardCard title="Schedule" width={2} height={2}>
                <div className="p-4 flex flex-col gap-4">
                  <MdOutlinedSegmentedButtonSet>
                    <MdOutlinedSegmentedButton
                      label="Point to Point"
                      selected
                    />
                    <MdOutlinedSegmentedButton label="Vessel" />
                    <MdOutlinedSegmentedButton label="Port" />
                    <MdOutlinedSegmentedButton label="Long Range" />
                  </MdOutlinedSegmentedButtonSet>
                  <MdOutlinedTextField label="Origin">
                    <MdIcon slot="leading-icon">
                      <FmdGoodOutlined />
                    </MdIcon>
                  </MdOutlinedTextField>
                  <MdOutlinedTextField label="Destination">
                    <MdIcon slot="leading-icon">
                      <FmdGoodOutlined />
                    </MdIcon>
                  </MdOutlinedTextField>
                </div>
              </DashboardCard>
              <InputItem title="Tracking" width={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DashboardCard = (props: {
  title: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        gridColumn: `span ${props.width}`,
        gridRow: `span ${props.height}`,
      }}
      className={`rounded-lg border-2 border-secondaryContainer bg-surfaceContainerLowest overflow-hidden `}
    >
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

const ChartItem = (props: { title: string }) => {
  return (
    <DashboardCard title={props.title}>
      <QuickChart
        data={[
          { key: "Booked", value: 20 },
          { key: "Rejected", value: 10 },
          { key: "Processing", value: 30 },
          { key: "Cancelled", value: 5 },
        ]}
      />
    </DashboardCard>
  );
};

const InputItem = (props: { title: string; width?: number }) => {
  return (
    <DashboardCard title={props.title} width={props.width}>
      <div className="p-4 flex flex-col gap-2">
        <MdTypography variant="body" size="small">
          Enter a B/L number to inquiry the B/L status
        </MdTypography>
        <MdOutlinedTextField placeholder="B/L No." />
        <MdFilledButton className="w-fit self-end">Search</MdFilledButton>
      </div>
    </DashboardCard>
  );
};
