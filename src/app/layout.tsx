import type { Metadata } from 'next';
import { ThemeProvider } from '../components/theme-provider';
import Analytics from '@/components/analytics';
import DefaultLayout from '@/components/layout/default-layout';
import { SidebarProvider } from '@/components/sidebar-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Paul Hanaoka | Designer',
  description: 'My digital workshop and garden',
  openGraph: {
    title: 'Paul Hanaoka | Designer',
    description: 'My digital workshop and garden',
    url: 'https://paul.hanaoka.co',
    images: [
      {
        url: 'https://paul.hanaoka.co/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Paul Hanaoka | Designer',
      },
    ],
    siteName: 'Paul Hanaoka | Designer',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
        url: '/favicon/favicon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
        url: '/favicon/favicon-dark.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-background" lang="en" suppressHydrationWarning>
      <body className="body">
        <Analytics />
        <ThemeProvider>
          <SidebarProvider>
            <DefaultLayout>{children}</DefaultLayout>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
