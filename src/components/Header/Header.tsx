import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import styles from "./Header.module.css";
import { ThemeContext } from "@/contexts/ThemeContext";
import { LuMenu, LuX } from "react-icons/lu";
import { Button } from "../Button/Button";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
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
        <div
          className={`${styles.logo} clickable`}
          onClick={() => handleNavClick("home")}
        >
          <img
            src={theme === "dark" ? "./logo-white.svg" : "./logo.svg"}
            alt="Ouroboros Logo"
          />
          <span>Ouroboros</span>
        </div>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.open : ""}`}>
          <ul className={styles.outlined}>
            <li>
              <Button variant="text" onClick={() => handleNavClick("home")}>
                {t("header.home")}
              </Button>
            </li>
            <li>
              <Button variant="text" onClick={() => handleNavClick("about")}>
                {t("header.about")}
              </Button>
            </li>
            <li>
              <Button variant="text" onClick={() => handleNavClick("projects")}>
                {t("header.projects")}
              </Button>
            </li>
            <li>
              <Button variant="text" onClick={() => handleNavClick("support")}>
                {t("header.support")}
              </Button>
            </li>
            <li>
              <Button variant="text" onClick={() => handleNavClick("contact")}>
                {t("header.contact")}
              </Button>
            </li>
          </ul>
        </nav>

        <div className={styles.controls}>
          <ThemeToggle />
          <LanguageSelector />
        </div>

        <Button
          variant="outlined"
          onMobile={true}
          style={{ padding: "0.5rem" }}
          onClick={toggleMobileMenu}
          aria-label={
            mobileMenuOpen
              ? t("ariaLabels.closeMenu")
              : t("ariaLabels.openMenu")
          }
        >
          {mobileMenuOpen ? <LuX /> : <LuMenu />}
        </Button>
      </div>
    </header>
  );
};

export default Header;
