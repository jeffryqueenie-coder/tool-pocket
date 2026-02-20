import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encode & Decode",
  description: "Encode and decode URL components online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
