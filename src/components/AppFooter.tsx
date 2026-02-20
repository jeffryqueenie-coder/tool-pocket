"use client";

import { useT } from "@/lib/i18n/context";

export default function AppFooter() {
  const t = useT();
  return (
    <footer className="border-t border-border py-6">
      <div className="mx-auto max-w-5xl px-5 flex items-center justify-between text-xs text-muted">
        <span className="font-mono">toolpocket</span>
        <span>{t("footer.local")}</span>
      </div>
    </footer>
  );
}
