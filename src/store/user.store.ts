import { AdminUserProps, AdminUserType } from "@/util/typeDef/user";
import { atom } from "recoil";

export const currentUser = atom<AdminUserProps>({
  key: "currentUser",
  default: {} as AdminUserProps,
});
