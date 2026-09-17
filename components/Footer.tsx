import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-greenDeep text-paper">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-paper/70">Developed and powered by</p>
          <p className="font-display text-lg font-semibold">Nizam Systema</p>
          <p className="text-sm text-paper/70">Systems • Software • Innovation</p>
        </div>
        <Link
          href="/contact"
          className="inline-block text-sm font-medium border border-paper/30 rounded px-4 py-2 hover:bg-paper/10 transition-colors w-fit"
        >
          Want something built for your business? →
        </Link>
      </div>
    </footer>
  );
}