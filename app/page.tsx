"use client";
import { useState, useRef, useEffect } from "react";
import pageText from "./textSource";
import ThemeSwitcher from "./components/ThemeSwitcher";
import TextSpreader from "./components/TextSpreader";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import openingAnim from "./lottie/opening-anim.json";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};
export default function Home() {
  const [theme, setTheme] = useState<Theme>({
    backgroundColor: "#FFFFFF",
    foregroundColor: "#000000",
  });
  const [showAnim, setShowAnim] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setShowAnim(false);
    }, 2800);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, []);

  const stopFrame = 10;
  const handleAnimationComplete = () => {
    if (lottieRef.current) {
      // Stop at the desired frame
      lottieRef.current.goToAndStop(stopFrame, true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.foregroundColor,
      }}
      className="hidden md:flex container max-w-full h-screen justify-center items-center relative px-8 py-8 overflow-hidden"
    >
      {showAnim && (
        <Lottie
          animationData={openingAnim}
          loop={false} // No looping, stop after one complete playthrough
          lottieRef={lottieRef}
          onComplete={handleAnimationComplete} // Call onComplete when animation finishes
          style={{
            position: "absolute",
            zIndex: 10,
            pointerEvents: "none",
            width: "110%",
            height: "110%",
          }}
        />
      )}

      <div className="w-1/3 h-full bg-red-500/[0.3] flex flex-col place-items-start justify-between">
        <p>Test</p>
        <p>Test again</p>
      </div>
      <div className="w-1/3 h-full flex justify-center items-center relative">
        {/*-----------------------------------------------------*/}
        {/* size of this div fits around the size of the 2025 text */}
        <div className="flex flex-col gap-4 w-fit justify-center items-center bg-transparent">
          <TextSpreader
            lineOfText={pageText.en.main[1].toUpperCase()}
            fontSize={1.4}
          />
          <h1 className="seoulEB select-none text-[15rem] leading-[12rem]">
            {pageText.en.main[2]}
          </h1>
          <div
            style={{ backgroundColor: theme.foregroundColor }}
            className="w-full h-[0.2rem]"
          ></div>
        </div>
        {/*-----------------------------------------------------*/}
        <p className="absolute bottom-0 text-[1rem] seoulEB cursor-pointer select-none hover:scale-110 duration-150">
          EN
        </p>
      </div>
      <div className="w-1/3 h-full bg-red-500/[0.3] flex flex-col items-end justify-between">
        <ThemeSwitcher setTheme={setTheme} width={1.3} />
        <p>Test again</p>
      </div>
    </div>
  );
}
