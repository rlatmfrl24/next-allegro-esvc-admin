import { DateTime } from "luxon";

export type NoticeProps = {
  uuid: string;
  title: string;
  attachment: string;
  postedBy: string;
  updatedAt: DateTime;
};
