interface Props {
  billValue: string;
  onBillChange: (value: string) => void;
  kwhValue: string;
  onKwhChange: (value: string) => void;
}

export default function BillInput({ billValue, onBillChange, kwhValue, onKwhChange }: Props) {
  return (
    <div className="bg-white border border-line relative pl-5">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green" />
      <div className="p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-1">Step 1 — Electricity usage</h2>
        <p className="text-sm text-inkSoft mb-5">
          Enter your average monthly bill, or your monthly kWh if you know it.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-ink">Average monthly bill (₱)</span>
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={billValue}
              onChange={(e) => onBillChange(e.target.value)}
              placeholder="e.g. 8000"
              className="mt-1 w-full border border-line rounded px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-green/40"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Average monthly kWh (optional)</span>
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={kwhValue}
              onChange={(e) => onKwhChange(e.target.value)}
              placeholder="if you know it"
              className="mt-1 w-full border border-line rounded px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-green/40"
            />
          </label>
        </div>
      </div>
    </div>
  );
}