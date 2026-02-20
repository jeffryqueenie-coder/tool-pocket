import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Merge",
  description: "Combine multiple PDF files into one document online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
