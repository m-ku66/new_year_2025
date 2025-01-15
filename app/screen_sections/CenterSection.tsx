import { memo } from "react";
import FocalText from "../components/FocalText";
import { motion } from "framer-motion";
import CopyrightVector from "../components/CopyrightVector";

type Theme = {
  backgroundColor: "#FFFFFF" | "#E90000" | "#003AE9" | "#E9E500";
  foregroundColor: "#000000" | "#FFFFFF";
};

const CenterSection = memo(
  ({
    theme,
    delay,
    language,
    onLanguageChange,
  }: {
    theme: Theme;
    delay: number;
    language: string;
    onLanguageChange: () => void;
  }) => (
    <>
      <div className="hidden w-1/3 h-full md:flex justify-center items-center relative">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <FocalText
            theme={theme}
            scale={1}
            delay={delay}
            languageSwitchDelay={0.2}
          />
        </motion.div>
        <motion.div
          className="absolute bottom-0 text-[1.2rem] seoulEB cursor-pointer select-none opacity-50"
          whileHover={{ scale: 1.1, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.p
            animate={{ opacity: [0, 1], y: [-50, 0] }}
            transition={{
              duration: 1,
              ease: [0.87, 0, 0.13, 1],
              delay: delay + 1,
            }}
            onClick={onLanguageChange}
          >
            {language === "en" ? "日本語" : "English"}
          </motion.p>
        </motion.div>
      </div>

      {/* mobile version */}
      <div className="flex w-1/3 h-full md:hidden justify-center items-center relative">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          {language === "en" ? (
            <FocalText
              theme={theme}
              scale={0.75}
              delay={delay}
              languageSwitchDelay={0.2}
            />
          ) : (
            <FocalText
              theme={theme}
              scale={0.9}
              delay={delay}
              languageSwitchDelay={0.2}
            />
          )}
        </motion.div>
        <motion.div
          className="absolute bottom-20 text-[1.2rem] seoulEB cursor-pointer select-none opacity-50"
          whileHover={{ scale: 1.1, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          style={{ scale: 1.1 }}
        >
          <motion.p
            animate={{ opacity: [0, 1], y: [-50, 0] }}
            transition={{
              duration: 1,
              ease: [0.87, 0, 0.13, 1],
              delay: delay + 1,
            }}
            onClick={onLanguageChange}
          >
            {language === "en" ? "日本語" : "English"}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <CopyrightVector theme={theme} delay={delay + 2} />
        </div>
      </div>
    </>
  )
);

CenterSection.displayName = "CenterSection";

export default CenterSection;
