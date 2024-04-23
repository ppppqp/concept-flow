import MindMap from "@/components/MindMap";
import { useMemo } from "react";

import { ROOT_NODE_ID } from "@/components/consts";

const guide = `
### Let's get started!

Edit the root concept with the **gear** button on the top-left corner.
Then click the <span style="color: #e1a107">yellow spark</span> button to explore or the <span style="color: blue">blue cube</span> button to exploit.

💡Some ideas for root concept:

- Large Language Model
- Sky Diving
- 🍔 *(I mean you can literally drop an emoji)*
- Trip to New York
- Global warming
`
export default function Playground() {
  const initialNodes = useMemo(
    () => ([{
      id: ROOT_NODE_ID,
      type: "node",
      position: { x: 0, y: 0 },
      data: { content: guide, concepts: ["Trip to New York"], degree: 0 },
      dragHandle: ".custom-drag-handle",
    }]),
    []
  );
  return <MindMap initialNodes={initialNodes}/>;
}
