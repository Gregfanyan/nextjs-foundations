import { CounterButton } from "@/components/counter-button";

// Server by default: static copy, no hooks, no browser APIs.
// Only the button above is shipped to the browser as JS.
export default function CounterDemoPage() {
  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="font-bold text-2xl">Counter demo</h1>
      <p className="text-gray-600">
        This text is rendered on the server and never hydrates. Only the button
        below is a Client Component.
      </p>
      <CounterButton />
    </main>
  );
}
