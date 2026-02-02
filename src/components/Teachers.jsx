import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const translations = {
  en: {
    sectionTitle: "Our",
    sectionHighlight: "Teachers",
    sectionDesc: "Meet our professional Korean language teachers.",
    teachers: [
      { name: "Olimov Mo'minjon", role: "Korean Language Teacher", bio: "10 years of teaching experience in Korean grammar, speaking, and writing." },
      { name: "Orifjonov Muhammadqodir", role: "Korean Language Teacher", bio: "Specialist in TOPIK preparation and conversational fluency." },
    ],
    skills: ["TOPIK", "Grammar", "Speaking", "Writing"],
    cta: "Register",
  },
  uz: {
    sectionTitle: "Bizning",
    sectionHighlight: "O‘qituvchilar",
    sectionDesc: "Professional koreys tili o‘qituvchilarimiz bilan tanishing.",
    teachers: [
      { name: "Olimov Mo'minjon", role: "Koreys tili o‘qituvchisi", bio: "10 yillik tajribaga ega, grammatika va og‘zaki nutqni o‘rgatadi." },
      { name: "Orifjonov Muhammadqodir", role: "Koreys tili o‘qituvchisi", bio: "TOPIK imtihonlariga tayyorlash bo‘yicha mutaxassis." },
    ],
    skills: ["TOPIK", "Grammatika", "Nutq", "Yozuv"],
    cta: "Ro‘yxatdan o‘tish",
  },
  ru: {
    sectionTitle: "Наши",
    sectionHighlight: "Преподаватели",
    sectionDesc: "Познакомьтесь с нашими профессиональными преподавателями корейского языка.",
    teachers: [
      { name: "Олимов Моминджон", role: "Учитель корейского языка", bio: "10 лет опыта преподавания грамматики, разговорной речи и письма." },
      { name: "Орифджонов Мухаммадкодир", role: "Учитель корейского языка", bio: "Специалист по подготовке к TOPIK и разговорной практике." },
    ],
    skills: ["TOPIK", "Грамматика", "Разговор", "Письмо"],
    cta: "Регистрация",
  },
  kr: {
    sectionTitle: "우리",
    sectionHighlight: "강사",
    sectionDesc: "우리 전문 한국어 강사를 만나보세요.",
    teachers: [
      { name: "올리모브 모민존", role: "한국어 강사", bio: "한국어 문법, 회화 및 쓰기 10년 경력 보유." },
      { name: "오리프조노프 무함마드코디르", role: "TOPIK 준비 및 회화 전문 강사." },
    ],
    skills: ["TOPIK", "문법", "회화", "쓰기"],
    cta: "등록하기",
  },
};

export default function Teachers({ darkMode = false, lang = "en" }) {
  const controls = useAnimation();
  const [refSection, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const containerRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const navigate = useNavigate();

  const t = translations[lang] || translations.en;

  useEffect(() => {
    if (inView) controls.start("show");
  }, [inView, controls]);

  function handlePointerMove(e) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setPointer({ x, y });
  }

  const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.22, 0.9, 0.3, 1] } },
    hover: { scale: 1.05, rotate: -1 },
  };

  return (
    <section
      id="teachers"
      ref={refSection}
      onMouseMove={handlePointerMove}
      className={`relative py-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden transition-colors duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {darkMode ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05),transparent_40%)] animate-pulse" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,0,0,0.05),transparent_40%)] animate-pulse" />
          </>
        )}
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={containerVariants}
          className="mb-14 text-center"
        >
          <motion.h2
            variants={cardVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            {t.sectionTitle}{" "}
            <span
              className={`ml-2 text-transparent bg-clip-text ${
                darkMode
                  ? "bg-gradient-to-r from-gray-200 to-gray-400"
                  : "bg-gradient-to-r from-blue-600 to-indigo-400"
              }`}
            >
              {t.sectionHighlight}
            </span>
          </motion.h2>
          {t.sectionDesc && (
            <motion.p
              variants={cardVariants}
              className={`mt-4 max-w-2xl mx-auto text-base sm:text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {t.sectionDesc}
            </motion.p>
          )}
        </motion.div>

        {/* Teachers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12"
        >
          {t.teachers?.map((teacher, i) => {
            const rx = (pointer.y - 0.5) * -10;
            const ry = (pointer.x - 0.5) * 10;
            const glareX = (pointer.x - 0.5) * 40;
            const glareY = (pointer.y - 0.5) * 40;

            return (
              <motion.article
                key={i}
                variants={cardVariants}
                whileHover="hover"
                className={`relative rounded-3xl overflow-hidden shadow-2xl border backdrop-blur-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gradient-to-br from-gray-800/80 to-gray-900/90 border-gray-700/50"
                    : "bg-gradient-to-br from-white to-gray-100 border-gray-300"
                }`}
                style={{ transformStyle: "preserve-3d", perspective: 1200 }}
              >
                <motion.div
                  className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
                  style={{
                    transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
                    transition: "transform 0.12s linear",
                    willChange: "transform",
                  }}
                >
                  {/* Avatar */}
                  <div className="w-full sm:w-[140px] flex-shrink-0 text-center sm:text-left">
                    <div className="relative inline-block mx-auto sm:mx-0">
                      <div
                        className={`w-32 h-32 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-xl border ${
                          darkMode ? "bg-gray-700 border-gray-500" : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        <img
                          src={i === 0 ? "/user.png" : "/user2.png"}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <h3
                        className={`text-lg sm:text-xl font-semibold ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {teacher.name}
                      </h3>
                      <p
                        className={`text-sm sm:text-base ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {teacher.role}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 mt-4 sm:mt-0">
                    {teacher.bio && (
                      <p
                        className={`mb-4 sm:mb-5 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {teacher.bio}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
                      {t.skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                            darkMode ? "bg-gray-700/40 text-gray-200" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => navigate("/register")}
                        className={`px-5 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-xl hover:scale-105 transition ${
                          darkMode
                            ? "bg-gradient-to-r from-gray-300 to-gray-500 text-black"
                            : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                        }`}
                      >
                        {t.cta}
                      </button>
                    </div>
                  </div>

                  {/* Glare effect */}
                  <div
                    className="pointer-events-none absolute inset-0 mix-blend-screen opacity-20"
                    style={{
                      background: `radial-gradient(circle at ${50 + glareX}% ${50 + glareY}%, rgba(255,255,255,0.25), transparent 25%)`,
                    }}
                  />
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
