import { useCallback } from "react";
import { uuid } from "uuidv4";
import { NodeEvent, NodeEventName } from "@/components/interface";
import {Node, Edge} from 'reactflow';
import {forceDirectedLayout} from '@/utils';


export function useNodeEvents(nodes, edges, setNodes: (setter: any) => void, setEdges: (setter: any) => void) {
  const onNodeEvents = useCallback(
    (id: string, params: NodeEvent) => {
      switch (params.event) {
        case NodeEventName.UpdateContent: {
          setNodes((nodes: Node[]) =>
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
          setNodes((nodes: Node[]) => {
            const newNodes = [...nodes];
            newNodes.push({
              id: newNodeId,
              type: "node",
              position: { x: 100, y: 100 },
              data: { content: "", onEvent: onNodeEvents },
            });
            return newNodes;
          });
          
          setEdges((edges: Edge[]) => {
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
    [setNodes, setEdges]
  );
  return onNodeEvents;
}