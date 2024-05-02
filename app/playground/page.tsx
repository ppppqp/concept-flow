"use client";
import MindMap from "@/components/MindMap";
import { useMemo, useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/store/graph-store";

import { ROOT_NODE_ID } from "@/components/consts";
import Document from "@/components/Document";
import Switch from "@/components/Switch";
enum Mode {
  MindMap,
  Document,
}

const selector = (state: any) => ({
  setNodes: state.setNodes,
  setEdges: state.setEdges,
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
  const { setNodes, setEdges } = useStore(useShallow(selector));
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
      <div className="absolute right-8 flex text-base gap-2 z-40">
        <Switch
          check={mode === Mode.MindMap}
          onToggle={(v) => {
            setMode(v ? Mode.MindMap : Mode.Document);
          }}
        />
        {mode === Mode.MindMap ? "Mind Map Mode" : "Document Mode"}
      </div>
      {mode === Mode.MindMap ? <MindMap /> : <Document />}
    </>
  );
}
