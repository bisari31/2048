import Providers from '@/redux/Provider';
import './globals.css';
import { Inter } from 'next/font/google';

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
      <body className={`${inter.className} bg-bg w-[526px] mx-auto h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
