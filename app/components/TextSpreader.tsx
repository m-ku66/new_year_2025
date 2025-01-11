import React from "react";
import { motion } from "framer-motion";

type Props = {
  lineOfText: string;
  fontSize?: number;
  characterSpacing?: number;
  delay?: number;
};
const TextSpreader = ({
  lineOfText,
  fontSize = 1.5,
  characterSpacing = 0.5,
  delay = 3,
}: Props) => {
  return (
    <motion.div
      initial={{ clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" }} // Start from center vertical line
      animate={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Expand to full width
      }}
      transition={{
        duration: 1,
        ease: [0.87, 0, 0.13, 1],
        delay: delay,
      }}
      style={{ fontSize: `${fontSize}rem` }}
      className="seoulEB select-none flex justify-between w-full bg-transparent items-center"
    >
      {Object.values(lineOfText.split(" ")).map((word, i) => (
        <div style={{ gap: `${characterSpacing}rem` }} className="flex" key={i}>
          {Object.values(word).map((letter, i) => (
            <p key={i}>{letter}</p>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default TextSpreader;
