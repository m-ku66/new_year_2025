import { memo } from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import CopyrightVector from "../components/CopyrightVector";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

const RightSection = memo(
  ({
    theme,
    delay,
    setTheme,
    setIsTransition,
  }: {
    theme: Theme;
    delay: number;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    setIsTransition: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <>
      <div className="hidden w-1/3 h-full bg-transparent md:flex flex-col items-end justify-between">
        <ThemeSwitcher
          setTheme={setTheme}
          width={1.3}
          delay={delay + 1.5}
          setIsTransition={setIsTransition}
          themeSwitchDelay={0.1}
          theme={theme}
        />
        <CopyrightVector theme={theme} delay={delay + 2} />
      </div>

      {/* mobile version */}
      <div className="md:hidden w-1/3 h-full bg-transparent flex flex-col items-end justify-between">
        <ThemeSwitcher
          setTheme={setTheme}
          width={1.3}
          delay={delay + 1.5}
          setIsTransition={setIsTransition}
          themeSwitchDelay={0.1}
        />
        <div className="opacity-0 pointer-events-none">
          <CopyrightVector theme={theme} delay={delay + 2} />
        </div>
      </div>
    </>
  )
);

RightSection.displayName = "RightSection";


export default RightSection;
