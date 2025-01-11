"use client";
import React, { useState } from "react";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

type Props = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  width?: number;
};

const ThemeSwitcher = ({ setTheme, width = 2 }: Props) => {
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
          <div
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
            className={`hover:scale-110 duration-150 cursor-pointer border border-1 border-transparent hover:border-black/[0.5]`}
          ></div>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
