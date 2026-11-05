import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";

const SEEN_KEY = "sable-intro-seen";
const SHOW_MS = 2500;
const LEAVE_MS = 950;
const EASE = [0.2, 0.7, 0.2, 1] as const;

const CUP = "M24 46h62v26a26 26 0 0 1-26 26H50a26 26 0 0 1-26-26z";
const STEAM = ["M42 36c0-7 8-9 8-16s-6-8-6-12", "M58 36c0-7 8-9 8-16s-6-8-6-12", "M74 36c0-7 8-9 8-16s-6-8-6-12"];
// x position (vw), delay (s), size (px) for each falling leaf.
const LEAVES = [
  [8, 0, 26],
  [22, 0.7, 18],
  [38, 0.25, 22],
  [55, 1, 16],
  [70, 0.4, 28],
  [84, 0.85, 20],
  [94, 0.15, 18],
];

/** First visit in this browser session only; never for people who prefer reduced motion. */
export function shouldPlayIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return false;
  }
}

/**
 * Blue screen: a cup draws and fills in front of a rising sun, then the sun flies to its spot in the
 * home hero while the page fades in beneath. onReveal mounts the page, onDone removes this overlay.
 */
export function Intro({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [{ cx, cy, size }] = useState(() => ({
    cx: window.innerWidth / 2,
    cy: window.innerHeight / 2 - 40,
    size: Math.min(window.innerWidth * 0.72, window.innerHeight * 0.48, 340),
  }));
  const [sun, setSun] = useState<{ left: number; top: number; width: number; height: number; opacity: number }>();

  // Batched with setLeaving, so the page is in the DOM by the time the effect below looks for the hero's sun.
  const leave = () => {
    onReveal();
    setLeaving(true);
  };

  useEffect(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Private mode can block storage; the intro just plays again next load.
    }
    new Image().src = "img/hero-doves.jpg"; // ready before the reveal, so the photo doesn't pop in late
    const timer = setTimeout(leave, SHOW_MS);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!leaving) return;
    // Other pages have no sun to aim at, so it grows and fades instead.
    const r = document.querySelector("[data-hero-sun]")?.getBoundingClientRect();
    setSun(
      r
        ? { left: r.left, top: r.top, width: r.width, height: r.height, opacity: 0 }
        : { left: cx - size, top: cy - size, width: size * 2, height: size * 2, opacity: 0 },
    );
    const timer = setTimeout(onDone, LEAVE_MS);
    return () => clearTimeout(timer);
  }, [leaving]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-brand"
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {LEAVES.map(([x, delay, px]) => (
        <motion.span
          key={x}
          aria-hidden
          className="absolute -top-10 text-leaf-soft"
          style={{ left: `${x}vw` }}
          initial={{ opacity: 0 }}
          animate={leaving ? { opacity: 0 } : { y: "110vh", rotate: 300, x: [0, 30, -20, 25], opacity: 0.9 }}
          transition={leaving ? { duration: 0.3 } : { duration: 3.4, delay, ease: "linear", opacity: { delay, duration: 0.3 } }}
        >
          <Leaf style={{ width: px, height: px }} />
        </motion.span>
      ))}

      <motion.div
        aria-hidden
        className="absolute rounded-full bg-sun"
        initial={{ left: cx, top: cy + size / 2, width: 0, height: 0 }}
        animate={sun ?? { left: cx - size / 2, top: cy - size / 2, width: size, height: size }}
        // It flies in front of the photo, so it dissolves on landing into the hero's own sun behind the photo.
        transition={sun ? { duration: LEAVE_MS / 1000, ease: EASE, opacity: { delay: 0.55, duration: 0.35 } } : { duration: 1, ease: EASE }}
      />

      <motion.div
        aria-hidden
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: cx, top: cy, width: size * 0.56 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox="0 0 120 112" fill="none" className="block w-full text-ink">
          <clipPath id="intro-cup">
            <path d={CUP} />
          </clipPath>
          {/* Clip on the group: framer moves the rect by transform, which would carry its own clip along. */}
          <g clipPath="url(#intro-cup)">
            <motion.rect
              x="24"
              width="62"
              height="60"
              fill="#fff"
              initial={{ y: 98 }}
              animate={{ y: 52 }}
              transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            />
          </g>
          {[CUP, "M86 52h8a12 12 0 0 1 0 24h-8", "M16 106h78"].map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.35 + i * 0.25, duration: 0.7, ease: "easeInOut" }}
            />
          ))}
          {STEAM.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0.7] }}
              transition={{ delay: 1.45 + i * 0.12, duration: 0.8 }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.img
        src="img/logo.jpg"
        alt=""
        width={96}
        height={96}
        className="absolute size-24 -translate-x-1/2 rounded-3xl shadow-lg"
        style={{ left: cx, top: cy + size / 2 + 20 }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={leaving ? { opacity: 0 } : { opacity: 1, scale: 1 }}
        transition={leaving ? { duration: 0.25 } : { delay: 1.15, type: "spring", stiffness: 260, damping: 16 }}
      />

      {!leaving && (
        <button
          type="button"
          onClick={leave}
          className="absolute right-4 bottom-4 min-h-10 cursor-pointer rounded-full border-2 border-white/60 px-5 py-1.5 font-medium text-white hover:border-white focus-visible:outline-white"
        >
          ข้าม
        </button>
      )}
    </div>
  );
}
