import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const ADMIN_USER = "z";
const ADMIN_PASS = "2";

const translations = {
  en: { nav: ["Home", "Courses", "Teachers", "Gallery", "Contact", "About Us"], dark: "🌙", light: "☀️", admin: "Admin", adminLogin: "Admin Login", login: "Login", password: "Password", cancel: "Cancel", submit: "Login" },
  uz: { nav: ["Bosh sahifa", "Kurslar", "O‘qituvchilar", "Galereya", "Aloqa", "Biz haqimizda"], dark: "🌙", light: "☀️", admin: "Admin", adminLogin: "Admin Kirish", login: "Login", password: "Parol", cancel: "Bekor qilish", submit: "Kirish" },
  ru: { nav: ["Главная", "Курсы", "Учителя", "Галерея", "Контакты", "О нас"], dark: "🌙", light: "☀️", admin: "Админ", adminLogin: "Вход для Админа", login: "Логин", password: "Пароль", cancel: "Отмена", submit: "Войти" },
  kr: { nav: ["홈", "강좌", "교사", "갤러리", "문의", "회사 소개"], dark: "🌙", light: "☀️", admin: "관리자", adminLogin: "관리자 로그인", login: "로그인", password: "비밀번호", cancel: "취소", submit: "로그인" },
};

const sectionIds = ["home", "courses", "teachers", "gallery", "contact", "about"];

export default function Header({ darkMode, setDarkMode, setAdminLogged, lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 w-full overflow-x-hidden transition-all duration-500 ${
        darkMode
          ? scrolled
            ? "bg-[#111]/95 backdrop-blur-md py-2 shadow-lg border-b border-slate-700"
            : "bg-[#111] py-3"
          : scrolled
          ? "bg-white/95 backdrop-blur-md py-2 shadow-md border-b border-slate-300"
          : "bg-white py-3"
      }`}
    >
      {/* HEADER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <ScrollLink to="home" smooth duration={500} offset={-80} className="flex items-center gap-3 cursor-pointer shrink-0">
          <img src="/logo.png" alt="Korean Center" className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md" />
          <span className="font-bold text-base sm:text-lg dark:text-white text-gray-800 header-font whitespace-nowrap">
            KOREAN CENTER
          </span>
        </ScrollLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item, i) => (
            <ScrollLink
              key={i}
              to={sectionIds[i]}
              smooth
              duration={600}
              offset={-80}
              className="relative text-gray-800 dark:text-white font-medium cursor-pointer group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-700 dark:bg-gray-300 transition-all duration-300 group-hover:w-full"></span>
            </ScrollLink>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded border border-gray-400 dark:border-gray-600 hover:bg-gray-200/40 dark:hover:bg-gray-700/40"
          >
            {darkMode ? translations[lang].light : translations[lang].dark}
          </button>
          <button
            onClick={() => setAdminModal(true)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {translations[lang].admin}
          </button>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 rounded flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden w-full overflow-x-hidden bg-gray-100 dark:bg-[#111] py-3"
        >
          {navItems.map((item, i) => (
            <ScrollLink
              key={i}
              to={sectionIds[i]}
              smooth
              duration={600}
              offset={-80}
              onClick={() => setOpen(false)}
              className="block py-3 text-center text-gray-800 dark:text-white font-medium"
            >
              {item}
            </ScrollLink>
          ))}
          <div className="flex justify-center mt-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded border border-gray-400 dark:border-gray-600"
            >
              {darkMode ? translations[lang].light : translations[lang].dark}
            </button>
          </div>
        </motion.div>
      )}

      {/* ADMIN MODAL */}
      {adminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => setAdminModal(false)}>
          <div
            className="bg-white dark:bg-[#222] p-5 rounded-xl w-full max-w-sm shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
              {translations[lang].adminLogin}
            </h3>
            <form onSubmit={handleAdminLogin} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder={translations[lang].login}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="px-3 py-2 rounded border outline-none bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
              />
              <input
                type="password"
                placeholder={translations[lang].password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-2 rounded border outline-none bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setAdminModal(false)} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">
                  {translations[lang].cancel}
                </button>
                <button type="submit" className="px-3 py-1 rounded bg-gray-800 dark:bg-gray-200 text-white dark:text-black">
                  {translations[lang].submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .header-font { font-family: 'Share Tech Mono', monospace; }
      `}</style>
    </motion.header>
  );
}
