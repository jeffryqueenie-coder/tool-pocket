"use client";

import { useLocale } from "@/lib/i18n/context";

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "zh" : "en")}
      className="rounded-md px-3 py-1.5 text-muted transition-colors hover:text-foreground hover:bg-surface text-xs font-medium"
      aria-label={locale === "en" ? "Switch to Chinese" : "Switch to English"}
    >
      {locale === "en" ? "中" : "EN"}
    </button>
  );
}
