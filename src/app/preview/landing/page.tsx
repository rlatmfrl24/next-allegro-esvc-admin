import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import { CurrentCompanyState } from "@/store/super.store";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import BackgroundSwiper from "./background-swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CatchPhrase from "./catch-phrase";
import QuickMenu from "./quick-menu";

export default function LandingPreview() {
  const currentCompanyStore = useRecoilValue(CurrentCompanyState);

  return (
    <div
      className="relative flex flex-col rounded-3xl shadow-lg flex-1 w-[1280px] h-[840px] overflow-hidden"
      style={{
        zoom: 0.6,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full z-20"></div>
      <div className="bg-surfaceContainerLowest">
        <div className="min-h-12 flex items-center px-5">
          {currentCompanyStore.themeStyle.logo && (
            <Image
              src={URL.createObjectURL(currentCompanyStore.themeStyle.logo)}
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
      </div>
      <div className="flex-1 relative h-full bg-surfaceDim">
        <QuickMenu />

        <CatchPhrase
          mainText={currentCompanyStore.themeStyle.mainText}
          subText={currentCompanyStore.themeStyle.subText}
        />
        <BackgroundSwiper />
      </div>
      <div className="bg-surfaceContainerLowest  h-10 flex items-center justify-end pr-4">
        <MdTypography variant="body" size="small" className="text-outline">
          Copyright © CyberLogitec All Rights Reserved.
        </MdTypography>
      </div>
    </div>
  );
}
