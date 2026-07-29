"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MemberForm } from "@/components/members/member-form";
import { DeleteDialog } from "@/components/members/delete-dialog";
import {
  Search,
  Plus,
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  LogOut,
  Loader2,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  street: string;
  plz: string;
  ort: string;
  telefon: string;
  email: string;
  geburtstag: string | null;
  jugend: boolean;
}

type SortColumn =
  | "name"
  | "street"
  | "plz"
  | "ort"
  | "telefon"
  | "email"
  | "geburtstag"
  | "jugend";
type SortOrder = "asc" | "desc";

export default function MembersPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [total, setTotal] = useState(0);
  const [jugendliche, setJugendliche] = useState(0);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortColumn>("name");
  const [order, setOrder] = useState<SortOrder>("asc");

  // Form state
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [memberKey, setMemberKey] = useState(0);

  // Delete state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteMember, setDeleteMember] = useState<Member | null>(null);

  const canEdit = userRole === "manager" || userRole === "admin";

  const fetchMembers = useCallback(async () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("sort", sort);
    params.set("order", order);

    try {
      const res = await fetch(`/api/members?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/intern/login");
          return;
        }
        throw new Error(data.error);
      }

      setMembers(data.data);
      setTotal(data.total);
      setJugendliche(data.jugendliche);
      setUserRole(data.role);
    } catch (err) {
      console.error("Failed to fetch members:", err);
    } finally {
      setLoading(false);
    }
  }, [search, sort, order, router]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  function handleSort(column: SortColumn) {
    if (sort === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(column);
      setOrder("asc");
    }
  }

  function handleAdd() {
    setMemberKey((k) => k + 1);
    setEditMember(null);
    setFormMode("add");
    setFormOpen(true);
  }

  function handleEdit(member: Member) {
    setMemberKey((k) => k + 1);
    setEditMember({
      ...member,
      geburtstag: member.geburtstag
        ? new Date(member.geburtstag).toISOString().split("T")[0]
        : "",
    });
    setFormMode("edit");
    setFormOpen(true);
  }

  function handleDelete(member: Member) {
    setDeleteMember(member);
    setDeleteOpen(true);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/intern/login");
  }

  function formatDate(dateStr: string | null): string {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("de-DE");
  }

  const columnHeaders: { key: SortColumn; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "street", label: "Strasse" },
    { key: "plz", label: "PLZ" },
    { key: "ort", label: "Ort" },
    { key: "telefon", label: "Telefon" },
    { key: "email", label: "E-Mail" },
    { key: "geburtstag", label: "Geburtstag" },
    { key: "jugend", label: "Jugend" },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Mitglieder
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">
              Total: {total} | Jugendliche: {jugendliche}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Abmelden</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Actions bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Suche nach Name oder E-Mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {canEdit && (
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Mitglied hinzufuegen
            </Button>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : members.length === 0 ? (
          <div className="rounded-lg border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              {search
                ? "Keine Mitglieder gefunden"
                : "Noch keine Mitglieder vorhanden"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  {columnHeaders.map(({ key, label }) => (
                    <TableHead key={key}>
                      <button
                        onClick={() => handleSort(key)}
                        className="flex items-center gap-1 font-medium hover:text-primary transition-colors"
                      >
                        {label}
                        <ArrowUpDown
                          className={`h-3 w-3 ${
                            sort === key
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    </TableHead>
                  ))}
                  {canEdit && <TableHead className="w-10"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member, idx) => (
                  <TableRow
                    key={member.id}
                    className={idx % 2 === 0 ? "bg-muted/30" : ""}
                  >
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.street}</TableCell>
                    <TableCell>{member.plz}</TableCell>
                    <TableCell>{member.ort}</TableCell>
                    <TableCell>{member.telefon}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{formatDate(member.geburtstag)}</TableCell>
                    <TableCell>{member.jugend ? "Ja" : ""}</TableCell>
                    {canEdit && (
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Aktionen für ${member.name}`}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(member)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Bearbeiten
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(member)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Löschen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Add/Edit Form */}
      <MemberForm
        key={memberKey}
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSuccess={fetchMembers}
        member={
          editMember
            ? {
                id: editMember.id,
                name: editMember.name,
                street: editMember.street,
                plz: editMember.plz,
                ort: editMember.ort,
                telefon: editMember.telefon,
                email: editMember.email,
                geburtstag: editMember.geburtstag ?? "",
                jugend: editMember.jugend,
              }
            : null
        }
        mode={formMode}
      />

      {/* Delete Confirmation */}
      {deleteMember && (
        <DeleteDialog
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onSuccess={fetchMembers}
          memberId={deleteMember.id}
          memberName={deleteMember.name}
        />
      )}
    </main>
  );
}
