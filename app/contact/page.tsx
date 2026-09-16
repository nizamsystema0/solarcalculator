import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">
          Want something built for your business?
        </h1>
        <p className="text-inkSoft mb-8">
          This calculator was built by Nizam Systema — a Philippine systems and software
          development company. If you have a process, tool, or system idea of your own, we'd be
          glad to talk it through.
        </p>
        <Link
          href="https://homewebpage-six.vercel.app/contact"
          className="inline-block bg-green text-white px-6 py-3 rounded font-medium hover:bg-greenDeep transition-colors"
        >
          Get in touch with Nizam Systema →
        </Link>
      </main>
      <Footer />
    </>
  );
}