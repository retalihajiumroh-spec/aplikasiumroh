import { Megaphone, MessageSquareText, Send, X } from "lucide-react";
import { CrmPanel, CrmPill } from "@/features/crm/components/crm-shell";

const segments = [
  "High intent leads",
  "Inactive 3+ days",
  "Ramadhan Family interest",
  "Alumni referral network"
];

export function BroadcastModal({
  open,
  onClose,
  selectedSegment,
  onSegmentChange
}: {
  open: boolean;
  onClose: () => void;
  selectedSegment: string;
  onSegmentChange: (segment: string) => void;
}) {
  if (!open) {
    return null;
  }

  const preview =
    selectedSegment === "High intent leads"
      ? "Assalamu'alaikum, kami lihat Bapak/Ibu tertarik dengan paket umroh premium. Seat Ramadhan sedang kami hold terbatas hari ini."
      : selectedSegment === "Inactive 3+ days"
        ? "Assalamu'alaikum, apakah kami bantu carikan jadwal umroh yang lebih cocok? Tim kami siap bantu sampai dokumen lengkap."
        : selectedSegment === "Ramadhan Family interest"
          ? "Paket Ramadhan Family tersedia dengan pendamping keluarga dan hotel dekat Masjid. Mau kami kirim itinerary lengkapnya?"
          : "Terima kasih sudah menjadi bagian dari alumni Retali. Ada benefit referral keluarga untuk keberangkatan Syawal.";

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/80 px-4 backdrop-blur-xl">
      <CrmPanel className="w-full max-w-2xl overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-300/10 p-3 text-emerald-200">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-black text-white">WhatsApp Broadcast</p>
              <p className="text-sm text-slate-400">Segmented outreach with AI preview</p>
            </div>
          </div>
          <button
            aria-label="Close broadcast modal"
            className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:text-white"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="mb-3 text-sm font-bold text-white">Choose segment</p>
            <div className="grid gap-2">
              {segments.map((segment) => (
                <button
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                    selectedSegment === segment
                      ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-100"
                      : "border-white/10 bg-slate-950/45 text-slate-300 hover:border-white/20"
                  }`}
                  key={segment}
                  onClick={() => onSegmentChange(segment)}
                  type="button"
                >
                  {segment}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MessageSquareText className="h-4 w-4 text-emerald-200" />
                <p className="text-sm font-black text-white">Preview message</p>
              </div>
              <CrmPill>{selectedSegment}</CrmPill>
            </div>
            <div className="rounded-3xl bg-emerald-950/55 p-4 text-sm leading-7 text-emerald-50">
              {preview}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-2xl bg-white/[0.04] p-3">
                <p className="font-black text-white">248</p>
                <p className="mt-1 text-slate-500">Recipients</p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-3">
                <p className="font-black text-white">63%</p>
                <p className="mt-1 text-slate-500">Open est.</p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-3">
                <p className="font-black text-white">18%</p>
                <p className="mt-1 text-slate-500">Reply est.</p>
              </div>
            </div>
            <button
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              type="button"
            >
              <Send className="h-4 w-4" />
              Queue broadcast
            </button>
          </div>
        </div>
      </CrmPanel>
    </div>
  );
}
