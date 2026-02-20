import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator",
  description: "Generate random UUIDs (v4) in bulk online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
