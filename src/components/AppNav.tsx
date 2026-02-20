"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/context";
import LanguageToggle from "@/components/LanguageToggle";

export default function AppNav() {
  const t = useT();
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5 font-mono text-sm tracking-tight text-foreground">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-accent text-[11px] font-bold text-background">tp</span>
          <span className="hidden sm:inline">toolpocket</span>
        </Link>
        <div className="flex items-center gap-1 text-xs">
          <Link href="/" className="rounded-md px-3 py-1.5 text-muted transition-colors hover:text-foreground hover:bg-surface">
            {t("nav.tools")}
          </Link>
          <LanguageToggle />
          <span className="text-border mx-1">/</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-muted transition-colors hover:text-foreground hover:bg-surface"
          >
            {t("nav.source")}
          </a>
        </div>
      </div>
    </nav>
  );
}
