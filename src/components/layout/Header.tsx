import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

const NAV = [
  { href: "/", label: "ห้องทดลอง" },
  { href: "/3d-evidence-room/", label: "3D Evidence Room" },
  { href: "/progress/", label: "ความคืบหน้า" },
  { href: "/about/", label: "เกี่ยวกับ" },
];

export function Header() {
  return (
    <header className="border-b border-navy-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="group">
          <p className="font-display text-lg font-bold text-navy-900 group-hover:text-brand-700">
            {APP_NAME}
          </p>
          <p className="text-xs text-navy-500">Investigation Training Simulator</p>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 sm:gap-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-navy-700 transition hover:bg-navy-50 hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}