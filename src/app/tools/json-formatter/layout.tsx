import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator",
  description: "Format, validate and minify JSON data online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
