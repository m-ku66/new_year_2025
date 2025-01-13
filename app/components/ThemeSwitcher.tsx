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
  setIsTransition: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeSwitcher = ({
  setTheme,
  width = 2,
  delay = 3,
  setIsTransition,
}: Props) => {
  const [setselectedTheme, setSetselectedTheme] = useState("default");
  const [clickable, setClickable] = useState(true);

  const changeTheme = (targetTheme: string) => {
    setClickable(false);
    switch (targetTheme) {
      case "red":
        setIsTransition(true);
        setTimeout(() => {
          setTheme({ backgroundColor: "#E90000", foregroundColor: "#FFFFFF" });
        }, 500);
        setTimeout(() => {
          setIsTransition(false);
        }, 1200);
        break;
      case "blue":
        setIsTransition(true);
        setTimeout(() => {
          setTheme({ backgroundColor: "#003AE9", foregroundColor: "#FFFFFF" });
        }, 500);
        setTimeout(() => {
          setIsTransition(false);
        }, 1200);
        break;
      case "yellow":
        setIsTransition(true);
        setTimeout(() => {
          setTheme({ backgroundColor: "#E9E500", foregroundColor: "#000000" });
        }, 500);
        setTimeout(() => {
          setIsTransition(false);
        }, 1200);
        break;
      default:
        setIsTransition(true);
        setTimeout(() => {
          setTheme({ backgroundColor: "#FFFFFF", foregroundColor: "#000000" });
        }, 500);
        setTimeout(() => {
          setIsTransition(false);
        }, 1200);
        break;
    }

    setTimeout(() => {
      setClickable(true);
    }, 1000);
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
              if (clickable) {
                changeTheme(selectedTheme[i]);
                setSetselectedTheme(selectedTheme[i]);
              } else {
                return;
              }
            }}
            style={{
              width: `${width}rem`,
              height: `${width}rem`,
              backgroundColor:
                selectedTheme[i] === setselectedTheme ? colors[i] : "#626262",
              border:
                selectedTheme[i] === setselectedTheme ? "1px solid" : "none",
            }}
            className={`cursor-pointer`}
          ></motion.div>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
