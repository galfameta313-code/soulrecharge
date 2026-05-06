import type {Metadata} from 'next';
import './globals.css';
import { Protection } from '@/components/Protection';

export const metadata: Metadata = {
  title: 'Kembang Jiwa Organizer | Titik Temu Jiwa Berkembang',
  description: 'A private retreat experience for professionals & business owners seeking clarity, purpose, and inner alignment.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Protection />
        {children}
      </body>
    </html>
  );
}
