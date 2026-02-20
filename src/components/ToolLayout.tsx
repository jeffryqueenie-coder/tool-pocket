"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import { useT } from "@/lib/i18n/context";

interface ToolLayoutProps {
  toolSlug: string;
  children: React.ReactNode;
}

export default function ToolLayout({ toolSlug, children }: ToolLayoutProps) {
  const t = useT();
  const title = t(`tool.${toolSlug}.name`);
  const description = t(`tool.${toolSlug}.description`);
  const currentTool = tools.find((t) => t.slug === toolSlug);
  const currentCategory = currentTool?.category;

  const sameCategory = tools.filter((t) => t.category === currentCategory && t.slug !== toolSlug);
  const others = tools.filter((t) => t.category !== currentCategory && t.slug !== toolSlug);
  const related = [...sameCategory, ...others].slice(0, 3);

  return (
    <div className="animate-fade-up" style={{ opacity: 0 }}>
      <div className="mb-5">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors font-mono">
          <span>←</span> {t("toolLayout.back")}
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1.5 text-sm text-muted">{description}</p>
      </div>

      <div className="workspace">
        <div className="workspace-header">
          <div className="workspace-dot" />
          <div className="workspace-dot" />
          <div className="workspace-dot" />
          <span className="ml-2 font-mono text-[11px] text-muted">{title.toLowerCase()}</span>
        </div>
        <div className="p-5">
          {children}
        </div>
      </div>

      <section className="mt-10 animate-fade-up animate-delay-2" style={{ opacity: 0 }}>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xs font-medium text-muted uppercase tracking-wider">{t("toolLayout.related")}</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {related.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="tool-card group flex items-center gap-3 rounded-lg border border-border bg-surface p-3 transition-colors"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-raised font-mono text-[10px] text-accent border border-border">
                {tool.icon}
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors truncate">
                {t(`tool.${tool.slug}.name`)}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
