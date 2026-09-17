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

  const iconButtonClass =
    "h-9 w-9 flex items-center justify-center border border-line rounded hover:bg-paperDim transition-colors text-ink";

  return (
    <div className="mt-6 flex items-center gap-2">
      <span className="text-sm text-inkSoft mr-1">Share this calculator:</span>

      <button
        type="button"
        onClick={handleCopy}
        title={copied ? "Copied!" : "Copy link"}
        aria-label={copied ? "Copied!" : "Copy link"}
        className={iconButtonClass}
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07l-1.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.5-1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <button
        type="button"
        onClick={handleFacebook}
        title="Share to Facebook"
        aria-label="Share to Facebook"
        className={iconButtonClass}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.35c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9V10.5H8v3h2.42V21h3.08z"/>
        </svg>
      </button>

      <button
        type="button"
        onClick={handleX}
        title="Share to X"
        aria-label="Share to X"
        className={iconButtonClass}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.9 3H21.7L15.6 10.1L22.8 21H17.2L12.8 14.7L7.7 21H4.9L11.4 13.4L4.5 3H10.2L14.2 8.8L18.9 3ZM17.9 19.3H19.5L9.5 4.6H7.8L17.9 19.3Z"/>
        </svg>
      </button>
    </div>
  );
}