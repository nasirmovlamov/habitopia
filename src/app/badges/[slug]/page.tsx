"use client";
import { BadgesTable } from "@/badges/BadgesTable";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <BadgesTable />
    </main>
  );
}
