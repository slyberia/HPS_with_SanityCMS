"use server";

import { getSupabaseServerClient } from "@/lib/supabase";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !EMAIL_RE.test(email) || !message) {
    return {
      status: "error",
      message: "Please provide your name, a valid email and a short message.",
    };
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    // Supabase not configured yet — never lose the enquiry silently.
    console.warn("[contact] Supabase env not configured; lead not stored:", {
      name,
      email,
      company,
      phone,
      service,
    });
    return {
      status: "error",
      message:
        "Our enquiry system is being finalised. Please email us directly and we will respond the same business day.",
    };
  }

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    company: company || null,
    phone: phone || null,
    service: service || null,
    message,
    source: "website",
  });

  if (error) {
    console.error("[contact] failed to store lead:", error.message);
    return {
      status: "error",
      message:
        "Something went wrong sending your enquiry. Please try again, or email us directly.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you — your enquiry has been received. A principal surveyor will be in touch within one business day.",
  };
}
