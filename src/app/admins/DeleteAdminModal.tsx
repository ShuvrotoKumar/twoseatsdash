"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface Admin {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface DeleteAdminModalProps {
  open: boolean;
  onClose: () => void;
  admin: Admin | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function DeleteAdminModal({
  open,
  onClose,
  admin,
  onConfirm,
  isLoading,
}: DeleteAdminModalProps) {
  if (!admin) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()} modal={false}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-destructive h-5 w-5" />
            <DialogTitle className="text-destructive text-xl font-semibold">Delete Admin</DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-destructive/10 flex items-center gap-4 rounded-lg p-4">
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={admin.avatar} alt={admin.name} />
              <AvatarFallback>
                {admin.name
                  ? admin.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "A"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="text-foreground truncate font-semibold">{admin.name}</h3>
              <p className="text-muted-foreground truncate text-sm">{admin.email}</p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete this admin? This action is permanent and cannot be
            undone.
          </p>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Admin"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
