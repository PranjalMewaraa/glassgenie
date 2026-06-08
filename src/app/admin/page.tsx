import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminConfigured, isAuthed } from "@/lib/auth";
import { getSiteRoutes } from "@/lib/site-routes";
import { getAllRouteDefaults } from "@/lib/route-defaults";
import { getAllSeoOverrides, seoStoreBackend } from "@/lib/seo-store";
import { SeoManager } from "./SeoManager";

export const metadata: Metadata = {
  title: "SEO Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-surface px-5 py-16">
        <div className="w-full max-w-md rounded-2xl border border-line bg-card p-7 shadow-sm">
          <h1 className="text-xl font-extrabold tracking-tight text-ink">SEO Admin</h1>
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 ring-1 ring-amber-200">
            No <code>ADMIN_PASSWORD</code> is set on the server. Add it to your
            environment and restart to enable the admin panel.
          </p>
        </div>
      </main>
    );
  }

  if (!(await isAuthed())) redirect("/admin/login");

  const overrides = await getAllSeoOverrides();
  const routes = getSiteRoutes();
  const defaults = getAllRouteDefaults(routes.map((r) => r.path));

  return (
    <main className="min-h-[70vh] bg-surface px-5 py-10">
      <SeoManager
        routes={routes}
        backend={seoStoreBackend}
        initialOverrides={overrides}
        defaults={defaults}
      />
    </main>
  );
}
