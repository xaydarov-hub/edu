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
  const [isModalOpen, setIsModalOpen] = useState(true); // Boshida til tanlash

  // Dark mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <Router>
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

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home darkMode={darkMode} lang={lang} adminLogged={adminLogged} />
              <CourseSection darkMode={darkMode} lang={lang} adminLogged={adminLogged} />
              <Teachers darkMode={darkMode} lang={lang} />
              <Gallery darkMode={darkMode} lang={lang} adminLogged={adminLogged} />
              <Contact darkMode={darkMode} lang={lang} />
              <About darkMode={darkMode} lang={lang} />
            </>
          }
        />
        <Route path="/register" element={<Register darkMode={darkMode} lang={lang} />} />
      </Routes>
    </Router>
  );
}

export default App;
