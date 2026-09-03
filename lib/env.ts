import { z } from "zod";

/**
 * Server-side env schema (docs/architecture.md §5.2, security.md §2).
 * Validated once at first import — missing secrets fail fast instead of
 * silently producing empty strings in queries.
 */
const serverSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  BADGE_SIGNING_SECRET: z.string().min(32),
});

const parsed = serverSchema.safeParse(process.env);

if (!parsed.success) {
  const missing = parsed.error.issues
    .map((i) => i.path.join("."))
    .join(", ");
  // Throwing at module load surfaces the gap immediately in dev/build.
  throw new Error(
    `Invalid environment. Missing or invalid: ${missing}. Copy .env.example → .env.local and fill in the Supabase keys.`
  );
}

export const env = parsed.data;
