import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Domain layer must stay framework-independent.
  // Everything under src/server/ is plain TypeScript + Drizzle, so it can be
  // lifted into a separate backend later without a rewrite.
  // The only exception is actions.ts, the adapter that binds it to Next.js.
  {
    files: ["src/server/**/*.ts"],
    ignores: ["src/server/**/actions.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["next", "next/*", "server-only", "react", "react-dom"],
              message:
                "The domain layer must not depend on Next.js or React. Move framework glue into src/server/**/actions.ts.",
            },
            {
              group: ["@/lib/auth", "@/lib/auth/*"],
              message:
                "Do not read the session inside the domain layer. Resolve the user in actions.ts and pass userId as an argument.",
            },
            {
              group: ["@/features/*", "@/components/*", "@/app/*"],
              message:
                "The domain layer must not import UI. Dependencies point from UI to src/server/, never the other way.",
            },
          ],
        },
      ],
    },
  },
  // UI must not talk to the database directly.
  {
    files: ["src/app/**/*.{ts,tsx}", "src/features/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/lib/db", "@/lib/db/*", "drizzle-orm", "drizzle-orm/*"],
              message:
                "Database access belongs in src/server/. Call a query or an action instead.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
