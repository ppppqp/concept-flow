"use client";
import ReactFlow, {
  Controls,
  Background,
} from "reactflow";
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from "react";
import TextNode from "../Node";
import useStore from '@/components/store';
const nodeTypes = {
  node: TextNode,
};

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
});

export default function MindMap() {

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes } = useStore(
    useShallow(selector),
  );

  useEffect(() => {
    // init canvas
    setNodes([
      {
        id: "node-1",
        type: "node",
        position: { x: 0, y: 0 },
        data: { content: "", concept: 'Elasticsearch' },
      },
    ]);
  }, []); 

  return (
    <div style={{ height: "98vh" }} className="text-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
