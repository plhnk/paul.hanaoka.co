import type { Metadata } from "next";
import { Fira_Code, Fira_Sans } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";

const fira_code = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

const fira_sans = Fira_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-sans",
  weight: ["200", "400", "600", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${fira_code.variable} ${fira_sans.variable}` + ' radix-themes'}
      lang="en"
    >
      <body
        className={
          "m-4 sm:ml-80 sm:m-8 sm:h-[calc(100vh-4rem)] business:bg-lime-950 fun:bg-rose-200 dark:bg-neutral-900 light:bg-neutral-50 transition-colors duration-200"
        }
      >
        <ThemeProvider
          themes={["light", "dark", "fun", "business"]}
          // add any new themes to this list, but also don't forget to add them to the tailwind config file
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Theme style={{ minHeight: "unset" }}>{children}</Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
