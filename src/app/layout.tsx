import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BRP Oracle AI - Sistema de Gestão de Conhecimento',
  description: 'Sistema inteligente de gestão de conhecimento com IA para BR Partners',
  keywords: 'knowledge management, AI, BR Partners, documentation, search',
  authors: [{ name: 'BR Partners' }],
  openGraph: {
    title: 'BRP Oracle AI',
    description: 'Sistema inteligente de gestão de conhecimento com IA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}