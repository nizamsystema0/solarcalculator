"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import BillInput from "@/components/BillInput";
import ApplianceCalculator from "@/components/ApplianceCalculator";
import ResultsPanel from "@/components/ResultsPanel";
import { Appliance } from "@/lib/types";
import {
  calculateApplianceMonthlyKwh,
  estimateKwhFromBill,
  recommendSystem,
  formatKwh,
} from "@/lib/calculations";

export default function Home() {
  const [billValue, setBillValue] = useState("");
  const [kwhValue, setKwhValue] = useState("");
  const [appliances, setAppliances] = useState<Appliance[]>([]);

  const applianceKwh = useMemo(() => calculateApplianceMonthlyKwh(appliances), [appliances]);

  const bill = parseFloat(billValue) || 0;
  const kwhOverride = parseFloat(kwhValue) || 0;

  const billImpliedKwh = useMemo(() => (bill > 0 ? estimateKwhFromBill(bill) : 0), [bill]);

  const consumptionKwh = useMemo(() => {
    if (appliances.length > 0) return applianceKwh;
    if (kwhOverride > 0) return kwhOverride;
    if (bill > 0) return estimateKwhFromBill(bill);
    return 0;
  }, [appliances.length, applianceKwh, kwhOverride, bill]);

  const recommendation = useMemo(
    () => (consumptionKwh > 0 ? recommendSystem(consumptionKwh) : null),
    [consumptionKwh]
  );

  const showMismatchWarning =
    appliances.length > 0 &&
    billImpliedKwh > 0 &&
    Math.abs(applianceKwh - billImpliedKwh) / billImpliedKwh > 0.25;

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-sm tracking-wide text-green mb-2">Philippine solar estimator</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink max-w-2xl">
          Estimate your solar savings — no sales call needed.
        </h1>
        <p className="mt-3 text-inkSoft max-w-xl">
          Enter your electricity usage below for a rough, no-obligation estimate of system size,
          cost, and payback period.
        </p>

        <details className="mt-8 border border-line rounded bg-white/60 px-4 py-3 text-sm">
          <summary className="cursor-pointer font-medium text-ink">How we calculate this</summary>
          <div className="mt-3 text-inkSoft space-y-2">
            <p>
              Electricity cost uses a simplified rate table based on typical Philippine utility
              billing, which increases in steps as your monthly usage goes up. Solar production
              assumes an average of 3.8 kWh of usable output per kW of system size, per day —
              already accounting for real-world losses, not just raw sunlight hours.
            </p>
            <p>
              We don&apos;t factor in net metering or excess-energy credits, so any production beyond
              what you actually use isn&apos;t counted as savings — this keeps the estimate on the
              conservative side.
            </p>
          </div>
        </details>

        <div className="mt-10">
          <BillInput
            billValue={billValue}
            onBillChange={setBillValue}
            kwhValue={kwhValue}
            onKwhChange={setKwhValue}
          />
          <ApplianceCalculator appliances={appliances} onChange={setAppliances} />
        </div>

        {showMismatchWarning && (
          <div className="mt-4 bg-earth/10 border-l-2 border-earth px-4 py-3 text-sm text-ink">
            Your appliance list estimates about {formatKwh(applianceKwh)} per month, but your
            bill suggests closer to {formatKwh(billImpliedKwh)}. This is normal if your
            appliance list isn&apos;t complete — we&apos;re using the appliance-based estimate below
            since it&apos;s usually more accurate. Add any missing appliances for a closer match.
          </div>
        )}

        {recommendation && <ResultsPanel consumptionKwh={consumptionKwh} recommendation={recommendation} />}

        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}