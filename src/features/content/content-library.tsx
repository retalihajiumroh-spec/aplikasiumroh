import { BookOpen, FileText } from "lucide-react";
import { contentLibrary } from "@/data/articles";
import { Card } from "@/components/ui/card";

export function ContentLibrary() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {contentLibrary.map((item) => {
        const Icon = item.category === "Ebook" ? BookOpen : FileText;

        return (
          <Card key={item.id}>
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <Icon className="h-3.5 w-3.5" />
                {item.category}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {item.access}
              </span>
            </div>
            <h3 className="mt-6 text-xl font-bold text-slate-950 dark:text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
            <p className="mt-6 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {item.readTime} baca
            </p>
          </Card>
        );
      })}
    </div>
  );
}
