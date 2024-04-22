import type { Metadata } from 'next';
import { Fira_Code, Fira_Sans } from 'next/font/google';
import { ThemeProvider } from './components/theme-provider';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Navigation from './components/navigation';

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
  icons: {
    icon: [
      {
        rel: 'icon', // optional, 'icon' is the default value
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
        url: '/favicon/favicon.png',
      },
      {
        rel: 'icon', // optional, 'icon' is the default value
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
        url: '/icon-dark.png',
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
      className={
        `${fira_code.variable} ${fira_sans.variable}` + ' radix-themes'
      }
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={
          'm-4 mb-40 mt-10 sm:ml-80 sm:m-8 sm:h-[calc(100vh-4rem transition-colors duration-200 bg-background text-text'
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
          <Navigation />
          <main className="max-w-2xl sm:min-w-[60ch] sm:ml-auto sm:mr-80 bg-surface">
            {children}
          </main>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
