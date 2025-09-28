"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Bell, User, Plus, Grid } from "lucide-react"
import { useProjects } from "@/hooks/use-projects"
import { useMemo } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const { projects, remove } = useProjects()
  const hasProjects = projects.length > 0
  const kpis = useMemo(
    () => [
      { label: "Total Websites", value: String(projects.length) },
      { label: "Total Views", value: "0" },
      { label: "Total Clicks", value: "0" },
      { label: "Avg. Conversion", value: "0%" },
      { label: "Bounce Rate", value: "0%" },
    ],
    [projects.length],
  )
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-black/10" aria-hidden />
            <span className="text-sm font-semibold">SiteBuilder</span>
          </div>
          <div className="flex-1">
            <div className="relative">
              <Input placeholder="Search projects…" className="h-10 rounded-lg bg-black/5 pl-10 text-sm" />
              <Grid className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black/40" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-9 rounded-lg bg-transparent" onClick={() => router.push("/")}>
              Browse Templates
            </Button>
            <Button className="h-9 rounded-lg bg-black text-white hover:opacity-90" onClick={() => router.push("/")}>
              <Plus className="mr-2 size-4" /> New Website
            </Button>
            <Bell className="ml-2 size-5 text-black/50" />
            <div className="ml-2 flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5 text-sm">
              <User className="size-4" />
              <span>Local User</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl font-semibold">Welcome back!</h1>
        <p className="mt-1 text-sm text-black/60">Here's what's happening with your websites today.</p>

        {/* KPI cards */}
        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-5">
          {kpis.map((k, i) => (
            <div key={i} className="rounded-xl border bg-white p-4">
              <p className="text-xs text-black/60">{k.label}</p>
              <p className="mt-2 text-xl font-semibold">{k.value}</p>
            </div>
          ))}
        </section>

        {/* Quick actions and month summary */}
        <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: "Portfolio Template", desc: "Professional portfolio website", action: () => router.push("/") },
              { title: "Blank Canvas", desc: "Build with the editor", action: () => router.push("/") },
              { title: "Import Design", desc: "Upload your existing design", action: () => {} },
              { title: "View Templates", desc: "Browse all templates", action: () => router.push("/") },
            ].map((qa, i) => (
              <button
                key={i}
                onClick={qa.action}
                className="rounded-xl border bg-white p-4 text-left transition hover:bg-black/5"
              >
                <p className="text-sm font-semibold">{qa.title}</p>
                <p className="mt-1 text-xs text-black/60">{qa.desc}</p>
              </button>
            ))}
          </div>
          <div className="rounded-xl border bg-white p-4">
            <p className="text-sm font-semibold">This Month</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              {[
                { k: "Websites Created", v: "0" },
                { k: "Total Visitors", v: "0" },
                { k: "Conversion Rate", v: "0%" },
                { k: "Leads Generated", v: "0" },
              ].map((m, i) => (
                <div key={i} className="rounded-lg bg-black/5 p-3">
                  <p className="text-black/60">{m.k}</p>
                  <p className="mt-1 font-semibold">{m.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">My Projects</p>
              <Tabs defaultValue="all">
                <TabsList className="rounded-full bg-black/5 p-1">
                  {["all"].map((t) => (
                    <TabsTrigger key={t} value={t} className="rounded-full px-3 py-1.5 text-xs">
                      {t[0].toUpperCase() + t.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {!hasProjects && (
                <div className="col-span-full rounded-xl border bg-white p-6 text-center text-sm text-black/60">
                  No projects yet. Create one from “Browse Templates”.
                </div>
              )}
              {projects.map((p) => (
                <div key={p.id} className="rounded-xl border bg-white p-4">
                  <div className="h-40 rounded-lg bg-black/5" />
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="mt-1 text-xs text-black/60">
                        {p.template} • {new Date(p.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="rounded-lg bg-transparent" onClick={() => router.push("/")}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-lg bg-transparent"
                        onClick={() => remove(p.id)}
                        aria-label={`Delete ${p.name}`}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Button variant="outline" className="rounded-lg bg-transparent" onClick={() => router.push("/")}>
                View All Templates
              </Button>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-4">
            <div className="rounded-xl bg-gradient-to-br from-fuchsia-500 to-rose-500 p-4 text-white">
              <p className="text-sm font-semibold">Upgrade to Pro</p>
              <ul className="mt-3 space-y-1 text-xs">
                <li>• Unlimited websites</li>
                <li>• AI content generation</li>
                <li>• Advanced analytics</li>
                <li>• Priority support</li>
              </ul>
              <Button className="mt-4 h-9 w-full rounded-lg bg-white text-black hover:opacity-90">Upgrade Now</Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
