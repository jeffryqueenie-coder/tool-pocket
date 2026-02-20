import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator",
  description: "Generate placeholder lorem ipsum text for designs and layouts.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
