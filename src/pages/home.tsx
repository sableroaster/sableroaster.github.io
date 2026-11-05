import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import type { PointerEvent } from "react";
import { AppIcon, APPS, type AppId } from "@/components/app-icon";
import { Marquee } from "@/components/marquee";
import { OpenStatus } from "@/components/open-status";
import { ShareButton } from "@/components/share-button";
import { btnPrimary, wrap } from "@/components/styles";
import { HandwritingSvg } from "@/components/ui/handwriting-svg";
import { HEADLINE } from "@/generated/handwriting";
import { SITE } from "@/site";

const SOCIAL: AppId[] = ["instagram", "facebook"];
const DOCK: AppId[] = ["maps", "instagram", "facebook", "phone", "email"];

export default function Home() {
  const reduceMotion = useReducedMotion();

  // Mouse parallax: the sun drifts toward the pointer and the photo leans slightly the other way.
  const spring = { stiffness: 60, damping: 15 };
  const sunX = useSpring(useMotionValue(0), spring);
  const sunY = useSpring(useMotionValue(0), spring);
  const photoX = useTransform(sunX, (v) => -v / 3);
  const photoY = useTransform(sunY, (v) => -v / 3);
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    sunX.set(((e.clientX - r.left) / r.width - 0.5) * 36);
    sunY.set(((e.clientY - r.top) / r.height - 0.5) * 36);
  };

  return (
    <>
      <section onPointerMove={onPointerMove} className="overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
        <div className={`${wrap} grid items-center gap-10 md:grid-cols-[1.1fr_.9fr] md:gap-16`}>
          <div>
            <p className="mb-4 inline-flex items-center gap-2 font-semibold text-leaf-text">
              <MapPin className="size-5" aria-hidden />
              บางมด ทุ่งครุ
            </p>
            <h1 className="sr-only">กาแฟดี ๆ ใต้ร่มไม้</h1>
            {/* Path is prebuilt by scripts/gen-handwriting.mjs, so no font or opentype.js loads at runtime. */}
            <HandwritingSvg
              path={HEADLINE.d}
              width={HEADLINE.width}
              height={HEADLINE.height}
              strokeWidth={3.5}
              duration={reduceMotion ? 0 : 3}
              delay={reduceMotion ? 0 : 0.3}
              className="h-auto w-full max-w-[600px] text-brand"
            />
            <p className="mt-6 text-lg text-ink-soft">ดื่มกาแฟ นั่งทำงาน บรรยากาศร่มรื่น</p>
            <OpenStatus className="mt-4" />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a className={`${btnPrimary} w-full sm:w-auto`} href={SITE.maps} target="_blank" rel="noopener">
                <Navigation className="size-5" aria-hidden />
                นำทางไปร้าน
              </a>
              <ShareButton className="flex-1 sm:flex-none" />
              {SOCIAL.map((id) => (
                <motion.a key={id} {...APPS[id].link} aria-label={APPS[id].label} title={APPS[id].label} whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }}>
                  <AppIcon app={id} />
                </motion.a>
              ))}
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[420px] md:mr-0">
            {/* The outer span has no transform, so the intro can measure exactly where the sun rests. */}
            <span aria-hidden data-hero-sun className="absolute -top-7 -right-4 aspect-square w-[46%] md:-right-9">
              <motion.span style={{ x: sunX, y: sunY }} className="block size-full animate-sun rounded-full bg-sun" />
            </span>
            <motion.img
              src="img/hero-doves.jpg"
              alt="นกเขาสองตัวเกาะราวระเบียงของร้าน ด้านหลังเป็นต้นไม้สีเขียวครึ้ม"
              width={900}
              height={1200}
              fetchPriority="high"
              style={{ x: photoX, y: photoY }}
              className="relative aspect-[4/5] w-full animate-rise rounded-t-[200px] rounded-b-[28px] object-cover"
            />
          </figure>
        </div>
      </section>

      <Marquee />

      <section aria-label="ช่องทางติดต่อ" className="bg-white py-12 md:py-14">
        <ul className={`${wrap} flex flex-wrap justify-center gap-x-6 gap-y-6 sm:gap-x-12`}>
          {DOCK.map((id, i) => (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 240, damping: 18 }}
            >
              <motion.a
                {...APPS[id].link}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.92 }}
                className="flex w-[84px] flex-col items-center gap-2 text-center text-sm font-medium text-ink no-underline"
              >
                <AppIcon app={id} className="size-16 rounded-[20px]" glyphClassName="size-8" />
                {APPS[id].label}
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </section>
    </>
  );
}
