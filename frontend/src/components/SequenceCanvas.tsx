"use client";

import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { LeadNode } from "./custom-nodes/LeadNode";
import { EmailNode } from "./custom-nodes/EmailNode";
import { AddLeadDialog } from "./dialogs/AddLeadDialog";
import { AddEmailDialog } from "./dialogs/AddEmailDialog";
import { Header } from "./Header";

const nodeTypes = {
  lead: LeadNode,
  email: EmailNode,
};

export default function SequenceCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const getNewNodePosition = (type: "lead" | "email") => {
    if (type === "lead") {
      const existingLeadNodes = nodes.filter((node) => node.type === "lead");
      const maxX = Math.max(...existingLeadNodes.map((node) => node.position.x), 0);
      return { x: maxX + 300, y: 50 };
    } else {
      const lastNode = nodes[nodes.length - 1];
      return {
        x: lastNode ? lastNode.position.x : 100,
        y: (lastNode ? lastNode.position.y : 0) + 150,
      };
    }
  };

  const addLeadNode = (list: string) => {
    const newNodeId = `lead-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      type: "lead",
      position: getNewNodePosition("lead"),
      data: {
        label: "Lead Source",
        source: list,
        onDelete: () => deleteNode(newNodeId),
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addEmailNode = (template: string, recipient: string, scheduleTime: string, emailContent: string) => {
    const newNodeId = `email-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      type: "email",
      position: getNewNodePosition("email"),
      data: {
        label: "Email",
        template,
        recipient,
        scheduleTime,
        emailContent,
        onDelete: () => deleteNode(newNodeId),
      },
    };
    setNodes((nds) => [...nds, newNode]);

    // Connect the new node to the previous node
    if (nodes.length > 0) {
      const sourceNode = nodes[nodes.length - 1];
      const newEdge: Edge = {
        id: `e${sourceNode.id}-${newNode.id}`,
        source: sourceNode.id,
        target: newNode.id,
      };
      setEdges((eds) => [...eds, newEdge]);
    }
  };

  const deleteNode = (nodeId: string) => {
    // Remove the node
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    // Remove all edges connected to the node
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  return (
    <div className="flex flex-col h-screen">
    <Header />
    <div className="flex-grow relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <AddLeadDialog onSave={addLeadNode} />
        <AddEmailDialog onSave={addEmailNode} />
      </div>
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
        <MiniMap />
      </ReactFlow>
    </div>
  </div>
  );
}
