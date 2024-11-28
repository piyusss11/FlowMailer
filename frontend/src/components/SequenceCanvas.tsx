"use client"

import { useCallback } from "react"
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
} from "reactflow"
import "reactflow/dist/style.css"
import { LeadNode } from "./custom-nodes/LeadNode"
import { EmailNode } from "./custom-nodes/EmailNode"
import { AddLeadDialog } from "./dialogs/AddLeadDialog"
import { AddEmailDialog } from "./dialogs/AddEmailDialog"



const nodeTypes = {
  lead: LeadNode,
  email: EmailNode,
}

export default function SequenceCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const getNewNodePosition = (type: 'lead' | 'email') => {
    if (type === 'lead') {
      const existingLeadNodes = nodes.filter(node => node.type === 'lead')
      const maxX = Math.max(...existingLeadNodes.map(node => node.position.x), 0)
      return { x: maxX + 300, y: 50 }
    } else {
      const lastNode = nodes[nodes.length - 1]
      return { x: lastNode ? lastNode.position.x : 100, y: (lastNode ? lastNode.position.y : 0) + 150 }
    }
  }

  const addLeadNode = (list: string) => {
    const newNode: Node = {
      id: `lead-${Date.now()}`,
      type: "lead",
      position: getNewNodePosition('lead'),
      data: { label: "Lead Source", source: list },
    }
    setNodes((nds) => [...nds, newNode])
  }

  const addEmailNode = (template: string, type?: "follow-up") => {
    const newNode: Node = {
      id: `email-${Date.now()}`,
      type: "email",
      position: getNewNodePosition('email'),
      data: { label: type ? "Follow-up Email" : "Email", template },
    }
    setNodes((nds) => [...nds, newNode])

    // Connect the new node to the previous node
    if (nodes.length > 0) {
      const sourceNode = nodes[nodes.length - 1]
      const newEdge: Edge = {
        id: `e${sourceNode.id}-${newNode.id}`,
        source: sourceNode.id,
        target: newNode.id,
      }
      setEdges((eds) => [...eds, newEdge])
    }
  }

  return (
    <div className="w-full h-screen bg-slate-50">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <AddLeadDialog onSave={addLeadNode} />
        <AddEmailDialog onSave={addEmailNode} />
        <AddEmailDialog onSave={(template) => addEmailNode(template, "follow-up")} type="follow-up" />
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
  )
}

