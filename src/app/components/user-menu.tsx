"use client";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

import { currentUserState } from "@/store/user.store";
import { MdOutlinedButton } from "@/util/md3";
import { AdminUserProps } from "@/util/typeDef/user";

import { MdTypography } from "./typography";

export const UserMenu = () => {
  const [currentUserStore, setCurrentUserStore] =
    useRecoilState(currentUserState);
  const router = useRouter();

  return (
    <>
      <div className="flex gap-4 items-center mr-6">
        <MdTypography variant="body" size="large">
          {currentUserStore.userName}
        </MdTypography>
        <MdOutlinedButton
          onClick={() => {
            setCurrentUserStore({} as AdminUserProps);
            router.push("/login");
          }}
        >
          Logout
        </MdOutlinedButton>
      </div>
    </>
  );
};
