import { useEffect, useRef } from "react";
import { motion, type MotionValue } from "framer-motion";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Fog,
  Group,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";

type StormCoreProps = {
  reduceMotion: boolean | null;
  scrollY: MotionValue<number>;
  scrollScale: MotionValue<number>;
  scrollOpacity: MotionValue<number>;
  sceneProgress?: MotionValue<number>;
  fullscreen?: boolean;
  palette?: "portfolio" | "original";
};

const vertexShader = `
  uniform float uTime;
  uniform float uSize;
  uniform vec3 uCursor;
  uniform float uRepelRadius;
  uniform float uRepelStrength;
  uniform float uActivity;
  uniform vec3 uCore;
  uniform vec3 uMid;
  uniform vec3 uRim;
  attribute float aScale;
  attribute float aNoise;
  attribute float aRadialPush;
  attribute float aMix;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;
    float pulseTime = uTime * 1.22 + aNoise * 6.2831;
    float wobble = sin(pulseTime) * 0.085 * aRadialPush;
    pos *= 1.0 + wobble;

    float swirlAngle = uTime * 0.055 + aNoise * 0.34;
    mat2 swirl = mat2(cos(swirlAngle), -sin(swirlAngle), sin(swirlAngle), cos(swirlAngle));
    pos.xz = swirl * pos.xz;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec3 toParticle = modelPosition.xyz - uCursor;
    float cursorDistance = length(toParticle);
    float cursorFalloff = smoothstep(uRepelRadius, 0.0, cursorDistance);
    modelPosition.xyz += normalize(toParticle + vec3(0.0001)) * cursorFalloff * uRepelStrength * uActivity;

    vec4 mvPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = clamp(uSize * aScale / max(1.0, -mvPosition.z), 1.0, 13.0);

    float coreMix = smoothstep(0.2, 0.78, aMix);
    vec3 firstMix = mix(uCore, uMid, coreMix);
    float rimMix = clamp((aMix - 0.68) * 3.1, 0.0, 1.0);
    vColor = mix(firstMix, uRim, rimMix);
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distanceToCenter = length(point);
    if (distanceToCenter > 0.5) discard;
    float strength = pow(1.0 - distanceToCenter * 2.0, 3.8);
    vec3 color = vColor * (0.72 + strength * 1.15);
    gl_FragColor = vec4(color, strength * 1.18);
  }
`;

function createStormGeometry(count: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const noises = new Float32Array(count);
  const radialPush = new Float32Array(count);
  const mixValues = new Float32Array(count);
  const radius = 2.5;

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    let u = 0;
    let v = 0;
    let sample = 0;
    do {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;
      sample = u * u + v * v;
    } while (sample >= 1 || sample === 0);

    const factor = 2 * Math.sqrt(1 - sample);
    const directionX = u * factor;
    const directionY = v * factor;
    const directionZ = 1 - 2 * sample;
    const radialMix = Math.pow(Math.random(), 0.42);
    const pointRadius = radius * (0.5 + radialMix * 0.5);

    positions[offset] = directionX * pointRadius;
    positions[offset + 1] = directionY * pointRadius;
    positions[offset + 2] = directionZ * pointRadius;
    mixValues[index] = radialMix;
    scales[index] = 0.42 + Math.random() * 0.82;
    noises[index] = Math.random();
    radialPush[index] = 0.38 + radialMix * 1.08;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aScale", new BufferAttribute(scales, 1));
  geometry.setAttribute("aNoise", new BufferAttribute(noises, 1));
  geometry.setAttribute("aRadialPush", new BufferAttribute(radialPush, 1));
  geometry.setAttribute("aMix", new BufferAttribute(mixValues, 1));
  return geometry;
}

export default function StormCore({
  reduceMotion,
  scrollY,
  scrollScale,
  scrollOpacity,
  sceneProgress,
  fullscreen = false,
  palette = "portfolio",
}: StormCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerTarget = useRef({ x: 0, y: 0, active: 0 });
  const pointerCurrent = useRef({ x: 0, y: 0, active: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.25));

    const scene = new Scene();
    scene.fog = new Fog(0x09060b, 7, 16);
    const camera = new PerspectiveCamera(46, 1, 0.1, 40);
    camera.position.set(0, 0, 7);

    const geometry = createStormGeometry(isMobile ? 7600 : 28000);
    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: isMobile ? 52 : 66 },
      uCursor: { value: new Vector3() },
      uRepelRadius: { value: 1.4 },
      uRepelStrength: { value: 3.6 },
      uActivity: { value: 0 },
      uCore: { value: new Color(palette === "original" ? "#6a0a2a" : "#35102f") },
      uMid: { value: new Color(palette === "original" ? "#ff2d6b" : "#d34d88") },
      uRim: { value: new Color(palette === "original" ? "#ffd36b" : "#e5c77a") },
    };
    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const points = new Points(geometry, material);
    const storm = new Group();
    storm.add(points);
    scene.add(storm);

    let frame = 0;
    let visible = true;
    const startTime = performance.now();
    const pointerWorld = new Vector3();
    const pointerNdc = new Vector3();
    const pointerDirection = new Vector3();
    const pointerWorldTarget = new Vector3();

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const draw = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      const progress = Math.min(1, Math.max(0, sceneProgress ? sceneProgress.get() : -scrollY.get() / 70));
      const follow = reduceMotion ? 1 : 0.065;
      pointerCurrent.current.x += (pointerTarget.current.x - pointerCurrent.current.x) * follow;
      pointerCurrent.current.y += (pointerTarget.current.y - pointerCurrent.current.y) * follow;
      pointerCurrent.current.active += (pointerTarget.current.active - pointerCurrent.current.active) * follow;

      uniforms.uTime.value = reduceMotion ? 0.8 : elapsed;
      uniforms.uSize.value = (isMobile ? 52 : 66) * (1 + progress * (fullscreen ? 0.28 : 0));
      camera.position.set(
        pointerCurrent.current.x * 0.24,
        pointerCurrent.current.y * 0.2,
        7 - progress * (fullscreen ? 0.18 : 2.15),
      );
      camera.lookAt(0, 0, 0);

      pointerWorldTarget.set(0, 0, 0);
      if (pointerCurrent.current.active > 0.01) {
        pointerNdc.set(pointerCurrent.current.x, pointerCurrent.current.y, 0.5).unproject(camera);
        pointerDirection.copy(pointerNdc).sub(camera.position).normalize();
        if (Math.abs(pointerDirection.z) > 0.0001) {
          const distanceToPlane = -camera.position.z / pointerDirection.z;
          if (distanceToPlane > 0 && Number.isFinite(distanceToPlane)) {
            pointerWorldTarget.copy(camera.position).addScaledVector(pointerDirection, distanceToPlane);
          }
        }
      }
      pointerWorld.lerp(pointerWorldTarget, reduceMotion ? 1 : 0.12);
      uniforms.uCursor.value.copy(pointerWorld);
      uniforms.uActivity.value = reduceMotion ? 0 : pointerCurrent.current.active;
      storm.scale.setScalar(1 + progress * (fullscreen ? 0.025 : 0.34));
      storm.rotation.y = reduceMotion ? 0.1 : elapsed * 0.035;
      storm.rotation.x = reduceMotion ? -0.06 : elapsed * 0.011;
      storm.rotation.z = fullscreen ? progress * 0.28 : 0;
      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!visible) return;
      draw();
      frame = window.requestAnimationFrame(animate);
    };

    resize();
    draw();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      window.cancelAnimationFrame(frame);
      if (visible && !reduceMotion) frame = window.requestAnimationFrame(animate);
    });
    visibilityObserver.observe(container);
    if (!reduceMotion) frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [palette, reduceMotion, sceneProgress, scrollY]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || window.matchMedia("(hover: none)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerTarget.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerTarget.current.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    pointerTarget.current.active = 1;
  };

  const resetPointer = () => {
    pointerTarget.current = { x: 0, y: 0, active: 0 };
  };

  return (
    <motion.div
      className={`storm-core relative mx-auto aspect-square ${palette === "original" ? "storm-core-original" : ""} ${fullscreen ? "w-[min(92vmin,900px)]" : "w-[min(90vw,610px)]"}`}
      style={{
        y: reduceMotion ? 0 : scrollY,
        scale: reduceMotion ? 1 : scrollScale,
        opacity: reduceMotion ? 1 : scrollOpacity,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <canvas ref={canvasRef} className="storm-core-canvas absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="storm-core-atmosphere" aria-hidden="true" />

      <span className="storm-coordinate storm-coordinate-a">DEPLOY / 01</span>
      <span className="storm-coordinate storm-coordinate-b">OBSERVE / 02</span>
    </motion.div>
  );
}
