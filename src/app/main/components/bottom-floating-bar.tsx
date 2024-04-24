"use client";

import { modifiedDetectState } from "@/store/base.store";
import { MdElevation, MdFilledButton } from "@/util/md3";
import { AnimatePresence } from "framer-motion";
import { CSSProperties } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

export const BottomFloatingBar = () => {
  const [modifiedDetect, setModifiedDetect] =
    useRecoilState(modifiedDetectState);

  return (
    <>
      <AnimatePresence>
        {modifiedDetect && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full bottom-2 px-8"
          >
            <div
              className="bg-surfaceContainerHigh p-2 rounded-full relative flex justify-end"
              style={
                {
                  "--md-elevation-level": 2,
                } as CSSProperties
              }
            >
              <MdElevation />
              <MdFilledButton
                onClick={() => {
                  setModifiedDetect(false);
                }}
              >
                Save
              </MdFilledButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
