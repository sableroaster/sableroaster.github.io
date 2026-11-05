import { useEffect, useState } from "react";

/** Small status message; each call to show() restarts the 2.6 s timer, even with the same text. */
export function useToast() {
  const [toast, setToast] = useState({ text: "", id: 0 });

  useEffect(() => {
    if (!toast.text) return;
    const timer = setTimeout(() => setToast((t) => ({ ...t, text: "" })), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const show = (text: string) => setToast((t) => ({ text, id: t.id + 1 }));

  const node = (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-50 max-w-[calc(100%-32px)] -translate-x-1/2 rounded-2xl bg-ink px-5 py-3 font-medium text-white transition-all ${
        toast.text ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {toast.text}
    </div>
  );

  return { show, node };
}
