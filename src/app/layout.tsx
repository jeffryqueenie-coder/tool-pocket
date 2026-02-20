import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/context";
import AppNav from "@/components/AppNav";
import AppFooter from "@/components/AppFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://tool-pocket-eight.vercel.app"),
  title: {
    default: "ToolPocket — Developer Tools",
    template: "%s — ToolPocket",
  },
  description: "Fast, private developer tools that run entirely in your browser.",
  keywords: ["developer tools", "JSON formatter", "Base64", "hash generator", "QR code", "regex tester"],
  verification: {
    google: "9oczJjYcCwqPWKuNJVjMMJQcVDwCsp-tU_uXZnOryoc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <LocaleProvider>
          <AppNav />
          <main className="mx-auto max-w-5xl px-5 py-8">
            {children}
          </main>
          <AppFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
