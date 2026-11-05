// Older browsers and blocked clipboard permissions still allow the legacy execCommand route.
function legacyCopy(text: string) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.cssText = "position:fixed;opacity:0;top:0;left:0";
  const prevFocus = document.activeElement as HTMLElement | null;
  document.body.appendChild(area);
  area.select();
  area.setSelectionRange(0, text.length); // iOS ignores select() alone
  const ok = document.execCommand("copy");
  area.remove();
  prevFocus?.focus();
  if (!ok) throw new Error("copy failed");
}

/** Resolves when copied, rejects when both clipboard routes fail. */
export function copyText(text: string): Promise<void> {
  // Wrapped so a missing navigator.clipboard (http, old browsers) lands in catch too.
  return Promise.resolve()
    .then(() => navigator.clipboard.writeText(text))
    .catch(() => legacyCopy(text));
}
