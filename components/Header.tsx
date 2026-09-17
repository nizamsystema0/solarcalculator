"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [iconError, setIconError] = useState(false);

  return (
    <header className="border-b border-line bg-white">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {!iconError ? (
            // Future icon: place a file at public/images/icon.png (any size — it will be
            // scaled to 60x60). If the file doesn't exist or fails to load, this
            // automatically falls back to the hand-drawn sun icon below.
            <Image
              src="/images/icon.png"
              alt=""
              width={60}
              height={60}
              className="h-[60px] w-[60px] shrink-0 object-contain"
              onError={() => setIconError(true)}
            />
          ) : (
            <svg className="h-[60px] w-[60px] shrink-0" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 3v4M14 21v4M3 14h4M21 14h4M6.2 6.2l2.8 2.8M19 19l2.8 2.8M6.2 21.8L9 19M19 9l2.8-2.8" stroke="#D9A441" strokeWidth="1.6" strokeLinecap="round"/>
              <circle cx="14" cy="14" r="5" stroke="#1F6E4A" strokeWidth="1.6"/>
            </svg>
          )}
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl sm:text-2xl font-semibold text-ink">Solar Savings Calculator</span>
            <span className="font-display text-sm sm:text-base font-medium text-inkSoft">Philippines</span>
          </span>
        </Link>
        <Link href="/contact" className="flex items-center gap-2 group h-10">
          <span className="text-sm text-inkSoft group-hover:text-green transition-colors">a free tool by</span>
          <Image src="/images/logo.png" alt="Nizam Systema" width={180} height={40} className="h-10 w-auto" />
        </Link>
      </div>
    </header>
  );
}