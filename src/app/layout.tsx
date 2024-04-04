import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body
        className={inter.className + " m-4 sm:ml-80 sm:m-8 sm:h-[calc(100vh-4rem)]"}
      >
        <Theme
          panelBackground="translucent"
          accentColor="red"
          grayColor="gray"
          appearance="dark"
          style={{minHeight:'unset'}}
        >
          {children}
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
