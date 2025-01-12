"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import openingAnim from "./lottie/opening-anim.json";
import FocalText from "./components/FocalText";
import CopyrightVector from "./components/CopyrightVector";
import Description from "./components/Description";
import Echo from "./components/Echo";

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
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setShowAnim(false);
    }, 2800);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, []);

  const stopFrame = 10;
  const handleAnimationComplete = () => {
    if (lottieRef.current) {
      // Stop at the desired frame
      lottieRef.current.goToAndStop(stopFrame, true);
    }
  };

  const ANIMATION_DELAY = 2.8;

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.foregroundColor,
      }}
      className="hidden md:flex container max-w-full h-screen justify-center items-center relative px-8 py-8 overflow-hidden"
    >
      {showAnim && (
        <Lottie
          animationData={openingAnim}
          loop={false} // No looping, stop after one complete playthrough
          lottieRef={lottieRef}
          onComplete={handleAnimationComplete} // Call onComplete when animation finishes
          style={{
            position: "absolute",
            zIndex: 10,
            pointerEvents: "none",
            width: "110%",
            height: "110%",
          }}
        />
      )}

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
        />
        <CopyrightVector theme={theme} delay={ANIMATION_DELAY + 2} />
      </div>
    </div>
  );
}
