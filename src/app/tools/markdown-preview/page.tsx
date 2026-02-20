"use client";
import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useT } from "@/lib/i18n/context";

export default function MarkdownPreview() {
  const t = useT();
  const [input, setInput] = useState("");
  const [html, setHtml] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const { markedHighlight } = await import("marked-highlight");
      const hljs = (await import("highlight.js")).default;

      marked.use(
        markedHighlight({
          langPrefix: "hljs language-",
          highlight(code: string, lang: string) {
            if (lang && hljs.getLanguage(lang)) {
              return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
          },
        })
      );

      const raw = marked.parse(input);
      const result = typeof raw === "string" ? raw : "";
      if (!cancelled) {
        setHtml(DOMPurify.sanitize(result));
      }
    }

    render();
    return () => { cancelled = true; };
  }, [input]);

  return (
    <ToolLayout toolSlug="markdown-preview">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ minHeight: "400px" }}>
        <div className="flex flex-col">
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("mdPreview.editor")}</label>
          <textarea
            className="flex-1 w-full rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover resize-none"
            placeholder={t("mdPreview.placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("mdPreview.preview")}</label>
          <div
            className="prose-preview flex-1 rounded-md border border-border bg-background p-4 overflow-y-auto text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
