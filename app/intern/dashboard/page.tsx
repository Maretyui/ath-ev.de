"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { BerichtForm } from "@/components/dashboard/bericht-form";
import { TerminForm } from "@/components/dashboard/termin-form";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Loader2,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

interface CurrentUser {
  id: string;
  email: string;
  role: string;
}

interface Bericht {
  id: string;
  title: string;
  content: string;
  image: string;
  publishedAt: string;
  publisherId: string;
}

interface Termin {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string | null;
  image: string | null;
  createdById: string;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE");
}

function formatISODate(dateStr: string): string {
  return new Date(dateStr).toISOString().split("T")[0];
}

interface DeleteConfirmProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

function DeleteConfirm({ open, title, onClose, onConfirm }: DeleteConfirmProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    setLoading(true);
    setError("");
    try {
      await onConfirm();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
    } finally {
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
          <DialogTitle className="text-center">Wirklich löschen?</DialogTitle>
          <DialogDescription className="text-center">
            <strong>{title}</strong> wird unwiderruflich gelöscht.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive text-center">
            {error}
          </div>
        )}
        <DialogFooter className="gap-2 sm:justify-center">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Abbrechen
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? "Löschen..." : "Löschen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  const [berichte, setBerichte] = useState<Bericht[]>([]);
  const [berichteLoading, setBerichteLoading] = useState(false);
  const [berichtForm, setBerichtForm] = useState<{ open: boolean; mode: "add" | "edit"; bericht: Bericht | null }>({ open: false, mode: "add", bericht: null });
  const [berichtKey, setBerichtKey] = useState(0);
  const [deleteBerichtId, setDeleteBerichtId] = useState<Bericht | null>(null);

  const [termine, setTermine] = useState<Termin[]>([]);
  const [termineLoading, setTermineLoading] = useState(false);
  const [terminForm, setTerminForm] = useState<{ open: boolean; mode: "add" | "edit"; termin: Termin | null }>({ open: false, mode: "add", termin: null });
  const [terminKey, setTerminKey] = useState(0);
  const [deleteTerminId, setDeleteTerminId] = useState<Termin | null>(null);

  function openBerichtForm(mode: "add" | "edit", bericht: Bericht | null = null) {
    setBerichtKey((k) => k + 1);
    setBerichtForm({ open: true, mode, bericht });
  }

  function openTerminForm(mode: "add" | "edit", termin: Termin | null = null) {
    setTerminKey((k) => k + 1);
    setTerminForm({ open: true, mode, termin });
  }

  const isManager = user?.role === "manager" || user?.role === "admin";

  useEffect(() => {
    async function initUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/intern/login");
          return;
        }
        const data = await res.json();
        const u: CurrentUser = data.user;

        const publisherRoles = ["publisher", "manager", "admin"];
        if (!publisherRoles.includes(u.role)) {
          setAccessDenied(true);
          setLoading(false);
          return;
        }

        setUser(u);
        setLoading(false);
      } catch {
        router.push("/intern/login");
      }
    }

    initUser();
  }, [router]);

  const fetchBerichte = useCallback(async () => {
    if (!user) return;
    setBerichteLoading(true);
    try {
      const qs = new URLSearchParams({ limit: "50" });
      if (!isManager) qs.set("publisherId", user.id);
      const res = await fetch(`/api/berichte?${qs.toString()}`);
      const data = await res.json();
      if (data.success) setBerichte(data.data);
    } finally {
      setBerichteLoading(false);
    }
  }, [user, isManager]);

  const fetchTermine = useCallback(async () => {
    if (!user) return;
    setTermineLoading(true);
    try {
      const qs = new URLSearchParams({ limit: "50" });
      if (!isManager) qs.set("createdById", user.id);
      const res = await fetch(`/api/termine?${qs.toString()}`);
      const data = await res.json();
      if (data.success) setTermine(data.data);
    } finally {
      setTermineLoading(false);
    }
  }, [user, isManager]);

  useEffect(() => {
    if (user) {
      fetchBerichte();
      fetchTermine();
    }
  }, [user, fetchBerichte, fetchTermine]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/intern/login");
  }

  async function deleteBericht(id: string) {
    const res = await fetch(`/api/berichte/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || "Löschen fehlgeschlagen");
    await fetchBerichte();
  }

  async function deleteTermin(id: string) {
    const res = await fetch(`/api/termine/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || "Löschen fehlgeschlagen");
    await fetchTermine();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  if (accessDenied) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-center">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h1 className="text-2xl font-bold text-foreground">Kein Zugriff</h1>
        <p className="text-muted-foreground">
          Du hast keine Berechtigung, das Dashboard zu verwenden.
        </p>
        <Button variant="outline" onClick={() => router.push("/intern/login")}>
          Zum Login
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Dashboard</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Abmelden</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="berichte">
          <TabsList className="mb-6">
            <TabsTrigger value="berichte">Berichte</TabsTrigger>
            <TabsTrigger value="termine">Termine</TabsTrigger>
          </TabsList>

          {/* ── BERICHTE TAB ── */}
          <TabsContent value="berichte">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                {isManager ? "Alle Berichte" : "Meine Berichte"}
              </h2>
              <Button
                size="sm"
                onClick={() => openBerichtForm("add")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Neuer Bericht
              </Button>
            </div>

            {berichteLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : berichte.length === 0 ? (
              <div className="rounded-lg border bg-card p-12 text-center">
                <p className="text-muted-foreground">Noch keine Berichte vorhanden</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titel</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead className="w-28"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {berichte.map((b, idx) => (
                      <TableRow key={b.id} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/berichte/${b.id}`}
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            {b.title}
                            <ExternalLink className="h-3 w-3 shrink-0" />
                          </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(b.publishedAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Bericht "${b.title}" bearbeiten`}
                              onClick={() => openBerichtForm("edit", b)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              aria-label={`Bericht "${b.title}" löschen`}
                              onClick={() => setDeleteBerichtId(b)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* ── TERMINE TAB ── */}
          <TabsContent value="termine">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                {isManager ? "Alle Termine" : "Meine Termine"}
              </h2>
              <Button
                size="sm"
                onClick={() => openTerminForm("add")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Neuer Termin
              </Button>
            </div>

            {termineLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : termine.length === 0 ? (
              <div className="rounded-lg border bg-card p-12 text-center">
                <p className="text-muted-foreground">Noch keine Termine vorhanden</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titel</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Uhrzeit</TableHead>
                      <TableHead>Ort</TableHead>
                      <TableHead className="w-28"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {termine.map((t, idx) => (
                      <TableRow key={t.id} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/termine/${t.id}`}
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            {t.title}
                            <ExternalLink className="h-3 w-3 shrink-0" />
                          </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(t.date)}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{t.time}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{t.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Termin "${t.title}" bearbeiten`}
                              onClick={() =>
                                openTerminForm("edit", { ...t, date: formatISODate(t.date) })
                              }
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              aria-label={`Termin "${t.title}" löschen`}
                              onClick={() => setDeleteTerminId(t)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bericht Form Dialog */}
      <BerichtForm
        key={berichtKey}
        open={berichtForm.open}
        mode={berichtForm.mode}
        bericht={berichtForm.bericht}
        onClose={() => setBerichtForm((s) => ({ ...s, open: false }))}
        onSuccess={fetchBerichte}
      />

      {/* Termin Form Dialog */}
      <TerminForm
        key={terminKey}
        open={terminForm.open}
        mode={terminForm.mode}
        termin={terminForm.termin}
        onClose={() => setTerminForm((s) => ({ ...s, open: false }))}
        onSuccess={fetchTermine}
      />

      {/* Delete Bericht Confirmation */}
      <DeleteConfirm
        open={!!deleteBerichtId}
        title={deleteBerichtId?.title ?? ""}
        onClose={() => setDeleteBerichtId(null)}
        onConfirm={() => deleteBericht(deleteBerichtId!.id)}
      />

      {/* Delete Termin Confirmation */}
      <DeleteConfirm
        open={!!deleteTerminId}
        title={deleteTerminId?.title ?? ""}
        onClose={() => setDeleteTerminId(null)}
        onConfirm={() => deleteTermin(deleteTerminId!.id)}
      />
    </main>
  );
}
