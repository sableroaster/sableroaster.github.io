import { motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Intro, shouldPlayIntro } from "@/components/intro";
import Gallery from "@/pages/gallery";
import Home from "@/pages/home";
import Visit from "@/pages/visit";

export default function App() {
  const { pathname } = useLocation();
  const [intro, setIntro] = useState(shouldPlayIntro);
  // The page mounts when the intro starts revealing it, so its own entrance animations line up with that.
  const [ready, setReady] = useState(!intro);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      {intro && <Intro onReveal={() => setReady(true)} onDone={() => setIntro(false)} />}
      <div className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="absolute -top-16 left-4 z-50 rounded-lg bg-ink px-4 py-2 text-white focus:top-3"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("main")?.focus();
          }}
        >
          ข้ามไปเนื้อหา
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {ready && (
            // Opacity only: a transform here would break position:fixed children like the toast.
            <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/visit" element={<Visit />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </motion.div>
          )}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
