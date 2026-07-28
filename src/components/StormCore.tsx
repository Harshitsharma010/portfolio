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
  active?: boolean;
  reveal?: boolean;
  launching?: boolean;
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
  uniform float uFormation;
  uniform float uLaunch;
  uniform vec3 uCore;
  uniform vec3 uMid;
  uniform vec3 uRim;
  uniform vec3 uAccent;
  attribute float aScale;
  attribute float aNoise;
  attribute float aRadialPush;
  attribute float aMix;
  varying vec3 vColor;
  varying float vDepth;
  varying float vFormation;
  varying float vLaunch;
  varying float vSignal;

  void main() {
    vec3 pos = position;
    float formationEase = 1.0 - pow(1.0 - uFormation, 3.0);
    float formationScatter = 1.0 - formationEase;
    float assemblyAngle = formationScatter * (0.9 + aNoise * 2.2);
    mat2 assembly = mat2(cos(assemblyAngle), -sin(assemblyAngle), sin(assemblyAngle), cos(assemblyAngle));
    pos.xy = assembly * pos.xy;
    pos *= 1.0 + formationScatter * (0.5 + aNoise * 0.58);
    pos.y += formationScatter * (aNoise - 0.5) * 1.1;

    float pulseTime = uTime * 1.22 + aNoise * 6.2831;
    float wobble = sin(pulseTime) * 0.11 * aRadialPush;
    pos *= 1.0 + wobble;

    float swirlAngle = uTime * 0.078 + aNoise * 0.34;
    mat2 swirl = mat2(cos(swirlAngle), -sin(swirlAngle), sin(swirlAngle), cos(swirlAngle));
    pos.xz = swirl * pos.xz;

    float launchEase = uLaunch * uLaunch;
    pos.xy *= 1.0 + launchEase * (0.26 + aNoise * 0.28);
    pos.y -= launchEase * (0.18 + aNoise * 0.58);

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec3 toParticle = modelPosition.xyz - uCursor;
    float cursorDistance = length(toParticle);
    vec3 cursorDirection = normalize(toParticle + vec3(0.0001));
    float cursorFalloff = smoothstep(uRepelRadius, 0.0, cursorDistance);
    float cursorReach = smoothstep(uRepelRadius * 1.85, uRepelRadius * 0.58, cursorDistance);
    float attractionBand = max(0.0, cursorReach - cursorFalloff);
    vec3 cursorTangent = normalize(vec3(-cursorDirection.y, cursorDirection.x, 0.001));
    modelPosition.xyz -= cursorDirection * attractionBand * 0.42 * uActivity;
    modelPosition.xyz += cursorDirection * cursorFalloff * uRepelStrength * uActivity;
    modelPosition.xyz += cursorTangent * (cursorFalloff + attractionBand) * sin(aNoise * 12.0 + uTime * 2.1) * 0.18 * uActivity;

    vec4 mvPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * mvPosition;
    vDepth = smoothstep(-2.8, 2.8, modelPosition.z);
    float signalPosition = fract(uTime * 0.075);
    float signalDistance = min(abs(aMix - signalPosition), 1.0 - abs(aMix - signalPosition));
    vSignal = exp(-signalDistance * 34.0) * (0.38 + aNoise * 0.62);
    gl_PointSize = clamp(uSize * aScale * (0.86 + vDepth * 0.3) * (1.0 + vSignal * 0.58) / max(1.0, -mvPosition.z), 1.0, 13.0);

    float coreMix = smoothstep(0.2, 0.78, aMix);
    vec3 firstMix = mix(uCore, uMid, coreMix);
    float rimMix = clamp((aMix - 0.68) * 3.1, 0.0, 1.0);
    vec3 radialColor = mix(firstMix, uRim, rimMix);
    float accentMix = smoothstep(0.82, 0.97, aNoise) * (0.3 + rimMix * 0.7);
    vec3 accentedColor = mix(radialColor, uAccent, accentMix * 0.82);
    vColor = mix(accentedColor, uAccent, vSignal * 0.34) * (0.68 + vDepth * 0.64);
    vFormation = smoothstep(0.04, 0.48, uFormation);
    vLaunch = uLaunch;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vDepth;
  varying float vFormation;
  varying float vLaunch;
  varying float vSignal;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distanceToCenter = length(point);
    if (distanceToCenter > 0.5) discard;
    float spark = pow(1.0 - distanceToCenter * 2.0, 3.6);
    float halo = pow(1.0 - distanceToCenter * 2.0, 1.45);
    vec3 color = vColor * (0.55 + spark * 1.18 + halo * 0.2 + vSignal * 0.28);
    float alpha = (spark + halo * 0.14) * (0.7 + vDepth * 0.48) * vFormation * (1.0 - vLaunch * 0.72);
    gl_FragColor = vec4(color, min(1.0, alpha));
  }
`;

const orbitVertexShader = `
  uniform float uTime;
  uniform float uFormation;
  uniform float uLaunch;
  attribute float aScale;
  attribute float aPhase;
  attribute float aVisibility;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float breathing = sin(uTime * 0.52 + aPhase * 6.2831) * 0.025;
    pos *= 1.0 + breathing;
    pos.xy *= 1.0 + uLaunch * uLaunch * (0.28 + aPhase * 0.18);

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 mvPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * mvPosition;

    float front = smoothstep(-3.0, 3.0, modelPosition.z);
    gl_PointSize = clamp(aScale * (7.5 + front * 5.0) / max(1.0, -mvPosition.z), 1.0, 4.5);
    vColor = color * (0.56 + front * 0.62);
    vAlpha = aVisibility * (0.16 + front * 0.72) * smoothstep(0.36, 0.88, uFormation) * (1.0 - uLaunch * 0.86);
  }
`;

const orbitFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distanceToCenter = length(point);
    if (distanceToCenter > 0.5) discard;
    float strength = pow(1.0 - distanceToCenter * 2.0, 2.1);
    gl_FragColor = vec4(vColor, strength * vAlpha);
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
    const coreParticle = Math.random() < 0.46;
    const radialMix = coreParticle
      ? Math.pow(Math.random(), 0.9) * 0.66
      : 0.42 + Math.pow(Math.random(), 0.48) * 0.58;
    const pointRadius = radius * (0.06 + radialMix * 0.94);

    positions[offset] = directionX * pointRadius;
    positions[offset + 1] = directionY * pointRadius;
    positions[offset + 2] = directionZ * pointRadius;
    mixValues[index] = radialMix;
    scales[index] = coreParticle
      ? 0.56 + Math.random() * 0.78
      : 0.4 + Math.random() * 0.76;
    noises[index] = Math.random();
    radialPush[index] = 0.3 + radialMix * 0.98;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aScale", new BufferAttribute(scales, 1));
  geometry.setAttribute("aNoise", new BufferAttribute(noises, 1));
  geometry.setAttribute("aRadialPush", new BufferAttribute(radialPush, 1));
  geometry.setAttribute("aMix", new BufferAttribute(mixValues, 1));
  return geometry;
}

function createOrbitGeometry(
  count: number,
  radius: number,
  phaseOffset: number,
  colors: [Color, Color, Color],
) {
  const positions = new Float32Array(count * 3);
  const pointColors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const phases = new Float32Array(count);
  const visibility = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const progress = index / count;
    const angle = progress * Math.PI * 2;
    const wave = Math.sin(angle * 3 + phaseOffset);
    const radialJitter = (Math.sin(index * 12.9898 + phaseOffset) * 0.5 + 0.5) * 0.055;
    const pointRadius = radius + radialJitter;
    const particleColor = colors[index % 17 === 0 ? 2 : index % 5 === 0 ? 1 : 0];

    positions[offset] = Math.cos(angle) * pointRadius;
    positions[offset + 1] = Math.sin(angle) * pointRadius;
    positions[offset + 2] = Math.sin(angle * 2 + phaseOffset) * 0.055;
    pointColors[offset] = particleColor.r;
    pointColors[offset + 1] = particleColor.g;
    pointColors[offset + 2] = particleColor.b;
    scales[index] = 1.15 + (index % 7) * 0.09;
    phases[index] = progress;
    visibility[index] = Math.max(0, Math.min(1, (wave + 0.34) * 1.8));
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(pointColors, 3));
  geometry.setAttribute("aScale", new BufferAttribute(scales, 1));
  geometry.setAttribute("aPhase", new BufferAttribute(phases, 1));
  geometry.setAttribute("aVisibility", new BufferAttribute(visibility, 1));
  return geometry;
}

export default function StormCore({
  reduceMotion,
  scrollY,
  scrollScale,
  scrollOpacity,
  active = true,
  reveal = true,
  launching = false,
  sceneProgress,
  fullscreen = false,
  palette = "portfolio",
}: StormCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerTarget = useRef({ x: 0, y: 0, active: 0 });
  const pointerCurrent = useRef({ x: 0, y: 0, active: 0 });
  const activeRef = useRef(active);
  const revealStartedAt = useRef<number | null>(reveal ? performance.now() : null);
  const launchStartedAt = useRef<number | null>(launching ? performance.now() : null);
  activeRef.current = active;

  useEffect(() => {
    if (reveal && revealStartedAt.current === null) {
      revealStartedAt.current = performance.now();
    }
  }, [reveal]);

  useEffect(() => {
    launchStartedAt.current = launching ? performance.now() : null;
  }, [launching]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.15));

    const scene = new Scene();
    scene.fog = new Fog(0x09060b, 7, 16);
    const camera = new PerspectiveCamera(46, 1, 0.1, 40);
    camera.position.set(0, 0, 7);

    const geometry = createStormGeometry(isMobile ? 3800 : 13500);
    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: isMobile ? 56 : 74 },
      uCursor: { value: new Vector3() },
      uRepelRadius: { value: 1.28 },
      uRepelStrength: { value: 3.25 },
      uActivity: { value: 0 },
      uFormation: { value: reduceMotion ? 1 : 0 },
      uLaunch: { value: 0 },
      uCore: { value: new Color(palette === "original" ? "#261227" : "#326c70") },
      uMid: { value: new Color(palette === "original" ? "#b35e82" : "#5da9a0") },
      uRim: { value: new Color(palette === "original" ? "#d6b7c5" : "#d0e4e0") },
      uAccent: { value: new Color(palette === "original" ? "#e0ad72" : "#df8e76") },
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

    const orbitColors: [Color, Color, Color] = palette === "original"
      ? [new Color("#d6b7c5"), new Color("#e0ad72"), new Color("#f1d7df")]
      : [new Color("#77bdb4"), new Color("#d0e4e0"), new Color("#df8e76")];
    const orbitGeometryA = createOrbitGeometry(isMobile ? 170 : 320, 2.78, 0.25, orbitColors);
    const orbitGeometryB = createOrbitGeometry(isMobile ? 135 : 255, 3.02, 1.75, orbitColors);
    const orbitUniforms = {
      uTime: { value: 0 },
      uFormation: { value: reduceMotion ? 1 : 0 },
      uLaunch: { value: 0 },
    };
    const orbitMaterial = new ShaderMaterial({
      uniforms: orbitUniforms,
      vertexShader: orbitVertexShader,
      fragmentShader: orbitFragmentShader,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: AdditiveBlending,
    });
    const orbitA = new Points(orbitGeometryA, orbitMaterial);
    const orbitB = new Points(orbitGeometryB, orbitMaterial);
    orbitA.rotation.set(0.96, 0.18, -0.2);
    orbitB.rotation.set(-0.72, 0.52, 0.28);
    storm.add(orbitA, orbitB);
    scene.add(storm);

    let frame = 0;
    let inViewport = true;
    let pageVisible = !document.hidden;
    let windowFocused = true;
    let previousTime = 0;
    const startTime = performance.now();
    const frameInterval = 1000 / (isMobile ? 24 : 30);
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
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, Math.max(0, sceneProgress ? sceneProgress.get() : -scrollY.get() / 70));
      const formationElapsed = revealStartedAt.current === null ? 0 : (now - revealStartedAt.current) / 1000;
      const formation = reduceMotion ? 1 : Math.min(1, Math.max(0, formationElapsed / 1.15));
      const launchElapsed = launchStartedAt.current === null ? 0 : (now - launchStartedAt.current) / 1000;
      const launch = reduceMotion ? 0 : Math.min(1, Math.max(0, launchElapsed / 0.46));
      const follow = reduceMotion ? 1 : 0.065;
      pointerCurrent.current.x += (pointerTarget.current.x - pointerCurrent.current.x) * follow;
      pointerCurrent.current.y += (pointerTarget.current.y - pointerCurrent.current.y) * follow;
      pointerCurrent.current.active += (pointerTarget.current.active - pointerCurrent.current.active) * follow;

      uniforms.uTime.value = reduceMotion ? 0.8 : elapsed;
      uniforms.uSize.value = (isMobile ? 56 : 74) * (1 + progress * (fullscreen ? 0.28 : 0));
      uniforms.uFormation.value = formation;
      uniforms.uLaunch.value = launch;
      orbitUniforms.uTime.value = reduceMotion ? 0.8 : elapsed;
      orbitUniforms.uFormation.value = formation;
      orbitUniforms.uLaunch.value = launch;
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
      storm.rotation.y = reduceMotion ? 0.1 : elapsed * 0.065;
      storm.rotation.x = reduceMotion ? -0.06 : elapsed * 0.018;
      storm.rotation.z = fullscreen ? progress * 0.28 : 0;
      orbitA.rotation.z = -0.2 + (reduceMotion ? 0 : elapsed * 0.078);
      orbitB.rotation.z = 0.28 - (reduceMotion ? 0 : elapsed * 0.056);
      renderer.render(scene, camera);
    };

    const animate = (time: number) => {
      if (!inViewport || !pageVisible || !windowFocused) return;
      if (activeRef.current && time - previousTime >= frameInterval) {
        previousTime = time;
        draw();
      }
      frame = window.requestAnimationFrame(animate);
    };

    const scheduleAnimation = () => {
      window.cancelAnimationFrame(frame);
      if (inViewport && pageVisible && windowFocused && !reduceMotion) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    resize();
    draw();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      scheduleAnimation();
    });
    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;
      scheduleAnimation();
    };
    const handleWindowFocus = () => {
      windowFocused = true;
      scheduleAnimation();
    };
    const handleWindowBlur = () => {
      windowFocused = false;
      scheduleAnimation();
    };

    visibilityObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);
    scheduleAnimation();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
      geometry.dispose();
      orbitGeometryA.dispose();
      orbitGeometryB.dispose();
      material.dispose();
      orbitMaterial.dispose();
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
      className={`storm-core relative mx-auto aspect-square ${palette === "original" ? "storm-core-original" : ""} ${fullscreen ? "w-[min(92vmin,900px)]" : "w-[min(88vw,560px)]"}`}
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
