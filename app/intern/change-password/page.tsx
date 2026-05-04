"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, User, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ChangePasswordPage() {
  const router = useRouter();

  // Username state
  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setUsername(d.user.username ?? "");
      })
      .catch(() => {});
  }, []);

  async function handleUsernameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUsernameError("");
    setUsernameSuccess(false);
    setUsernameLoading(true);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setUsernameError(data.error || "Speichern fehlgeschlagen");
      } else {
        setUsername(data.data.username ?? "");
        setUsernameSuccess(true);
      }
    } catch {
      setUsernameError("Ein Fehler ist aufgetreten");
    } finally {
      setUsernameLoading(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword.length < 8) {
      setError("Das neue Passwort muss mindestens 8 Zeichen lang sein");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setError("Das neue Passwort muss mindestens einen Grossbuchstaben enthalten");
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setError("Das neue Passwort muss mindestens eine Zahl enthalten");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Die neuen Passwoerter stimmen nicht ueberein");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/intern/login");
          return;
        }
        setError(data.error || "Passwort aendern fehlgeschlagen");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background px-4 py-12">
      {/* Username card */}
      <Card className="w-full max-w-100">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <User className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Benutzername</CardTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Wird in Berichten statt deiner E-Mail angezeigt
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUsernameSubmit} className="space-y-4">
            {usernameError && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{usernameError}</span>
              </div>
            )}
            {usernameSuccess && (
              <div className="flex items-center gap-2 rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Benutzername gespeichert!</span>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Benutzername</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="z.B. Maik Reinhardt"
                required
                minLength={2}
                maxLength={50}
              />
            </div>
            <Button type="submit" className="w-full" disabled={usernameLoading}>
              {usernameLoading ? "Wird gespeichert..." : "Benutzername speichern"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password card */}
      <Card className="w-full max-w-100">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Key className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Passwort aendern</CardTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Gib dein aktuelles und ein neues Passwort ein
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Passwort erfolgreich geaendert!</span>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Aktuelles Passwort</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Neues Passwort</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <p className="text-xs text-muted-foreground">
                Mindestens 8 Zeichen, 1 Grossbuchstabe, 1 Zahl
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Neues Passwort bestaetigen</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Wird geaendert..." : "Passwort aendern"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/intern/members"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurueck zur Mitgliederliste
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
