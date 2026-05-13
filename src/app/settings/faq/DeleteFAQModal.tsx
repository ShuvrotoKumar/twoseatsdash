"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useDeleteFaqMutation } from "../../../../redux/api/faqApi";
import { toast } from "sonner";

type DeleteFAQModalProps = {
  open: boolean;
  onClose: () => void;
  faq: { _id: string; question: string } | null;
};

export default function DeleteFAQModal({
  open,
  onClose,
  faq,
}: DeleteFAQModalProps) {
  const [deleteFaq, { isLoading }] = useDeleteFaqMutation();

  if (!faq) return null;

  const handleConfirm = async () => {
    try {
      await deleteFaq({ _id: faq._id }).unwrap();
      toast.success("FAQ deleted successfully!");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete FAQ");
      console.error("Failed to delete FAQ:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-background sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <div className="bg-destructive/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <AlertTriangle className="text-destructive h-6 w-6" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">Delete FAQ</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-muted-foreground text-center text-sm">
            Are you sure you want to delete this FAQ?
          </p>
          <p className="text-foreground mt-3 text-center font-medium">"{faq.question}"</p>
          <p className="text-muted-foreground mt-3 text-center text-xs">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
