import { TRAINING_BANNER } from "@/data/disclaimers";

export function SafetyBanner() {
  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-900 sm:text-sm">
      ⚠️ {TRAINING_BANNER}
    </div>
  );
}