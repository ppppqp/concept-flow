"use client";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  Node,
  Edge,
} from "reactflow";
import { useShallow } from "zustand/react/shallow";
import TextNode from "../Node";
import useGraphStore, { GraphStoreState } from "@/store/graph-store";
import useUIStore, { UIStoreState } from "@/store/ui-store";
import EditNodeModal from "../Modal/EditNodeModal";
const nodeTypes = {
  node: TextNode,
};

const selector = (state: GraphStoreState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

const uiSelector = (state: UIStoreState) => ({
  editModalOpen: state.editModalOpen,
  setEditModalOpen: state.setEditModalOpen,
});

export default function MindMap({ height }: { height?: string }) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
  } = useGraphStore(useShallow(selector));
  const { editModalOpen, setEditModalOpen } = useUIStore(
    useShallow(uiSelector)
  );
  return (
    <div style={{ height: height ?? "95vh" }}>
      {/* <EditNodeModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
        }}
      /> */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        preventScrolling={false}
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
