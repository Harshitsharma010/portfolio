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

  let characterOffset = 0;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((token, tokenIndex) => {
          const tokenStart = characterOffset;
          characterOffset += token.length;

          if (/^\s+$/.test(token)) {
            return <span key={`space-${tokenIndex}`}> </span>;
          }

          return (
            <span key={`${token}-${tokenIndex}`} className="inline-block whitespace-nowrap">
              {Array.from(token).map((character, characterIndex) => (
                <AnimatedCharacter
                  key={`${character}-${characterIndex}`}
                  character={character}
                  index={tokenStart + characterIndex}
                  total={text.length}
                  progress={scrollYProgress}
                />
              ))}
            </span>
          );
        })}
      </span>
    </p>
  );
}
