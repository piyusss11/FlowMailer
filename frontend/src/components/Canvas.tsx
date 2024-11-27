import React from "react";

import "reactflow/dist/style.css";

import ReactFlow, { Background, Controls } from "reactflow";

const Canvas = () => {
  const nodes = [
    {
      id: "1",
      position: { x: 0, y: 5 },
      data: { label: "hello" },
      type: "input",
    },
    {
      id: "2",
      position: { x: 100, y: 100 },
      data: { label: "world" },
    },
  ];
  const edges = [{id:"1-2",source:"1",target:"2"}]
  return (
    <div className="w-screen h-screen ">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background color="black" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
