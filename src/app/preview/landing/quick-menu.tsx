import { MdSingleDatePicker } from "@/app/components/datepickers/date-picker";
import { MdTypography } from "@/app/components/typography";
import {
  MdElevatedCard,
  MdFilledButton,
  MdIcon,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdOutlinedTextField,
  MdPrimaryTab,
  MdTabs,
  MdTextButton,
} from "@/util/md3";
import { faker } from "@faker-js/faker";
import { ArrowDropDown, FmdGoodOutlined } from "@mui/icons-material";
import { DateTime } from "luxon";

export default function QuickMenu() {
  return (
    <div className="flex flex-col justify-center gap-6 h-full absolute z-10 right-10 w-[848px] px-16">
      <MdElevatedCard>
        <MdTabs className="rounded-t-2xl">
          <MdPrimaryTab>Schedule</MdPrimaryTab>
          <MdPrimaryTab>Quick Tracking</MdPrimaryTab>
        </MdTabs>
        <div className="px-6 pt-4 pb-6 flex flex-col gap-4 bg-surfaceContainerLowest rounded-b-2xl">
          <MdOutlinedSegmentedButtonSet>
            <MdOutlinedSegmentedButton
              selected
              label="Point to Point"
            ></MdOutlinedSegmentedButton>
            <MdOutlinedSegmentedButton label="Vessel"></MdOutlinedSegmentedButton>
            <MdOutlinedSegmentedButton label="Port"></MdOutlinedSegmentedButton>
            <MdOutlinedSegmentedButton label="Long Range"></MdOutlinedSegmentedButton>
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
          <div className="flex gap-2">
            <MdOutlinedTextField className="w-52" label="Search On">
              <MdIcon slot="trailing-icon">
                <ArrowDropDown />
              </MdIcon>
            </MdOutlinedTextField>
            <MdSingleDatePicker />
          </div>
          <div className="text-right">
            <MdTextButton>Reset</MdTextButton>
            <MdFilledButton>Search</MdFilledButton>
          </div>
        </div>
      </MdElevatedCard>
      <MdElevatedCard className="overflow-hidden">
        <MdTypography
          variant="title"
          size="large"
          className="px-6 py-4 border-b border-b-outlineVariant bg-surfaceContainerLowest"
        >
          Notice
        </MdTypography>
        <div className="px-6 pt-4 pb-6 flex flex-col gap-4 bg-surfaceContainerLowest">
          <NoticeItem
            date={DateTime.fromJSDate(faker.date.recent()).toFormat(
              "yyyy-MM-dd"
            )}
            content={faker.lorem.sentence()}
          />
          <NoticeItem
            date={DateTime.fromJSDate(faker.date.recent()).toFormat(
              "yyyy-MM-dd"
            )}
            content={faker.lorem.sentence()}
          />
          <NoticeItem
            date={DateTime.fromJSDate(faker.date.recent()).toFormat(
              "yyyy-MM-dd"
            )}
            content={faker.lorem.sentence()}
          />
        </div>
      </MdElevatedCard>
    </div>
  );
}

const NoticeItem = ({ date, content }: { date: string; content: string }) => {
  const dateObject = DateTime.fromISO(date);

  return (
    <div className="flex items-center gap-2">
      <MdTypography variant="label" size="large" className="flex-1">
        {content}
      </MdTypography>
      <MdTypography
        variant="label"
        size="medium"
        className="text-onSurface opacity-35"
      >
        {dateObject.toFormat("yyyy-MM-dd ")}
      </MdTypography>
    </div>
  );
};
