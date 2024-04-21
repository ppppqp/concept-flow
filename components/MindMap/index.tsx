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
import { useShallow } from 'zustand/react/shallow';
import { useState, useCallback, useMemo, useEffect } from "react";
import TextNode from "../Node";
import "reactflow/dist/style.css";
import { useNodeEvents } from "@/hooks/useNodeEvents";
import {forceDirectedLayout} from '@/utils';
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
  useEffect(()=>{
    const nodes = [
      { id: '1', x: 100, y: 50 },
      { id: '2', x: 200, y: 100 },
      { id: '3', x: 50, y: 150 },
    ];
    
    const links = [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
    ];
    
    console.log(forceDirectedLayout(nodes, links));
  }, []);
  


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
        data: { content: "", onEvent: () => {} },
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
