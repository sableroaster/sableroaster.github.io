import { House, Images, MapPinned, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SITE } from "@/site";

const LINKS = [
  { to: "/", label: "หน้าแรก", icon: House },
  { to: "/gallery", label: "บรรยากาศ", icon: Images },
  { to: "/visit", label: "การเดินทาง", icon: MapPinned },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] w-[min(100%-32px,1120px)] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 text-brand no-underline" aria-label={`${SITE.name} หน้าแรก`}>
          <img src="img/logo.jpg" alt="" width={48} height={48} className="size-12 rounded-xl" />
          <span className="font-head text-lg font-medium">{SITE.name}</span>
        </Link>

        <button
          type="button"
          className="grid size-12 place-items-center rounded-xl bg-sky text-brand md:hidden"
          aria-expanded={open}
          aria-controls="siteNav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
          <span className="sr-only">เมนูนำทาง</span>
        </button>

        <nav
          id="siteNav"
          aria-label="เมนูหลัก"
          className={cn(
            "absolute inset-x-0 top-full flex-col gap-1 border-b border-line bg-paper px-4 pt-3 pb-5",
            "md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0",
            open ? "flex" : "hidden",
          )}
        >
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-3 font-medium text-ink-soft no-underline hover:bg-sky hover:text-brand md:py-2",
                  isActive && "bg-sky text-brand",
                )
              }
            >
              <l.icon className="size-[18px]" aria-hidden />
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
