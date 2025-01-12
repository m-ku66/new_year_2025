"use client";
import pageText from "../textSource";
import TextSpreader from "./TextSpreader";
import { motion } from "framer-motion";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

type Props = {
  theme: Theme;
  scale?: number;
  delay?: number;
};

const FocalText = ({ theme, scale = 1, delay = 3 }: Props) => {
  return (
    <div
      style={{ scale: scale }}
      className="flex flex-col gap-1 w-fit justify-center items-center bg-transparent"
    >
      {/*-----------------------------------------------------*/}
      {/* size of this div fits around the size of the 2025 text */}
      <TextSpreader
        lineOfText={pageText.en.main[1].toUpperCase()}
        fontSize={1.3}
        delay={delay}
      />
      {/* 2025 text */}
      <motion.h1
        initial={{ clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)" }} // Start from center horizontal line
        animate={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Expand to full height
        }}
        transition={{
          duration: 1,
          ease: [0.87, 0, 0.13, 1],
          delay: delay,
        }}
        className="seoulEB select-none text-[12rem] leading-[12rem]"
      >
        {pageText.en.main[2]}
      </motion.h1>
      {/* horizontal separator */}
      <motion.div
        initial={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }} // Start at left side
        animate={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // End at right side
        }}
        transition={{
          duration: 2,
          ease: [0.87, 0, 0.13, 1],
          delay: delay,
        }}
        style={{ backgroundColor: theme.foregroundColor }}
        className="w-full h-[0.1rem]"
      />
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <motion.p
            initial={{
              clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            }} // Start at right side
            animate={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Move to left side
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: delay + 0.5,
            }}
            className="seoulEB select-none text-[2rem]"
          >
            {pageText.en.main[3].toUpperCase()}
          </motion.p>
          <motion.svg
            initial={{
              clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
            }} // Start from center vertical line
            animate={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Expand to full width
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: delay + 0.8,
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
            initial={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }} // Start at left side
            animate={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // End at right side
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: delay + 0.5,
            }}
            className="seoulEB select-none text-[2rem]"
          >
            {pageText.en.main[4].toUpperCase()}
          </motion.p>
        </div>
        {/* vertical separator */}
        <motion.div
          initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }} // Start at top edge
          animate={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Move to bottom
          }}
          transition={{
            duration: 1,
            ease: [0.87, 0, 0.13, 1],
            delay: delay,
          }}
          style={{ backgroundColor: theme.foregroundColor }}
          className="h-[1.2rem] w-[0.1rem]"
        />
        <div className="flex">
          <motion.p
            initial={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }} // Start at left side
            animate={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // End at right side
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: delay + 1,
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
        delay={delay + 0.8}
      />
      {/*-----------------------------------------------------*/}
    </div>
  );
};

export default FocalText;
