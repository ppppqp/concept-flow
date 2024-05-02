import { ROOT_NODE_ID } from "@/components/consts";
import * as d3 from "d3";
import { Node, Edge } from "reactflow";

interface FlatNodeData {
  id: string;
  index: number;
  parentId?: string; // root does not have parentId
  height: number;
}
interface NodeData extends FlatNodeData {
  children?: Array<NodeData>;
}

interface NodeTreeData {
  data: NodeData;
  children: Array<NodeTreeData>;
  x: number;
  y: number;
  depth: number;
}

function createHierarchy(nodesData: NodeData[], rootId: string) {
  const idMapping = nodesData.reduce((acc: Record<string, number>, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});

  let root: NodeData;
  nodesData.forEach((el) => {
    // Handle the root element
    if (el.id === rootId || el.id === ROOT_NODE_ID) {
      root = el;
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = nodesData[idMapping[el.parentId!]];
    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el];
  });
  return d3.hierarchy<NodeData>(root!);
}

export function treeLayout(nodes: Node[], rootId: string) {
  const root = createHierarchy(
    nodes.map((n, i) => ({
      id: n.id,
      parentId: n.parentId,
      index: i,
      height: n.data.height,
    })),
    rootId
  );
  const descendants = d3
    .tree<NodeData>()
    .nodeSize([150, 350])(root)
    .descendants() as d3.HierarchyPointNode<NodeData>[];
  const newNodes = [...nodes];

  const idMapping = descendants.reduce((acc: Record<string, number>, el, i) => {
    acc[el.data.id] = i;
    return acc;
  }, {});

  // keep the root not moved

  descendants.forEach((d) => {
    if (d.depth === 0) return; // keep the root not moved
    const node = newNodes[d.data.index];
    // once we have parentId, the positiion computation in reactflow is different
    // the position coordinates become relative to parent's coordinate
    // we need to offset that in d3 output
    const offsetX = node.parentId ? descendants[idMapping[node.parentId]].x : 0;
    const offsetY = node.parentId ? descendants[idMapping[node.parentId]].y : 0;
    node.position.x = d.y - offsetY;
    node.position.y = d.x - offsetX;
  });
  return newNodes;
}

export function customLayout(nodes: Node[], rootId: string) {
  const root = createHierarchy(
    nodes.map((n, i) => ({
      id: n.id,
      parentId: n.parentId,
      index: i,
      height: n.data.height,
    })),
    rootId
  );

  root.x = 0;
  root.y = 0;
  setLevelY(root);

  const newNodes = [...nodes];
  root.descendants().forEach((d) => {
    const node = newNodes[d.data.index];
    if (d.depth === 0) return; // keep the root not moved
    node.position.x = d.x!;
    node.position.y = d.y!;
  });
  // console.log(newNodes)
  return newNodes;
}

export function setLevelY(root: d3.HierarchyNode<NodeData>) {
  let accumulatedY = 0;
  root.children?.forEach((c) => {
    c.x = 350;
    c.y = accumulatedY;
    accumulatedY += 100 + c.data.height;
    setLevelY(c);
  });
}

export function documentLayout(nodes: Node[], rootId: string) {
  const root = createHierarchy(
    nodes.map((n, i) => ({
      id: n.id,
      parentId: n.parentId,
      index: i,
      height: n.data.height,
    })),
    rootId
  );
  const flatten = [] as string[];
  traverse(root, flatten);
  const newNodes = [...nodes];

  const idMapping = flatten.reduce((acc: Record<string, number>, el, i) => {
    acc[el] = i;
    return acc;
  }, {});
  newNodes.sort((a, b) => idMapping[a.id] - idMapping[b.id]);
  return newNodes;
}

function traverse(root: d3.HierarchyNode<NodeData>, flatten: string[]) {
  flatten.push(root.data.id);
  root.children?.forEach((c) => {
    traverse(c, flatten);
  });
}

// export function setDocumentY(root: d3.HierarchyNode<NodeData>){
//   let accumulatedY = root.data.height + 100;
//   root.children?.forEach(c => {
//     c.x = 0;
//     c.y = accumulatedY;
//     console.log(c.data.id, c.y, accumulatedY, c.data.height);
//     // accumulatedY += 100 + c.data.height;
//     accumulatedY += setDocumentY(c);
//   })
//   return accumulatedY;
// }
