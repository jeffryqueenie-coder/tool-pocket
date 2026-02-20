import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encode & Decode",
  description: "Encode and decode Base64 strings online for free. Supports UTF-8 text.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
