"use client";
import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import ThemeSwitcher from "./components/ThemeSwitcher";
import FocalText from "./components/FocalText";
import CopyrightVector from "./components/CopyrightVector";
import Description from "./components/Description";
import Echo from "./components/Echo";
import OpeningAnim from "./components/OpeningAnim";
import TransitionAnim from "./components/TransitionAnim";
import { useLanguageStore } from "./store/langaugeStore";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

// Memoize the content sections to prevent unnecessary rerenders
const LeftSection = memo(
  ({ theme, delay }: { theme: Theme; delay: number }) => (
    <div className="w-1/3 h-full bg-transparent flex flex-col place-items-start justify-between">
      <Echo theme={theme} delay={delay + 1} languageSwitchDelay={0.2} />
      <Description delay={delay + 1.3} languageSwitchDelay={0.2} />
    </div>
  )
);

const CenterSection = memo(
  ({
    theme,
    delay,
    language,
    onLanguageChange,
  }: {
    theme: Theme;
    delay: number;
    language: string;
    onLanguageChange: () => void;
  }) => (
    <div className="w-1/3 h-full flex justify-center items-center relative">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <FocalText
          theme={theme}
          scale={1}
          delay={delay}
          languageSwitchDelay={0.2}
        />
      </motion.div>
      <motion.div
        className="absolute bottom-0 text-[1.2rem] seoulEB cursor-pointer select-none opacity-50"
        whileHover={{ scale: 1.1, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.p
          animate={{ opacity: [0, 1], y: [-50, 0] }}
          transition={{
            duration: 1,
            ease: [0.87, 0, 0.13, 1],
            delay: delay + 1,
          }}
          onClick={onLanguageChange}
        >
          {language === "en" ? "日本語" : "English"}
        </motion.p>
      </motion.div>
    </div>
  )
);

const RightSection = memo(
  ({
    theme,
    delay,
    setTheme,
    setIsTransition,
  }: {
    theme: Theme;
    delay: number;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    setIsTransition: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <div className="w-1/3 h-full bg-transparent flex flex-col items-end justify-between">
      <ThemeSwitcher
        setTheme={setTheme}
        width={1.3}
        delay={delay + 1.5}
        setIsTransition={setIsTransition}
        themeSwitchDelay={0.1}
      />
      <CopyrightVector theme={theme} delay={delay + 2} />
    </div>
  )
);

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
      setIsInitialMount(false);
    }
  }, [isTransition]);

  // Add this effect to handle theme changes after initial mount
  useEffect(() => {
    if (!isInitialMount) {
      setThemeChangeKey((prev) => prev + 1);
    }
  }, [theme, isInitialMount]);

  const currentDelay = isInitialMount ? 2 : 0.2;
  console.log(isInitialMount);

  return (
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
  );
}
