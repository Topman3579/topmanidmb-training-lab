"use client";

import Link from "next/link";
import { useState } from "react";
import { APP_NAME } from "@/lib/constants";

const NAV = [
  { href: "/", label: "ห้องทดลอง" },
  { href: "/academy/", label: "AI Academy" },
  { href: "/prompt-engineering/", label: "Prompt" },
  { href: "/ai-video/", label: "AI Video" },
  { href: "/3d-evidence-room/", label: "3D Evidence Room" },
  { href: "/progress/", label: "ความคืบหน้า" },
  { href: "/about/", label: "เกี่ยวกับ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/10 bg-ivory/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-icon.svg" alt="TOPMANIDMB" className="h-9 w-9 shrink-0 rounded-lg shadow-card" />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-navy-900 transition group-hover:text-gold-600">
              {APP_NAME}
            </span>
            <span className="block text-xs tracking-wide text-navy-500">Investigation Training Simulator</span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-navy-700 transition hover:bg-ivory-200 hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* mobile: hamburger (phone-native, not a shrunk desktop nav) */}
        <button
          type="button"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy-900/15 text-navy-800 transition hover:border-gold md:hidden"
        >
          <span className="relative block h-4 w-5" aria-hidden>
            <span
              className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-200 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-current transition-all duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-200 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <nav id="mobile-nav" className="border-t border-navy-900/10 bg-ivory px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 transition hover:bg-ivory-200 hover:text-navy-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
