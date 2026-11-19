import { Button } from '@repo/ui/components/button';
import * as Dialog from '@repo/ui/components/dialog';

export function ShareDialog({ title, slug }: { title: string; slug: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" className="w-fit">
          Share
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Share this post</Dialog.Title>
        <Dialog.Description>{title}</Dialog.Description>
        <code className="rounded bg-gray-100 p-2 text-sm">/{slug}</code>
        <Dialog.Close asChild>
          <Button variant="outline" className="w-fit justify-self-end">
            Close
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
