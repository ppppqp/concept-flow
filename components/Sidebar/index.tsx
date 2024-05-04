import React, { useState, useCallback } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import useUIStore, { UIStoreState } from "@/store/ui-store";
import { useShallow } from "zustand/react/shallow";
import useGraphStore, { GraphStoreState } from "@/store/graph-store";
import { loadLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import { XCircleIcon } from "@heroicons/react/24/solid";
import useSessionStore, { SessionStoreState, Session } from "@/store/session-store";

const sessionSelector = (state: SessionStoreState) => ({
  sessions: state.sessions,
  setSessions: state.setSessions,
  currentSessionId: state.currentSessionId,
  setCurrentSessionId: state.setCurrentSessionId,
});
const selector = (state: GraphStoreState) => ({
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { sessions, currentSessionId, setCurrentSessionId, setSessions } =
    useSessionStore(useShallow(sessionSelector));
  const { setNodes, setEdges } = useGraphStore(useShallow(selector));
  const loadSession = useCallback((sessionId: string) => {
    const { nodes, edges } = loadLocalStorage(sessionId)!;
    setCurrentSessionId(sessionId);
    setNodes(nodes);
    setEdges(edges);
  }, [setCurrentSessionId, setNodes, setEdges]);
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
          <div className="hover:bg-zinc-100 rounded py-2 px-4 cursor-pointer flex gap-2 items-center mt-2">+ New Session</div>
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
                    const index = sessions.findIndex(
                      (s: Session) => s.sessionId === session.sessionId
                    );
                    const newSessions = [...sessions];
                    newSessions.splice(index, 1);
                    loadSession(newSessions[0]?.sessionId);
                    setSessions(newSessions);
                    removeLocalStorage(session.sessionId);
                  }}
                />
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
