import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoadingScreen from "./LoadingScreen";
import Home from "./sections/Home/Home";
import About from "./sections/About/About";
import Projects from "./sections/Projects/Projects";
import Support from "./sections/Support/Support";
import Contact from "./sections/Contact/Contact";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LangProvider } from "./contexts/LangContext";
import Gallery from "./sections/Gallery/Gallery";
import VisionMission from "./sections/VisionMission/VisionMission";
import Partners from "./sections/Partners/Partners";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating initial load delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider>
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <LangProvider>
      <ThemeProvider>
        <div className="app">
          <Header />
          <main>
            <section id="home">
              <Home />
            </section>
            <section id="gallery">
              <Gallery />
            </section>
            <section id="about">
              <About />
            </section>
            <section id="projects">
              <Projects />
            </section>
            <section id="vision-mission">
              <VisionMission />
            </section>
            <section id="support">
              <Support />
            </section>
            <section id="partners">
              <Partners />
            </section>
            <section id="contact">
              <Contact />
            </section>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LangProvider>
  );
};

export default App;
