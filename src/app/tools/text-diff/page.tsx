"use client";
import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import * as Diff from "diff";
import { useT } from "@/lib/i18n/context";

interface DiffPart {
  type: "added" | "removed" | "unchanged";
  value: string;
}

export default function JsonDiffTool() {
  const t = useT();
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [diffParts, setDiffParts] = useState<DiffPart[]>([]);
  const [error, setError] = useState("");

  const compare = useCallback(() => {
    if (!left.trim() && !right.trim()) {
      setDiffParts([]);
      setError("");
      return;
    }
    try {
      const leftObj = JSON.parse(left);
      const rightObj = JSON.parse(right);
      const changes = Diff.diffJson(leftObj, rightObj);
      const parts: DiffPart[] = changes.map((part) => ({
        type: part.added ? "added" : part.removed ? "removed" : "unchanged",
        value: part.value,
      }));
      setDiffParts(parts);
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("jsonDiff.invalidJson"));
      setDiffParts([]);
    }
  }, [left, right, t]);

  const handleLeft = (value: string) => {
    setLeft(value);
  };

  const handleRight = (value: string) => {
    setRight(value);
  };

  const clear = () => { setLeft(""); setRight(""); setDiffParts([]); setError(""); };

  return (
    <ToolLayout toolSlug="text-diff">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("jsonDiff.original")}</label>
            <textarea
              className="w-full h-44 rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover resize-none"
              placeholder={t("jsonDiff.originalPlaceholder")}
              value={left}
              onChange={(e) => handleLeft(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("jsonDiff.modified")}</label>
            <textarea
              className="w-full h-44 rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover resize-none"
              placeholder={t("jsonDiff.modifiedPlaceholder")}
              value={right}
              onChange={(e) => handleRight(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={compare} className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors">
            {t("action.compare")}
          </button>
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors ml-auto">
            {t("action.clear")}
          </button>
        </div>
        {error && <p className="text-danger text-xs font-mono">{error}</p>}
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("jsonDiff.diff")}</label>
          <div className="rounded-md border border-border bg-background p-3 font-mono text-sm overflow-x-auto max-h-80 overflow-y-auto">
            {diffParts.length > 0 ? (
              diffParts.map((part, i) => (
                <span
                  key={i}
                  className={`whitespace-pre-wrap ${
                    part.type === "added"
                      ? "text-success bg-success/10"
                      : part.type === "removed"
                      ? "text-danger bg-danger/10"
                      : "text-muted"
                  }`}
                >
                  {part.value}
                </span>
              ))
            ) : (
              <p className="text-xs text-muted">{t("jsonDiff.noDiff")}</p>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
