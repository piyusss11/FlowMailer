import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface AddEmailDialogProps {
  onSave: (
    template: string,
    recipient: string,
    scheduleTime: string,
    emailContent: string
  ) => void;
}

export function AddEmailDialog({ onSave }: AddEmailDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [recipient, setRecipient] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_LocalHost}/api/v1/email/sendEmailNow`,
        { subject: selectedTemplate, to: recipient, body: emailContent },
        { withCredentials: true }
      );
      console.log({
        subject: selectedTemplate,
        to: recipient,
        body: emailContent,
      });
      console.log("email sent");
    } catch (error) {
      console.log(error);
    }
    toast({
      title: "Email Sent",
      description: `Email sent to ${recipient}`,
    });
    onSave(selectedTemplate, recipient, scheduleTime, emailContent);
    setSelectedTemplate("");
    setRecipient("");
    setScheduleTime("");
    setEmailContent("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Email +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Email Template</DialogTitle>
          <DialogDescription>
            Configure the email for this step
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="template" className="text-right">
              Template
            </Label>
            <Select
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
            >
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">Welcome Email</SelectItem>
                <SelectItem value="follow-up">Follow Up</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recipient" className="text-right">
              Recipient
            </Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="schedule" className="text-right">
              Schedule
            </Label>
            <Input
              id="schedule"
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="emailContent" className="text-right">
            Email Content
          </Label>
          <textarea
            id="emailContent"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="col-span-3 h-24 p-2 border rounded-md"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={!selectedTemplate || !recipient || !scheduleTime}
          >
            Add to Sequence
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
