"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

export default function TextCounter() {
  const t = useT();
  const [text, setText] = useState("");

  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split("\n").length : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
  const bytes = new TextEncoder().encode(text).length;

  const stats = [
    { label: t("textCounter.chars"), value: chars },
    { label: t("textCounter.noSpaces"), value: charsNoSpace },
    { label: t("textCounter.words"), value: words },
    { label: t("textCounter.lines"), value: lines },
    { label: t("textCounter.paragraphs"), value: paragraphs },
    { label: t("textCounter.bytes"), value: bytes },
  ];

  const clear = () => setText("");

  return (
    <ToolLayout toolSlug="text-counter">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("textCounter.input")}</label>
          <textarea
            className="w-full h-48 rounded-md border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover resize-none"
            placeholder={t("textCounter.placeholder")}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors">
            {t("action.clear")}
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-md border border-border bg-background p-3 text-center">
              <div className="text-xl font-semibold text-accent font-mono">{s.value.toLocaleString()}</div>
              <div className="text-[11px] text-muted mt-1 font-mono">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
