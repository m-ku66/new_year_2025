import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MouseTracker = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <p className="tracking-widest">
      <motion.span
        key={mousePosition.x + "x"}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        {mousePosition.x}
      </motion.span>
      <motion.span
        key={mousePosition.x + mousePosition.y}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        ,{" "}
      </motion.span>
      <motion.span
        key={mousePosition.y + "y"}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        {mousePosition.y}
      </motion.span>
    </p>
  );
};

export default MouseTracker;
