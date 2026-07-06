"use client";

import { useActionState } from "react";

import {
  submitLead,
  type LeadState,
} from "@/app/(site)/contact/actions";

const initialState: LeadState = { status: "idle" };

const inputClass =
  "w-full border border-sand bg-cream px-4 py-3.5 text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-gold";

export function ContactForm({ services }: { services: string[] }) {
  const [state, formAction, pending] = useActionState(
    submitLead,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="border border-gold/50 bg-cream p-10 text-center">
        <p className="font-display text-3xl font-medium text-estate">
          Enquiry received
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="kicker">Name *</span>
          <input name="name" required className={inputClass} placeholder="Your full name" />
        </label>
        <label className="block space-y-2">
          <span className="kicker">Email *</span>
          <input name="email" type="email" required className={inputClass} placeholder="you@company.com" />
        </label>
        <label className="block space-y-2">
          <span className="kicker">Company</span>
          <input name="company" className={inputClass} placeholder="Organisation (optional)" />
        </label>
        <label className="block space-y-2">
          <span className="kicker">Phone</span>
          <input name="phone" type="tel" className={inputClass} placeholder="+1 (555) 000-0000" />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="kicker">Service of interest</span>
        <select name="service" className={inputClass} defaultValue="">
          <option value="">Select a service (optional)</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
          <option value="Other">Other / not sure yet</option>
        </select>
      </label>
      <label className="block space-y-2">
        <span className="kicker">Your project *</span>
        <textarea
          name="message"
          required
          rows={6}
          className={inputClass}
          placeholder="Tell us about the site, the decision the survey will support, and any timeline constraints."
        />
      </label>

      {state.status === "error" && (
        <p className="border border-plum/30 bg-plum/5 px-4 py-3 text-sm text-plum" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="border border-plum bg-plum px-10 py-4 text-[0.72rem] font-semibold uppercase tracking-luxe text-cream transition-colors hover:bg-plum-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
