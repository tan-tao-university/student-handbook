import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://sotay.ttu.edu.vn'),
  ),
  title: {
    default: 'Sổ tay Sinh viên TTU - Đại học Tân Tạo',
    template: '%s | Sổ tay Sinh viên TTU',
  },
  description: 'Cẩm nang toàn diện dành cho sinh viên Trường Đại học Tân Tạo',
  icons: {
    icon: '/logo-ttu.png',
    shortcut: '/logo-ttu.png',
    apple: '/logo-ttu.png',
  },
  openGraph: {
    title: 'Sổ tay Sinh viên TTU - Đại học Tân Tạo',
    description: 'Cẩm nang toàn diện dành cho sinh viên Trường Đại học Tân Tạo',
    url: '/',
    siteName: 'Sổ tay Sinh viên TTU',
    images: [
      {
        url: '/og-image.png',
        width: 1672,
        height: 941,
        alt: 'Sổ tay Sinh viên TTU - Đại học Tân Tạo',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sổ tay Sinh viên TTU - Đại học Tân Tạo',
    description: 'Cẩm nang toàn diện dành cho sinh viên Trường Đại học Tân Tạo',
    images: ['/og-image.png'],
  },
};
export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          theme={{
            defaultTheme: 'light',
            enableSystem: false,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
