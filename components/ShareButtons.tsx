"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  function getUrl() {
    return typeof window !== "undefined" ? window.location.href : "";
  }

  function handleCopy() {
    navigator.clipboard.writeText(getUrl());
    setCopied(true);
    track("share_clicked", { method: "copy" });
    setTimeout(() => setCopied(false), 2000);
  }

  function handleFacebook() {
    track("share_clicked", { method: "facebook" });
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
      "_blank"
    );
  }

  function handleX() {
    track("share_clicked", { method: "x" });
    const text = "Check your estimated solar savings with this free calculator for the Philippines:";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(getUrl())}`,
      "_blank"
    );
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <span className="text-sm text-inkSoft">Share this calculator:</span>
      <button
        type="button"
        onClick={handleCopy}
        className="text-sm px-3 py-1.5 border border-line rounded hover:bg-paperDim transition-colors"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
      <button
        type="button"
        onClick={handleFacebook}
        className="text-sm px-3 py-1.5 border border-line rounded hover:bg-paperDim transition-colors"
      >
        Facebook
      </button>
      <button
        type="button"
        onClick={handleX}
        className="text-sm px-3 py-1.5 border border-line rounded hover:bg-paperDim transition-colors"
      >
        X
      </button>
    </div>
  );
}