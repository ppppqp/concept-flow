"use client";
import MindMap from "@/components/MindMap";
import { Node } from "@/types/node";
import { useMemo, useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/store/graph-store";
import useUIStore from "@/store/ui-store";
import Document from "@/components/Document";
import Switch from "@/components/Switch";
import Sidebar from "@/components/Sidebar";;
import { nodesToString } from "@/utils/toString";
import PopoverNotice from "@/components/PopoverNotice";
import { useSessionControl } from "@/hooks/useSessionControl";
import { uuid } from "uuidv4";
import useSessionStore from "@/store/session-store";
enum Mode {
  MindMap,
  Document,
}

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

const uiSelector = (state: any) => ({
  setShowPopoverNotice: state.setShowPopoverNotice,
  setPopoverNoticeMessage: state.setPopoverNoticeMessage,
});

const sessionSelector = (state: any) => ({
  sessions: state.sessions,
  setSessions: state.setSessions,
  currentSessionId: state.currentSessionId,
  setCurrentSessionId: state.setCurrentSessionId,
})

export default function Playground() {
  const [mode, setMode] = useState(Mode.MindMap);
  const { setNodes, setEdges, nodes, edges } = useStore(useShallow(selector));
  const { setPopoverNoticeMessage, setShowPopoverNotice } = useUIStore(
    useShallow(uiSelector)
  );
  const {sessions} = useSessionStore(useShallow(sessionSelector));
  const { addSession } = useSessionControl();
  useEffect(() => {
    // init canvas
    addSession(uuid());

    // deps array intentially left blank to prevent rerender
  }, []);
  
  return (
    <>
      <PopoverNotice />
      <div className="absolute left-0 flex text-base gap-2 z-40">
        {/* <Sidebar /> */}
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
          className="w-fit px-2 py-1 bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded"
          onClick={() => {
            
          }}
        >
          Save to browser
        </div>
        <div className="w-fit	 px-2 py-1 bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded">
          Export to PDF
        </div>
        <div
          className="w-fit	 px-2 py-1 bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded"
          onClick={() => {
            navigator.clipboard.writeText(nodesToString(nodes));
            setPopoverNoticeMessage("Copied to clipboard!");
            setShowPopoverNotice(true);
          }}
        >
          Clipboard
        </div>
      </div>
      {mode === Mode.MindMap ? <MindMap /> : <Document />}
    </>
  );
}
