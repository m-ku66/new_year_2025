"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "../store/langaugeStore";
import TextSpreader from "./TextSpreader";
import MouseTracker from "./MouseTracker";
import pageText from "../textSource";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

type Props = {
  theme: Theme;
  delay?: number;
  languageSwitchDelay?: number;
};

const Echo = ({ theme, delay = 3, languageSwitchDelay = 0.2 }: Props) => {
  const [contentToggle, setContentToggle] = useState(true);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [textContent, setTextContent] = useState({
    header: pageText.en.echo.a[1].toUpperCase(),
    body: pageText.en.echo.a[2].toUpperCase(),
  });
  const language = useLanguageStore((state) => state.language);

  // Calculate total initial animation duration including all delays
  const totalAnimDuration = delay; // base delay + additional time for child animations

  useEffect(() => {
    if (isInitialMount) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        // Only set isInitialMount to false after all animations are complete
        setIsInitialMount(false);
      }, totalAnimDuration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInitialMount, totalAnimDuration]);

  useEffect(() => {
    const changeInterval = setInterval(() => {
      setContentToggle((prev) => !prev);
    }, 20000);
    return () => clearInterval(changeInterval);
  }, []);

  useEffect(() => {
    if (!isAnimating) {
      // Only update content when not in initial animation
      if (contentToggle) {
        setTextContent({
          header:
            language === "en"
              ? pageText.en.echo.a[1].toUpperCase()
              : pageText.ja.echo.a[1].toUpperCase(),
          body:
            language === "en"
              ? pageText.en.echo.a[2].toUpperCase()
              : pageText.ja.echo.a[2].toUpperCase(),
        });
      } else {
        setTextContent({
          header:
            language === "en"
              ? pageText.en.echo.b[1].toUpperCase()
              : pageText.ja.echo.b[1].toUpperCase(),
          body:
            language === "en"
              ? pageText.en.echo.b[2].toUpperCase()
              : pageText.ja.echo.b[2].toUpperCase(),
        });
      }
    }
  }, [contentToggle, language, isAnimating]);

  const getAnimationDelay = (index: number) => {
    if (isInitialMount) {
      return delay + index * 0.5;
    }
    return languageSwitchDelay * (index + 1);
  };

  const Content = () => (
    <div className="flex flex-col gap-1 w-fit">
      <AnimatePresence mode="wait">
        <motion.h2
          key={`${isInitialMount ? "initial" : ""}-${textContent.header}`}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{
            duration: 0.5,
            ease: [0.87, 0, 0.13, 1],
            delay: getAnimationDelay(0),
          }}
          className="seoulEB text-[2.3rem] leading-10 select-none"
        >
          {textContent.header}
        </motion.h2>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <TextSpreader
          key={`${isInitialMount ? "initial" : ""}-${textContent.body}`}
          lineOfText={textContent.body}
          fontSize={0.6}
          characterSpacing={
            language === "en"
              ? textContent.body === pageText.en.echo.a[2].toUpperCase()
                ? 0.3
                : 0.2
              : textContent.body === pageText.ja.echo.a[2].toUpperCase()
              ? 0.5
              : 0.2
          }
          delay={getAnimationDelay(1) + 0.5}
        />
      </AnimatePresence>

      <motion.div
        key={isInitialMount ? "initial-tracker" : "tracker"}
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: 0.5,
          ease: [0.87, 0, 0.13, 1],
          delay: isInitialMount ? delay + 0.5 : languageSwitchDelay,
        }}
        style={{
          color:
            theme.backgroundColor === "#FFFFFF"
              ? "#626262"
              : theme.backgroundColor === "#E9E500"
              ? "#000000"
              : "#FFFFFF",
        }}
        className="seoulEB text-[0.8rem] select-none"
      >
        <MouseTracker />
      </motion.div>
    </div>
  );

  return <Content />;
};

export default Echo;
