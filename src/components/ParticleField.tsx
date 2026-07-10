import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type ParticleFieldProps = {
  className?: string;
  variant?: "hero" | "proof";
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const palette = ["217, 184, 111", "184, 78, 142", "215, 226, 234"];

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function createNodes(width: number, height: number, count: number, seed: number) {
  const random = seededRandom(seed);
  const columns = Math.max(4, Math.round(Math.sqrt(count * (width / Math.max(height, 1)))));
  const rows = Math.ceil(count / columns);

  return Array.from({ length: count }, (_, index): Node => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const cellWidth = width / columns;
    const cellHeight = height / rows;
    const direction = random() > 0.46 ? 1 : -1;

    return {
      x: cellWidth * (column + 0.5) + (random() - 0.5) * cellWidth * 0.72,
      y: cellHeight * (row + 0.5) + (random() - 0.5) * cellHeight * 0.72,
      vx: direction * (0.035 + random() * 0.08),
      vy: (random() - 0.5) * 0.055,
      radius: 0.7 + random() * 1.15,
      color: palette[Math.floor(random() * palette.length)],
    };
  });
}

export default function ParticleField({ className = "", variant = "hero" }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let isVisible = true;
    let animationFrame = 0;
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let previousTime = 0;

    const configure = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const isMobile = mobileQuery.matches;
      const count = isMobile ? (variant === "hero" ? 28 : 22) : variant === "hero" ? 84 : 56;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      nodes = createNodes(width, height, count, variant === "hero" ? 1427 : 2911);
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);
      const isMobile = mobileQuery.matches;
      const connectionDistance = isMobile ? 94 : variant === "hero" ? 142 : 126;
      const lineStrength = variant === "hero" ? 0.17 : 0.12;

      if (!reduceMotion) {
        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -8) node.x = width + 8;
          if (node.x > width + 8) node.x = -8;
          if (node.y < -8 || node.y > height + 8) node.vy *= -1;
        });
      }

      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const from = nodes[first];
          const to = nodes[second];
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const distance = Math.hypot(dx, dy);
          if (distance > connectionDistance) continue;

          const alpha = (1 - distance / connectionDistance) * lineStrength;
          context.beginPath();
          context.moveTo(from.x, from.y);
          context.lineTo(to.x, to.y);
          context.strokeStyle = `rgba(${from.color}, ${alpha})`;
          context.lineWidth = 0.7;
          context.stroke();

          if (!reduceMotion && !isMobile && (first * 7 + second * 11) % 29 === 0) {
            const progress = (time * 0.00007 + ((first + second) % 13) / 13) % 1;
            const packetX = from.x + dx * progress;
            const packetY = from.y + dy * progress;
            context.beginPath();
            context.arc(packetX, packetY, 1.7, 0, Math.PI * 2);
            context.fillStyle = `rgba(217, 184, 111, ${Math.min(0.8, alpha * 5)})`;
            context.shadowColor = "rgba(217, 184, 111, 0.55)";
            context.shadowBlur = 7;
            context.fill();
            context.shadowBlur = 0;
          }
        }
      }

      nodes.forEach((node, index) => {
        const pulse = reduceMotion ? 1 : 0.82 + Math.sin(time * 0.0011 + index) * 0.18;
        context.beginPath();
        context.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        context.fillStyle = `rgba(${node.color}, ${variant === "hero" ? 0.66 : 0.46})`;
        context.fill();
      });
    };

    const tick = (time: number) => {
      if (!isVisible) return;
      if (time - previousTime >= 24) {
        previousTime = time;
        render(time);
      }
      animationFrame = window.requestAnimationFrame(tick);
    };

    configure();
    render(0);

    const resizeObserver = new ResizeObserver(() => {
      configure();
      render(0);
    });
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      window.cancelAnimationFrame(animationFrame);
      if (isVisible && !reduceMotion) animationFrame = window.requestAnimationFrame(tick);
    });
    visibilityObserver.observe(canvas);

    if (!reduceMotion) animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [reduceMotion, variant]);

  return <canvas ref={canvasRef} className={`pointer-events-none h-full w-full ${className}`} aria-hidden="true" />;
}
