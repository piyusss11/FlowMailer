import { Handle, Position } from "reactflow"
import { Mail } from 'lucide-react'

export function EmailNode({ data }: { data: { label: string; template?: string } }) {
  return (
    <div className="min-w-[250px] bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-foreground" />
      <div className="p-4 flex items-center gap-3">
        <Mail className="w-5 h-5 text-purple-500" />
        <div>
          <p className="font-medium">{data.label}</p>
          <p className="text-sm text-muted-foreground">Template: {data.template || "Sample Template"}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-foreground" />
    </div>
  )
}
