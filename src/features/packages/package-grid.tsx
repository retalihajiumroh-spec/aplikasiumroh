import { CalendarDays, MapPin, Sparkles } from "lucide-react";
import { umrohPackages } from "@/data/packages";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function PackageGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {umrohPackages.map((item) => (
        <Card className="relative overflow-hidden" key={item.id}>
          <div className="absolute right-6 top-6 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            {item.badge}
          </div>
          <Sparkles className="h-8 w-8 text-emerald-500" />
          <h3 className="mt-6 text-2xl font-bold text-slate-950 dark:text-white">{item.name}</h3>
          <p className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
            {formatCurrency(item.price)}
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-emerald-500" />
              {item.duration}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-500" />
              {item.departure}
            </span>
          </div>
          <ul className="mt-6 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            {item.highlights.map((highlight) => (
              <li className="flex items-center gap-2" key={highlight}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {highlight}
              </li>
            ))}
          </ul>
          <LinkButton className="mt-8 w-full" href="/login">
            Konsultasi Paket
          </LinkButton>
        </Card>
      ))}
    </div>
  );
}
