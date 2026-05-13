"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TiptapEditor from "@/components/ui/TiptapEditor";
import { useCreateFaqMutation } from "../../../../redux/api/faqApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type CreateFAQModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateFAQModal({ open, onClose }: CreateFAQModalProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState<{
    question?: string;
    answer?: string;
  }>({});

  const [createFaq, { isLoading }] = useCreateFaqMutation();

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!question.trim()) {
      newErrors.question = "Question is required";
    }

    if (!answer.trim() || answer === "<p></p>") {
      newErrors.answer = "Answer is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await createFaq({
          question,
          answer,
        }).unwrap();
        toast.success("FAQ created successfully!");
        handleClose();
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to create FAQ");
        console.error("Failed to create FAQ:", err);
      }
    }
  };

  const handleClose = () => {
    setQuestion("");
    setAnswer("");
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose} modal={false}>
      <DialogContent className="bg-background max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-[800px]">
        <DialogHeader className="bg-primary text-primary-foreground sticky top-0 z-10 rounded-t-lg p-6">
          <DialogTitle className="text-xl font-semibold">Create FAQ</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Question */}
          <div className="space-y-2">
            <label htmlFor="question" className="text-foreground text-sm font-medium">
              Question
            </label>
            <Input
              id="question"
              type="text"
              placeholder="Enter the question"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (errors.question) setErrors({ ...errors, question: undefined });
              }}
              className={errors.question ? "border-destructive" : ""}
            />
            {errors.question && <p className="text-destructive text-xs">{errors.question}</p>}
          </div>

          {/* Answer Editor */}
          <div className="space-y-2">
            <label className="text-foreground text-sm font-medium">Answer</label>
            <TiptapEditor
              content={answer}
              onChange={(newContent: string) => {
                setAnswer(newContent);
                if (errors.answer) setErrors({ ...errors, answer: undefined });
              }}
              placeholder="Write the answer..."
            />
            {errors.answer && <p className="text-destructive text-xs">{errors.answer}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create FAQ"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
