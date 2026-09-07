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

interface BerichtFormData {
  id: string;
  title: string;
  content: string;
  image: string;
}

interface BerichtFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bericht: BerichtFormData | null;
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

export function BerichtForm({ open, onClose, onSuccess, bericht, mode }: BerichtFormProps) {
  const [title, setTitle] = useState(bericht?.title ?? "");
  const [content, setContent] = useState(bericht?.content ?? "");
  const [image, setImage] = useState(bericht?.image ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contentMode, setContentMode] = useState<"edit" | "preview">("edit");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const body = { title, content, image: image || undefined };

    try {
      const url = mode === "edit" && bericht ? `/api/berichte/${bericht.id}` : "/api/berichte";
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Bericht bearbeiten" : "Bericht erstellen"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bericht-title">Titel *</Label>
            <Input
              id="bericht-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titel des Berichts"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label>Inhalt *</Label>
              <div className="flex overflow-hidden rounded-md border border-border text-xs">
                <button
                  type="button"
                  onClick={() => setContentMode("edit")}
                  aria-pressed={contentMode === "edit"}
                  className={`px-3 py-1 transition-colors ${
                    contentMode === "edit"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Bearbeiten
                </button>
                <button
                  type="button"
                  onClick={() => setContentMode("preview")}
                  aria-pressed={contentMode === "preview"}
                  className={`px-3 py-1 transition-colors ${
                    contentMode === "preview"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Vorschau
                </button>
              </div>
            </div>

            {contentMode === "edit" ? (
              <Textarea
                id="bericht-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={"## Überschrift\n\n**fett**, *kursiv*\n\n- Listenpunkt"}
                rows={10}
                required
              />
            ) : (
              <div
                className={`min-h-60 overflow-y-auto rounded-md border border-border bg-background p-3 text-sm text-foreground ${MARKDOWN_PROSE}`}
                dangerouslySetInnerHTML={{
                  __html: content
                    ? renderMarkdownToHtml(content)
                    : "<p style='color:var(--muted-foreground)'>Noch kein Inhalt…</p>",
                }}
              />
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bericht-image">Bild-URL (optional)</Label>
            <Input
              id="bericht-image"
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
