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
  const getInitialFormData = (): Omit<MemberData, "id"> => ({
    name: member?.name ?? "",
    street: member?.street ?? "",
    plz: member?.plz ?? "",
    ort: member?.ort ?? "",
    telefon: member?.telefon ?? "",
    email: member?.email ?? "",
    geburtstag: member?.geburtstag ?? "",
    jugend: member?.jugend ?? false,
  });

  const [formData, setFormData] = useState<Omit<MemberData, "id">>(
    getInitialFormData()
  );
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setFieldErrors({});
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
        // Handle validation errors with field details
        if (data.details && typeof data.details === "object") {
          const errors: Record<string, string> = {};
          for (const [field, messages] of Object.entries(data.details)) {
            errors[field] = Array.isArray(messages)
              ? (messages as string[])[0]
              : String(messages);
          }
          setFieldErrors(errors);
          setError("Bitte überprüfe die hervorgehobenen Felder");
        } else {
          setError(data.error || "Speichern fehlgeschlagen");
        }
        setLoading(false);
        return;
      }

      setFormData(getInitialFormData());
      setFieldErrors({});
      setError("");
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten"
      );
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
              className={fieldErrors.name ? "border-destructive" : ""}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
            {fieldErrors.name && (
              <p id="name-error" className="text-sm text-destructive">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Strasse *</Label>
            <Input
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              className={fieldErrors.street ? "border-destructive" : ""}
              aria-describedby={fieldErrors.street ? "street-error" : undefined}
            />
            {fieldErrors.street && (
              <p id="street-error" className="text-sm text-destructive">
                {fieldErrors.street}
              </p>
            )}
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
                className={fieldErrors.plz ? "border-destructive" : ""}
                aria-describedby={fieldErrors.plz ? "plz-error" : undefined}
              />
              {fieldErrors.plz && (
                <p id="plz-error" className="text-sm text-destructive">
                  {fieldErrors.plz}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ort">Ort *</Label>
              <Input
                id="ort"
                name="ort"
                value={formData.ort}
                onChange={handleChange}
                required
                className={fieldErrors.ort ? "border-destructive" : ""}
                aria-describedby={fieldErrors.ort ? "ort-error" : undefined}
              />
              {fieldErrors.ort && (
                <p id="ort-error" className="text-sm text-destructive">
                  {fieldErrors.ort}
                </p>
              )}
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
              className={fieldErrors.telefon ? "border-destructive" : ""}
              aria-describedby={
                fieldErrors.telefon ? "telefon-error" : undefined
              }
            />
            {fieldErrors.telefon && (
              <p id="telefon-error" className="text-sm text-destructive">
                {fieldErrors.telefon}
              </p>
            )}
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
              className={fieldErrors.email ? "border-destructive" : ""}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="geburtstag">Geburtstag</Label>
            <Input
              id="geburtstag"
              name="geburtstag"
              type="date"
              value={formData.geburtstag}
              onChange={handleChange}
              className={fieldErrors.geburtstag ? "border-destructive" : ""}
              aria-describedby={
                fieldErrors.geburtstag ? "geburtstag-error" : undefined
              }
            />
            {fieldErrors.geburtstag && (
              <p id="geburtstag-error" className="text-sm text-destructive">
                {fieldErrors.geburtstag}
              </p>
            )}
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
