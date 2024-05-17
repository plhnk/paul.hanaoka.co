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
        url: '/favicon/favicon-light.png',
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
    <html
      className={
        `${fira_code.variable} ${fira_sans.variable}`
        // `${fira_code.variable} ${fira_sans.variable}` + ' radix-themes'
      }
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <Analytics />
      </head>
      <body
        className={
          'sm:h-[calc(100vh-4rem)] 2xl:h-dvh transition-colors duration-200 text-text bg-background 2xl:bg-transparent 2xl:grid 2xl:grid-cols-[1fr_1920px_1fr] 2xl:grid-rows-[1fr_1200px_1fr]'
        }
        // TODO design themes, abstract them somehow
        // TODO add query for xxxxl screens --> make meta window ?
      >
        <ThemeProvider
          themes={['light', 'dark', 'elite', 'exec']}
          // add any new themes to this list, but also don't forget to add them to the tailwind config file
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="relative 2xl:col-start-2 2xl:row-start-2 rounded-3xl 2xl:overflow-y-scroll 2xl:shadow-menu">
            {/* TODO style this scrollbar on max screens */}
            {/* <div className="touch-events-none fixed top-0 left-0 bottom-0 right-0" /> */}
            <Navigation />
            <div className="2xl:max-w-[1600px] 2xl:ml-auto sm:overflow-x-visible">
              {/* removed overflow-x-hidden to for sticky onPage nav in recommends component */}
              <main className="main-grid m-4 sm:m-8 mb-40 mt-10 sm:ml-80 2xl:ml-8">
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
              className="hidden fixed -z-50 h-dvh w-dvw top-0 left-0 2xl:grid 2xl:grid-cols-[1fr_1920px_1fr] 2xl:grid-rows-[1fr_1200px_1fr]"
            >
              {/* these are the invisible things for the xxl screens */}
              <span
                aria-hidden="true"
                className="hidden 2xl:block absolute h-full w-full dot-grid 2xl:col-start-2 2xl:row-start-2 2xl:col-end-3 2xl:row-end-3 rounded-3xl"
              />
            </span>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
// fix footer
// make sidebar sticky 2xl:
// funny guy 2xl:
