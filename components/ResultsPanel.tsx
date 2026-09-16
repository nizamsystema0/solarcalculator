import {
  formatPhp,
  formatKwh,
  formatPayback,
  calculateMonthlyBill,
  RecommendationResult,
} from "@/lib/calculations";

interface Props {
  consumptionKwh: number;
  recommendation: RecommendationResult;
}

export default function ResultsPanel({ consumptionKwh, recommendation }: Props) {
  const { recommended, lowerAlternative, higherAlternative, all, recommendedIndex, coversFully, coveragePercent } =
    recommendation;
  const currentBillPhp = calculateMonthlyBill(consumptionKwh);

  return (
    <div className="mt-10">
      <div className="bg-greenDeep text-paper relative pl-5">
        <div className="p-6">
          <p className="text-sm text-paper/70 mb-1">Your current situation</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-paper/60">Estimated monthly bill</p>
              <p className="font-display text-2xl font-semibold">{formatPhp(currentBillPhp)}</p>
            </div>
            <div>
              <p className="text-xs text-paper/60">Estimated monthly consumption</p>
              <p className="font-display text-2xl font-semibold">{formatKwh(consumptionKwh)}</p>
            </div>
          </div>
        </div>
      </div>

      {!coversFully && (
        <div className="bg-earth/10 border-l-2 border-earth px-4 py-3 text-sm text-ink">
          Even our largest preset (12 kW) only covers about {Math.round(coveragePercent)}% of your
          estimated usage. You may need a larger custom installation or multiple systems —
          consult a solar installer for options beyond what this calculator estimates.
        </div>
      )}

      <div className="bg-white border border-line border-t-0 relative pl-5">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />
        <div className="p-6">
          <p className="text-sm font-medium text-gold mb-1">Recommended system</p>
          <h3 className="font-display text-2xl font-semibold text-ink mb-4">
            {recommended.sizeKw} kW Solar System
          </h3>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <Stat label="Estimated investment" value={formatPhp(recommended.costPhp)} />
            <Stat label="Estimated monthly production" value={formatKwh(recommended.monthlyProductionKwh)} />
            <Stat label="Estimated payback" value={formatPayback(recommended.paybackMonths)} />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 border-t border-line pt-6">
            <div>
              <p className="text-sm font-medium text-ink mb-2">Savings</p>
              <dl className="text-sm space-y-1">
                <Row label="Current monthly bill" value={formatPhp(currentBillPhp)} />
                <Row label="Estimated solar-era bill" value={formatPhp(recommended.newMonthlyBillPhp)} />
                <Row label="Estimated monthly savings" value={formatPhp(recommended.monthlySavingsPhp)} strong />
                <Row label="Estimated annual savings" value={formatPhp(recommended.annualSavingsPhp)} strong />
              </dl>
            </div>
            <div>
              <p className="text-sm font-medium text-ink mb-2">ROI</p>
              <p className="text-sm text-inkSoft">
                {formatPhp(recommended.costPhp)} system cost ÷ {formatPhp(recommended.monthlySavingsPhp)} saved per month
              </p>
              <div className="mt-2 inline-block border border-gold rounded px-4 py-2 bg-gold/10">
                <p className="font-display text-xl font-semibold text-ink">
                  {formatPayback(recommended.paybackMonths)} to break even
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
            {lowerAlternative && <AltCard label={`${lowerAlternative.sizeKw} kW`} note="Lower investment" />}
            <div className="border border-gold rounded px-3 py-2 text-center bg-gold/10">
              <p className="font-semibold text-ink">{recommended.sizeKw} kW</p>
              <p className="text-inkSoft">Recommended</p>
            </div>
            {higherAlternative && <AltCard label={`${higherAlternative.sizeKw} kW`} note="Higher savings potential" />}
          </div>
        </div>
      </div>

      <div className="bg-white border border-line border-t-0 relative pl-5">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green" />
        <div className="p-6">
          <h3 className="font-display text-lg font-semibold text-ink mb-4">Compare system sizes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-inkSoft border-b border-line">
                  <th className="py-2 pr-3 font-medium"> </th>
                  {all.map((r) => (
                    <th
                      key={r.sizeKw}
                      className={`py-2 px-3 font-medium text-center ${
                        r.sizeKw === recommended.sizeKw ? "text-gold" : ""
                      }`}
                    >
                      {r.sizeKw} kW
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <TableRow label="Estimated cost" values={all.map((r) => formatPhp(r.costPhp))} recIndex={recommendedIndex} />
                <TableRow label="Production/mo" values={all.map((r) => formatKwh(r.monthlyProductionKwh))} recIndex={recommendedIndex} />
                <TableRow label="Monthly savings" values={all.map((r) => formatPhp(r.monthlySavingsPhp))} recIndex={recommendedIndex} />
                <TableRow label="Annual savings" values={all.map((r) => formatPhp(r.annualSavingsPhp))} recIndex={recommendedIndex} />
                <TableRow label="Payback" values={all.map((r) => formatPayback(r.paybackMonths))} recIndex={recommendedIndex} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-inkSoft">{label}</p>
      <p className="font-display text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-inkSoft">{label}</dt>
      <dd className={strong ? "font-semibold text-ink" : "text-ink"}>{value}</dd>
    </div>
  );
}

function AltCard({ label, note }: { label: string; note: string }) {
  return (
    <div className="border border-line rounded px-3 py-2 text-center">
      <p className="font-semibold text-ink">{label}</p>
      <p className="text-inkSoft">{note}</p>
    </div>
  );
}

function TableRow({ label, values, recIndex }: { label: string; values: string[]; recIndex: number }) {
  return (
    <tr className="border-b border-line/60">
      <td className="py-2 pr-3 text-inkSoft">{label}</td>
      {values.map((v, i) => (
        <td key={i} className={`py-2 px-3 text-center ${i === recIndex ? "font-semibold text-ink bg-gold/10" : "text-ink"}`}>
          {v}
        </td>
      ))}
    </tr>
  );
}