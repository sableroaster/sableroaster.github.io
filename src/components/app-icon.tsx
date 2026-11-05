import { Facebook, Instagram, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/site";

const external = { target: "_blank", rel: "noopener" };

type App = {
  label: string;
  text: string;
  icon: LucideIcon;
  tile: string;
  glyph: string;
  link: { href: string; target?: string; rel?: string };
};

// Phone-style app tiles, in each service's own colours so they read at a glance.
export const APPS = {
  maps: {
    label: "Google Maps",
    text: "นำทาง",
    icon: MapPin,
    tile: "bg-white ring-1 ring-line",
    glyph: "fill-[#ea4335] text-white",
    link: { href: SITE.maps, ...external },
  },
  instagram: {
    label: "Instagram",
    text: SITE.instagramHandle,
    icon: Instagram,
    tile: "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)]",
    glyph: "text-white",
    link: { href: SITE.instagram, ...external },
  },
  facebook: {
    label: "Facebook",
    text: SITE.name,
    icon: Facebook,
    tile: "bg-[#1877f2]",
    glyph: "fill-white text-white",
    link: { href: SITE.facebook, ...external },
  },
  phone: {
    label: "โทร",
    text: SITE.phone,
    icon: Phone,
    tile: "bg-[#2fb457]",
    glyph: "fill-white text-white",
    link: { href: SITE.phoneHref },
  },
  email: {
    label: "อีเมล",
    text: SITE.email,
    icon: Mail,
    tile: "bg-brand",
    glyph: "text-white",
    link: { href: `mailto:${SITE.email}` },
  },
} satisfies Record<string, App>;

export type AppId = keyof typeof APPS;

export function AppIcon({ app, className, glyphClassName }: { app: AppId; className?: string; glyphClassName?: string }) {
  const { icon: Icon, tile, glyph } = APPS[app];
  return (
    <span aria-hidden className={cn("grid size-12 shrink-0 place-items-center rounded-[14px] shadow-sm", tile, className)}>
      <Icon className={cn("size-6", glyph, glyphClassName)} />
    </span>
  );
}
