import { DateTime } from "luxon";
import { atom } from "recoil";

export const modifiedDetectState = atom({
  key: "modifiedDetect",
  default: false,
});
