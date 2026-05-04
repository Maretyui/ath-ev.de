"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sun,
  Moon,
  Menu,
  ChevronDown,
  LogIn,
  LogOut,
  User,
  KeyRound,
} from "lucide-react";

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

const NAV_LINKS = [
  { href: "/berichte", label: "Berichte" },
  { href: "/termine", label: "Termine" },
  { href: "/links", label: "Links" },
  { href: "/intern", label: "Intern" },
];

const VEREIN_LINKS = [
  { href: "/verein/geschichte", label: "Geschichte" },
  { href: "/verein/vorstand", label: "Vorstand" },
  { href: "/verein/satzung", label: "Satzung" },
  { href: "/verein/geschaeftsordnung", label: "Geschäftsordnung" },
];

const AUSBILDUNG_LINKS = [
  { href: "/grundausbildung/andreas", label: "Grundausbildung Andreas" },
  { href: "/grundausbildung/maik", label: "Grundausbildung Maik" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  function navigateAndClose(href: string) {
    setMobileOpen(false);
    router.push(href);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background border-b border-border">
      <div className="max-w-300 mx-auto h-full flex items-center justify-between px-8">
        <Link href="/" className="text-2xl font-bold text-primary shrink-0">
          ATH
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors outline-none">
              Verein <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {VEREIN_LINKS.map((link) => (
                <DropdownMenuItem
                  key={link.href}
                  onClick={() => router.push(link.href)}
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors outline-none">
              Ausbildung <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {AUSBILDUNG_LINKS.map((link) => (
                <DropdownMenuItem
                  key={link.href}
                  onClick={() => router.push(link.href)}
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={toggle}
            aria-label="Theme wechseln"
            className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors outline-none">
                <User className="h-4 w-4" />
                {user.email.split("@")[0]}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push("/intern/profil")}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/intern/passwort")}
                  className="flex items-center gap-2"
                >
                  <KeyRound className="h-4 w-4" />
                  Passwort ändern
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Abmelden
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/intern")}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Anmelden
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggle}
            aria-label="Theme wechseln"
            className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
              aria-label="Menü öffnen"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 pt-6">
              <SheetHeader className="mb-4 text-left px-4">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-2">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-bold text-primary mb-2 px-3 block"
                >
                  ATH
                </Link>

                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => navigateAndClose(link.href)}
                    className="py-2 px-3 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}

                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-4 mb-1 px-3">
                  Verein
                </p>
                {VEREIN_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => navigateAndClose(link.href)}
                    className="py-2 px-3 rounded-md text-sm text-foreground hover:bg-muted transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}

                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-4 mb-1 px-3">
                  Ausbildung
                </p>
                {AUSBILDUNG_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => navigateAndClose(link.href)}
                    className="py-2 px-3 rounded-md text-sm text-foreground hover:bg-muted transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}

                <div className="mt-6 border-t border-border pt-4">
                  {user ? (
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => navigateAndClose("/intern/profil")}
                        className="py-2 px-3 rounded-md text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2 text-left"
                      >
                        <User className="h-4 w-4" />
                        Profil
                      </button>
                      <button
                        onClick={() => navigateAndClose("/intern/passwort")}
                        className="py-2 px-3 rounded-md text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2 text-left"
                      >
                        <KeyRound className="h-4 w-4" />
                        Passwort ändern
                      </button>
                      <button
                        onClick={handleLogout}
                        className="py-2 px-3 rounded-md text-sm text-destructive hover:bg-muted transition-colors flex items-center gap-2 text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Abmelden
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigateAndClose("/intern")}
                      className="w-full py-2 px-3 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/80 transition-colors flex items-center gap-2 justify-center"
                    >
                      <LogIn className="h-4 w-4" />
                      Anmelden
                    </button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
