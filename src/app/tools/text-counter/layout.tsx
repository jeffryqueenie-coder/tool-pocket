import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Counter",
  description: "Count words, characters, lines and paragraphs in your text online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
