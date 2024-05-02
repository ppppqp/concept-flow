import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import { updateNodeLayout } from "@/utils/forceSimulation";
import { ROOT_NODE_ID } from "../components/consts";
import { uuid } from "uuidv4";
import { treeLayout, customLayout, documentLayout} from "../utils/treeLayout";
type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setNodeContent: (id: string, content: string | ((s: string) => void)) => void;
  addNode: (id: string, concepts?: string[]) => void;
  updateForceLayout: (nodes: Node[], edges: Edge[]) => void;
  updateTreeLayout: (nodes: Node[]) => void;
  setNodeHeight: (nodeId: string, height: number) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  setNodeContent: (id: string, content: string | ((s: string) => void)) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              content:
                typeof content === "string"
                  ? content
                  : content(node.data.content),
            },
          };
        }
        return node;
      }),
    });
  },
  addNode: async (sourceId: string, concepts = ["Enter your concepts"]) => {
    const newNodeId = uuid();
    const nodes = get().nodes;
    const edges = get().edges;
    const newNodes = [...nodes];
    newNodes.push({
      id: newNodeId,
      type: "node",
      dragHandle: ".custom-drag-handle",
      parentId: sourceId,
      position: {
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
      },
      data: { concepts: concepts, degree: 0, height: 0, },
    });
    const sourceNode = newNodes.find((n) => n.id === sourceId);
    if (sourceNode) {
      sourceNode.data.degree += 1;
    }

    const newEdges = [...edges];
    newEdges.push({
      id: uuid(),
      source: sourceId,
      target: newNodeId,
    });
    
    // const forcedNode = updateNodeLayout(newNodes, newEdges);
    set({
      edges: newEdges,
    });
    // await get().updateForceLayout(newNodes, newEdges);
    get().updateTreeLayout(documentLayout(newNodes, ROOT_NODE_ID));
  },
  removeNode: async (targetId: string) => {
    if (targetId === ROOT_NODE_ID) {
      return;
    }
    const nodes = get().nodes;
    const newNodes = nodes.filter(
      (n) => n.id !== targetId && n.parentId !== targetId
    );

    const edges = get().edges;
    const newEdges = edges.filter(
      (e) => e.target !== targetId && e.source !== targetId
    );

    set({
      nodes: newNodes,
      edges: newEdges,
    });
  },
  updateForceLayout: async (
    newNodes: Node[],
    newEdges: Edge[],
    updatedNodeId?: string
  ) => {
    let startTime = performance.now(); // Track start time for interval calculation
    const generator = updateNodeLayout(newNodes, newEdges, updatedNodeId);
    for await (const step of generator) {
      // Update visualization based on node positions
      set({
        nodes: step,
      });

      // Calculate time elapsed since last iteration
      const elapsedTime = performance.now() - startTime;

      // Sleep for remaining time to maintain 20ms interval
      // const sleepTime = 50; // Ensure non-negative sleep time
      const sleepTime = Math.max(0, 50 - elapsedTime); // Ensure non-negative sleep time

      await new Promise((resolve) => setTimeout(resolve, sleepTime));

      startTime = performance.now(); // Update start time for next iteration
    }
  },
  updateTreeLayout: async (nodes: Node[]) => {
    const newNodes = treeLayout(nodes, ROOT_NODE_ID);
    set({
      nodes: newNodes,
    });
  },
  setNodeHeight: async (nodeId: string, height: number) => {
    const newNodes = [...get().nodes];
    const updateNode = newNodes.find((n) => n.id === nodeId)!;
    updateNode.data.height = height;
    // no update tree layout for now.
    // get().updateTreeLayout(newNodes);
  },
}));

export default useStore;
