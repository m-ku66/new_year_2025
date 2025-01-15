"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OpeningAnim from "./components/OpeningAnim";
import TransitionAnim from "./components/TransitionAnim";
import { useLanguageStore } from "./store/langaugeStore";
// Memoize the content sections to prevent unnecessary rerenders
import LeftSection from "./screen_sections/LeftSection";
import CenterSection from "./screen_sections/CenterSection";
import RightSection from "./screen_sections/RightSection";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

export default function Home() {
  const [theme, setTheme] = useState<Theme>({
    backgroundColor: "#FFFFFF",
    foregroundColor: "#000000",
  });
  const [showAnim, setShowAnim] = useState(true);
  const [isTransition, setIsTransition] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [themeChangeKey, setThemeChangeKey] = useState(0); // Add this

  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const handleLanguageChange = () => {
    setLanguage(language === "en" ? "ja" : "en");
  };
  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setShowAnim(false);
    }, 2800);

    return () => clearTimeout(animationTimeout);
  }, []);

  useEffect(() => {
    if (!isTransition) {
      return;
    } else {
      setTimeout(() => {
        setIsInitialMount(false);
      }, 500);
    }
  }, [isTransition]);

  // Add this effect to handle theme changes after initial mount
  useEffect(() => {
    if (!isInitialMount) {
      setThemeChangeKey((prev) => prev + 1);
    }
  }, [theme, isInitialMount]);

  const currentDelay = isInitialMount ? 2 : 0.2;
  // console.log(isInitialMount);

  return (
    <>
      <div
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.foregroundColor,
        }}
        className="hidden md:flex container max-w-full h-screen justify-center items-center relative px-8 py-8 overflow-hidden"
      >
        {showAnim && <OpeningAnim />}
        {isTransition && <TransitionAnim />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
          className="flex w-full h-full"
        >
          <LeftSection theme={theme} delay={currentDelay} />
          <CenterSection
            key={isInitialMount ? "initial" : `theme-change-${themeChangeKey}`}
            theme={theme}
            delay={currentDelay}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
          <RightSection
            theme={theme}
            delay={currentDelay}
            setTheme={setTheme}
            setIsTransition={setIsTransition}
          />
        </motion.div>
      </div>

      {/* mobile version */}
      <div
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.foregroundColor,
        }}
        className="flex md:hidden container max-w-full h-screen justify-center items-center relative px-4 py-4 overflow-hidden"
      >
        {showAnim && <OpeningAnim />}
        {isTransition && <TransitionAnim />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
          className="flex w-full h-full"
        >
          <LeftSection theme={theme} delay={currentDelay} />
          <CenterSection
            key={isInitialMount ? "initial" : `theme-change-${themeChangeKey}`}
            theme={theme}
            delay={currentDelay}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
          <RightSection
            theme={theme}
            delay={currentDelay}
            setTheme={setTheme}
            setIsTransition={setIsTransition}
          />
        </motion.div>
      </div>
    </>
  );
}
