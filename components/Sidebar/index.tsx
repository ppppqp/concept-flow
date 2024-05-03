import React, { useState } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import useUIStore, { Session } from "@/store/ui-store";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/store/graph-store";
import { loadLocalStorage } from "@/utils/localStorage";
const uiSelector = (state: any) => ({
  sessions: state.sessions,
  setCurrentSessionId: state.setCurrentSessionId
});
const selector = (state: any) => ({
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { sessions, setCurrentSessionId } = useUIStore(useShallow(uiSelector));
  const { setNodes, setEdges } = useStore(useShallow(selector));

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
          <button className="text-zinc-700" onClick={() => setIsOpen(!isOpen)}>
            Close
          </button>

          <div className="mt-4">Past Sessions</div>
          <nav className="mt-8">
            {sessions.map((session: Session) => (
              <div
                key={session.sessionId}
                className="hover:bg-zinc-100 rounded py-2 px-4 cursor-pointer"
                onClick={() => {
                  const { nodes, edges } = loadLocalStorage(session.sessionId)!;
                  setCurrentSessionId(session.sessionId);
                  setNodes(nodes);
                  setEdges(edges);
                }}
              >
                {session.concept}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
