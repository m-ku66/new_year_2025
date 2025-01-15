"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "../store/langaugeStore";
import pageText from "../textSource";

type Props = {
  delay?: number;
  languageSwitchDelay?: number;
};

const Description = ({ delay = 3, languageSwitchDelay = 0.2 }: Props) => {
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const language = useLanguageStore((state) => state.language);
  console.log(isAnimating);

  // Calculate total initial animation duration
  const totalAnimDuration = delay;

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

  const getAnimationDelay = (index: number) => {
    if (isInitialMount) {
      return delay + index * 0.1;
    }
    return languageSwitchDelay * (index + 1);
  };

  const EnglishContent = () => (
    <div className="flex flex-col gap-1 w-1/2 select-none">
      <AnimatePresence mode="wait">
        <motion.h2
          key={`${isInitialMount ? "initial" : ""}-header`}
          animate={{ opacity: [0, 1], x: [-100, 0] }}
          transition={{
            duration: 1,
            ease: [0.87, 0, 0.13, 1],
            delay: getAnimationDelay(0),
          }}
          className="seoulEB text-[1rem] font-black"
        >
          {pageText.en.desc[1]}
        </motion.h2>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={`${isInitialMount ? "initial" : ""}-body`}
          animate={{ opacity: [0, 1], x: [-100, 0] }}
          transition={{
            duration: 1,
            ease: [0.87, 0, 0.13, 1],
            delay: getAnimationDelay(1),
          }}
          className="seoulEB text-[0.8rem] leading-tight"
        >
          {pageText.en.desc[2]}
        </motion.p>
      </AnimatePresence>
    </div>
  );

  const JapaneseContent = () => (
    <div style={{ scale: 0.9 }} className="flex gap-3 w-1/2 select-none">
      <div className="flex flex-row-reverse gap-3">
        {Object.values(pageText.ja.desc[2].split(" ")).map((sentences, i) => (
          <motion.div
            key={`${isInitialMount ? "initial" : ""}-sentence-${i}`}
            animate={{ opacity: [0, 1], x: [-100, 0] }}
            transition={{
              duration: 0.8,
              ease: [0.87, 0, 0.13, 1],
              delay: getAnimationDelay(i),
            }}
            className="flex flex-col gap-1"
          >
            {Object.values(sentences).map((character, j) => (
              <motion.p
                key={`${isInitialMount ? "initial" : ""}-char-${i}-${j}`}
                animate={{ opacity: [0, 1], x: [-100, 0] }}
                transition={{
                  duration: 0.8,
                  ease: [0.87, 0, 0.13, 1],
                  delay: getAnimationDelay(i + j * 0.1),
                }}
                className="seoulEB text-[1rem] leading-[1rem]"
              >
                {character}
              </motion.p>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <AnimatePresence mode="sync">
          {Object.values(pageText.ja.desc[1]).map((character, i) => (
            <motion.h2
              key={`${isInitialMount ? "initial" : ""}-title-${i}`}
              animate={{ opacity: [0, 1], x: [-100, 0] }}
              transition={{
                duration: 0.8,
                ease: [0.87, 0, 0.13, 1],
                delay: getAnimationDelay(i),
              }}
              className="seoulEB text-[1rem] font-black leading-[1.2rem]"
            >
              {character}
            </motion.h2>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  return language === "en" ? <EnglishContent /> : <JapaneseContent />;
};

export default Description;
