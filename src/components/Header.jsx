import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const ADMIN_USER = "z";
const ADMIN_PASS = "2";

const translations = {
  en: { nav: ["Home", "Courses", "Teachers", "Gallery", "About Us", "Contact" ], dark: "🌙", light: "☀️", admin: "Admin", adminLogin: "Admin Login", login: "Login", password: "Password", cancel: "Cancel", submit: "Login" },
  uz: { nav: ["Bosh sahifa", "Kurslar", "O‘qituvchilar", "Galereya", "Biz haqimizda", "Aloqa"], dark: "🌙", light: "☀️", admin: "Admin", adminLogin: "Admin Kirish", login: "Login", password: "Parol", cancel: "Bekor qilish", submit: "Kirish" },
  ru: { nav: ["Главная", "Курсы", "Учителя", "Галерея", "О нас" ,  "Контакты" ], dark: "🌙", light: "☀️", admin: "Админ", adminLogin: "Вход для Админа", login: "Логин", password: "Пароль", cancel: "Отмена", submit: "Войти" },
  kr: { nav: ["홈", "강좌", "교사", "갤러리", "회사 소개", "문의"], dark: "🌙", light: "☀️", admin: "관리자", adminLogin: "관리자 로그인", login: "로그인", password: "비밀번호", cancel: "취소", submit: "로그인" },
};

const sectionIds = ["home", "courses", "teachers", "gallery", "about" , "contact" ];

export default function Header({ darkMode, setDarkMode, setAdminLogged, lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = translations[lang].nav;

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (login === ADMIN_USER && password === ADMIN_PASS) {
      setAdminLogged(true);
      setAdminModal(false);
      setLogin("");
      setPassword("");
      alert("Admin kirildi!");
    } else alert("Login yoki parol noto‘g‘ri!");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 backdrop-blur-md ${
        darkMode
          ? scrolled
            ? "bg-[#111]/95 shadow-2xl border-b border-gray-700 py-2"
            : "bg-[#111] py-3"
          : scrolled
          ? "bg-white/90 shadow-md border-b border-gray-300 py-2"
          : "bg-white py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <ScrollLink
          to="home"
          smooth
          duration={500}
          offset={-80}
          className="flex items-center gap-3 cursor-pointer shrink-0"
        >
          <motion.img
            src="/logo.png"
            alt="Korean Center"
            className="w-12 h-12 object-contain rounded-xl"
            whileHover={{ scale: 1.15, rotate: 8, transition: { type: "spring", stiffness: 400 } }}
          />
          <span className="font-bold text-lg sm:text-2xl dark:text-white text-gray-900 header-font">
            KOREAN CENTER
          </span>
        </ScrollLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative cursor-pointer"
            >
              <ScrollLink
                to={sectionIds[i]}
                smooth
                duration={600}
                offset={-80}
                className="text-gray-800 dark:text-white font-semibold group"
              >
                {item}
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 w-0 h-[3px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 group-hover:w-full transition-all"
                />
              </ScrollLink>
            </motion.div>
          ))}

          {/* Dark/Light Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-1 rounded-xl border border-gray-400 dark:border-gray-600 hover:bg-gray-200/40 dark:hover:bg-gray-700/40"
          >
            {darkMode ? translations[lang].light : translations[lang].dark}
          </motion.button>

          {/* Admin */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setAdminModal(true)}
            className="px-4 py-1 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:opacity-90"
          >
            {translations[lang].admin}
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-12 h-12 rounded-xl flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {mobileOpen ? "✕" : "☰"}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden w-full overflow-x-hidden bg-gray-100 dark:bg-[#111] py-4 shadow-xl backdrop-blur-md"
          >
            {navItems.map((item, i) => (
              <ScrollLink
                key={i}
                to={sectionIds[i]}
                smooth
                duration={600}
                offset={-80}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-center text-gray-800 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors rounded-xl mx-2"
              >
                {item}
              </ScrollLink>
            ))}
            <div className="flex justify-center mt-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-1 rounded-xl border border-gray-400 dark:border-gray-600"
              >
                {darkMode ? translations[lang].light : translations[lang].dark}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Modal */}
      <AnimatePresence>
        {adminModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={() => setAdminModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateX: -10 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.8, rotateX: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-[#222] p-6 rounded-3xl w-full max-w-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                {translations[lang].adminLogin}
              </h3>
              <form onSubmit={handleAdminLogin} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder={translations[lang].login}
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="px-3 py-2 rounded-lg border outline-none bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  placeholder={translations[lang].password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 rounded-lg border outline-none bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setAdminModal(false)}
                    className="px-4 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {translations[lang].cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:opacity-90"
                  >
                    {translations[lang].submit}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .header-font { font-family: 'Share Tech Mono', monospace; }
      `}</style>
    </motion.header>
  );
}
