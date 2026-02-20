import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter",
  description: "Convert between Unix timestamps and human-readable dates online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
