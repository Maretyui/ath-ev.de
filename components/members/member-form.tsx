"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

interface MemberData {
  id?: string;
  name: string;
  street: string;
  plz: string;
  ort: string;
  telefon: string;
  email: string;
  geburtstag: string;
  jugend: boolean;
}

interface MemberFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  member?: MemberData | null;
  mode: "add" | "edit";
}

export function MemberForm({
  open,
  onClose,
  onSuccess,
  member,
  mode,
}: MemberFormProps) {
  const [formData, setFormData] = useState<Omit<MemberData, "id">>({
    name: member?.name ?? "",
    street: member?.street ?? "",
    plz: member?.plz ?? "",
    ort: member?.ort ?? "",
    telefon: member?.telefon ?? "",
    email: member?.email ?? "",
    geburtstag: member?.geburtstag ?? "",
    jugend: member?.jugend ?? false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url =
      mode === "edit" ? `/api/members/${member?.id}` : "/api/members";
    const method = mode === "edit" ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Speichern fehlgeschlagen");
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
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Mitglied bearbeiten" : "Neues Mitglied"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Strasse *</Label>
            <Input
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plz">PLZ *</Label>
              <Input
                id="plz"
                name="plz"
                value={formData.plz}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ort">Ort *</Label>
              <Input
                id="ort"
                name="ort"
                value={formData.ort}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefon">Telefon *</Label>
            <Input
              id="telefon"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="geburtstag">Geburtstag</Label>
            <Input
              id="geburtstag"
              name="geburtstag"
              type="date"
              value={formData.geburtstag}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="jugend"
              name="jugend"
              type="checkbox"
              checked={formData.jugend}
              onChange={handleChange}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <Label htmlFor="jugend" className="cursor-pointer">
              Jugendlicher
            </Label>
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Speichern..." : "Speichern"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
