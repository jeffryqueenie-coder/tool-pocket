import { render, type RenderOptions } from "@testing-library/react";
import { LocaleProvider } from "@/lib/i18n/context";
import type { ReactElement } from "react";

export function renderWithLocale(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, {
    wrapper: ({ children }) => <LocaleProvider>{children}</LocaleProvider>,
    ...options,
  });
}
