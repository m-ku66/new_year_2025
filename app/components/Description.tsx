"use client";
import React from "react";
import pageText from "../textSource";
import { motion } from "framer-motion";

type Props = {
  delay?: number;
};

const Description = ({ delay }: Props) => {
  return (
    <div className="flex flex-col gap-1 w-1/2 select-none">
      <motion.h2
        animate={{ opacity: [0, 1], x: [-100, 0] }}
        transition={{ duration: 1, ease: [0.87, 0, 0.13, 1], delay: delay }}
        className="seoulEB text-[1rem] font-black"
      >
        {pageText.en.desc[1]}
      </motion.h2>
      <motion.p
        animate={{ opacity: [0, 1], x: [-100, 0] }}
        transition={{
          duration: 1,
          ease: [0.87, 0, 0.13, 1],
          delay: delay ? delay + 0.1 : delay,
        }}
        className="seoulEB text-[0.8rem] leading-tight"
      >
        {pageText.en.desc[2]}
      </motion.p>
    </div>
  );
};

export default Description;
