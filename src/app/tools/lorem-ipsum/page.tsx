"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

const PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.",
  "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
  "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Ut enim ad minima veniam, quis nostrum exercitationem ullam.",
];

export default function LoremIpsumGenerator() {
  const t = useT();
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const paragraphs: string[] = [];
    for (let i = 0; i < count; i++) {
      paragraphs.push(PARAGRAPHS[i % PARAGRAPHS.length]);
    }
    setOutput(paragraphs.join("\n\n"));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard not available */ }
  };

  const clear = () => { setOutput(""); setCount(3); };

  return (
    <ToolLayout toolSlug="lorem-ipsum">
      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted font-mono">{t("lorem.paragraphs")}</label>
            <input
              type="number"
              min={1}
              max={20}
              value={count}
              onChange={(e) => setCount(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
              className="w-20 rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-sm text-foreground focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={generate} className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors">
            {t("action.generate")}
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
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("lorem.output")}</label>
            <textarea
              className="w-full h-64 rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground resize-none"
              value={output}
              readOnly
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
