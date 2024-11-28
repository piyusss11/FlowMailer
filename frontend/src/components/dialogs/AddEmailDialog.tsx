import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

interface AddEmailDialogProps {
  onSave: (template: string) => void
  type?: "follow-up"
}

export function AddEmailDialog({ onSave, type }: AddEmailDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add {type ? "Follow-up" : "Email"} +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type ? "Follow-up Email" : "Email Template"}</DialogTitle>
          <DialogDescription>Select an email template for this step</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="welcome">Welcome Email</SelectItem>
              <SelectItem value="follow-up">Follow Up</SelectItem>
              <SelectItem value="newsletter">Newsletter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={() => onSave(selectedTemplate)} disabled={!selectedTemplate}>
            Add to Sequence
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

