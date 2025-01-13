"use client";
import React from "react";
import { motion } from "framer-motion";

const OpeningAnim = () => {
  const duration = 3;
  const delay = 1.4;

  return (
    // parent div to hold both slide openings
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1, ease: "easeIn" }}
      className="absolute w-full h-full bg-transparent z-10 pointer-events-none"
    >
      {/* horizontal reveal */}
      <div className="absolute z-[11] flex w-full h-full">
        <motion.div
          className="w-1/2 h-full bg-white"
          initial={{ x: "-0.1%" }}
          animate={{ x: "-100%" }}
          transition={{
            duration: duration / 3,
            ease: [0.95, 0, 0.15, 1],
            delay: delay,
          }}
        />
        <motion.div
          className="w-1/2 h-full bg-white"
          initial={{ x: "0.1%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: duration / 3,
            ease: [0.95, 0, 0.15, 1],
            delay: delay,
          }}
        />
      </div>

      {/* vertical reveal */}
      <div className="absolute z-[9]flex flex-col w-full h-full">
        <motion.div
          className="w-full h-1/2 bg-black"
          animate={{ y: "-100%" }}
          transition={{
            duration: duration / 3,
            ease: [0.7, 0, 0.3, 1],
            delay: delay + 0.1,
          }}
        />
        <motion.div
          className="w-full h-1/2 bg-black"
          animate={{ y: "100%" }}
          transition={{
            duration: duration / 3,
            ease: [0.7, 0, 0.3, 1],
            delay: delay + 0.1,
          }}
        />
      </div>
    </motion.div>
  );
};

export default OpeningAnim;
