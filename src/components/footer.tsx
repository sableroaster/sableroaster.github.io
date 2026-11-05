import { Mail } from "lucide-react";
import { SITE } from "@/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper py-10">
      <div className="mx-auto flex w-[min(100%-32px,1120px)] flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <img src="img/logo.jpg" alt={SITE.name} width={96} height={96} loading="lazy" className="size-24 rounded-2xl" />
        <a
          href={`mailto:${SITE.email}`}
          className="inline-flex min-h-10 items-center gap-2.5 font-head text-lg font-medium text-brand no-underline [overflow-wrap:anywhere] hover:underline"
        >
          <Mail className="size-5 shrink-0" aria-hidden />
          {SITE.email}
        </a>
      </div>
    </footer>
  );
}
