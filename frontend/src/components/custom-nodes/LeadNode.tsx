import { Handle, Position } from "reactflow"
import { Users } from 'lucide-react'

export function LeadNode({ data }: { data: { label: string; source?: string } }) {
  return (
    <div className="min-w-[250px] bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 flex items-center gap-3">
        <Users className="w-5 h-5 text-pink-500" />
        <div>
          <p className="font-medium">Leads from</p>
          <p className="text-sm text-muted-foreground">{data.source || "Sample List"}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-foreground left-[25%]" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-foreground left-[50%]" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-foreground left-[75%]" />
    </div>
  )
}

