"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { type ContactState, sendContact } from "./actions";

const initialState: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
    >
      {pending ? "Submitting..." : "Send message"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendContact, initialState);
  const errors = state.status === "error" ? state.errors : undefined;

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-medium text-sm">
          Name
        </label>
        <input
          id="name"
          name="name"
          className="rounded border px-3 py-2"
          aria-invalid={!!errors?.name}
        />
        {errors?.name && (
          <p className="text-red-600 text-sm">{errors.name[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium text-sm">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="rounded border px-3 py-2"
          aria-invalid={!!errors?.email}
        />
        {errors?.email && (
          <p className="text-red-600 text-sm">{errors.email[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="font-medium text-sm">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="rounded border px-3 py-2"
          aria-invalid={!!errors?.message}
        />
        {errors?.message && (
          <p className="text-red-600 text-sm">{errors.message[0]}</p>
        )}
      </div>

      <SubmitButton />

      {state.status === "success" && (
        <p className="text-green-700 text-sm" role="status">
          {state.message}
        </p>
      )}
      {state.status === "error" && state.message && (
        <p className="text-red-600 text-sm" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
