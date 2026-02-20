"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

export default function TimestampConverter() {
  const t = useT();
  const [ts, setTs] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");

  const now = () => {
    const n = Math.floor(Date.now() / 1000);
    setTs(String(n));
    setResult(new Date(n * 1000).toISOString());
  };

  const tsToDate = () => {
    const num = Number(ts);
    if (isNaN(num)) { setResult(t("timestamp.invalidTs")); return; }
    const ms = ts.length > 10 ? num : num * 1000;
    setResult(new Date(ms).toISOString() + "\n" + new Date(ms).toLocaleString());
  };

  const dateToTs = () => {
    const d = new Date(date);
    if (isNaN(d.getTime())) { setResult(t("timestamp.invalidDate")); return; }
    setResult(`${t("timestamp.seconds", { s: Math.floor(d.getTime() / 1000) })}\n${t("timestamp.milliseconds", { ms: d.getTime() })}`);
  };

  const clear = () => { setTs(""); setDate(""); setResult(""); };

  return (
    <ToolLayout toolSlug="timestamp">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("timestamp.unixLabel")}</label>
            <input
              type="text"
              className="w-full rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover"
              placeholder={t("timestamp.unixPlaceholder")}
              value={ts}
              onChange={(e) => setTs(e.target.value)}
            />
            <button onClick={tsToDate} className="mt-2 rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors">
              {t("timestamp.toDate")}
            </button>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("timestamp.dateLabel")}</label>
            <input
              type="text"
              className="w-full rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover"
              placeholder={t("timestamp.datePlaceholder")}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={dateToTs} className="mt-2 rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors">
              {t("timestamp.toTimestamp")}
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={now} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors">
            {t("timestamp.current")}
          </button>
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors">
            {t("action.clear")}
          </button>
        </div>
        {result && (
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("timestamp.result")}</label>
            <pre className="rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
