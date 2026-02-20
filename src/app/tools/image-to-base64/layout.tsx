import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to Base64 Converter",
  description: "Convert images to Base64 encoded strings online for free. No upload needed.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
