"use client";

import { useMemo, useState } from "react";
import { Bot, Filter, Megaphone, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import {
  crmFilterOptions,
  crmLeads,
  pipelineStages,
  type Lead,
  type LeadScoreLevel,
  type PipelineStage
} from "@/data/crm-dashboard";
import { AiSuggestionsPanel } from "@/features/crm/components/ai-suggestions-panel";
import { ActivityTimeline } from "@/features/crm/components/activity-timeline";
import { BroadcastModal } from "@/features/crm/components/broadcast-modal";
import { CrmPanel, CrmPill, CrmSectionHeader } from "@/features/crm/components/crm-shell";
import { LeadCard } from "@/features/crm/components/lead-card";
import { LeadDetailPanel } from "@/features/crm/components/lead-detail-panel";

type Filters = {
  query: string;
  branch: string;
  score: string;
  source: string;
  packageInterest: string;
  admin: string;
};

const initialFilters: Filters = {
  query: "",
  branch: "All",
  score: "All",
  source: "All",
  packageInterest: "All",
  admin: "All"
};

const stageCopy: Record<PipelineStage, string> = {
  New: "Fresh demand",
  Contacted: "WA / call opened",
  Interested: "Proposal active",
  Booking: "Seat locked",
  Paid: "Revenue secured"
};

export function CrmDashboard() {
  const [selectedLead, setSelectedLead] = useState<Lead>(crmLeads[0]);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [broadcastSegment, setBroadcastSegment] = useState("High intent leads");

  const filteredLeads = useMemo(() => {
    return crmLeads.filter((lead) => {
      const query = filters.query.toLowerCase();
      const matchesQuery =
        !query ||
        lead.name.toLowerCase().includes(query) ||
        lead.profile.toLowerCase().includes(query) ||
        lead.phone.toLowerCase().includes(query);

      return (
        matchesQuery &&
        (filters.branch === "All" || lead.branch === filters.branch) &&
        (filters.score === "All" || lead.scoreLevel === (filters.score as LeadScoreLevel)) &&
        (filters.source === "All" || lead.source === filters.source) &&
        (filters.packageInterest === "All" || lead.packageInterest === filters.packageInterest) &&
        (filters.admin === "All" || lead.assignedAdmin === filters.admin)
      );
    });
  }, [filters]);

  const totalValue = filteredLeads.reduce((total, lead) => {
    const numericValue = Number(lead.value.replace(/[^\d]/g, ""));
    return total + numericValue;
  }, 0);

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[150px]" />
        <div className="absolute right-[-14rem] top-60 h-[34rem] w-[34rem] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute bottom-0 left-[-12rem] h-[34rem] w-[34rem] rounded-full bg-lime-300/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <section className="relative mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="owner-animate-in rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-emerald-950/30 backdrop-blur-2xl md:p-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex flex-wrap gap-3">
                <CrmPill>
                  <Bot className="mr-2 h-3.5 w-3.5" />
                  SA&apos;YA AI CRM
                </CrmPill>
                <CrmPill className="border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  Live lead intelligence
                </CrmPill>
              </div>
              <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-[-0.04em] text-white md:text-6xl xl:text-7xl">
                Convert every Umroh inquiry with an AI-powered CRM pipeline.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                Full funnel operating system untuk owner dan sales admin: skor niat beli, follow-up intelligence, broadcast segment, dan detail lead dalam satu layar premium.
              </p>
            </div>

            <div className="grid min-w-[280px] gap-3 rounded-3xl border border-white/10 bg-slate-950/55 p-4 sm:grid-cols-3 xl:min-w-[460px]">
              <Metric label="Visible leads" value={String(filteredLeads.length)} />
              <Metric label="Pipeline value" value={`Rp ${(totalValue / 1_000_000).toFixed(1)}M`} />
              <Metric label="High intent" value={String(filteredLeads.filter((lead) => lead.scoreLevel === "high intent").length)} />
            </div>
          </div>
        </div>

        <CrmPanel className="mt-6 p-5">
          <div className="mb-4 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-300/10 p-3 text-emerald-200">
                <SlidersHorizontal className="h-5 w-5" />
              </div>
              <div>
                <p className="font-black text-white">Search & Filter</p>
                <p className="text-sm text-slate-500">Filter by branch, score, source, package, or admin.</p>
              </div>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              onClick={() => setBroadcastOpen(true)}
              type="button"
            >
              <Megaphone className="h-4 w-4" />
              Broadcast WhatsApp
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.25fr_repeat(5,0.75fr)]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/55 px-11 text-sm font-medium text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300/40"
                onChange={(event) => updateFilter("query", event.target.value)}
                placeholder="Search name, profile, phone..."
                value={filters.query}
              />
            </label>
            <FilterSelect label="Branch" onChange={(value) => updateFilter("branch", value)} options={crmFilterOptions.branches} value={filters.branch} />
            <FilterSelect label="Score" onChange={(value) => updateFilter("score", value)} options={crmFilterOptions.scores} value={filters.score} />
            <FilterSelect label="Source" onChange={(value) => updateFilter("source", value)} options={crmFilterOptions.sources} value={filters.source} />
            <FilterSelect label="Package" onChange={(value) => updateFilter("packageInterest", value)} options={crmFilterOptions.packages} value={filters.packageInterest} />
            <FilterSelect label="Admin" onChange={(value) => updateFilter("admin", value)} options={crmFilterOptions.admins} value={filters.admin} />
          </div>
        </CrmPanel>

        <section className="mt-6 grid gap-6 2xl:grid-cols-[1fr_420px]">
          <div>
            <CrmSectionHeader
              eyebrow="Full Kanban Pipeline"
              title="Lead movement from new inquiry to paid jamaah"
              description="Klik lead untuk membuka detail panel, rekomendasi AI, suggested replies, dan history interaksi."
              action={<CrmPill><Filter className="mr-2 h-3.5 w-3.5" /> {filteredLeads.length} filtered leads</CrmPill>}
            />
            <div className="grid gap-4 xl:grid-cols-5">
              {pipelineStages.map((stage, stageIndex) => {
                const stageLeads = filteredLeads.filter((lead) => lead.stage === stage);

                return (
                  <div
                    className="owner-animate-in rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl"
                    key={stage}
                    style={{ animationDelay: `${stageIndex * 70}ms` }}
                  >
                    <div className="mb-4 flex items-start justify-between gap-3 rounded-3xl bg-slate-950/55 p-4">
                      <div>
                        <p className="text-sm font-black text-white">{stage}</p>
                        <p className="mt-1 text-xs text-slate-500">{stageCopy[stage]}</p>
                      </div>
                      <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">
                        {stageLeads.length}
                      </span>
                    </div>
                    <div className="grid gap-3">
                      {stageLeads.map((lead) => (
                        <LeadCard
                          key={lead.id}
                          lead={lead}
                          onSelect={setSelectedLead}
                          selected={selectedLead.id === lead.id}
                        />
                      ))}
                      {stageLeads.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-white/10 p-6 text-center text-sm text-slate-500">
                          No lead matches current filters.
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5">
            <LeadDetailPanel lead={selectedLead} />
            <AiSuggestionsPanel />
            <ActivityTimeline />
          </div>
        </section>
      </section>

      <BroadcastModal
        onClose={() => setBroadcastOpen(false)}
        onSegmentChange={setBroadcastSegment}
        open={broadcastOpen}
        selectedSegment={broadcastSegment}
      />
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] p-3">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-black text-white">{value}</p>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/55 px-4 pr-9 text-sm font-bold text-white outline-none transition focus:border-emerald-300/40"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {label}: {option}
          </option>
        ))}
      </select>
    </label>
  );
}
