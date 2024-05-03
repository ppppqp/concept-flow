import { useShallow } from "zustand/react/shallow";
import useStore from "@/store/graph-store";
import { Node } from '@/types/node';
import { Chunck } from "./chunk";
const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  editModalOpen: state.editModalOpen,
  setEditModalOpen: state.setEditModalOpen,
});

export default function Document() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
  } = useStore(useShallow(selector));

  return (
    <div className="flex flex-col gap-2 items-center pb-24 overflow-y-auto" style={{ height: "95vh" }}>
      {nodes.map((node: Node) => (
        <Chunck id={node.id} key={node.id}/>
      ))}
    </div>
  );
}
