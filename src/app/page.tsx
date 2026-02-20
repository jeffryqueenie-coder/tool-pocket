"use client";

import Link from "next/link";
import { categories, getToolsByCategory } from "@/lib/tools";
import { useT } from "@/lib/i18n/context";

export default function Home() {
  const t = useT();

  return (
    <div>
      <section className="pt-8 pb-12 animate-fade-up">
        <p className="font-mono text-xs text-accent mb-3 tracking-wider uppercase">{t("home.tagline")}</p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-snug">
          {t("home.heading").split("{accent}")[0]}
          <span className="text-accent">{t("home.headingAccent")}</span>
          {t("home.heading").split("{accent}")[1]}
        </h1>
        <p className="mt-3 text-sm text-muted max-w-md leading-relaxed">
          {t("home.subtitle")}
        </p>
      </section>

      {categories.map((cat, catIdx) => {
        const catTools = getToolsByCategory(cat.slug);
        if (catTools.length === 0) return null;
        return (
          <section key={cat.slug} className={`mb-10 animate-fade-up animate-delay-${Math.min(catIdx + 1, 4)}`} style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-5 items-center rounded bg-surface-raised px-2 font-mono text-[10px] uppercase tracking-widest text-muted border border-border">
                {cat.icon}
              </span>
              <h2 className="text-sm font-medium text-muted">{t(`category.${cat.slug}`)}</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {catTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="tool-card group rounded-lg border border-border bg-surface p-4 block"
                  onMouseMove={undefined}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-raised font-mono text-xs text-accent border border-border">
                      {tool.icon}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors truncate">
                        {t(`tool.${tool.slug}.name`)}
                      </h3>
                      <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">{t(`tool.${tool.slug}.description`)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

    </div>
  );
}
