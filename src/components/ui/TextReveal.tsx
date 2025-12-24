"use client";

import { motion, Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  delay?: number;
  className?: string; // For customized styling
  start?: boolean; // Control when to start animation
}

export function TextReveal({ text, delay = 0, className = "", start = true }: TextRevealProps) {
  // Split text into characters
  const characters = text.split("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const childVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 50,
      },
    },
    hidden: {
      opacity: 0,
      y: 10, // Start slightly below
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 50,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={start ? "visible" : "hidden"}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} // Flex wrap to handle long text securely
    >
      {characters.map((char, index) => (
        <motion.span variants={childVariants} key={index}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
