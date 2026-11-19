import { Button } from "@repo/ui/components/button";
import * as Dialog from "@repo/ui/components/dialog";
import { connection } from "next/server";
import { Suspense } from "react";

// Server Component: the terms text is rendered on the server and passed into the client dialog as children
async function TermsContent() {
  await connection(); // the date is per-request, so don't prerender it
  return (
    <>
      By using this service, you agree to our terms. These terms were last
      updated on {new Date().toLocaleDateString()}.
    </>
  );
}

export default function DialogDemoPage() {
  return (
    <main className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="font-bold text-3xl">Dialog Compound Component</h1>
        <p className="mt-2 text-gray-600">
          Compound API with server-rendered content inside client dialog.
        </p>
      </div>

      <section className="rounded-lg border bg-gray-50 p-6">
        <h2 className="font-semibold text-lg">Confirmation Dialog</h2>
        <p className="mb-4 text-gray-600 text-sm">
          Gates a destructive action with user confirmation.
        </p>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="destructive" className="w-fit">
              Delete Account
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Are you sure?</Dialog.Title>
            <Dialog.Description>
              This action cannot be undone. Your account and all associated data
              will be permanently deleted.
            </Dialog.Description>
            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button variant="destructive">Delete</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </section>

      <section className="rounded-lg border bg-gray-50 p-6">
        <h2 className="font-semibold text-lg">Server Content in Dialog</h2>
        <p className="mb-4 text-gray-600 text-sm">
          Terms content fetched on server, rendered inside client dialog.
        </p>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="outline" className="w-fit">
              View Terms
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Terms of Service</Dialog.Title>
            <Dialog.Description>
              Please read these terms carefully.
            </Dialog.Description>
            <div className="rounded-md bg-gray-100 p-4 text-sm">
              <Suspense fallback="Loading terms…">
                <TermsContent />
              </Suspense>
            </div>
            <Dialog.Close asChild>
              <Button variant="outline" className="w-fit">
                Close
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </section>
    </main>
  );
}
