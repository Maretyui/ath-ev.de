"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  memberId: string;
  memberName: string;
}

export function DeleteDialog({
  open,
  onClose,
  onSuccess,
  memberId,
  memberName,
}: DeleteDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/members/${memberId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Löschen fehlgeschlagen");
        setLoading(false);
        return;
      }

      onSuccess();
      onClose();
    } catch {
      setError("Ein Fehler ist aufgetreten");
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-center">
            Mitglied löschen?
          </DialogTitle>
          <DialogDescription className="text-center">
            Möchtest du <strong>{memberName}</strong> wirklich löschen? Diese
            Aktion kann nicht rückgängig gemacht werden.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive text-center">
            {error}
          </div>
        )}

        <DialogFooter className="gap-2 sm:justify-center">
          <Button type="button" variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Löschen..." : "Löschen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
