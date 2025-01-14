"use client";
import React, { useState, memo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "../store/langaugeStore";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

type Props = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  width?: number;
  delay?: number;
  themeSwitchDelay?: number;
  setIsTransition: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeSwitcher = memo(
  ({
    setTheme,
    width = 2,
    delay = 3,
    themeSwitchDelay = 0.2,
    setIsTransition,
  }: Props) => {
    const [selectedTheme, setSelectedTheme] = useState("default");
    const [clickable, setClickable] = useState(true);
    const [isInitialMount, setIsInitialMount] = useState(true);
    const [isThemeChanging, setIsThemeChanging] = useState(false);
    const language = useLanguageStore((state) => state.language);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsInitialMount(false);
      }, (delay + 2) * 1000);
      return () => clearTimeout(timer);
    }, [delay]);

    const changeTheme = useCallback(
      (targetTheme: string) => {
        if (!clickable || isThemeChanging) return;

        setClickable(false);
        setIsThemeChanging(true);
        setIsTransition(true);

        const themeMap: Record<string, Theme> = {
          red: { backgroundColor: "#E90000", foregroundColor: "#FFFFFF" },
          blue: { backgroundColor: "#003AE9", foregroundColor: "#FFFFFF" },
          yellow: { backgroundColor: "#E9E500", foregroundColor: "#000000" },
          default: { backgroundColor: "#FFFFFF", foregroundColor: "#000000" },
        };

        // Coordinate all state changes with the transition
        setTimeout(() => {
          setTheme(themeMap[targetTheme]);
          setSelectedTheme(targetTheme);
        }, 500);

        setTimeout(() => {
          setIsTransition(false);
          setIsThemeChanging(false);
          setClickable(true);
        }, 1200);
      },
      [clickable, setTheme, setIsTransition, isThemeChanging]
    );

    const getAnimationDelay = (index: number) => {
      if (isInitialMount) {
        return delay + index * 0.1;
      }
      return themeSwitchDelay * (index + 1);
    };

    const colors = ["#000000", "#E90000", "#003AE9", "#E9E500"];
    const themes = ["default", "red", "blue", "yellow"];

    const ThemeButton = memo(({ index }: { index: number }) => (
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedTheme}-${index}`}
          initial={isInitialMount ? { opacity: 0, y: 10 } : { opacity: 1 }}
          animate={{
            opacity: 1,
            y: isInitialMount ? [10, -10, 0] : 0,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: isInitialMount ? 0.1 + index * 0.1 : 0.3,
            ease: "easeInOut",
            delay: isInitialMount ? delay + index * 0.1 : 0,
          }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.1, ease: "easeInOut", delay: 0 },
          }}
          onClick={() =>
            clickable && !isThemeChanging && changeTheme(themes[index])
          }
          style={{
            width: `${width}rem`,
            height: `${width}rem`,
            backgroundColor:
              themes[index] === selectedTheme ? colors[index] : "#626262",
            border: themes[index] === selectedTheme ? "1px solid" : "none",
          }}
          className="cursor-pointer"
        />
      </AnimatePresence>
    ));

    return (
      <div
        style={{ gap: `${width / 4}rem` }}
        className={language === "en" ? "flex" : "flex flex-col"}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <ThemeButton key={i} index={i} />
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.delay === nextProps.delay &&
      prevProps.width === nextProps.width &&
      prevProps.themeSwitchDelay === nextProps.themeSwitchDelay
    );
  }
);

ThemeSwitcher.displayName = "ThemeSwitcher";

export default ThemeSwitcher;
