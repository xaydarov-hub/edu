// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import CourseSection from "./components/CourseSection";
import Teachers from "./components/Teachers";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Gallery from "./components/Gallery";
import About from "./components/About";
import LanguageModal from "./components/LanguageModal";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);
  const [lang, setLang] = useState("uz");
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      {/* GLOBAL WRAPPER — ENG MUHIM JOY */}
      <div
        className={`w-full min-h-screen overflow-x-hidden transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setAdminLogged={setAdminLogged}
          lang={lang}
        />

        {/* Language Modal */}
        <LanguageModal
          lang={lang}
          setLang={setLang}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />

        {/* Pages */}
        <main className="w-full overflow-x-hidden">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home darkMode={darkMode} lang={lang} adminLogged={adminLogged} />
                  <CourseSection darkMode={darkMode} lang={lang} adminLogged={adminLogged} />
                  <Teachers darkMode={darkMode} lang={lang} />
                  <Gallery darkMode={darkMode} lang={lang} adminLogged={adminLogged} />
                  <About darkMode={darkMode} lang={lang} />
                  <Contact darkMode={darkMode} lang={lang} />
                </>
              }
            />
            <Route
              path="/register"
              element={<Register darkMode={darkMode} lang={lang} />}
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer
          className={`w-full py-8 mt-16 text-center border-t transition-colors duration-500 ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <p className="text-sm sm:text-base">
            &copy; {new Date().getFullYear()} Korean Center. All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
