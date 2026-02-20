"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

async function hash(algo: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function ShaHash() {
  const t = useT();
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState("");

  const generate = async () => {
    if (!input) return;
    setLoading(true);
    const [sha1, sha256, sha512] = await Promise.all([
      hash("SHA-1", input),
      hash("SHA-256", input),
      hash("SHA-512", input),
    ]);
    setResults({ "SHA-1": sha1, "SHA-256": sha256, "SHA-512": sha512 });
    setLoading(false);
  };

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(""), 1500);
    } catch { /* clipboard not available */ }
  };

  const clear = () => { setInput(""); setResults({}); };

  return (
    <ToolLayout toolSlug="md5-hash">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("shaHash.input")}</label>
          <textarea
            className="w-full h-32 rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover resize-none"
            placeholder={t("shaHash.placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={generate}
            disabled={loading}
            className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors disabled:opacity-50"
          >
            {loading ? t("shaHash.generating") : t("shaHash.generate")}
          </button>
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors">
            {t("action.clear")}
          </button>
        </div>
        {Object.keys(results).length > 0 && (
          <div className="space-y-3">
            {Object.entries(results).map(([algo, val]) => (
              <div key={algo}>
                <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{algo.toLowerCase()}</label>
                <div className="flex gap-2">
                  <input className="flex-1 rounded-md border border-border bg-background p-2 font-mono text-xs text-foreground" value={val} readOnly />
                  <button
                    onClick={() => copy(algo, val)}
                    className="rounded-md border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground hover:border-border-hover transition-colors shrink-0"
                  >
                    {copiedKey === algo ? t("action.copied") : t("action.copy")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
