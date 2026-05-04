"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { renderMarkdownToHtml } from "@/lib/markdown";

interface TerminFormData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string | null;
  image: string | null;
}

interface TerminFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  termin: TerminFormData | null;
  mode: "add" | "edit";
}

const MARKDOWN_PROSE =
  "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-2 " +
  "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 " +
  "[&_h4]:text-lg [&_h4]:font-medium [&_h4]:mt-3 [&_h4]:mb-1 " +
  "[&_p]:mb-3 [&_p]:leading-relaxed " +
  "[&_strong]:font-bold [&_em]:italic " +
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 " +
  "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 " +
  "[&_li]:mb-1 " +
  "[&_a]:text-primary [&_a]:underline " +
  "[&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-3 " +
  "[&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono " +
  "[&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:my-3 [&_pre]:overflow-x-auto " +
  "[&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-3";

export function TerminForm({ open, onClose, onSuccess, termin, mode }: TerminFormProps) {
  const [title, setTitle] = useState(termin?.title ?? "");
  const [date, setDate] = useState(termin?.date ?? "");
  const [time, setTime] = useState(termin?.time ?? "");
  const [location, setLocation] = useState(termin?.location ?? "");
  const [description, setDescription] = useState(termin?.description ?? "");
  const [image, setImage] = useState(termin?.image ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [descMode, setDescMode] = useState<"edit" | "preview">("edit");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const body = {
      title,
      date,
      time,
      location,
      description: description || undefined,
      image: image || undefined,
    };

    try {
      const url = mode === "edit" && termin ? `/api/termine/${termin.id}` : "/api/termine";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Ein Fehler ist aufgetreten");
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
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Termin bearbeiten" : "Termin erstellen"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="termin-title">Titel *</Label>
            <Input
              id="termin-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titel des Termins"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="termin-date">Datum *</Label>
              <Input
                id="termin-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="termin-time">Uhrzeit *</Label>
              <Input
                id="termin-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="termin-location">Ort *</Label>
            <Input
              id="termin-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ort des Termins"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label>Beschreibung (optional)</Label>
              <div className="flex overflow-hidden rounded-md border border-border text-xs">
                <button
                  type="button"
                  onClick={() => setDescMode("edit")}
                  className={`px-3 py-1 transition-colors ${
                    descMode === "edit"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Bearbeiten
                </button>
                <button
                  type="button"
                  onClick={() => setDescMode("preview")}
                  className={`px-3 py-1 transition-colors ${
                    descMode === "preview"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Vorschau
                </button>
              </div>
            </div>

            {descMode === "edit" ? (
              <Textarea
                id="termin-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={"## Überschrift\n\n**fett**, *kursiv*\n\n- Listenpunkt"}
                rows={4}
              />
            ) : (
              <div
                className={`min-h-24 overflow-y-auto rounded-md border border-border bg-background p-3 text-sm text-foreground ${MARKDOWN_PROSE}`}
                dangerouslySetInnerHTML={{
                  __html: description
                    ? renderMarkdownToHtml(description)
                    : "<p style='color:var(--muted-foreground)'>Noch kein Inhalt…</p>",
                }}
              />
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="termin-image">Bild-URL (optional)</Label>
            <Input
              id="termin-image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/bild.jpg"
              type="url"
            />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Speichern..." : mode === "edit" ? "Aktualisieren" : "Erstellen"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
