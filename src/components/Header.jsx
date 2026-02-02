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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        darkMode
          ? scrolled
            ? "bg-gradient-to-r from-[#0f0f0f]/95 via-slate-900/95 to-[#1a1a1a]/95 backdrop-blur-md py-2 shadow-lg border-b border-slate-700"
            : "bg-gradient-to-r from-[#0a0a0a] via-[#1f1f1f] to-slate-800 py-4"
          : scrolled
          ? "bg-gradient-to-r from-[#ffffff]/95 via-slate-100/95 to-[#f9f9f9]/95 backdrop-blur-md py-2 shadow-md border-b border-slate-300"
          : "bg-gradient-to-r from-[#fafafa] via-slate-50 to-[#f0f0f0] py-4"
      }`}
    >
      <div className="relative max-w-6xl mx-auto px-6 flex items-center justify-between z-10">
        {/* Logo */}
        <ScrollLink to="home" smooth duration={500} offset={-80} className="flex items-center gap-3 cursor-pointer">
          <img src="/logo.png" alt="Korean Center" className="object-contain rounded-md w-14 h-14 drop-shadow" />
          <div className="font-extrabold text-xl tracking-wide text-slate-700 dark:text-slate-200 header-font">
            KOREAN CENTER
          </div>
        </ScrollLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 flex-nowrap">
          {navItems.map((item, i) => (
            <ScrollLink
              key={i}
              to={sectionIds[i]}
              smooth
              duration={700}
              offset={-80}
              className="relative text-slate-800 dark:text-slate-200 font-medium text-lg cursor-pointer header-font group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-slate-500 dark:bg-slate-300 transition-all duration-300 group-hover:w-full"></span>
            </ScrollLink>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded border border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:bg-slate-200/40 dark:hover:bg-slate-700/40 transition"
          >
            {darkMode ? translations[lang].light : translations[lang].dark}
          </button>
          <button
            onClick={() => setAdminModal(true)}
            className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
            {translations[lang].admin}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            aria-label="menu"
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col items-center bg-slate-100 dark:bg-[#111] py-4 shadow-lg">
          {navItems.map((item, i) => (
            <ScrollLink
              key={i}
              to={sectionIds[i]}
              smooth
              duration={700}
              offset={-80}
              onClick={() => setOpen(false)}
              className="py-2 text-lg font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              {item}
            </ScrollLink>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-2 px-3 py-1 rounded border border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:bg-slate-200/40 dark:hover:bg-slate-700/40 transition"
          >
            {darkMode ? translations[lang].light : translations[lang].dark}
          </button>
        </div>
      )}

      {/* Admin Modal */}
      {adminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setAdminModal(false)}>
          <div
            className="bg-white dark:bg-slate-900 p-6 rounded-xl w-80 flex flex-col gap-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 header-font">{translations[lang].adminLogin}</h3>
            <form onSubmit={handleAdminLogin} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder={translations[lang].login}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="px-3 py-2 rounded border outline-none bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              />
              <input
                type="password"
                placeholder={translations[lang].password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-2 rounded border outline-none bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAdminModal(false)}
                  className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 transition"
                >
                  {translations[lang].cancel}
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-slate-800 dark:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-300 text-white dark:text-black transition"
                >
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
