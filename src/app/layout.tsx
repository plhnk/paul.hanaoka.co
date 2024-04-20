import type { Metadata } from 'next';
import { Fira_Code, Fira_Sans } from 'next/font/google';
import { ThemeProvider } from './components/theme-provider';
import Sidebar from './components/sidebar';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const fira_code = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

const fira_sans = Fira_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-sans',
  weight: ['200', '400', '600', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'paul.hanaoka.co',
  description: 'my digital workshop and garden',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={
        `${fira_code.variable} ${fira_sans.variable}` + ' radix-themes'
      }
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={
          'm-4 sm:ml-80 sm:m-8 sm:h-[calc(100vh-4rem transition-colors duration-200 bg-background text-text'
        }
        // TODO design themes, abstract them somehow
      >
        <ThemeProvider
          themes={['light', 'dark', 'elite', 'exec']}
          // add any new themes to this list, but also don't forget to add them to the tailwind config file
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Sidebar />
          <main className="max-w-2xl mx-auto my-32 bg-surface">{children}</main>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
