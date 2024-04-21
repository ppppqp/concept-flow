import { create } from 'zustand';
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
} from 'reactflow';
import { updateNodeLayout } from '@/utils/forceSimulation';
import { uuid } from 'uuidv4';
type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setNodeContent: (id: string, content: string | ((s: string)=>void)) => void;
  addNode: (id: string, content?: string) => void;
  updateLoop: (nodes: Node[], edges: Edge[]) => void;
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
  setNodeContent: (id: string, content: string | ((s: string)=>void)) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              content: typeof content === 'string' ? content : content(node.data.content),
            },
          };
        }
        return node;
      })
    })
  },
  addNode: async (sourceId: string, concept = '') => {
    const newNodeId = uuid();
    const nodes = get().nodes;
    const edges = get().edges;
    const newNodes = [...nodes];
    newNodes.push({
      id: newNodeId,
      type: "node",
      position: { x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) },
      data: { concept, degree: 0 },
    });
    const sourceNode = newNodes.find(n => n.id === sourceId);
    if(sourceNode){
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
    })
    await get().updateLoop(newNodes, newEdges);
  },
  removeNode: async(targetId: string) => {
    const nodes = get().nodes;
    const newNodes = [...nodes];
    const toRemove = newNodes.findIndex(n => n.id === targetId);
    newNodes.splice(toRemove, 1);

    const edges = get().edges;
    const newEdges = edges.filter((e)=>e.target !== targetId && e.source !== targetId);

    set({
      nodes: newNodes,
      edges: newEdges
    });
  },
  updateLoop: async (newNodes: Node[], newEdges: Edge[], updatedNodeId?: string) => {
    let startTime = performance.now(); // Track start time for interval calculation
    const generator = updateNodeLayout(newNodes, newEdges, updatedNodeId);
    for await (const step of generator) {
      // Update visualization based on node positions
      set({
        nodes: step
      })

      // Calculate time elapsed since last iteration
      const elapsedTime = performance.now() - startTime;

      // Sleep for remaining time to maintain 20ms interval
      // const sleepTime = 50; // Ensure non-negative sleep time
      const sleepTime = Math.max(0, 50 - elapsedTime); // Ensure non-negative sleep time

      await new Promise((resolve) => setTimeout(resolve, sleepTime));

      startTime = performance.now(); // Update start time for next iteration
    }
  }
}));

export default useStore;
