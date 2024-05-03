import type { Metadata } from 'next';
import { Fira_Code, Fira_Sans } from 'next/font/google';
import { ThemeProvider } from '../components/theme-provider';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Navigation from '../components/navigation';
import Footer from '@/components/footer';
import Analytics from '@/components/analytics';

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
        `${fira_code.variable} ${fira_sans.variable}`
      }
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <Analytics />
      </head>
      <body
        className={
          'sm:h-[calc(100vh-4rem)] max:h-dvh transition-colors duration-200 text-text bg-background max:bg-transparent max:grid max:grid-cols-[1fr_1920px_1fr] max:grid-rows-[1fr_1200px_1fr]'
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
          <div className="relative max:col-start-2 max:row-start-2 rounded-3xl">
            <Navigation />
            <div className="max:max-w-[1600px] max:ml-auto overflow-x-hidden sm:overflow-x-visible">
              <main className="main-grid m-4 sm:m-8 mb-40 mt-10 sm:ml-80 max:ml-8">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster
              position="bottom-center"
              toastOptions={{
                // unstyled: true,
                classNames: {
                  title: 'text-text',
                  success: 'text-element bg-card border-none', // this styles the wrapper of the success toast --> determined in navbutton
                  // toast: 'text-accent bg-card',
                  // description: 'text-text/80',
                  // actionButton: 'bg-accent text-text',
                },
              }}
            />
            <span
              aria-hidden="true"
              className="hidden fixed -z-50 h-dvh w-dvw top-0 left-0 max:grid max:grid-cols-[1fr_1920px_1fr] max:grid-rows-[1fr_1200px_1fr]"
            >
              <span
                aria-hidden="true"
                className="hidden max:block absolute h-full w-full bg-background max:col-start-2 max:row-start-2 max:col-end-3 max:row-end-3 rounded-3xl"
              />
            </span>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

// fix footer
// make sidebar sticky max:
// funny guy max:
// favicons / OG image 
// cool something in inspector