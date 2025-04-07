import type { Metadata } from 'next';
import { Fira_Code, Fira_Sans } from 'next/font/google';
import { ThemeProvider } from '../components/theme-provider';
import Analytics from '@/components/analytics';
import DefaultLayout from '@/components/layout/default-layout';
import { SidebarProvider } from '@/components/sidebar-provider';
import './globals.css';

const fira_code = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
  fallback: [
    'ui-monospace',
    'Menlo',
    'Source Code Pro',
    'Fira Mono',
    'Droid Sans Mono',
    'Monaco',
    'monospace',
  ],
});

const fira_sans = Fira_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-sans',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'sans-serif',
  ],
  weight: ['200', '400', '600', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'xiao | Designer',
  description: '我的静态网站和资源展示，博客',
  openGraph: {
    title: 'xiao | Designer',
    description: '我的静态网站和资源展示，博客',
    url: 'https://paul.hanaoka.co',
    images: [
      {
        url: 'https://paul.hanaoka.co/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'xiao  | Designer',
      },
    ],
    siteName: 'xiao | Designer',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
        url: '/favicon/favicon.svg',
      },
      {
        rel: 'icon',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
        url: '/favicon/favicon.svg',
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
    <html
      className={`${fira_code.variable} ${fira_sans.variable} bg-background`}
      lang="en"
      suppressHydrationWarning={true}
    >
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
