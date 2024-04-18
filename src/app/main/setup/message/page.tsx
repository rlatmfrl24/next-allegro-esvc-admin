"use client";

import { DateTime } from "luxon";
import { PageTitle } from "../../components/page-title";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdFilledButton, MdOutlinedTextField, MdTextButton } from "@/util/md3";
import { MdTypography } from "@/app/components/typography";
import { MessageModule, MessageType } from "@/util/typeDef/message";
import { MessageManagementTable } from "./table";
import { useState } from "react";

export default function MessageManagementSetup() {
  const [selectedMessage, setSelectedMessage] = useState<any>();

  return (
    <div className="flex flex-col gap-4 flex-1">
      <PageTitle
        title="Message Management"
        category="Setting up of System"
        updatedDate={DateTime.now()}
      />
      <div aria-label="contdition-area" className="flex gap-4 items-center">
        <NAOutlinedListBox
          label="Module"
          initialValue="All Module"
          options={["All Module", ...Object.values(MessageModule)]}
        />
        <NAOutlinedTextField className="flex-1" label="Message or ID" />
        <NAOutlinedListBox label="Type" options={Object.values(MessageType)} />
      </div>
      <div className="flex items-center justify-end gap-2">
        <MdTextButton>Reset</MdTextButton>
        <MdFilledButton>Search</MdFilledButton>
      </div>
      <div className="px-6 py-4 rounded-lg border border-outlineVariant flex flex-col flex-1">
        <div className="relative flex gap-8 flex-1 w-full">
          <div className="basis-2/3 flex-auto w-0 ">
            <MessageManagementTable
              onMessageSelect={(message) => {
                setSelectedMessage(message);
              }}
            />
          </div>
          <div className="sticky min-w-96 top-0 basis-1/3 px-6 py-4 rounded-lg h-fit flex flex-col gap-4 bg-surface border-2 border-secondaryContainer">
            <MdTypography variant="label" size="large" prominent>
              Language Detail
            </MdTypography>
            <MdOutlinedTextField
              label="English"
              className="flex-1 resize-none"
              type="textarea"
              value={selectedMessage?.en || ""}
              placeholder="Notify name, Notify Address is mandatory field."
            />
            <MdOutlinedTextField
              label="Korean"
              className="flex-1 resize-none"
              type="textarea"
              value={selectedMessage?.ko || ""}
              placeholder="이름, 주소는 필수 입력란입니다."
            />
            <MdOutlinedTextField
              label="Japanese"
              className="flex-1 resize-none"
              type="textarea"
              value={selectedMessage?.ja || ""}
              placeholder="通知名、通知先は必須項目です。"
            />
            <MdOutlinedTextField
              label="Chinese"
              className="flex-1 resize-none"
              type="textarea"
              value={selectedMessage?.zh_CN || ""}
              placeholder="通知名称、通知地址为必填字段。"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
