import { DateTime } from "luxon";

export type NoticeProps = {
  uuid: string;
  title: string;
  contents: string;
  attachment: string[];
  postedBy: string;
  updatedAt: DateTime;
};
