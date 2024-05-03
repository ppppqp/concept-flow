"use client";
import MindMap from "@/components/MindMap";
import { Node } from "reactflow";
import { useMemo, useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/store/graph-store";
import useUIStore, { Session } from "@/store/ui-store";
import { ROOT_NODE_ID } from "@/components/consts";
import Document from "@/components/Document";
import Switch from "@/components/Switch";
import Sidebar from "@/components/Sidebar";
import { saveLocalStorage } from "@/utils/localStorage";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
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
  sessions: state.sessions,
  setSessions: state.setSessions,
  currentSessionId: state.currentSessionId,
});
const guide = `
### Let's get started!

Edit the root concept with the **gear** button on the top-left corner.
Then click the <span style="color: #e1a107">yellow spark</span> button to explore or the <span style="color: blue">blue cube</span> button to exploit.

💡Some ideas for root concept:

- Trip to New York
- 🍔 *(I mean you can literally drop an emoji)*
- Global warming
- Elasticsearch
`;
export default function Playground() {
  const [mode, setMode] = useState(Mode.MindMap);
  const { setNodes, setEdges, nodes, edges } = useStore(
    useShallow(selector)
  );
  const { sessions, setSessions, currentSessionId } = useUIStore(useShallow(uiSelector));
  const initialNodes = useMemo(
    () => [
      {
        id: ROOT_NODE_ID,
        type: "node",
        position: { x: 0, y: 0 },
        data: {
          content: guide,
          concepts: ["Trip to New York"],
          degree: 0,
          depth: 0,
        },
        dragHandle: ".custom-drag-handle",
      },
    ],
    []
  );
  useEffect(() => {
    // init canvas
    setNodes(initialNodes);
    setEdges([]);
  }, [initialNodes, setNodes, setEdges]);
  return (
    <>
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
          className="w-fit	 px-2 py-1 bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded"
          onClick={() => {
            const concept = nodes.find((n: Node) => n.id === ROOT_NODE_ID)?.data
              .concepts[0];
            saveLocalStorage(currentSessionId, concept, nodes, edges);
            // update sidebar synchrounously
            const index = sessions.findIndex((s: Session) => s.sessionId === currentSessionId);
            if(index !== -1){
              // existing session
              // move to front
              const newSessions = [...sessions];
              const currentSession = sessions[index];
              newSessions.splice(index, 1);
              newSessions.unshift(currentSession);
              setSessions(newSessions);
            } else{
              // new session
              const newSessions = [...sessions]
              newSessions.unshift({currentSessionId, concept, time: Date.now()});
              setSessions(newSessions);
            }
            // set;
          }}
        >
          Save to browser
        </div>
        <div className="w-fit	 px-2 py-1 bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded">
          Export to PDF
        </div>
        <div className="w-fit	 px-2 py-1 bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded">
          Clipboard
        </div>
      </div>
      {mode === Mode.MindMap ? <MindMap /> : <Document />}
    </>
  );
}
