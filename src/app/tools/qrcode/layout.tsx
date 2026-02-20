import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Generate QR codes from text or URLs online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
