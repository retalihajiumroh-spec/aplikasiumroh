import { crmPipeline } from "@/data/owner-dashboard";
import { OwnerPanel, SectionHeader } from "@/features/owner-dashboard/components/owner-panel";

export function CrmPipelinePreview() {
  return (
    <OwnerPanel className="lg:col-span-12">
      <SectionHeader
        eyebrow="CRM Pipeline Preview"
        title="Lead flow from intent to paid"
        description="Pipeline snapshot untuk memantau bottleneck closing dan nilai booking per tahap."
      />
      <div className="grid gap-4 xl:grid-cols-5">
        {crmPipeline.map((stage, index) => (
          <div
            className="owner-animate-in rounded-3xl border border-white/10 bg-slate-950/45 p-4"
            key={stage.stage}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className={`h-1.5 rounded-full bg-gradient-to-r ${stage.accent}`} />
            <div className="mt-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-white">{stage.stage}</p>
                <p className="mt-1 text-xs text-slate-500">{stage.value} weighted</p>
              </div>
              <span className="rounded-2xl bg-white/10 px-3 py-1 text-sm font-black text-emerald-200">
                {stage.count}
              </span>
            </div>
            <div className="mt-5 grid gap-2">
              {stage.leads.map((lead) => (
                <div
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300"
                  key={lead}
                >
                  {lead}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </OwnerPanel>
  );
}
