import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff",
  description: "Compare two JSON objects and highlight differences online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
