"use client";
import { useState, useCallback, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useT } from "@/lib/i18n/context";

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number) {
  h /= 360; s /= 100; l /= 100;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

export default function ColorPicker() {
  const t = useT();
  const [hex, setHex] = useState("#e8a634");
  const [rgbInput, setRgbInput] = useState("");
  const [hslInput, setHslInput] = useState("");
  const [copiedKey, setCopiedKey] = useState("");

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const hexStr = hex.toUpperCase();
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(""), 1500);
    } catch { /* clipboard not available */ }
  };

  const handleRgbInput = () => {
    const match = rgbInput.match(/(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      if (r <= 255 && g <= 255 && b <= 255) {
        setHex(rgbToHex(r, g, b));
      }
    }
  };

  const handleHslInput = () => {
    const match = hslInput.match(/(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?/);
    if (match) {
      const [, h, s, l] = match.map(Number);
      if (h <= 360 && s <= 100 && l <= 100) {
        const { r, g, b } = hslToRgb(h, s, l);
        setHex(rgbToHex(r, g, b));
      }
    }
  };

  const handleHexInput = (val: string) => {
    const clean = val.startsWith("#") ? val : "#" + val;
    if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
      setHex(clean.toLowerCase());
    }
  };

  return (
    <ToolLayout toolSlug="color-picker">
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="h-14 w-14 cursor-pointer rounded-md border border-border bg-transparent"
          />
          <div className="w-28 h-14 rounded-md border border-border" style={{ backgroundColor: hex }} />
          <div className="text-sm font-mono text-muted">{hexStr}</div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("colorPicker.hex")}</label>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-md border border-border bg-background p-2 font-mono text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-border-hover"
                defaultValue={hexStr}
                key={hexStr}
                onBlur={(e) => handleHexInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleHexInput((e.target as HTMLInputElement).value)}
              />
              <button onClick={() => copy("hex", hexStr)} className="rounded-md border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground hover:border-border-hover transition-colors shrink-0">
                {copiedKey === "hex" ? t("action.copied") : t("action.copy")}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("colorPicker.rgb")}</label>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-md border border-border bg-background p-2 font-mono text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-border-hover"
                placeholder={t("colorPicker.rgbPlaceholder")}
                defaultValue={`${rgb.r}, ${rgb.g}, ${rgb.b}`}
                key={rgbStr}
                onChange={(e) => setRgbInput(e.target.value)}
                onBlur={handleRgbInput}
                onKeyDown={(e) => e.key === "Enter" && handleRgbInput()}
              />
              <button onClick={() => copy("rgb", rgbStr)} className="rounded-md border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground hover:border-border-hover transition-colors shrink-0">
                {copiedKey === "rgb" ? t("action.copied") : t("action.copy")}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 font-mono">{t("colorPicker.hsl")}</label>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-md border border-border bg-background p-2 font-mono text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-border-hover"
                placeholder={t("colorPicker.hslPlaceholder")}
                defaultValue={`${hsl.h}, ${hsl.s}%, ${hsl.l}%`}
                key={hslStr}
                onChange={(e) => setHslInput(e.target.value)}
                onBlur={handleHslInput}
                onKeyDown={(e) => e.key === "Enter" && handleHslInput()}
              />
              <button onClick={() => copy("hsl", hslStr)} className="rounded-md border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground hover:border-border-hover transition-colors shrink-0">
                {copiedKey === "hsl" ? t("action.copied") : t("action.copy")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
