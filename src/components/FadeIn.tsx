import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type FadeInProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function FadeIn<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  duration = 0.72,
  x = 0,
  y = 34,
  className,
  ...props
}: FadeInProps<T>) {
  const reduceMotion = useReducedMotion();
  const Component = motion.create((as ?? "div") as ElementType);

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0.28, x, y }}
      whileInView={reduceMotion ? {} : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}
