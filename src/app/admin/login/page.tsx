import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminConfigured, isAuthed } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAuthed()) redirect("/admin");
  return (
    <main className="grid min-h-[70vh] place-items-center bg-surface px-5 py-16">
      <LoginForm configured={adminConfigured()} />
    </main>
  );
}
