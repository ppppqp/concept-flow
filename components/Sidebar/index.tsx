import React, { useState } from "react";
import { ChevronDoubleRightIcon} from "@heroicons/react/24/solid";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State to manage the open/close state of the sidebar

  return (
    <>
      <button className="text-zinc-700 ml-2" onClick={() => setIsOpen(!isOpen)}>
        <ChevronDoubleRightIcon className="h-5 w-5" />
      </button>
      <div className="flex">
        <div
          className={` border-x  border-zinc-300 shadow bg-white text-zinc-600 transform top-0 left-0 w-64 p-4 fixed h-full overflow-auto ease-in-out transition-all duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="text-zinc-700 ml-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            Close
          </button>
          <nav>{/* Navigation items */}</nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
