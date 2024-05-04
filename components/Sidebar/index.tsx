import React, { useState, useCallback, useEffect, useRef } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import useUIStore, { UIStoreState } from "@/store/ui-store";
import { useShallow } from "zustand/react/shallow";
import useGraphStore, { GraphStoreState } from "@/store/graph-store";
import { loadLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import { XCircleIcon } from "@heroicons/react/24/solid";
import useSessionStore, {
  SessionStoreState,
  Session,
} from "@/store/session-store";
import { useSessionControl } from "@/hooks/useSessionControl";
import { uuid } from "uuidv4";

const sessionSelector = (state: SessionStoreState) => ({
  sessions: state.sessions,
  currentSessionId: state.currentSessionId,
});

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { sessions, currentSessionId } =
    useSessionStore(useShallow(sessionSelector));
  const { loadSession, removeSession, addSession } = useSessionControl();
  useEffect(() => {
    function handleOutsideClick(e: any) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        // Clicked outside the sidebar
        setIsOpen(false);
      }
    }

    // Only add the listener if the sidebar is open
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      // Cleanup the event listener
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]); // Only re-run the effect if the isOpen state changes
  return (
    <div ref={sidebarRef}>
      <button className="text-zinc-700 ml-2" onClick={() => setIsOpen(!isOpen)} >
        <ChevronDoubleRightIcon className="h-5 w-5" />
      </button>
      <div className="flex">
        <div
          className={` border-x  border-zinc-300 shadow bg-white text-zinc-600 transform top-0 left-0 w-64 p-4 fixed h-full overflow-auto ease-in-out transition-all duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button className="text-zinc-700" onClick={() => setIsOpen(!isOpen)}>
            Close
          </button>
          <div
            className="hover:bg-zinc-100 rounded py-2 px-4 cursor-pointer flex gap-2 items-center mt-2"
            onClick={() => addSession(uuid())}
          >
            + New Session
          </div>
          <div className="mt-4">Past Sessions</div>
          <nav className="mt-8">
            {sessions.map((session: Session) => (
              <div
                key={session.sessionId}
                className={`hover:bg-zinc-100 rounded py-2 px-4 cursor-pointer flex gap-2 items-center mt-2 ${
                  session.sessionId === currentSessionId ? "border" : ""
                } `}
                onClick={() => {
                  loadSession(session.sessionId);
                }}
              >
                <XCircleIcon
                  className={
                    "h-4 w-4 text-red-600 hover:text-red-500 cursor-pointer"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSession(session.sessionId);
                  }}
                />
                {session.concept}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
