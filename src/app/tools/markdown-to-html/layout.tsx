import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown to HTML Converter",
  description: "Convert Markdown text to HTML markup online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
