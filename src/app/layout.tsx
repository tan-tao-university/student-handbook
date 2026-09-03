import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Sổ tay Sinh viên TTU - Đại học Tân Tạo',
    template: '%s | Sổ tay Sinh viên TTU',
  },
  description: 'Cẩm nang toàn diện dành cho sinh viên Trường Đại học Tân Tạo (Tan Tao University)',
  icons: {
    icon: '/logo-ttu.png',
    shortcut: '/logo-ttu.png',
    apple: '/logo-ttu.png',
  },
};
export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
