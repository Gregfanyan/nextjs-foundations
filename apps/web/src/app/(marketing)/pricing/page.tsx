import { fetchServices } from "@repo/api/brand";
import { Suspense } from "react";

async function PricingList() {
  const services = (await fetchServices(6)).filter((s) => s.price);

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {services.map((service) => (
        <li key={service.id} className="rounded border p-4">
          <h2 className="font-semibold">
            {service.icon} {service.name}
          </h2>
          <p className="text-gray-600 text-sm">
            ${service.price?.amount} · {service.price?.period}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Pricing</h1>
      <Suspense fallback={<p className="animate-pulse">Loading plans…</p>}>
        <PricingList />
      </Suspense>
    </div>
  );
}
