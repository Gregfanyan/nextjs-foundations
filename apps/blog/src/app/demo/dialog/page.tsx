import { Button } from '@repo/ui/components/button';
import * as Dialog from '@repo/ui/components/dialog';

export default function BlogDialogDemoPage() {
  return (
    <main className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="font-bold text-3xl">Blog: Dialog Demo</h1>
        <p className="mt-2 text-gray-600">
          Same compound component from @repo/ui works in blog app.
        </p>
      </div>

      <section className="rounded-lg border bg-gray-50 p-6">
        <h2 className="font-semibold text-lg">Newsletter Signup</h2>
        <p className="mb-4 text-gray-600 text-sm">
          Example: gate newsletter subscription behind a dialog.
        </p>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Subscribe to Newsletter</Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Join Our Newsletter</Dialog.Title>
            <Dialog.Description>
              Get the latest articles delivered to your inbox.
            </Dialog.Description>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="rounded-md border px-3 py-2 text-sm"
              />
              <div className="flex justify-end gap-2">
                <Dialog.Close asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.Close>
                <Button type="submit">Subscribe</Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </section>
    </main>
  );
}
