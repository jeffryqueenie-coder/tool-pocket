import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Image Converter",
  description: "Convert PDF pages to PNG images online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
