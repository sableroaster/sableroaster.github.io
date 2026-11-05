import { AnimatePresence, motion } from "framer-motion";
import { Armchair, Bird, CakeSlice, ChevronLeft, ChevronRight, CupSoda, Images, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppIcon, APPS } from "@/components/app-icon";
import { wrap } from "@/components/styles";
import { cn } from "@/lib/utils";

// shortcut: interior, drink and cakes are 206px originals upscaled to 824px, so they look soft; replace with real larger photos when available.
const PHOTOS = [
  {
    src: "img/hero-doves.jpg",
    alt: "นกเขาสองตัวเกาะราวระเบียงของร้าน ด้านหลังเป็นต้นไม้สีเขียวครึ้ม",
    caption: "แขกประจำหน้าระเบียง",
    icon: Bird,
    width: 900,
    height: 1200,
    tile: "col-span-2 aspect-[4/5] md:col-span-1 md:row-span-2 md:aspect-auto",
  },
  {
    src: "img/interior.jpg",
    alt: "โซนนั่งชั้นล่าง โต๊ะสีขาว เก้าอี้ไม้ และบันไดเหล็ก",
    caption: "โซนนั่งชั้นล่าง",
    icon: Armchair,
    width: 824,
    height: 824,
    tile: "aspect-square",
  },
  {
    src: "img/drink.jpg",
    alt: "ลาเต้เย็นในแก้วพิมพ์โลโก้ Sable Roaster",
    caption: "ลาเต้เย็น",
    icon: CupSoda,
    width: 824,
    height: 824,
    tile: "aspect-square",
  },
  {
    src: "img/cakes.jpg",
    alt: "เค้กสตรอว์เบอร์รีและบลูเบอร์รีหลายชิ้นวางเรียงกัน",
    caption: "เค้กผลไม้สด",
    icon: CakeSlice,
    width: 824,
    height: 824,
    tile: "aspect-square",
  },
];

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { delay: i * 0.08, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] as const },
});

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = index === null ? null : PHOTOS[index];
  const step = (by: number) => setIndex((i) => (i === null ? i : (i + by + PHOTOS.length) % PHOTOS.length));

  useEffect(() => {
    const d = dialog.current;
    if (index === null) d?.close();
    else if (!d?.open) d?.showModal();
  }, [index]);

  const navCls =
    "absolute top-1/2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white";

  return (
    <section className="py-14 md:py-20">
      <div className={wrap}>
        <h1 className="flex items-center gap-3 text-4xl text-ink md:text-5xl">
          <Images className="size-9 text-brand md:size-11" aria-hidden />
          บรรยากาศ
        </h1>

        <ul className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-3 md:gap-5">
          {PHOTOS.map((p, i) => (
            <motion.li key={p.src} {...reveal(i)} className={cn("relative overflow-hidden rounded-3xl bg-sky", p.tile)}>
              <button type="button" onClick={() => setIndex(i)} className="group absolute inset-0 block size-full cursor-zoom-in">
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-2.5 left-2.5 inline-flex max-w-[calc(100%-20px)] items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-ink shadow-sm">
                  <p.icon className="size-4 shrink-0 text-brand" aria-hidden />
                  {p.caption}
                </span>
              </button>
            </motion.li>
          ))}

          <motion.li {...reveal(PHOTOS.length)} className="flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl bg-brand p-3 text-center text-white">
            <p className="font-head text-base md:text-xl">ดูรูปเพิ่มเติม</p>
            <div className="flex gap-3">
              {(["instagram", "facebook"] as const).map((id) => (
                <motion.a key={id} {...APPS[id].link} aria-label={APPS[id].label} title={APPS[id].label} whileHover={{ y: -4 }} whileTap={{ scale: 0.92 }}>
                  <AppIcon app={id} className="md:size-16 md:rounded-[20px]" glyphClassName="md:size-8" />
                </motion.a>
              ))}
            </div>
          </motion.li>
        </ul>
      </div>

      {/* Native dialog gives Esc to close, a focus trap, and focus back on the tile. */}
      <dialog
        ref={dialog}
        aria-label={photo?.caption}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === dialog.current && setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-4 backdrop:bg-ink/85 open:flex"
      >
        {photo && (
          <figure className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-h-[78vh] w-auto max-w-[calc(100vw-32px)] rounded-3xl md:max-w-[720px]"
              />
            </AnimatePresence>
            <figcaption className="mt-3 flex items-center justify-center gap-2 font-medium text-white">
              <photo.icon className="size-5 text-sun" aria-hidden />
              {photo.caption}
            </figcaption>
            <button type="button" onClick={() => setIndex(null)} aria-label="ปิด" className="absolute top-3 right-3 grid size-12 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white">
              <X aria-hidden />
            </button>
            <button type="button" onClick={() => step(-1)} aria-label="รูปก่อนหน้า" className={`${navCls} left-3`}>
              <ChevronLeft aria-hidden />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="รูปถัดไป" className={`${navCls} right-3`}>
              <ChevronRight aria-hidden />
            </button>
          </figure>
        )}
      </dialog>
    </section>
  );
}
