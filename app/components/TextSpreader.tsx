import React from "react";
import { motion } from "framer-motion";

type Props = {
  lineOfText: string;
  fontSize?: number;
  characterSpacing?: number;
  delay?: number;
  orientation?: string;
};

const TextSpreader = ({
  lineOfText,
  fontSize = 1.5,
  characterSpacing = 0.5,
  delay = 3,
  orientation = "horizontal",
}: Props) => {
  return orientation === "horizontal" ? (
    <motion.div
      initial={{ clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" }}
      animate={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
      transition={{
        duration: 1,
        ease: [0.87, 0, 0.13, 1],
        delay: delay,
      }}
      style={{ fontSize: `${fontSize}rem` }}
      className="seoulEB select-none flex justify-between w-full bg-transparent items-center"
    >
      {lineOfText.split(" ").map((word, wordIndex) => (
        <div
          style={{ gap: `${characterSpacing}rem` }}
          className="flex"
          key={`word-${wordIndex}-${word}-horizontal`}
        >
          {Array.from(word).map((letter, letterIndex) => (
            <p key={`letter-${wordIndex}-${letterIndex}-${letter}-horizontal`}>
              {letter}
            </p>
          ))}
        </div>
      ))}
    </motion.div>
  ) : (
    <motion.div
      initial={{ clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)" }}
      animate={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
      transition={{
        duration: 1,
        ease: [0.87, 0, 0.13, 1],
        delay: delay,
      }}
      style={{ fontSize: `${fontSize}rem`, gap: `${characterSpacing}rem` }}
      className="seoulEB select-none flex flex-col justify-between w-full bg-transparent items-center"
    >
      {Array.from(lineOfText).map((char, charIndex) => (
        <div key={`char-${charIndex}-${char}-vertical`}>
          <p key={`vertical-char-${charIndex}`}>{char}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default TextSpreader;
