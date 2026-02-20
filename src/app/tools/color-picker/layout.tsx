import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Picker & Converter",
  description: "Pick colors and convert between HEX, RGB, and HSL formats online for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
