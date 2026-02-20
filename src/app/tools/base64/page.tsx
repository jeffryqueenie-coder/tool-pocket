"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

export default function Base64Tool() {
  const t = useT();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try {
      const bytes = new TextEncoder().encode(input);
      const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
      setOutput(btoa(binary));
    } catch {
      setOutput(t("base64.encodeFailed"));
    }
  };

  const decode = () => {
    try {
      const binary = atob(input);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      setOutput(new TextDecoder().decode(bytes));
    } catch {
      setOutput(t("base64.invalidBase64"));
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard not available */ }
  };

  const clear = () => { setInput(""); setOutput(""); };

  return (
    <ToolLayout toolSlug="base64">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("base64.input")}</label>
          <textarea
            className="w-full h-40 rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover resize-none"
            placeholder={t("base64.placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={encode} className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors">
            {t("action.encode")}
          </button>
          <button onClick={decode} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors">
            {t("action.decode")}
          </button>
          <button onClick={copy} disabled={!output} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors disabled:opacity-30 disabled:pointer-events-none">
            {copied ? t("action.copied") : t("action.copy")}
          </button>
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors ml-auto">
            {t("action.clear")}
          </button>
        </div>
        {output && (
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("base64.output")}</label>
            <textarea className="w-full h-40 rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground resize-none" value={output} readOnly />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
