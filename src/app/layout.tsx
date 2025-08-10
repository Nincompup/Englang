import './globals.css';
import Navbar from '@/components/Navbar'; // adjust path if needed
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Website',
  description: 'Created with Next.js App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
