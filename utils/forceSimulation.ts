import * as d3 from 'd3';
import {Node, Edge} from 'reactflow';
interface NodeType { x: number; y: number; id: string };
export function* forceDirectedLayout(nodes: NodeType[], links: { source: string, target: string }[]) {
  // Spring constant for link forces
  const k = 0.3;

  // Repulsion constant for node-node forces
  const repulsion = 1000;
  // Simulation object using basic forces
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id((d: any) => d.id).strength(k))
    .force("charge", d3.forceManyBody().strength(-repulsion))
    .force("collide", d3.forceCollide((d)=>10))
    .force("center", d3.forceCenter(0, 0));

  // Run the simulation for a set number of iterations
  for (let i = 0; i < 10; i++) {
    simulation.tick();
    yield nodes;
  }
}


export async function* updateNodeLayout(nodes: Node[], edges: Edge[]){
  const formatNodes = nodes.map(n => ({
    id: n.id,
    x: n.position.x,
    y: n.position.y
  }));
  const edgeCloned = JSON.parse(JSON.stringify(edges));

  // const newNodes = forceDirectedLayout(formatNodes, edgeCloned);
  const generator = forceDirectedLayout(formatNodes, edgeCloned);

  for await (const newNodes of generator){
    const offsetX = newNodes[0].x;
    const offsetY = newNodes[0].y;
    const formatNewNodes = newNodes.map((n, i) => ({
      ...nodes[i],
      position: {
        x: n.x - offsetX,
        y: n.y - offsetY
      },
      data: nodes[i].data,
    }));
    yield formatNewNodes;
  }
}
