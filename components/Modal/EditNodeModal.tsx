import Modal from ".";
import useGraphStore, { GraphStoreState } from "@/store/graph-store";
import useUIStore, { UIStoreState } from "@/store/ui-store";
import { Node } from '@/types/node';
import { useShallow } from "zustand/react/shallow";
import { useCallback, useState, useMemo } from "react";
import useConcepts from "@/hooks/useConcepts";
const selector = (state: GraphStoreState) => ({
  nodes: state.nodes,
  setNodes: state.setNodes,
});
const uiSelector = (state: UIStoreState) => ({
  editModalNodeId: state.editModalNodeId,
});
export default function EditNodeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { nodes, setNodes } = useGraphStore(useShallow(selector));
  const { editModalNodeId } = useUIStore(useShallow(uiSelector));
  const concepts = useConcepts(editModalNodeId, nodes);
  const concept = useMemo(
    () => nodes.find((n: Node) => n.id === editModalNodeId)?.data.concept,
    [editModalNodeId, nodes]
  );
  const [inputConcept, setInputConcept] = useState(concept);
  const [error, setError] = useState("");
  const onSubmit = useCallback(() => {
    if (!inputConcept) {
      setError("Error: Invalid concept");
      return;
    }
    setError("");
    const newNodes = [...nodes];
    const node = newNodes.find((n: Node) => n.id === editModalNodeId);
    if (node) {
      node.data.concept = inputConcept;
    }
    setNodes(newNodes);
    onClose();
  }, [editModalNodeId, inputConcept, nodes, setNodes, onClose]);
  if (!concepts) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-sm">
        <h1 className="mb-5">Edit Node</h1>
        {concepts.length > 1 ? <p>Context: {concepts.slice(0, -1)}</p> : null}
        <p>
          Concept:
          <input
            defaultValue={concept}
            onChange={(e) => {
              setInputConcept(e.target.value);
            }}
            className="ml-2 border rounded px-1 py-0.5 border-slate-300 focus:outline-none"
          ></input>
        </p>
        <p className="text-red-600">{error}</p>
        <div className="mt-5 flex justify-end w-full gap-2">
          <span
            className="cursor-pointer  py-1 px-2 rounded bg-zinc-600 hover:bg-zinc-500 text-white"
            onClick={onSubmit}
          >
            Submit
          </span>
          <span
            className="cursor-pointer py-1 px-2 rounded bg-white border"
            onClick={onClose}
          >
            Cancel
          </span>
        </div>
      </div>
    </Modal>
  );
}
