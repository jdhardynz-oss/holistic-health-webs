import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Holistic Health Webs',
  description: 'Self-assessment across 6 dimensions of holistic health',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
