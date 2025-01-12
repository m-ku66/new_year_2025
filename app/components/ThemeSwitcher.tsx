"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

type Props = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  width?: number;
  delay?: number;
};

const ThemeSwitcher = ({ setTheme, width = 2, delay = 3 }: Props) => {
  const [setselectedTheme, setSetselectedTheme] = useState("default");

  const changeTheme = (targetTheme: string) => {
    switch (targetTheme) {
      case "red":
        setTheme({ backgroundColor: "#E90000", foregroundColor: "#FFFFFF" });
        break;
      case "blue":
        setTheme({ backgroundColor: "#003AE9", foregroundColor: "#FFFFFF" });
        break;
      case "yellow":
        setTheme({ backgroundColor: "#E9E500", foregroundColor: "#000000" });
        break;
      default:
        setTheme({ backgroundColor: "#FFFFFF", foregroundColor: "#000000" });
        break;
    }
  };

  return (
    <div style={{ gap: `${width / 4}rem` }} className="flex">
      {Array.from({ length: 4 }).map((_, i) => {
        const colors = ["#000000", "#E90000", "#003AE9", "#E9E500"];
        const selectedTheme = ["default", "red", "blue", "yellow"];

        return (
          <motion.div
            animate={{
              opacity: [0, 1],
              y: [10, -10, 0],
            }}
            transition={{
              duration: 0.1 + i * 0.1,
              ease: "easeInOut",
              delay: delay,
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.1, ease: "easeInOut", delay: 0 },
            }}
            key={i}
            onClick={() => {
              changeTheme(selectedTheme[i]);
              setSetselectedTheme(selectedTheme[i]);
            }}
            style={{
              width: `${width}rem`,
              height: `${width}rem`,
              backgroundColor:
                selectedTheme[i] === setselectedTheme ? colors[i] : "#626262",
              border:
                selectedTheme[i] === setselectedTheme ? "1px solid" : "none",
            }}
            className={`hover:scale-110 duration-150 cursor-pointer`}
          ></motion.div>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
