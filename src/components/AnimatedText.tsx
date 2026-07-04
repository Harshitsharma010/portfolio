import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type AnimatedTextProps = {
  text: string;
  className?: string;
};

function AnimatedCharacter({
  character,
  index,
  total,
  progress,
}: {
  character: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = Math.min(start + 0.16, 1);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{character === " " ? "\u00A0" : character}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {character === " " ? "\u00A0" : character}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.25"],
  });

  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className} aria-label={text}>
      {Array.from(text).map((character, index) => (
        <AnimatedCharacter
          key={`${character}-${index}`}
          character={character}
          index={index}
          total={text.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}
