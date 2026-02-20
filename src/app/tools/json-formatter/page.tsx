"use client";
import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

type Mode = "format" | "minify";

export default function JsonFormatter() {
  const t = useT();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<Mode>("format");

  const transform = useCallback((value: string, m: Mode) => {
    if (!value.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(value);
      setOutput(m === "format" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  }, []);

  const handleInput = (value: string) => {
    setInput(value);
    transform(value, mode);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    transform(input, m);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard not available */
    }
  };

  const clear = () => { setInput(""); setOutput(""); setError(""); };

  return (
    <ToolLayout toolSlug="json-formatter">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("jsonFormatter.input")}</label>
          <textarea
            className="w-full h-44 rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover resize-none"
            placeholder={t("jsonFormatter.placeholder")}
            value={input}
            onChange={(e) => handleInput(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => switchMode("format")} className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${mode === "format" ? "bg-accent text-background hover:bg-accent-dim" : "border border-border text-muted hover:text-foreground hover:border-border-hover"}`}>
            {t("action.format")}
          </button>
          <button onClick={() => switchMode("minify")} className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${mode === "minify" ? "bg-accent text-background hover:bg-accent-dim" : "border border-border text-muted hover:text-foreground hover:border-border-hover"}`}>
            {t("action.minify")}
          </button>
          <button onClick={copy} disabled={!output} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors disabled:opacity-30 disabled:pointer-events-none">
            {copied ? t("action.copied") : t("action.copy")}
          </button>
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors ml-auto">
            {t("action.clear")}
          </button>
        </div>
        {error && <p className="text-danger text-xs font-mono">{error}</p>}
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("jsonFormatter.output")}</label>
          <textarea
            className="w-full h-44 rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground resize-none"
            value={output}
            readOnly
          />
        </div>
      </div>
    </ToolLayout>
  );
}
