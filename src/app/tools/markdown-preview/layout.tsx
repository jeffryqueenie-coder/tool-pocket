import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown Preview",
  description: "Live preview of Markdown with syntax highlighting online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
