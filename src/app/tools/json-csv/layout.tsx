import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON/CSV Converter",
  description: "Convert between JSON arrays and CSV format online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
