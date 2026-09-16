export default function Home() {
  return (
    <main className="min-h-screen bg-sun-arc flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm tracking-wide text-inkSoft mb-3">
          Phase 1 — scaffold check
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-panelDeep">
          Solar Savings Calculator
        </h1>
        <p className="mt-4 text-inkSoft">
          If you can see this styled correctly — dark blue heading, warm gold
          glow behind it, two distinct fonts — the scaffold, Tailwind config,
          and fonts are all wired up correctly. The real calculator UI lands
          in Phase 2.
        </p>
      </div>
    </main>
  );
}