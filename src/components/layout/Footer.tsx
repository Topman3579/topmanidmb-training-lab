import { FUTURE_DOMAIN } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-navy-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-navy-500 sm:text-sm">
        <p>Powered by TOPMANIDMB Framework · Public training prototype · Mock data only</p>
        <p className="mt-1">
          Live at <a className="font-mono text-navy-700 underline-offset-2 hover:underline" href={`https://${FUTURE_DOMAIN}`}>{FUTURE_DOMAIN}</a>
        </p>
      </div>
    </footer>
  );
}
