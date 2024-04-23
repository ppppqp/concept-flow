"use client";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import TextNode from "../Node";
import useStore from "@/store/graph-store";
import { ROOT_NODE_ID } from "../consts";
import * as d3 from "d3";
import useUIStore from "@/store/ui-store";
import EditNodeModal from "../Modal/EditNodeModal";
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
  editModalOpen: state.editModalOpen,
  setEditModalOpen: state.setEditModalOpen,
});

const uiSelector = (state: any) => ({
  editModalOpen: state.editModalOpen,
  setEditModalOpen: state.setEditModalOpen,
});

export default function MindMap({
  height,
  initialNodes,
}: {
  height?: string;
  initialNodes?: Node[];
}) {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes } =
    useStore(useShallow(selector));
  const { editModalOpen, setEditModalOpen } = useUIStore(
    useShallow(uiSelector)
  );
  useEffect(() => {
    // init canvas
    setNodes(
      initialNodes ?? [
        {
          id: ROOT_NODE_ID,
          type: "node",
          position: { x: 0, y: 0 },
          data: { content: "", concepts: ["Elasticsearch"], degree: 0 },
          dragHandle: ".custom-drag-handle",
        },
      ]
    );
  }, [initialNodes, setNodes]);

  useEffect(() => {
    // const nodesData = {
    //   id: 1,
    //   name: "Root Node",
    //   children: [{ id: 2, name: "Child 1" }],
    // };
    // const treeLayout = d3.tree().size([500, 500]);
    // const root = d3.hierarchy(nodesData);
    // console.log('nodesData', nodesData)
    // console.log('root', root);
    // // console.log(treeLayout(root));
    // console.log("descendents", root.descendants());
    // console.log("links", root.links());
  }, []);

  return (
    <div style={{ height: height ?? "98vh" }}>
      <EditNodeModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
        }}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ maxZoom: 1.2 }}
      >
        <Background />
        <Controls />
        <MiniMap pannable zoomable />
      </ReactFlow>
    </div>
  );
}
