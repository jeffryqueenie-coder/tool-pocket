"use client";
import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

interface ImageFile {
  name: string;
  data: ArrayBuffer;
  type: string;
  preview: string;
}

interface PageThumb {
  pageNum: number;
  dataUrl: string;
}

export default function ImageToPdf() {
  const t = useT();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [resultThumbs, setResultThumbs] = useState<PageThumb[]>([]);

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const promises: Promise<ImageFile>[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file.type.startsWith("image/")) continue;
      promises.push(
        file.arrayBuffer().then(data => ({
          name: file.name,
          data,
          type: file.type,
          preview: URL.createObjectURL(file),
        }))
      );
    }
    Promise.all(promises).then(loaded => setImages(prev => [...prev, ...loaded]));
    setError("");
    setResultUrl("");
    setResultThumbs([]);
  }, []);

  const removeImage = (idx: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
    setResultUrl("");
    setResultThumbs([]);
  };

  const moveImage = (idx: number, dir: -1 | 1) => {
    setImages(prev => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
    setResultUrl("");
    setResultThumbs([]);
  };

  const convertToCompatible = async (
    imgData: ArrayBuffer,
    imgType: string,
    PDFDocument: typeof import("pdf-lib").PDFDocument
  ): Promise<{ embed: (doc: import("pdf-lib").PDFDocument) => Promise<import("pdf-lib").PDFImage>; width: number; height: number }> => {
    if (imgType === "image/png") {
      const img = await PDFDocument.create().then(async d => {
        const embedded = await d.embedPng(imgData);
        return { width: embedded.width, height: embedded.height };
      });
      return {
        embed: async (doc) => doc.embedPng(imgData),
        ...img,
      };
    }
    if (imgType === "image/jpeg" || imgType === "image/jpg") {
      const img = await PDFDocument.create().then(async d => {
        const embedded = await d.embedJpg(imgData);
        return { width: embedded.width, height: embedded.height };
      });
      return {
        embed: async (doc) => doc.embedJpg(imgData),
        ...img,
      };
    }
    // Convert other formats to PNG via canvas
    const blob = new Blob([imgData], { type: imgType });
    const url = URL.createObjectURL(blob);
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0);
    URL.revokeObjectURL(url);

    const pngBlob = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), "image/png"));
    const pngData = await pngBlob.arrayBuffer();
    return {
      embed: async (doc) => doc.embedPng(pngData),
      width: bitmap.width,
      height: bitmap.height,
    };
  };

  const createPdf = async () => {
    if (images.length === 0) return;
    setCreating(true);
    setError("");
    setResultUrl("");
    setResultThumbs([]);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();

      for (const img of images) {
        const { embed, width, height } = await convertToCompatible(img.data, img.type, PDFDocument);
        const embedded = await embed(doc);
        const page = doc.addPage([width, height]);
        page.drawImage(embedded, { x: 0, y: 0, width, height });
      }

      const bytes = await doc.save();
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
      setResultThumbs(results);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("imgPdf.error"));
    } finally {
      setCreating(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `images-${Date.now()}.pdf`;
    a.click();
  };

  const clear = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setError("");
    setResultUrl("");
    setResultThumbs([]);
  };

  return (
    <ToolLayout toolSlug="image-to-pdf">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("imgPdf.upload")}</label>
          <div
            className="rounded-md border-2 border-dashed border-border hover:border-border-hover p-8 text-center cursor-pointer transition-colors"
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleFiles(e.dataTransfer.files); }}
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.multiple = true;
              input.onchange = () => handleFiles(input.files);
              input.click();
            }}
          >
            <p className="text-sm text-muted">{t("imgPdf.dropText")}</p>
            <p className="text-xs text-muted/60 mt-1">{t("imgPdf.formats")}</p>
          </div>
        </div>
        {images.length > 0 && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted font-mono">{t("imgPdf.images", { count: images.length })}</label>
            <div className="rounded-md border border-border bg-background p-2 space-y-1">
              {images.map((img, i) => (
                <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface-raised">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.preview} alt={img.name} className="h-8 w-8 object-cover rounded" />
                  <span className="flex-1 font-mono text-xs truncate">{img.name}</span>
                  <button onClick={() => moveImage(i, -1)} disabled={i === 0} className="text-muted hover:text-foreground text-xs disabled:opacity-30">↑</button>
                  <button onClick={() => moveImage(i, 1)} disabled={i === images.length - 1} className="text-muted hover:text-foreground text-xs disabled:opacity-30">↓</button>
                  <button onClick={() => removeImage(i)} className="text-danger hover:text-danger/80 text-xs">×</button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2 flex-wrap">
          <button onClick={createPdf} disabled={images.length === 0 || creating} className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors disabled:opacity-30 disabled:pointer-events-none">
            {creating ? t("imgPdf.creating") : t("imgPdf.create")}
          </button>
          {resultUrl && (
            <button onClick={download} className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-background hover:bg-accent-dim transition-colors">
              {t("imgPdf.download")}
            </button>
          )}
          <button onClick={clear} className="rounded-md border border-border px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-border-hover transition-colors ml-auto">
            {t("action.clear")}
          </button>
        </div>
        {error && <p className="text-danger text-xs font-mono">{error}</p>}
        {resultThumbs.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("imgPdf.resultPreview")}</label>
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
