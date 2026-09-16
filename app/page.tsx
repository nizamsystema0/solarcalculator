"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import BillInput from "@/components/BillInput";
import ApplianceCalculator from "@/components/ApplianceCalculator";
import ResultsPanel from "@/components/ResultsPanel";
import { Appliance } from "@/lib/types";
import { calculateApplianceMonthlyKwh, estimateKwhFromBill, recommendSystem } from "@/lib/calculations";

export default function Home() {
  const [billValue, setBillValue] = useState("");
  const [kwhValue, setKwhValue] = useState("");
  const [appliances, setAppliances] = useState<Appliance[]>([]);

  const applianceKwh = useMemo(() => calculateApplianceMonthlyKwh(appliances), [appliances]);

  const bill = parseFloat(billValue) || 0;
  const kwhOverride = parseFloat(kwhValue) || 0;

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

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-sm tracking-wide text-green mb-2">Philippine solar estimator</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink max-w-2xl">
          See what solar could save you — before you talk to anyone.
        </h1>
        <p className="mt-3 text-inkSoft max-w-xl">
          Enter your electricity usage below for a rough, no-obligation estimate of system size,
          cost, and payback period.
        </p>

        <div className="mt-10">
          <BillInput
            billValue={billValue}
            onBillChange={setBillValue}
            kwhValue={kwhValue}
            onKwhChange={setKwhValue}
          />
          <ApplianceCalculator appliances={appliances} onChange={setAppliances} />
        </div>

        {recommendation && <ResultsPanel consumptionKwh={consumptionKwh} recommendation={recommendation} />}

        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}