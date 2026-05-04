"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, LogIn, Loader2 } from "lucide-react";

export default function InternPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          // User is authenticated, redirect to members
          router.push("/intern/members");
          return;
        }
      } catch {
        // Not authenticated, show login prompt
      }
      setChecking(false);
    }
    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Interner Bereich</CardTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Dieser Bereich ist nur fuer Mitglieder zugaenglich. Bitte melde dich
            an, um fortzufahren.
          </p>
        </CardHeader>
        <CardContent>
          <Link href="/intern/login">
            <Button className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Jetzt anmelden
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
