"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

interface PageImage {
  pageNum: number;
  dataUrl: string;
}

export default function PdfToImage() {
  const t = useT();
  const [images, setImages] = useState<PageImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(2);
  const [error, setError] = useState("");
  const handleFile = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];
    if (file.type !== "application/pdf") {
      setError(t("pdfImage.selectError"));
      return;
    }
    setError("");
    setLoading(true);
    setImages([]);

    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const data = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({
        data,
        cMapUrl: "/pdfjs/cmaps/",
        cMapPacked: true,
        standardFontDataUrl: "/pdfjs/standard_fonts/",
      }).promise;
      const results: PageImage[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport, canvas } as never).promise;
        results.push({ pageNum: i, dataUrl: canvas.toDataURL("image/png") });
      }

      setImages(results);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("pdfImage.error"));
    } finally {
      setLoading(false);
    }
  };

  const downloadOne = (img: PageImage) => {
    const a = document.createElement("a");
    a.href = img.dataUrl;
    a.download = `page-${img.pageNum}-${Date.now()}.png`;
    a.click();
  };

  const clear = () => { setImages([]); setError(""); };

  return (
    <ToolLayout toolSlug="pdf-to-image">
      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("pdfImage.upload")}</label>
            <div
              className="rounded-md border-2 border-dashed border-border hover:border-border-hover p-8 text-center cursor-pointer transition-colors"
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleFile(e.dataTransfer.files); }}
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".pdf";
                input.onchange = () => handleFile(input.files);
                input.click();
              }}
            >
              <p className="text-sm text-muted">{t("pdfImage.dropText")}</p>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("pdfImage.scale")}</label>
            <select
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-sm text-foreground focus:outline-none"
            >
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={3}>3x</option>
            </select>
          </div>
        </div>
        {loading && <p className="text-xs text-muted font-mono">{t("pdfImage.converting")}</p>}
        <div className="flex gap-2 flex-wrap">
          <button onClick={clear} disabled={images.length === 0} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors disabled:opacity-30 disabled:pointer-events-none">
            {t("action.clear")}
          </button>
        </div>
        {error && <p className="text-danger text-xs font-mono">{error}</p>}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((img) => (
              <div key={img.pageNum} className="rounded-md border border-border bg-background p-2 space-y-2">
                <img src={img.dataUrl} alt={t("pdfImage.pageAlt", { num: img.pageNum })} className="w-full rounded" />
                <button
                  onClick={() => downloadOne(img)}
                  className="w-full rounded-md border border-border px-2 py-1 text-[10px] font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors"
                >
                  {t("pdfImage.downloadPage", { num: img.pageNum })}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
