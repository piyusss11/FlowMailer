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

interface AddLeadDialogProps {
  onSave: (list: string) => void
}

export function AddLeadDialog({ onSave }: AddLeadDialogProps) {
  const [selectedList, setSelectedList] = useState("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Lead Source +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Leads from List(s)</DialogTitle>
          <DialogDescription>Connect Lists as source for the sequence</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select value={selectedList} onValueChange={setSelectedList}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select list" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sample">Sample List</SelectItem>
              <SelectItem value="newsletter">Newsletter Subscribers</SelectItem>
              <SelectItem value="trial">Trial Users</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={() => onSave(selectedList)} disabled={!selectedList}>
            Add to Sequence
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

