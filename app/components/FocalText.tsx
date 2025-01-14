"use client";
import { useState, useEffect, memo } from "react";
import pageText from "../textSource";
import TextSpreader from "./TextSpreader";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "../store/langaugeStore";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

type Props = {
  theme: Theme;
  scale?: number;
  delay?: number;
  languageSwitchDelay?: number;
};

const FocalText = memo(
  ({ theme, scale = 1, delay = 3, languageSwitchDelay = 0.2 }: Props) => {
    const [isInitialMount, setIsInitialMount] = useState(true);
    const [isAnimating, setIsAnimating] = useState(true);
    const language = useLanguageStore((state) => state.language);

    const totalAnimDuration = delay;

    useEffect(() => {
      if (isInitialMount) {
        const timer = setTimeout(() => {
          setIsAnimating(false);
          setIsInitialMount(false);
        }, totalAnimDuration * 1000);
        return () => clearTimeout(timer);
      }
    }, [isInitialMount, totalAnimDuration]);

    const getAnimationDelay = (index: number = 0) => {
      if (isInitialMount) {
        return delay + index * 0.1;
      }
      return languageSwitchDelay * (index + 1);
    };

    const EnglishContent = () => (
      <div
        style={{ scale }}
        className="flex flex-col gap-1 w-fit justify-center items-center bg-transparent"
      >
        <TextSpreader
          lineOfText={pageText.en.main[1].toUpperCase()}
          fontSize={1.3}
          delay={getAnimationDelay()}
        />
        <motion.h1
          key={`${isInitialMount ? "initial" : "current"}-2025`}
          initial={{ clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)" }}
          animate={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          transition={{
            duration: 1,
            ease: [0.87, 0, 0.13, 1],
            delay: getAnimationDelay(),
          }}
          className="seoulEB select-none text-[12rem] leading-[12rem]"
        >
          {pageText.en.main[2]}
        </motion.h1>
        <motion.div
          key={`${isInitialMount ? "initial" : "current"}-separator`}
          initial={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
          animate={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          transition={{
            duration: 2,
            ease: [0.87, 0, 0.13, 1],
            delay: getAnimationDelay(),
          }}
          style={{ backgroundColor: theme.foregroundColor }}
          className="w-full h-[0.1rem]"
        />
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.p
              key={`${isInitialMount ? "initial" : "current"}-left-text`}
              initial={{
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
              }}
              animate={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: getAnimationDelay(5),
              }}
              className="seoulEB select-none text-[2rem]"
            >
              {pageText.en.main[3].toUpperCase()}
            </motion.p>
            <motion.svg
              key={`${isInitialMount ? "initial" : "current"}-arrow`}
              initial={{
                clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
              }}
              animate={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: getAnimationDelay(8),
              }}
              width="9"
              height="12"
              viewBox="0 0 9 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L0 11.1962V0.803848L9 6Z"
                fill={theme.foregroundColor}
              />
            </motion.svg>
            <motion.p
              key={`${isInitialMount ? "initial" : "current"}-right-text`}
              initial={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
              animate={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: getAnimationDelay(5),
              }}
              className="seoulEB select-none text-[2rem]"
            >
              {pageText.en.main[4].toUpperCase()}
            </motion.p>
          </div>
          <motion.div
            key={`${isInitialMount ? "initial" : "current"}-vertical-separator`}
            initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
            animate={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
            transition={{
              duration: 2,
              ease: [0.87, 0, 0.13, 1],
              delay: getAnimationDelay(),
            }}
            style={{ backgroundColor: theme.foregroundColor }}
            className="h-[1.2rem] w-[0.1rem]"
          />
          <div className="flex">
            <motion.p
              key={`${isInitialMount ? "initial" : "current"}-bottom-text`}
              initial={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
              animate={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: getAnimationDelay(10),
              }}
              className="seoulEB select-none text-[0.7rem] leading-[0.8rem] whitespace-pre-line"
            >
              {`${pageText.en.main[5].toUpperCase()}\n${pageText.en.main[6].toUpperCase()}`}
            </motion.p>
          </div>
        </div>
        <TextSpreader
          lineOfText={pageText.en.main[7].toUpperCase()}
          fontSize={0.7}
          characterSpacing={0.12}
          delay={getAnimationDelay(8)}
        />
      </div>
    );

    const JapaneseContent = () => (
      <div
        style={{ scale }}
        className="flex gap-4 h-fit justify-center items-center bg-transparent pb-[5rem]"
      >
        <AnimatePresence mode="wait">
          <motion.div key="ja-text-spreader">
            <TextSpreader
              lineOfText={pageText.ja.main[7].toUpperCase()}
              fontSize={0.65}
              delay={getAnimationDelay() + 1}
              orientation="vertical"
              characterSpacing={0.03}
            />
          </motion.div>
        </AnimatePresence>

        {/* vertical line */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`ja-left-line-${isInitialMount ? "initial" : "current"}`}
            style={{ backgroundColor: theme.foregroundColor }}
            className="w-[0.1rem] h-[30rem]"
            initial={{
              clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
              x: 50,
              opacity: 0,
            }}
            animate={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              x: [50, 50, 0],
              opacity: 1,
            }}
            transition={{
              x: {
                duration: getAnimationDelay() + 1,
                ease: [0.87, 0, 0.13, 1],
              },
              duration: 1,
              ease: [0.87, 0, 0.13, 1],
              delay: getAnimationDelay(),
            }}
          />
        </AnimatePresence>

        {/* 2025 text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`ja-main-text-${isInitialMount ? "initial" : "current"}`}
            initial={{
              clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
            }}
            animate={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
            transition={{
              duration: 1,
              ease: [0.87, 0, 0.13, 1],
              delay: getAnimationDelay() + 0.6,
            }}
            className="seoulEB select-none text-[6rem] leading-[6rem] flex flex-col items-center"
          >
            {Object.entries(pageText.ja.main[2]).map(([key, character]) => (
              <h1 key={`ja-char-${key}`}>{character}</h1>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* vertical line */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`ja-right-line-${isInitialMount ? "initial" : "current"}`}
            style={{ backgroundColor: theme.foregroundColor }}
            className="w-[0.1rem] h-[30rem]"
            initial={{
              clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
              x: -50,
              opacity: 0,
            }}
            animate={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              x: [-50, -50, 0],
              opacity: 1,
            }}
            transition={{
              x: {
                duration: getAnimationDelay() + 1,
                ease: [0.87, 0, 0.13, 1],
              },
              duration: 1,
              ease: [0.87, 0, 0.13, 1],
              delay: getAnimationDelay(),
            }}
          />
        </AnimatePresence>

        <motion.div className="flex flex-col gap-1 h-[30rem] items-center seoulEB select-none">
          <TextSpreader
            lineOfText={pageText.ja.main[1].toUpperCase()}
            fontSize={1.2}
            delay={getAnimationDelay() + 0.6}
            orientation="vertical"
            characterSpacing={0.03}
          />
          <motion.div
            style={{
              backgroundColor: theme.foregroundColor,
            }}
            className="w-[1rem] h-[0.1rem] origin-right my-[1.3rem]" // Added origin-left
            initial={{
              scaleX: 0,
            }}
            animate={{
              scaleX: 1,
            }}
            transition={{
              duration: 1,
              ease: [0.87, 0, 0.13, 1],
              delay: getAnimationDelay() + 0.6,
            }}
          />
          <div className="flex gap-1 flex-col items-center text-[1.2rem]">
            <motion.p
              initial={{
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
              }}
              animate={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: getAnimationDelay(5),
              }}
            >
              {pageText.ja.main[3].slice(0, 1).toUpperCase()}
            </motion.p>
            <TextSpreader
              lineOfText={pageText.ja.main[3].slice(1).toUpperCase()}
              fontSize={1.2}
              delay={getAnimationDelay() + 0.6}
              orientation="vertical"
              characterSpacing={0}
            />
          </div>
          <motion.svg
            className={"rotate-90"}
            key={`${isInitialMount ? "initial" : "current"}-arrow`}
            initial={{
              clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
            }}
            animate={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: getAnimationDelay(8),
            }}
            width="9"
            height="12"
            viewBox="0 0 9 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6L0 11.1962V0.803848L9 6Z"
              fill={theme.foregroundColor}
            />
          </motion.svg>
          <div className="flex flex-col items-center text-[1.2rem] mb-[4rem]">
            <motion.p
              initial={{
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
              }}
              animate={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: getAnimationDelay(5),
              }}
            >
              {pageText.ja.main[4].slice(0, 2).toUpperCase()}
            </motion.p>
            <TextSpreader
              lineOfText={pageText.ja.main[4].slice(2).toUpperCase()}
              fontSize={1.2}
              delay={getAnimationDelay() + 0.6}
              orientation="vertical"
              characterSpacing={0}
            />
          </div>

          <TextSpreader
            lineOfText={pageText.ja.main[5].toUpperCase()}
            fontSize={0.5}
            delay={getAnimationDelay(8)}
            orientation="vertical"
            characterSpacing={0}
          />
        </motion.div>
      </div>
    );

    return language === "en" ? <EnglishContent /> : <JapaneseContent />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.delay === nextProps.delay &&
      prevProps.scale === nextProps.scale &&
      prevProps.languageSwitchDelay === nextProps.languageSwitchDelay &&
      prevProps.theme.foregroundColor === nextProps.theme.foregroundColor &&
      prevProps.theme.backgroundColor === nextProps.theme.backgroundColor
    );
  }
);

FocalText.displayName = "FocalText";

export default FocalText;
