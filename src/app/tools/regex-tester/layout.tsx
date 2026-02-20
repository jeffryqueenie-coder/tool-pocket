import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester",
  description: "Test and debug regular expressions online for free with real-time matching.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
