import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF Converter",
  description: "Convert images into a PDF document online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
