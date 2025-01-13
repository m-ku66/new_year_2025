"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeSwitcher from "./components/ThemeSwitcher";
import FocalText from "./components/FocalText";
import CopyrightVector from "./components/CopyrightVector";
import Description from "./components/Description";
import Echo from "./components/Echo";
import OpeningAnim from "./components/OpeningAnim";
import TransitionAnim from "./components/TransitionAnim";

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

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setShowAnim(false);
    }, 2800);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, []);

  const ANIMATION_DELAY = 2;

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

      <div className="w-1/3 h-full bg-transparent flex flex-col place-items-start justify-between">
        <Echo theme={theme} delay={ANIMATION_DELAY + 1} />
        <Description delay={ANIMATION_DELAY + 1.5} />
      </div>
      <div className="w-1/3 h-full flex justify-center items-center relative">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <FocalText theme={theme} scale={1} delay={ANIMATION_DELAY} />
        </motion.div>
        <motion.p
          animate={{ opacity: [0, 1], y: [-50, 0] }}
          transition={{
            duration: 1,
            ease: [0.87, 0, 0.13, 1],
            delay: ANIMATION_DELAY + 1,
          }}
          className="absolute bottom-0 text-[1.2rem] seoulEB cursor-pointer select-none hover:scale-110 duration-150"
        >
          EN
        </motion.p>
      </div>
      <div className="w-1/3 h-full bg-transparent flex flex-col items-end justify-between">
        <ThemeSwitcher
          setTheme={setTheme}
          width={1.3}
          delay={ANIMATION_DELAY + 1.5}
          setIsTransition={setIsTransition}
        />
        <CopyrightVector theme={theme} delay={ANIMATION_DELAY + 2} />
      </div>
    </div>
  );
}

/**
 * TODO
 * Recreate opening and transition anims using Framer Motion; get rid of Lottie approach
 * Work on Japanese version; modify existing components for Japanese
 */
