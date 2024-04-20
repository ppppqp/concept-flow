"use client";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Node,
  Edge,
  Connection,
} from "reactflow";
import { useState, useCallback, useMemo, useEffect } from "react";
import TextNode from "../Node";
import "reactflow/dist/style.css";

const initialEdges = [];

const nodeTypes = {
  node: TextNode,
};
export default function MindMap() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onNodeContentChange = useCallback(
    (id: string, setContent: (s: string) => void) => {
      setNodes(nodes =>
        // @ts-ignore
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                content: setContent(node.data.content),
              },
            };
          } else {
            return node;
          }
        })
      );
    },
    [setNodes]
  );

  
  useEffect(() => {
    // init canvas
    setNodes([
      {
        id: "node-1",
        type: "node",
        position: { x: 0, y: 0 },
        data: { content: "", updateContent: onNodeContentChange },
      },
    ]);
  }, [onNodeContentChange]);
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );
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
