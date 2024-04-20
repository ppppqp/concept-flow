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
import { NodeEvent, NodeEventName } from "../interface";
import { uuid } from "uuidv4";

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
  const onNodeEvents = useCallback(
    (id: string, params: NodeEvent) => {
      switch (params.event) {
        case NodeEventName.UpdateContent: {
          setNodes((nodes) =>
            // @ts-ignore
            nodes.map((node) => {
              if (node.id === id) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    content: params.params.setContent(node.data.content),
                  },
                };
              } else {
                return node;
              }
            })
          );
          break;
        }
        case NodeEventName.AddNode: {
          const newNodeId = uuid();
          setNodes((nodes) => {
            const newNodes = [...nodes];
            newNodes.push({
              id: newNodeId,
              type: "node",
              position: { x: 100, y: 100 },
              data: { content: "", onEvent: onNodeEvents },
            });
            return newNodes;
          });
          setEdges((edges) => {
            const newEdges = [...edges];
            newEdges.push({
              id: uuid(),
              source: id,
              target: newNodeId,
            })
            return newEdges;
          })
        }
      }
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
        data: { content: "", onEvent: onNodeEvents },
      },
    ]);
  }, [onNodeEvents]);
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
