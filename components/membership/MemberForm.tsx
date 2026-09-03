"use client";

import { useState } from "react";

import { BadgePreview } from "@/components/membership/BadgePreview";
import { Button } from "@/components/ui/Button";
import {
  FAVOURITE_DRIVERS,
  FAVOURITE_TEAMS,
  MEMBERSHIP,
} from "@/lib/data/membership";
import {
  generateMemberId,
  memberProfileSchema,
  toFieldErrors,
  type MemberProfile,
  type ProfileErrors,
} from "@/lib/validation";

const EMPTY: MemberProfile = {
  firstName: "",
  lastName: "",
  dob: "",
  favouriteTeam: "",
  favouriteDriver: "",
};

const FIELDS: Array<{ key: keyof MemberProfile; label: string; type?: string; list?: string }> = [
  { key: "firstName", label: "First Name *" },
  { key: "lastName", label: "Last Name *" },
  { key: "dob", label: "Date of Birth *", type: "date" },
  { key: "favouriteTeam", label: "Favourite Team *", list: "teams-list" },
  { key: "favouriteDriver", label: "Favourite Driver *", list: "drivers-list" },
];

export function MemberForm() {
  const [values, setValues] = useState<MemberProfile>(EMPTY);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [submitted, setSubmitted] = useState<{ memberId: string } | null>(null);

  const setField = (key: keyof MemberProfile, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = memberProfileSchema.safeParse(values);
    if (!result.success) {
      setErrors(toFieldErrors(result.error.issues));
      return;
    }
    setErrors({});
    setSubmitted({ memberId: generateMemberId() });
  };

  if (submitted) {
    return (
      <div aria-live="polite">
        <div className="border border-white/10 bg-carbon-2/60 backdrop-blur-md px-5 py-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
            {MEMBERSHIP.intakeLabel}
          </p>
          <h3 className="mt-2 font-sans text-2xl font-black uppercase text-white">
            {MEMBERSHIP.successTitle}
          </h3>
          <p className="mt-3 text-sm leading-6 text-grey-300">
            {MEMBERSHIP.successBody} <span className="font-bold text-white">{submitted.memberId}</span>
          </p>
          <p className="mt-2 text-xs text-grey-500">{MEMBERSHIP.qrNote}</p>
        </div>

        <div className="mt-4">
          <BadgePreview profile={values} memberId={submitted.memberId} />
        </div>

        <p className="mt-3 text-[0.7rem] leading-5 text-grey-500">
          {MEMBERSHIP.staticNote}
        </p>

        <div className="mt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setValues(EMPTY);
              setSubmitted(null);
            }}
          >
            Register another member
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-white/10 bg-carbon-2/60 backdrop-blur-md">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
          Member Registration
        </p>
        <p className="mt-1 text-sm text-grey-500">{MEMBERSHIP.intakeLabel}</p>
      </div>

      <div className="grid gap-x-4 gap-y-4 px-5 py-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={`member-${field.key}`}
              className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.16em] text-grey-500"
            >
              {field.label}
            </label>
            <input
              id={`member-${field.key}`}
              name={field.key}
              type={field.type ?? "text"}
              list={field.list}
              value={values[field.key]}
              onChange={(e) => setField(field.key, e.target.value)}
              aria-invalid={Boolean(errors[field.key])}
              aria-describedby={
                errors[field.key] ? `member-${field.key}-error` : undefined
              }
              max={field.type === "date" ? new Date().toISOString().split("T")[0] : undefined}
              className="w-full border border-white/15 bg-carbon px-3 py-2.5 text-sm text-white placeholder:text-grey-700 focus:border-f1-red focus:outline-none"
            />
            {errors[field.key] && (
              <p
                id={`member-${field.key}-error`}
                className="mt-1 text-xs font-semibold text-f1-red-bright"
              >
                {errors[field.key]}
              </p>
            )}
          </div>
        ))}
        <datalist id="teams-list">
          {FAVOURITE_TEAMS.map((team) => (
            <option key={team} value={team} />
          ))}
        </datalist>
        <datalist id="drivers-list">
          {FAVOURITE_DRIVERS.map((driver) => (
            <option key={driver} value={driver} />
          ))}
        </datalist>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.65rem] text-grey-500">
          Free · No spam · WhatsApp invite after registration
        </p>
        <Button size="md" skew>
          Register Free
        </Button>
      </div>
    </form>
  );
}
