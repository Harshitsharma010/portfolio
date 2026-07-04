import type { ReactNode } from "react";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
};

export default function Magnet({ children, padding = 120, strength = 4, className }: MagnetProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const inRange =
      event.clientX >= rect.left - padding &&
      event.clientX <= rect.right + padding &&
      event.clientY >= rect.top - padding &&
      event.clientY <= rect.bottom + padding;

    if (!inRange) return;

    const x = (event.clientX - centerX) / strength;
    const y = (event.clientY - centerY) / strength;
    element.style.transition = "transform 0.3s ease-out";
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleLeave = () => {
    if (reduceMotion) return;
    const element = ref.current;
    if (!element) return;
    element.style.transition = "transform 0.6s ease-in-out";
    element.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
