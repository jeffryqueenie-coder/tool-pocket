"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import Papa from "papaparse";
import { useT } from "@/lib/i18n/context";

type Mode = "json-to-csv" | "csv-to-json";

export default function JsonCsvConverter() {
  const t = useT();
  const [mode, setMode] = useState<Mode>("json-to-csv");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError("");
    setOutput("");
    if (!input.trim()) return;

    if (mode === "json-to-csv") {
      try {
        const parsed = JSON.parse(input);
        if (!Array.isArray(parsed)) {
          setError(t("jsonCsv.arrayError"));
          return;
        }
        const csv = Papa.unparse(parsed);
        setOutput(csv);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Invalid JSON");
      }
    } else {
      const result = Papa.parse(input.trim(), { header: true, skipEmptyLines: true });
      if (result.errors.length > 0) {
        setError(result.errors[0].message);
        return;
      }
      setOutput(JSON.stringify(result.data, null, 2));
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard not available */ }
  };

  const clear = () => { setInput(""); setOutput(""); setError(""); };

  return (
    <ToolLayout toolSlug="json-csv">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => { setMode("json-to-csv"); clear(); }}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${mode === "json-to-csv" ? "bg-accent text-background" : "border border-border text-muted hover:text-foreground hover:border-border-hover"}`}
          >
            {t("jsonCsv.jsonToCsv")}
          </button>
          <button
            onClick={() => { setMode("csv-to-json"); clear(); }}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${mode === "csv-to-json" ? "bg-accent text-background" : "border border-border text-muted hover:text-foreground hover:border-border-hover"}`}
          >
            {t("jsonCsv.csvToJson")}
          </button>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">
            {mode === "json-to-csv" ? t("jsonCsv.jsonInput") : t("jsonCsv.csvInput")}
          </label>
          <textarea
            className="w-full h-44 rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover resize-none"
            placeholder={mode === "json-to-csv" ? t("jsonCsv.jsonPlaceholder") : t("jsonCsv.csvPlaceholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={convert} className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors">
            {t("action.convert")}
          </button>
          <button onClick={copy} disabled={!output} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors disabled:opacity-30 disabled:pointer-events-none">
            {copied ? t("action.copied") : t("action.copy")}
          </button>
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors ml-auto">
            {t("action.clear")}
          </button>
        </div>
        {error && <p className="text-danger text-xs font-mono">{error}</p>}
        {output && (
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">
              {mode === "json-to-csv" ? t("jsonCsv.csvOutput") : t("jsonCsv.jsonOutput")}
            </label>
            <textarea
              className="w-full h-44 rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground resize-none"
              value={output}
              readOnly
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
