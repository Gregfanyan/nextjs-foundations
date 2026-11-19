import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Contact us</h1>
      <p className="text-gray-600">Questions? Send us a note.</p>
      <ContactForm />
    </div>
  );
}
