import type { Metadata } from 'next';

import { siteUrl } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ACME Blog',
    template: '%s | ACME Blog',
  },
  description: 'News, tutorials and product updates from ACME Corporation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto px-4 py-8">{children}</body>
    </html>
  );
}
