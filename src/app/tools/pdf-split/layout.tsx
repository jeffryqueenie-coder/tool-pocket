import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Split",
  description: "Extract specific pages from a PDF file online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
