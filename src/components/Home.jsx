// src/components/Home.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const translations = {
  en: { title: "Korean Center", quote: "Language is the most beautiful door to the human heart ✨", button: "Get Started 🚀" },
  uz: { title: "Korean Center", quote: "Til — inson qalbiga ochiladigan eng go‘zal eshikdir ✨", button: "Boshlash 🚀" },
  ru: { title: "Korean Center", quote: "Язык — это самый красивый ключ к человеческому сердцу ✨", button: "Начать 🚀" },
  kr: { title: "Korean Center", quote: "언어는 인간의 마음에 열리는 가장 아름다운 문입니다 ✨", button: "시작 🚀" },
};

export default function Home({ darkMode = false, lang = "en", adminLogged = false }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // --- Images from localStorage ---
  const defaultImages = ["/photo_1.png", "/photo_2.png", "/photo_3.png", "/photo_4.png"];
  const [images, setImages] = useState(() => {
    const stored = localStorage.getItem("carouselImages");
    return stored ? JSON.parse(stored) : defaultImages;
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("carouselImages", JSON.stringify(images));
  }, [images]);

  // Carousel timer
  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length]);

  // Dark mode stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!darkMode || !canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let mounted = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        s: Math.random() * 0.4 + 0.1,
        c: ["#ffffff", "#80dfff", "#ff99ff", "#ffff99"][Math.floor(Math.random() * 4)],
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      if (!mounted) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const st of stars) {
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = st.c;
        ctx.shadowBlur = 10;
        ctx.shadowColor = st.c;
        ctx.fill();
        st.y += st.s;
        if (st.y > canvas.height + 5) {
          st.y = -5;
          st.x = Math.random() * canvas.width;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [darkMode]);

  const goRegister = (e) => { e.preventDefault(); navigate("/register"); };

  // --- Admin modal state ---
  const [adminModal, setAdminModal] = useState(false);

  // --- Remove image ---
  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    if (index >= images.length - 1) setIndex(0);
  };

  // --- Add image from local device ---
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImages((prev) => [...prev, ev.target.result]);
    };
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  return (
    <section
      id="home"
      className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000 ${
        darkMode ? "bg-black text-white" : "bg-gradient-to-tr from-gray-100 via-gray-200 to-gray-300 text-gray-900 animate-gradient-move"
      }`}
    >
      {/* Stars */}
      {darkMode && <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full block" />}

      <div className="relative z-10 container mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* Carousel */}
        <div className="relative h-[420px] flex items-center justify-center perspective-1000">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              alt={`slide-${index}`}
              className="w-80 md:w-[28rem] h-[420px] object-cover rounded-2xl shadow-2xl border-2 border-gray-400/30"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* Admin Edit button */}
          {adminLogged && (
            <button
              onClick={() => setAdminModal(true)}
              className="absolute bottom-4 right-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit
            </button>
          )}
        </div>

        {/* Right text */}
        <div className="text-center md:text-left space-y-8">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            {translations[lang].title}
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl font-bold max-w-md mx-auto md:mx-0 bg-gradient-to-r from-gray-700 via-gray-900 to-black bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(150,150,150,0.6)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {translations[lang].quote}
          </motion.p>

          <motion.button
            onClick={goRegister}
            className="mt-6 px-10 py-4 text-lg font-bold rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-[0_0_25px_rgba(200,100,255,0.8)] transition-transform duration-300"
            initial={{ scale: 1.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.08 }}
          >
            {translations[lang].button}
          </motion.button>
        </div>
      </div>

      {/* Admin Modal */}
      {adminModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setAdminModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 p-6 rounded-xl w-[90%] max-w-3xl flex flex-col gap-4 shadow-lg overflow-y-auto max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Carousel Images</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img} alt={`img-${i}`} className="w-full h-32 object-cover rounded" />
                  <button
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <label className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer inline-block">
              Add New Image
              <input type="file" accept="image/*" onChange={handleAddImage} className="hidden" />
            </label>
          </div>
        </div>
      )}

      {/* Extra styles */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        @keyframes gradientMove { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
        .animate-gradient-move { background-size: 200% 200%; animation: gradientMove 8s ease infinite; }
      `}</style>
    </section>
  );
}
