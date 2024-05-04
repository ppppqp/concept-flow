export const ROOT_NODE_ID = 'root';
const guide = `
### Let's get started!

Edit the root concept with the **gear** button on the top-left corner.
Then click the <span style="color: #e1a107">yellow spark</span> button to explore or the <span style="color: blue">blue cube</span> button to exploit.

💡Some ideas for root concept:

- Trip to New York
- 🍔 *(I mean you can literally drop an emoji)*
- Global warming
- Elasticsearch
`;

export const DEFAULT_CONCEPT = "Trip to New York";


export const DEFAULT_NODES = [
  {
    id: ROOT_NODE_ID,
    type: "node",
    position: { x: 0, y: 0 },
    data: {
      content: guide,
      concept: DEFAULT_CONCEPT,
      degree: 0,
      depth: 0,
      height: 0,
    },
    dragHandle: ".custom-drag-handle",
  },
];

export const DEFAULT_EDGES = [];