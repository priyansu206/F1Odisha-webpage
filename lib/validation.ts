import { z } from "zod";

/**
 * Shared validation schemas (docs/security.md §2.2, architecture.md §5).
 * Used for client-side validation today; the same schemas gate the API in
 * Phase B — never trust input without them.
 */

const name = z
  .string()
  .trim()
  .min(2, "Enter at least 2 characters")
  .max(60, "Keep it under 60 characters")
  .regex(/^[a-zA-Z][a-zA-Z' .-]*$/, "Letters only (spaces, hyphens, apostrophes OK)");

const dob = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date from the calendar")
  .refine((v) => {
    const d = new Date(`${v}T12:00:00`);
    return !Number.isNaN(d.getTime()) && d < new Date();
  }, "Date of birth must be in the past");

const favourite = z
  .string()
  .trim()
  .min(1, "This field is required")
  .max(60, "Keep it under 60 characters");

/** Fields shared by registration and badge re-generation. */
export const memberProfileSchema = z.object({
  firstName: name,
  lastName: name,
  dob,
  favouriteTeam: favourite,
  favouriteDriver: favourite,
});

/** Our generated Member IDs look like F1O-XXXXXX. */
export const memberIdSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^F1O-[A-Z0-9]{6}$/, "Format: F1O-XXXXXX (6 letters/numbers)");

/** Badge re-generation adds the Member ID lookup field. */
export const badgeRegenSchema = memberProfileSchema.extend({
  memberId: memberIdSchema,
});

export type MemberProfile = z.infer<typeof memberProfileSchema>;
export type BadgeRegenInput = z.infer<typeof badgeRegenSchema>;

/** Field-keyed error map for easy form display. */
export type ProfileErrors = Partial<Record<keyof MemberProfile, string>>;

/** Maps a zod issue path to the matching form field (or "" for form-level). */
export function toFieldErrors(
  issues: z.ZodIssue[]
): ProfileErrors {
  const errors: ProfileErrors = {};
  for (const issue of issues) {
    const key = issue.path[0] as keyof MemberProfile | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

/** Deterministic mock Member ID: F1O- followed by 6 uppercase alphanumerics. */
export function generateMemberId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const random = new Uint32Array(1);
  for (let i = 0; i < 6; i += 1) {
    crypto.getRandomValues(random);
    out += alphabet[random[0] % alphabet.length];
  }
  return `F1O-${out}`;
}
