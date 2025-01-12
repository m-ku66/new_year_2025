"use client";
import { useState, useEffect } from "react";
import pageText from "../textSource";
import TextSpreader from "./TextSpreader";
import MouseTracker from "./MouseTracker";
import { motion, AnimatePresence } from "framer-motion";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

type Props = {
  theme: Theme;
  delay?: number;
};

const Echo = ({ theme, delay = 3 }: Props) => {
  const [contentToggle, setContentToggle] = useState(true);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [textContent, setTextContent] = useState({
    header: pageText.en.echo.a[1].toUpperCase(),
    body: pageText.en.echo.a[2].toUpperCase(),
  });

  useEffect(() => {
    // Mark initial mount as complete after animations
    const timer = setTimeout(() => {
      setIsInitialMount(false);
    }, (delay + 2) * 1000); // Adjust this time based on your longest animation

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const changeInterval = setInterval(() => {
      setContentToggle((prev) => !prev);
    }, 10000);

    return () => clearInterval(changeInterval);
  }, []);

  useEffect(() => {
    if (contentToggle) {
      setTextContent({
        header: pageText.en.echo.a[1].toUpperCase(),
        body: pageText.en.echo.a[2].toUpperCase(),
      });
    } else {
      setTextContent({
        header: pageText.en.echo.b[1].toUpperCase(),
        body: pageText.en.echo.b[2].toUpperCase(),
      });
    }
  }, [contentToggle]);

  // Animation delays based on mount state
  const getAnimationDelay = (index: number) => {
    if (isInitialMount) {
      return delay + index * 0.5; // Initial mount delays
    }
    return index * 0.2; // Content switch delays
  };

  return (
    <div className="flex flex-col gap-1 w-fit">
      <AnimatePresence mode="wait">
        <motion.h2
          key={textContent.header}
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
          key={textContent.body}
          lineOfText={textContent.body}
          fontSize={0.6}
          characterSpacing={
            textContent.body === pageText.en.echo.a[2].toUpperCase() ? 0.3 : 0.2
          }
          delay={getAnimationDelay(1) + 0.5}
        />
      </AnimatePresence>

      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: 0.5,
          ease: [0.87, 0, 0.13, 1],
          delay: delay + 0.5,
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
};

export default Echo;
