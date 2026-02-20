"use client";
import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

export default function QrCode() {
  const t = useT();
  const [text, setText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [error, setError] = useState("");

  const generate = useCallback(async () => {
    if (!text.trim()) return;
    setError("");
    try {
      const QRCode = await import("qrcode");
      const dataUrl = await QRCode.toDataURL(text, { width: 300, margin: 2 });
      setQrDataUrl(dataUrl);
    } catch {
      setError(t("qrcode.error"));
      setQrDataUrl("");
    }
  }, [text, t]);

  const download = () => {
    if (!qrDataUrl) return;
    let name = "qrcode";
    try {
      const url = new URL(text);
      name = url.hostname.replace(/^www\./, "").replace(/[^a-zA-Z0-9.-]/g, "_");
    } catch {
      // not a URL, use sanitized text
      const sanitized = text.trim().slice(0, 30).replace(/[^a-zA-Z0-9\u4e00-\u9fff-]/g, "_");
      if (sanitized) name = sanitized;
    }
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `${name}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const clear = () => { setText(""); setQrDataUrl(""); setError(""); };

  return (
    <ToolLayout toolSlug="qrcode">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("qrcode.label")}</label>
          <input
            type="text"
            className="w-full rounded-md border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover"
            placeholder={t("qrcode.placeholder")}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
          />
        </div>
        <div className="flex gap-2">
          <button onClick={generate} className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors">
            {t("action.generate")}
          </button>
          <button onClick={download} disabled={!qrDataUrl} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors disabled:opacity-30 disabled:pointer-events-none">
            {t("action.download")}
          </button>
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors">
            {t("action.clear")}
          </button>
        </div>
        {error && <p className="text-danger text-xs font-mono">{error}</p>}
        {qrDataUrl && (
          <div className="flex justify-center p-6 rounded-md border border-border bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt={t("qrcode.alt")} width={300} height={300} />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
