import { Handle, Position } from "reactflow"
import { Users, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface LeadNodeProps {
  data: { 
    label: string; 
    source?: string;
    onDelete: () => void;
  }
}

export function LeadNode({ data }: LeadNodeProps) {
  return (
    <div className="min-w-[250px] bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow relative">
      <div className="p-4 flex items-center gap-3">
        <Users className="w-5 h-5 text-pink-500" />
        <div>
          <p className="font-medium">Leads from</p>
          <p className="text-sm text-muted-foreground">{data.source || "Sample List"}</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 h-6 w-6" 
        onClick={data.onDelete}
        aria-label="Delete node"
      >
        <X className="h-4 w-4" />
      </Button>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-foreground left-[25%]" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-foreground left-[50%]" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-foreground left-[75%]" />
    </div>
  )
}

