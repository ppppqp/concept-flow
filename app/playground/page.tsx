"use client";
import MindMap from "@/components/MindMap";
import { Node } from "@/types/node";
import { useMemo, useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useGraphStore, { GraphStoreState } from "@/store/graph-store";
import useUIStore, { UIStoreState } from "@/store/ui-store";
import Document from "@/components/Document";
import Switch from "@/components/Switch";
import Sidebar from "@/components/Sidebar";;
import { nodesToString } from "@/utils/toString";
import PopoverNotice from "@/components/PopoverNotice";
import { useSessionControl } from "@/hooks/useSessionControl";
import { uuid } from "uuidv4";
import useSessionStore, { SessionStoreState } from "@/store/session-store";
import { loadAllSessionIds } from "@/utils/localStorage";
import { DEFAULT_EDGES, DEFAULT_NODES } from "@/components/consts";
enum Mode {
  MindMap,
  Document,
}

const selector = (state: GraphStoreState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

const uiSelector = (state: UIStoreState) => ({
  setShowPopoverNotice: state.setShowPopoverNotice,
  setPopoverNoticeMessage: state.setPopoverNoticeMessage,
});

const sessionSelector = (state: SessionStoreState) => ({
  currentSessionId: state.currentSessionId,
})

const buttonClass = 'w-fit	 px-2 py-1 bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded';

export default function Playground() {
  const [mode, setMode] = useState(Mode.MindMap);
  const { nodes, edges, setNodes, setEdges} = useGraphStore(useShallow(selector));
  const { setPopoverNoticeMessage, setShowPopoverNotice } = useUIStore(
    useShallow(uiSelector)
  );
  const {currentSessionId} = useSessionStore(useShallow(sessionSelector));
  const { addSession, loadSession, saveSession } = useSessionControl();
  useEffect(() => {
    const sessions = loadAllSessionIds();
    // init canvas
    console.log(sessions);
    if(sessions.length){
      loadSession(sessions[0].sessionId);
    } else{
      addSession(uuid());
    }
    // deps array intentially left blank to prevent rerender
  }, []);
  
  return (
    <>
      <PopoverNotice />
      <div className="absolute left-0 flex text-base gap-2 z-40">
        <Sidebar />
      </div>
      <div className="absolute text-base right-8 flex gap-2 flex-col z-30">
        <div className="flex gap-2">
          {mode === Mode.MindMap ? "Mind Map Mode" : "Document Mode"}
          <Switch
            check={mode === Mode.MindMap}
            onToggle={(v) => {
              setMode(v ? Mode.MindMap : Mode.Document);
            }}
          />
        </div>
        <div
          className={buttonClass}
          onClick={() => {
            saveSession(currentSessionId, nodes, edges)
          }}
        >
          Save to browser
        </div>
        <div className={buttonClass}>
          Export to PDF
        </div>
        <div
          className={buttonClass}
          onClick={() => {
            navigator.clipboard.writeText(nodesToString(nodes));
            setPopoverNoticeMessage("Copied to clipboard!");
            setShowPopoverNotice(true);
          }}
        >
          Clipboard
        </div>
        <div
          className={buttonClass}
          onClick={() => {
            setNodes(DEFAULT_NODES);
            setEdges(DEFAULT_EDGES);
          }}
        >
          Clear
        </div>
      </div>
      {mode === Mode.MindMap ? <MindMap /> : <Document />}
    </>
  );
}
