"use client";

import { useState } from "react";

import { BadgePreview } from "@/components/membership/BadgePreview";
import { Button } from "@/components/ui/Button";
import {
  FAVOURITE_DRIVERS,
  FAVOURITE_TEAMS,
} from "@/lib/data/membership";
import {
  badgeRegenSchema,
  toFieldErrors,
  type BadgeRegenInput,
} from "@/lib/validation";

const EMPTY: BadgeRegenInput = {
  memberId: "",
  firstName: "",
  lastName: "",
  dob: "",
  favouriteTeam: "",
  favouriteDriver: "",
};

type RegenErrors = Partial<Record<keyof BadgeRegenInput, string>>;

const FIELDS: Array<{
  key: keyof BadgeRegenInput;
  label: string;
  type?: string;
  list?: string;
  placeholder?: string;
}> = [
  { key: "memberId", label: "Member ID *", placeholder: "F1O-XXXXXX" },
  { key: "firstName", label: "First Name *" },
  { key: "lastName", label: "Last Name *" },
  { key: "dob", label: "Date of Birth *", type: "date" },
  { key: "favouriteTeam", label: "Favourite Team *", list: "regen-teams" },
  { key: "favouriteDriver", label: "Favourite Driver *", list: "regen-drivers" },
];

/** Lookup is simulated; Phase B verifies against the member database. */
export function BadgeRegenForm() {
  const [values, setValues] = useState<BadgeRegenInput>(EMPTY);
  const [errors, setErrors] = useState<RegenErrors>({});
  const [reissued, setReissued] = useState(false);

  const setField = (key: keyof BadgeRegenInput, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = badgeRegenSchema.safeParse(values);
    if (!result.success) {
      setErrors(toFieldErrors(result.error.issues));
      return;
    }
    setErrors({});
    setReissued(true);
  };

  if (reissued) {
    return (
      <div aria-live="polite">
        <div className="border border-white/10 bg-carbon-2/60 backdrop-blur-md px-5 py-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
            Documents found
          </p>
          <h3 className="mt-2 font-sans text-2xl font-black uppercase text-white">
            Badge re-generated ✓
          </h3>
          <p className="mt-3 text-sm leading-6 text-grey-300">
            Member ID <span className="font-bold text-white">{values.memberId}</span> —
            your fresh badge is below. The QR code works as your entry pass at all
            F1 Odisha events.
          </p>
        </div>

        <div className="mt-4">
          <BadgePreview profile={values} memberId={values.memberId.toUpperCase()} />
        </div>

        <p className="mt-3 text-[0.7rem] leading-5 text-grey-500">
          Static preview — live member lookup syncs in Phase B. No data leaves your
          browser.
        </p>

        <div className="mt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setValues(EMPTY);
              setReissued(false);
            }}
          >
            Look up another ID
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-white/10 bg-carbon-2/60 backdrop-blur-md">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
          Re-generate your badge
        </p>
        <p className="mt-1 text-sm text-grey-500">
          Enter the details from registration — QR works as event entry pass
        </p>
      </div>

      <div className="grid gap-x-4 gap-y-4 px-5 py-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={`regen-${field.key}`}
              className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.16em] text-grey-500"
            >
              {field.label}
            </label>
            <input
              id={`regen-${field.key}`}
              name={field.key}
              type={field.type ?? "text"}
              list={field.list}
              placeholder={field.placeholder}
              value={values[field.key]}
              onChange={(e) => setField(field.key, e.target.value)}
              aria-invalid={Boolean(errors[field.key])}
              aria-describedby={
                errors[field.key] ? `regen-${field.key}-error` : undefined
              }
              max={field.type === "date" ? new Date().toISOString().split("T")[0] : undefined}
              className="w-full border border-white/15 bg-carbon px-3 py-2.5 text-sm text-white placeholder:text-grey-700 focus:border-f1-red focus:outline-none"
            />
            {errors[field.key] && (
              <p
                id={`regen-${field.key}-error`}
                className="mt-1 text-xs font-semibold text-f1-red-bright"
              >
                {errors[field.key]}
              </p>
            )}
          </div>
        ))}
        <datalist id="regen-teams">
          {FAVOURITE_TEAMS.map((team) => (
            <option key={team} value={team} />
          ))}
        </datalist>
        <datalist id="regen-drivers">
          {FAVOURITE_DRIVERS.map((driver) => (
            <option key={driver} value={driver} />
          ))}
        </datalist>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.65rem] text-grey-500">
          Already registered? Re-issue your badge instantly
        </p>
        <Button size="md" skew>
          Re-generate Badge
        </Button>
      </div>
    </form>
  );
}
