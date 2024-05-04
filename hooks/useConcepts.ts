import { ROOT_NODE_ID } from "@/components/consts";
import { useMemo } from "react";
import { Node } from '@/types/node';
export default function useConcepts(id: string, nodes: Node[]){
  const concepts = useMemo(() => {
    const node = nodes.find(n => n.id === id)!;
    let cur = node;
    console.log(id);
    const acc = [cur.data.concept];
    while(cur.id !== ROOT_NODE_ID){
      cur = nodes.find(n => n.id === cur.parentId)!;
      acc.push(cur.data.concept);
    }
    return acc;
  }, [id, nodes]);
  return concepts;
}