"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

interface Thumbnail {
  pageNum: number;
  dataUrl: string;
}

export default function PdfSplit() {
  const t = useT();
  const [file, setFile] = useState<ArrayBuffer | null>(null);
  const [fileName, setFileName] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState("");
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [rendering, setRendering] = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [resultThumbs, setResultThumbs] = useState<Thumbnail[]>([]);
  const [error, setError] = useState("");

  const pagesToRange = (pages: Set<number>): string => {
    const sorted = Array.from(pages).sort((a, b) => a - b);
    if (sorted.length === 0) return "";
    const ranges: string[] = [];
    let start = sorted[0];
    let end = sorted[0];
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === end + 1) {
        end = sorted[i];
      } else {
        ranges.push(start === end ? `${start}` : `${start}-${end}`);
        start = sorted[i];
        end = sorted[i];
      }
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);
    return ranges.join(", ");
  };

  const parseRanges = (input: string, max: number): number[] => {
    const pages = new Set<number>();
    const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
    for (const part of parts) {
      const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
      if (rangeMatch) {
        const start = Math.max(1, parseInt(rangeMatch[1]));
        const end = Math.min(max, parseInt(rangeMatch[2]));
        for (let i = start; i <= end; i++) pages.add(i);
      } else {
        const num = parseInt(part);
        if (!isNaN(num) && num >= 1 && num <= max) pages.add(num);
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleFile = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const f = fileList[0];
    if (f.type !== "application/pdf") {
      setError(t("pdfSplit.selectError"));
      return;
    }
    setError("");
    setResultUrl("");
    setThumbnails([]);
    setSelectedPages(new Set());

    const data = await f.arrayBuffer();
    setFile(data);
    setFileName(f.name);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(data.slice(0));
      const count = doc.getPageCount();
      setPageCount(count);

      const allPages = new Set(Array.from({ length: count }, (_, i) => i + 1));
      setSelectedPages(allPages);
      setRange(pagesToRange(allPages));

      // Render thumbnails
      setRendering(true);
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const pdf = await pdfjsLib.getDocument({
        data: data.slice(0),
        cMapUrl: "/pdfjs/cmaps/",
        cMapPacked: true,
        standardFontDataUrl: "/pdfjs/standard_fonts/",
      }).promise;
      const results: Thumbnail[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport, canvas } as never).promise;
        results.push({ pageNum: i, dataUrl: canvas.toDataURL("image/png") });
      }
      setThumbnails(results);
    } catch {
      setError(t("pdfSplit.readError"));
    } finally {
      setRendering(false);
    }
  };

  const togglePage = (pageNum: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageNum)) next.delete(pageNum);
      else next.add(pageNum);
      setRange(pagesToRange(next));
      return next;
    });
    setResultUrl("");
    setResultThumbs([]);
  };

  const selectAll = () => {
    const all = new Set(Array.from({ length: pageCount }, (_, i) => i + 1));
    setSelectedPages(all);
    setRange(pagesToRange(all));
    setResultUrl("");
    setResultThumbs([]);
  };

  const deselectAll = () => {
    setSelectedPages(new Set());
    setRange("");
    setResultUrl("");
    setResultThumbs([]);
  };

  const handleRangeChange = (value: string) => {
    setRange(value);
    if (pageCount > 0) {
      const pages = parseRanges(value, pageCount);
      setSelectedPages(new Set(pages));
    }
    setResultUrl("");
    setResultThumbs([]);
  };

  const split = async () => {
    if (!file) return;
    setSplitting(true);
    setError("");
    setResultUrl("");
    setResultThumbs([]);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const source = await PDFDocument.load(file.slice(0));
      const pages = Array.from(selectedPages).sort((a, b) => a - b);
      if (pages.length === 0) {
        setError(t("pdfSplit.rangeError"));
        setSplitting(false);
        return;
      }
      const newDoc = await PDFDocument.create();
      const copied = await newDoc.copyPages(source, pages.map((p) => p - 1));
      for (const page of copied) {
        newDoc.addPage(page);
      }
      const bytes = await newDoc.save();
      const thumbData = bytes.slice(0).buffer;
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));

      // Render result thumbnails
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const pdf = await pdfjsLib.getDocument({
        data: thumbData,
        cMapUrl: "/pdfjs/cmaps/",
        cMapPacked: true,
        standardFontDataUrl: "/pdfjs/standard_fonts/",
      }).promise;
      const results: Thumbnail[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport, canvas } as never).promise;
        results.push({ pageNum: i, dataUrl: canvas.toDataURL("image/png") });
      }
      setResultThumbs(results);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("pdfSplit.error"));
    } finally {
      setSplitting(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `split-${Date.now()}.pdf`;
    a.click();
  };

  const clear = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setFileName("");
    setPageCount(0);
    setRange("");
    setThumbnails([]);
    setSelectedPages(new Set());
    setRendering(false);
    setResultUrl("");
    setResultThumbs([]);
    setError("");
  };

  return (
    <ToolLayout toolSlug="pdf-split">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">
            {t("pdfSplit.upload")}
          </label>
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
            <p className="text-sm text-muted">{t("pdfSplit.dropText")}</p>
          </div>
        </div>

        {rendering && (
          <p className="text-xs text-muted font-mono">{t("pdfSplit.rendering")}</p>
        )}

        {pageCount > 0 && (
          <>
            <p className="text-xs text-muted font-mono">
              {t(pageCount !== 1 ? "pdfSplit.fileInfoPlural" : "pdfSplit.fileInfo", {
                name: fileName,
                count: pageCount,
              })}
            </p>

            {thumbnails.length > 0 && (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={selectAll}
                    className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors"
                  >
                    {t("pdfSplit.selectAll")}
                  </button>
                  <button
                    onClick={deselectAll}
                    className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors"
                  >
                    {t("pdfSplit.deselectAll")}
                  </button>
                  <span className="text-xs text-muted font-mono ml-auto">
                    {t("pdfSplit.selectedCount", { count: selectedPages.size })}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {thumbnails.map((thumb) => {
                    const selected = selectedPages.has(thumb.pageNum);
                    return (
                      <button
                        key={thumb.pageNum}
                        onClick={() => togglePage(thumb.pageNum)}
                        className={`relative rounded-md border-2 p-1 transition-colors cursor-pointer ${
                          selected
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-border-hover"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumb.dataUrl}
                          alt={`Page ${thumb.pageNum}`}
                          className="w-full rounded"
                        />
                        <span className="block text-[10px] text-muted font-mono text-center mt-1">
                          {thumb.pageNum}
                        </span>
                        {selected && (
                          <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-accent text-background flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-muted mb-1.5 font-mono">
                {t("pdfSplit.pageRange")}
              </label>
              <input
                type="text"
                value={range}
                onChange={(e) => handleRangeChange(e.target.value)}
                placeholder={t("pdfSplit.rangePlaceholder")}
                className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-border-hover"
              />
            </div>
          </>
        )}

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={split}
            disabled={!file || splitting || selectedPages.size === 0}
            className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            {splitting ? t("pdfSplit.splitting") : t("pdfSplit.split")}
          </button>
          {resultUrl && (
            <button
              onClick={download}
              className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors"
            >
              {t("pdfSplit.download")}
            </button>
          )}
          <button
            onClick={clear}
            className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors ml-auto"
          >
            {t("action.clear")}
          </button>
        </div>

        {error && <p className="text-danger text-xs font-mono">{error}</p>}
        {resultThumbs.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("pdfSplit.resultPreview")}</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {resultThumbs.map((thumb) => (
                <div key={thumb.pageNum} className="rounded-md border border-border bg-background p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb.dataUrl} alt={`Page ${thumb.pageNum}`} className="w-full rounded" />
                  <span className="block text-[10px] text-muted font-mono text-center mt-0.5">{thumb.pageNum}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
