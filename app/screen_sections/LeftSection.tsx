import { memo } from "react";
import Echo from "../components/Echo";
import Description from "../components/Description";
type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

const LeftSection = memo(
  ({ theme, delay }: { theme: Theme; delay: number }) => (
    <>
      <div className="hidden w-1/3 h-full bg-transparent md:flex flex-col place-items-start justify-between">
        <Echo theme={theme} delay={delay + 1} languageSwitchDelay={0.2} />
        <Description delay={delay + 1.3} languageSwitchDelay={0.2} />
      </div>

      {/* mobile version */}
      <div className="md:hidden w-1/3 h-full bg-transparent flex flex-col place-items-start justify-between">
        <div style={{ scale: 0.8 }}>
          <Echo theme={theme} delay={delay + 1} languageSwitchDelay={0.2} />
        </div>
        <div className="opacity-0 pointer-events-none">
          <Description delay={delay + 1.3} languageSwitchDelay={0.2} />
        </div>
      </div>
    </>
  )
);

LeftSection.displayName = "LeftSection";

export default LeftSection;
