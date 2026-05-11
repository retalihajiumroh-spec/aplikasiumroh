import { Bot, ChevronRight } from "lucide-react";
import { crmSuggestions } from "@/data/crm-dashboard";
import { CrmPanel, CrmSectionHeader } from "@/features/crm/components/crm-shell";

const priorityStyles = {
  Critical: "bg-rose-300/10 text-rose-200 border-rose-300/20",
  High: "bg-amber-300/10 text-amber-200 border-amber-300/20",
  Medium: "bg-sky-300/10 text-sky-200 border-sky-300/20"
};

export function AiSuggestionsPanel() {
  return (
    <CrmPanel className="p-5">
      <CrmSectionHeader eyebrow="AI Suggestions" title="Autonomous next moves" />
      <div className="grid gap-3">
        {crmSuggestions.map((suggestion) => (
          <button
            className="group rounded-3xl border border-white/10 bg-slate-950/45 p-4 text-left transition hover:border-emerald-300/30 hover:bg-emerald-300/10"
            key={suggestion.title}
            type="button"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-emerald-300/10 p-3 text-emerald-200">
                <Bot className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-black text-white">{suggestion.title}</p>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-black ${priorityStyles[suggestion.priority]}`}>
                    {suggestion.priority}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{suggestion.detail}</p>
                <p className="mt-2 text-xs font-bold text-emerald-200">{suggestion.leadName}</p>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-emerald-200" />
            </div>
          </button>
        ))}
      </div>
    </CrmPanel>
  );
}
