"use client";
import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

interface PageThumb {
  pageNum: number;
  dataUrl: string;
}

interface PdfFile {
  name: string;
  data: ArrayBuffer;
}

export default function PdfMerge() {
  const t = useT();
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState("");
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [previewThumbs, setPreviewThumbs] = useState<PageThumb[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [resultThumbs, setResultThumbs] = useState<PageThumb[]>([]);

  const renderThumbnails = async (data: ArrayBuffer): Promise<PageThumb[]> => {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    // Copy data to avoid detached ArrayBuffer issues
    const copy = data.slice(0);
    const pdf = await pdfjsLib.getDocument({
      data: copy,
      cMapUrl: "/pdfjs/cmaps/",
      cMapPacked: true,
      standardFontDataUrl: "/pdfjs/standard_fonts/",
    }).promise;
    const results: PageThumb[] = [];
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
    return results;
  };

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: Promise<PdfFile>[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type === "application/pdf") {
        newFiles.push(file.arrayBuffer().then(data => ({ name: file.name, data })));
      }
    }
    Promise.all(newFiles).then(loaded => setFiles(prev => [...prev, ...loaded]));
    setError("");
    setResultUrl("");
    setResultThumbs([]);
  }, []);

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
    if (previewIdx === idx) { setPreviewIdx(null); setPreviewThumbs([]); }
    else if (previewIdx !== null && previewIdx > idx) setPreviewIdx(previewIdx - 1);
    setResultUrl("");
    setResultThumbs([]);
  };

  const moveFile = (idx: number, dir: -1 | 1) => {
    setFiles(prev => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
    if (previewIdx === idx) setPreviewIdx(idx + dir);
    else if (previewIdx === idx + dir) setPreviewIdx(idx);
    setResultUrl("");
    setResultThumbs([]);
  };

  const togglePreview = async (idx: number) => {
    if (previewIdx === idx) {
      setPreviewIdx(null);
      setPreviewThumbs([]);
      return;
    }
    setPreviewIdx(idx);
    setPreviewThumbs([]);
    setPreviewLoading(true);
    try {
      const thumbs = await renderThumbnails(files[idx].data);
      setPreviewThumbs(thumbs);
    } catch {
      setPreviewThumbs([]);
    } finally {
      setPreviewLoading(false);
    }
  };

  const merge = async () => {
    if (files.length < 2) return;
    setMerging(true);
    setError("");
    setResultUrl("");
    setResultThumbs([]);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      for (const file of files) {
        const doc = await PDFDocument.load(file.data.slice(0));
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        for (const page of pages) {
          merged.addPage(page);
        }
      }
      const bytes = await merged.save();
      const thumbData = bytes.slice(0).buffer;
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);

      // Render merged result thumbnails
      const thumbs = await renderThumbnails(thumbData);
      setResultThumbs(thumbs);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("pdfMerge.error"));
    } finally {
      setMerging(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `merged-${Date.now()}.pdf`;
    a.click();
  };

  const clear = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFiles([]);
    setError("");
    setPreviewIdx(null);
    setPreviewThumbs([]);
    setResultUrl("");
    setResultThumbs([]);
  };

  return (
    <ToolLayout toolSlug="pdf-merge">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("pdfMerge.upload")}</label>
          <div
            className="rounded-md border-2 border-dashed border-border hover:border-border-hover p-8 text-center cursor-pointer transition-colors"
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleFiles(e.dataTransfer.files); }}
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = ".pdf";
              input.multiple = true;
              input.onchange = () => handleFiles(input.files);
              input.click();
            }}
          >
            <p className="text-sm text-muted">{t("pdfMerge.dropText")}</p>
          </div>
        </div>
        {files.length > 0 && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted font-mono">{t("pdfMerge.files", { count: files.length })}</label>
            <div className="rounded-md border border-border bg-background p-2 space-y-1">
              {files.map((file, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface-raised text-sm">
                    <span className="flex-1 font-mono text-xs truncate">{file.name}</span>
                    <button onClick={() => togglePreview(i)} className="text-muted hover:text-foreground text-xs">
                      {t("pdfMerge.preview")}
                    </button>
                    <button onClick={() => moveFile(i, -1)} disabled={i === 0} className="text-muted hover:text-foreground text-xs disabled:opacity-30">↑</button>
                    <button onClick={() => moveFile(i, 1)} disabled={i === files.length - 1} className="text-muted hover:text-foreground text-xs disabled:opacity-30">↓</button>
                    <button onClick={() => removeFile(i)} className="text-danger hover:text-danger/80 text-xs">×</button>
                  </div>
                  {previewIdx === i && (
                    <div className="px-2 pb-2">
                      {previewLoading ? (
                        <p className="text-xs text-muted font-mono py-2">{t("pdfImage.converting")}</p>
                      ) : previewThumbs.length > 0 ? (
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 mt-1">
                          {previewThumbs.map((thumb) => (
                            <div key={thumb.pageNum} className="rounded border border-border p-0.5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={thumb.dataUrl} alt={`Page ${thumb.pageNum}`} className="w-full rounded" />
                              <span className="block text-[9px] text-muted font-mono text-center">{thumb.pageNum}</span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2 flex-wrap">
          <button onClick={merge} disabled={files.length < 2 || merging} className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors disabled:opacity-30 disabled:pointer-events-none">
            {merging ? t("pdfMerge.merging") : t("pdfMerge.merge")}
          </button>
          {resultUrl && (
            <button onClick={download} className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors">
              {t("pdfMerge.download")}
            </button>
          )}
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors ml-auto">
            {t("action.clear")}
          </button>
        </div>
        {error && <p className="text-danger text-xs font-mono">{error}</p>}
        {resultThumbs.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("pdfMerge.resultPreview")}</label>
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
