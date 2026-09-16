export default function Disclaimer() {
  return (
    <div className="max-w-5xl mx-auto px-6 mt-12">
      <div className="border-l-2 border-earth pl-4 text-sm text-inkSoft space-y-2">
        <p>
          <strong className="text-ink">Estimates only.</strong> Results are based on the
          information you provide and typical assumptions for solar production, electricity
          rates, and system costs. Actual savings, production, installation costs, and payback
          periods vary based on location, equipment, installation quality, usage patterns,
          weather, and utility rates.
        </p>
        <p>
          This calculator is a free tool built by Nizam Systema, a Philippine software and
          systems development company. Nizam Systema does not sell, supply, or install solar
          equipment — this tool is for independent estimation purposes only. For actual quotes
          and installation, consult a licensed solar provider.
        </p>
      </div>
    </div>
  );
}