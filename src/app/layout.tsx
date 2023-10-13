import { Inter } from 'next/font/google';

import Providers from '@/redux/ReduxProviders';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '2048',
  description: '2048',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} mx-auto  h-screen bg-bg`}>
        <Providers>{children}</Providers>
        <div id="portal" />
      </body>
    </html>
  );
}
