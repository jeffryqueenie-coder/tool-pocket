"use client";
import { useState, useEffect, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

interface MatchResult {
  match: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const t = useT();
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [error, setError] = useState("");

  const runTest = useCallback(() => {
    if (!pattern || !text) {
      setMatches([]);
      setError("");
      return;
    }
    try {
      const re = new RegExp(pattern, flags);
      const results: MatchResult[] = [];
      let m: RegExpExecArray | null;

      if (flags.includes("g")) {
        while ((m = re.exec(text)) !== null) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
          if (!m[0]) re.lastIndex++;
        }
      } else {
        m = re.exec(text);
        if (m) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
        }
      }

      setMatches(results);
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("regex.invalidRegex"));
      setMatches([]);
    }
  }, [pattern, flags, text, t]);

  useEffect(() => {
    runTest();
  }, [runTest]);

  const clear = () => { setPattern(""); setFlags("g"); setText(""); setMatches([]); setError(""); };

  return (
    <ToolLayout toolSlug="regex-tester">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("regex.testString")}</label>
          <textarea
            className="w-full h-32 rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover resize-none"
            placeholder={t("regex.testPlaceholder")}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("regex.pattern")}</label>
            <div className="flex items-center rounded-md border border-border bg-background overflow-hidden focus-within:ring-1 focus-within:ring-border-hover">
              <span className="pl-3 text-muted font-mono text-sm">/</span>
              <input
                type="text"
                className="flex-1 bg-transparent p-2.5 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none"
                placeholder={t("regex.patternPlaceholder")}
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
              <span className="text-muted font-mono text-sm">/</span>
              <input
                type="text"
                className="w-12 bg-transparent p-2.5 font-mono text-sm text-accent placeholder:text-muted/50 focus:outline-none"
                placeholder={t("regex.flagsPlaceholder")}
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors">
            {t("action.clear")}
          </button>
        </div>
        {error && <p className="text-danger text-xs font-mono">{error}</p>}
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">
            {t("regex.matches", { count: matches.length })}
          </label>
          <div className="rounded-md border border-border bg-background p-3 space-y-1.5 max-h-60 overflow-y-auto">
            {matches.length > 0 ? (
              matches.map((m, i) => (
                <div key={i} className="font-mono text-sm flex items-baseline gap-2">
                  <span className="text-muted text-xs shrink-0 w-6 text-right">{i}</span>
                  <span className="rounded bg-accent/15 px-1.5 py-0.5 text-accent">{m.match}</span>
                  <span className="text-muted text-xs">@{m.index}</span>
                  {m.groups.length > 0 && (
                    <span className="text-xs text-muted">
                      {t("regex.groups")} [{m.groups.map((g, j) => <span key={j} className="text-foreground">{g || "∅"}{j < m.groups.length - 1 ? ", " : ""}</span>)}]
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-muted font-mono">{t("regex.noMatches")}</p>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
