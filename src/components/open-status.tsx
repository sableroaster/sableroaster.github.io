import { useEffect, useState } from "react";
import { getStatus } from "@/lib/hours";

export function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState(() => getStatus(new Date()));

  useEffect(() => {
    const id = setInterval(() => setStatus(getStatus(new Date())), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${
        status.open ? "bg-leaf-soft text-leaf-text" : "bg-sky text-ink-soft"
      } ${className}`}
    >
      <span className={`size-2 rounded-full ${status.open ? "bg-leaf" : "bg-ink-soft"}`} aria-hidden />
      {status.label}
    </span>
  );
}
