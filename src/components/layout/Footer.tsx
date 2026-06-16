import { FUTURE_DOMAIN } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-navy-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-navy-500 sm:text-sm">
        <p>Powered by TOPMANIDMB Framework · Local prototype only</p>
        <p className="mt-1">
          Future domain reserved: <span className="font-mono text-navy-700">{FUTURE_DOMAIN}</span> (not deployed)
        </p>
      </div>
    </footer>
  );
}