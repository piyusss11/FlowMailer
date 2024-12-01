import { Handle, Position } from "reactflow";
import { Mail, X,Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmailNodeProps {
  data: { 
    label: string; 
    template?: string; 
    recipient?: string;
    scheduleTime?: string;
    emailContent?: string;
    onDelete: () => void; 
  };
}

export function EmailNode({ data }: EmailNodeProps) {
  console.log(data)
  return (
    <div className="min-w-[250px] max-w-[350px] bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-foreground" />
    <div className="p-4 space-y-2">
      <div className="flex items-center gap-3">
        <Mail className="w-5 h-5 text-purple-500" />
        <div>
          <p className="font-medium">{data.label}</p>
          <p className="text-sm text-muted-foreground">Template: {data.template || "Sample Template"}</p>
        </div>
      </div>
      {data.recipient && (
        <p className="text-sm text-muted-foreground">To: {data.recipient}</p>
      )}
      {data.emailContent && (
        <div className="mt-2 p-2 bg-gray-50 rounded-md">
          <p className="text-sm">{data.emailContent}</p>
        </div>
      )}
      {data.scheduleTime && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Scheduled: {new Date(data.scheduleTime).toLocaleString()}</span>
        </div>
      )}
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
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-foreground" />
  </div>
  );
}
