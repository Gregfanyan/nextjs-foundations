"use server";

import { submitContactForm } from "@repo/api/brand";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message?: string; errors?: Record<string, string[]> };

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      status: "error",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    await submitContactForm({ ...parsed.data, subject: "Website contact" });
    return { status: "success", message: "Message sent successfully!" };
  } catch (err) {
    // log the real reason, but don't show it to the user
    console.error("[contact] submit failed", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
