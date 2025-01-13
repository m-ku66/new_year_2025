"use client";
import React from "react";
import { motion } from "framer-motion";

const OpeningAnim = () => {
  return (
    <div className="absolute z-10 pointer-events-none flex w-full h-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[20%] h-full bg-black anchor-top"
          initial={{ y: "100%" }}
          animate={{ y: ["100%", "0%", "0%"] }}
          transition={{
            duration: 0.5,
            ease: [0.05, 0.9, 0.85, 1],
            delay: i * 0.05,
            repeat: 1,
            repeatType: "mirror",
            repeatDelay: i * 0.03,
          }}
        />
      ))}
    </div>
  );
};

export default OpeningAnim;
