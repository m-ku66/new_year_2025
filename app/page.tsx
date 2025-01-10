"use client";
import { useState } from "react";
import pageText from "./textSource";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};
export default function Home() {
  const [theme, setTheme] = useState<Theme>({
    backgroundColor: "#FFFFFF",
    foregroundColor: "#000000",
  });

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
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.foregroundColor,
      }}
      className="container max-w-full h-screen flex justify-center items-center relative"
    >
      <div className="flex flex-col gap-12 items-center">
        <h1 className="seoulEB text-[5rem] text-center">
          {pageText.en.main[1]}
        </h1>
        <div className="flex gap-8">
          {Array.from({ length: 4 }).map((_, i) => {
            const colors = ["#FFFFFF", "#E90000", "#003AE9", "#E9E500"];

            return (
              <div
                key={i}
                onClick={() =>
                  changeTheme(["default", "red", "blue", "yellow"][i])
                }
                style={{ backgroundColor: colors[i] }}
                className={`w-8 h-8 rounded-full hover:scale-110 duration-150 cursor-pointer drop-shadow-lg border border-1 border-black/[0.5]`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
