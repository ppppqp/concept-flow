import * as d3 from "d3";
import { Node, Edge } from "reactflow";
interface NodeData {
  id: string;
  index: string; // origin index in the Node[]
  children: Array<NodeData>;
}

interface NodeTreeData {
  data: NodeData;
  children: Array<NodeTreeData>;
  x: number;
  y: number;
  depth: number;
  height: number;
}

function createHierarchy(nodesData, rootId) {
  const idMapping = nodesData.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});

  let root;
  nodesData.forEach((el) => {
    // Handle the root element
    if (el.id === rootId) {
      root = el;
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = nodesData[idMapping[el.parentId]];
    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el];
  });

  return d3.hierarchy(root);
}


export function treeLayout(nodes: Node[], rootId: string) {
  const root = createHierarchy(
    nodes.map((n, i) => ({
      id: n.id,
      parentId: n.parentId,
      index: i,
    })),
    rootId
  );

  const descendants = d3
    .tree()
    .nodeSize([100, 350])(root)
    .descendants() as d3.HierarchyPointNode<NodeData>[];
  // console.log('descendants', descendants);
  const newNodes = [...nodes];

  const idMapping = descendants.reduce((acc, el, i) => {
    acc[el.data.id] = i;
    return acc;
  }, {});

  descendants.forEach((d) => {
    const node = newNodes[d.data.index];
    // once we have parentId, the positiion computation in reactflow is different
    // the position coordinates become relative to parent's coordinate
    // we need to offset that in d3 output
    const offsetX = node.parentId ?  descendants[idMapping[node.parentId]].x : 0;
    const offsetY = node.parentId ?  descendants[idMapping[node.parentId]].y : 0;
    node.position.x = d.y - offsetY;
    node.position.y = d.x - offsetX;
  });
  return newNodes;
}
