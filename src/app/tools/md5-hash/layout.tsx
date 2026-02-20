import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SHA Hash Generator",
  description: "Generate SHA-1, SHA-256, SHA-512 hashes online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
