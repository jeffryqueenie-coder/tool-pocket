"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

export default function UuidGenerator() {
  const t = useT();
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(crypto.randomUUID());
    }
    setUuids(result);
  };

  const copyOne = async (uuid: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch { /* clipboard not available */ }
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1500);
    } catch { /* clipboard not available */ }
  };

  const clear = () => { setUuids([]); setCount(1); };

  return (
    <ToolLayout toolSlug="uuid-generator">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-muted font-mono">{t("uuid.count")}</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value) || 1)))}
            className="w-20 rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-sm text-foreground focus:outline-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={generate} className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors">
            {t("action.generate")}
          </button>
          <button onClick={copyAll} disabled={uuids.length === 0} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors disabled:opacity-30 disabled:pointer-events-none">
            {copiedAll ? t("action.copied") : t("uuid.copyAll")}
          </button>
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors ml-auto">
            {t("action.clear")}
          </button>
        </div>
        {uuids.length > 0 && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted font-mono">{t("uuid.output")}</label>
            <div className="rounded-md border border-border bg-background p-3 space-y-1 max-h-80 overflow-y-auto">
              {uuids.map((uuid, i) => (
                <div key={i} className="flex items-center gap-2 group">
                  <code className="flex-1 font-mono text-sm text-foreground">{uuid}</code>
                  <button
                    onClick={() => copyOne(uuid, i)}
                    className="opacity-0 group-hover:opacity-100 rounded px-2 py-0.5 text-[10px] text-muted hover:text-foreground border border-border hover:border-border-hover transition-all"
                  >
                    {copiedIdx === i ? t("uuid.copiedSingle") : t("uuid.copySingle")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
