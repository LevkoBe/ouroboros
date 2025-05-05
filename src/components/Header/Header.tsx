import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import styles from "./Header.module.css";
import { ThemeContext } from "@/contexts/ThemeContext";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = React.useContext(ThemeContext);
  const scrollToSection = useScrollToSection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => handleNavClick("home")}>
          <img
            src={theme === "dark" ? "/logo-white.svg" : "/logo.svg"}
            alt="Ouroboros Logo"
          />
          <span>Ouroboros</span>
        </div>

        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.open : ""}`}>
          <ul>
            <li>
              <button onClick={() => handleNavClick("home")}>
                {t("header.home")}
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick("about")}>
                {t("header.about")}
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick("projects")}>
                {t("header.projects")}
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick("support")}>
                {t("header.support")}
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick("contact")}>
                {t("header.contact")}
              </button>
            </li>
          </ul>
        </nav>

        <div className={styles.controls}>
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
