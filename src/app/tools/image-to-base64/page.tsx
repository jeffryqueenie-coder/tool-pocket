"use client";
import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

export default function ImageToBase64() {
  const t = useT();
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState("");
  const [fileInfo, setFileInfo] = useState("");
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setFileInfo(`${file.name} — ${(file.size / 1024).toFixed(1)} KB`);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setOutput(result);
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) processFile(file);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard not available */ }
  };

  const clear = () => { setOutput(""); setPreview(""); setFileInfo(""); if (inputRef.current) inputRef.current.value = ""; };

  return (
    <ToolLayout toolSlug="image-to-base64">
      <div className="space-y-4">
        <div
          className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed p-8 cursor-pointer transition-colors ${
            dragging ? "border-accent bg-accent/5" : "border-border hover:border-border-hover"
          }`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <p className="text-muted text-xs font-mono">
            {dragging ? t("imgBase64.dropActive") : t("imgBase64.dropText")}
          </p>
          {fileInfo && <p className="text-[11px] text-accent mt-2 font-mono">{fileInfo}</p>}
        </div>
        {preview && (
          <div className="flex justify-center p-4 rounded-md border border-border bg-background">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt={t("imgBase64.preview")} className="max-h-48 rounded" />
          </div>
        )}
        {output && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-muted font-mono">{t("imgBase64.output")}</label>
              <div className="flex gap-2">
                <button onClick={copy} className="rounded-md border border-border px-3 py-1 text-xs text-muted hover:text-foreground hover:border-border-hover transition-colors">
                  {copied ? t("action.copied") : t("action.copy")}
                </button>
                <button onClick={clear} className="rounded-md border border-border px-3 py-1 text-xs text-muted hover:text-foreground hover:border-border-hover transition-colors">
                  {t("action.clear")}
                </button>
              </div>
            </div>
            <textarea className="w-full h-32 rounded-md border border-border bg-background p-3 font-mono text-xs text-foreground resize-none" value={output} readOnly />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
