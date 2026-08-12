import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  // Preserve the pre-Next-16 lint baseline; remediate these lifecycle paths
  // separately instead of mixing behavior changes into the security upgrade.
  { rules: { "react-hooks/set-state-in-effect": "off" } },
  globalIgnores([".next/**", "out/**", "next-env.d.ts"]),
]);
