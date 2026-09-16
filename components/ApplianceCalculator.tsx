import { useState } from "react";
import { Appliance } from "@/lib/types";
import { APPLIANCE_PRESETS } from "@/lib/applianceDefaults";
import { calculateApplianceMonthlyKwh, formatKwh } from "@/lib/calculations";

interface Props {
  appliances: Appliance[];
  onChange: (appliances: Appliance[]) => void;
}

export default function ApplianceCalculator({ appliances, onChange }: Props) {
  const [presetIndex, setPresetIndex] = useState(0);

  function addPreset() {
    const preset = APPLIANCE_PRESETS[presetIndex];
    const newItem: Appliance = {
      id: crypto.randomUUID(),
      name: preset.name,
      watts: preset.watts,
      qty: 1,
      hoursPerDay: preset.defaultHoursPerDay,
    };
    onChange([...appliances, newItem]);
  }

  function addCustom() {
    const newItem: Appliance = {
      id: crypto.randomUUID(),
      name: "Custom appliance",
      watts: 100,
      qty: 1,
      hoursPerDay: 1,
      custom: true,
    };
    onChange([...appliances, newItem]);
  }

  function updateItem(id: string, patch: Partial<Appliance>) {
    onChange(appliances.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }

  function removeItem(id: string) {
    onChange(appliances.filter((a) => a.id !== id));
  }

  const monthlyKwh = calculateApplianceMonthlyKwh(appliances);

  return (
    <div className="bg-white border border-line relative pl-5 mt-6">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green" />
      <div className="p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-1">Step 2 — Appliance calculator</h2>
        <p className="text-sm text-inkSoft mb-5">
          Optional, but more accurate than the bill alone. Add the appliances you use regularly.
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          <select
            value={presetIndex}
            onChange={(e) => setPresetIndex(Number(e.target.value))}
            className="border border-line rounded px-3 py-2 text-sm text-ink flex-1 min-w-[200px]"
          >
            {APPLIANCE_PRESETS.map((p, i) => (
              <option key={p.name} value={i}>
                {p.name} ({p.watts}W)
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addPreset}
            className="px-4 py-2 text-sm font-medium bg-green text-white rounded hover:bg-greenDeep transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={addCustom}
            className="px-4 py-2 text-sm font-medium border border-line rounded text-ink hover:bg-paperDim transition-colors"
          >
            Add custom
          </button>
        </div>

        {appliances.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-inkSoft border-b border-line">
                  <th className="py-2 pr-2 font-medium">Appliance</th>
                  <th className="py-2 px-2 font-medium w-16">Qty</th>
                  <th className="py-2 px-2 font-medium w-20">Watts</th>
                  <th className="py-2 px-2 font-medium w-20">Hrs/day</th>
                  <th className="py-2 pl-2 font-medium w-8" />
                </tr>
              </thead>
              <tbody>
                {appliances.map((a) => (
                  <tr key={a.id} className="border-b border-line/60">
                    <td className="py-2 pr-2">
                      {a.custom ? (
                        <input
                          value={a.name}
                          onChange={(e) => updateItem(a.id, { name: e.target.value })}
                          className="w-full border border-line rounded px-2 py-1"
                        />
                      ) : (
                        <span className="text-ink">{a.name}</span>
                      )}
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number"
                        min="0"
                        value={a.qty}
                        onChange={(e) => updateItem(a.id, { qty: Number(e.target.value) })}
                        className="w-16 border border-line rounded px-2 py-1"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number"
                        min="0"
                        value={a.watts}
                        onChange={(e) => updateItem(a.id, { watts: Number(e.target.value) })}
                        className="w-20 border border-line rounded px-2 py-1"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={a.hoursPerDay}
                        onChange={(e) => updateItem(a.id, { hoursPerDay: Number(e.target.value) })}
                        className="w-20 border border-line rounded px-2 py-1"
                      />
                    </td>
                    <td className="py-2 pl-2 text-right">
                      <button
                        type="button"
                        onClick={() => removeItem(a.id)}
                        aria-label={`Remove ${a.name}`}
                        className="text-inkSoft hover:text-earth"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-sm text-ink">
              Estimated appliance load: <strong>{formatKwh(monthlyKwh)}</strong> / month
            </p>
          </div>
        )}
      </div>
    </div>
  );
}