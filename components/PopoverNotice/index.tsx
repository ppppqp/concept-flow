import useUIStore, { UIStoreState } from "@/store/ui-store";
import React, { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
const uiSelector = (state: UIStoreState) => ({
  showPopoverNotice: state.showPopoverNotice,
  setShowPopoverNotice: state.setShowPopoverNotice,
  popoverNoticeMessage: state.popoverNoticeMessage,
  setPopoverNoticeMessage: state.setPopoverNoticeMessage,
});
const PopoverNotice = () => {
  const {showPopoverNotice, setShowPopoverNotice, popoverNoticeMessage} = useUIStore(useShallow(uiSelector));

  useEffect(()=>{
    let timerId = -1;
    if(showPopoverNotice){
      // hide in 2s
      timerId = window.setTimeout(()=>{setShowPopoverNotice(false)}, 2000);
    }
    return () => window.clearTimeout(timerId);
  }, [showPopoverNotice, setShowPopoverNotice]);
  if (!showPopoverNotice) return null;
  return (
    <div
      className={`fixed flex items-end justify-center p-4 z-50 top-4 left-1/2 w-8 `}
    >
      <div
        className={`px-4 py-2 mb-4 bg-white border text-zinc-700 rounded-xl shadow-lg`}
        role="alert"
      >
        {popoverNoticeMessage}
      </div>
    </div>
  );
};

export default PopoverNotice;
