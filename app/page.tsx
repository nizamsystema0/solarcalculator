"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import BillInput from "@/components/BillInput";
import ApplianceCalculator from "@/components/ApplianceCalculator";
import ResultsPanel from "@/components/ResultsPanel";
import ShareButtons from "@/components/ShareButtons";
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
  const startedRef = useRef(false);
  const completedRef = useRef(false);

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

  useEffect(() => {
    if (!startedRef.current && (bill > 0 || kwhOverride > 0 || appliances.length > 0)) {
      startedRef.current = true;
      track("calculator_started");
    }
  }, [bill, kwhOverride, appliances.length]);

  useEffect(() => {
    if (!completedRef.current && recommendation) {
      completedRef.current = true;
      track("calculator_completed");
    }
  }, [recommendation]);

  const showMismatchWarning =
    appliances.length > 0 &&
    billImpliedKwh > 0 &&
    Math.abs(applianceKwh - billImpliedKwh) / billImpliedKwh > 0.25;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="relative w-full flex-1">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(/images/hero-bg.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.4,
          }}
        />
        <main className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-sm tracking-wide text-green mb-2">Philippine solar estimator</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink max-w-2xl">
            Solar Savings Calculator for the Philippines
          </h1>
          <p className="mt-3 text-inkSoft max-w-xl">
            Estimate what a solar system could cost and how much you could potentially save based
            on your electricity bill.
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

          {recommendation && (
            <>
              <ResultsPanel consumptionKwh={consumptionKwh} recommendation={recommendation} />
              <ShareButtons />
            </>
          )}

          <Disclaimer />
        </main>
      </div>
      <Footer />
      </div>
    
  );
}