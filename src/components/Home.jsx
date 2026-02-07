import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const translations = {
  en: {
    title: "Korean Center",
    quote: "Language is the most beautiful door to the human heart ✨",
    button: "Get Started 🚀",
  },
  uz: {
    title: "Korean Center",
    quote: "Til — inson qalbiga ochiladigan eng go‘zal eshikdir ✨",
    button: "Boshlash 🚀",
  },
  ru: {
    title: "Korean Center",
    quote: "Язык — ключ к сердцу человека ✨",
    button: "Начать 🚀",
  },
  kr: {
    title: "Korean Center",
    quote: "언어는 인간의 마음에 열리는 가장 아름다운 문입니다 ✨",
    button: "시작 🚀",
  },
};

/* 🔥 AUTO LOAD CAROUSEL IMAGES */
const imageModules = import.meta.glob(
  "/public/carousel/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

const carouselImages = Object.values(imageModules)
  .map((img, i) => ({ id: i, src: img.default }))
  .reverse(); // newest first

export default function Home({ darkMode = false, lang = "en" }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (!carouselImages.length) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  /* ================= STARS (DARK MODE) ================= */
  useEffect(() => {
    if (!darkMode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let mounted = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        s: Math.random() * 0.6 + 0.2,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!mounted) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        s.y += s.s;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [darkMode]);

  /* ================= RENDER ================= */
  return (
    <section
      className={`relative min-h-screen overflow-hidden ${
        darkMode
          ? "bg-gradient-to-b from-black via-gray-900 to-black text-white"
          : "bg-gradient-to-b from-gray-100 to-white text-gray-900"
      }`}
    >
      {darkMode && <canvas ref={canvasRef} className="absolute inset-0" />}

      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-14">
        {/* TEXT */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            {translations[lang].title}
          </h1>
          <p className="text-xl max-w-xl">
            {translations[lang].quote}
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-full bg-indigo-600 text-white font-bold hover:scale-105 transition"
          >
            {translations[lang].button}
          </button>
        </div>

        {/* CAROUSEL */}
        <div className="flex-1 relative h-[440px] flex items-center justify-center perspective-[1200px]">
          <AnimatePresence mode="wait">
            {carouselImages[index] && (
              <motion.img
                key={carouselImages[index].src}
                src={carouselImages[index].src}
                className="w-[28rem] h-[440px] object-cover rounded-[2.5rem]
                shadow-[0_40px_100px_rgba(0,0,0,0.35)]"
                initial={{ opacity: 0, rotateY: 80, scale: 0.85 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -80, scale: 0.85 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
