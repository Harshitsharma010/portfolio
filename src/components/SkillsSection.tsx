import { motion, useReducedMotion } from "framer-motion";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiFastapi,
  SiGithubactions,
  SiMongodb,
  SiPython,
  SiReact,
  SiTerraform,
} from "react-icons/si";
import { skillGroups } from "../data/sections";

type CoreSkill = {
  name: string;
  detail: string;
  icon: IconType;
};

const coreSkills: CoreSkill[] = [
  { name: "React", detail: "Dashboard UI", icon: SiReact },
  { name: "AWS", detail: "Lambda, ECS, logs", icon: FaAws },
  { name: "Docker", detail: "Container builds", icon: SiDocker },
  { name: "Python", detail: "APIs and ML", icon: SiPython },
  { name: "Terraform", detail: "IaC basics", icon: SiTerraform },
  { name: "MongoDB", detail: "Product data", icon: SiMongodb },
  { name: "FastAPI", detail: "Backend APIs", icon: SiFastapi },
  { name: "GitHub Actions", detail: "CI/CD checks", icon: SiGithubactions },
];

const visibleGroups = ["Cloud / DevOps", "Backend", "AI / ML", "Frontend"];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export default function SkillsSection() {
  const reduceMotion = useReducedMotion();
  const groups = skillGroups.filter((group) => visibleGroups.includes(group.area));

  return (
    <section
      id="skills"
      className="relative z-40 scroll-mt-24 overflow-hidden bg-[#0C0C0C] px-5 py-28 text-white sm:px-8 sm:py-32 md:px-10 md:py-36"
    >
      <div className="film-grain pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.11),transparent_34%),radial-gradient(circle_at_12%_42%,rgba(255,255,255,0.055),transparent_30%),linear-gradient(180deg,#0C0C0C_0%,#121212_48%,#0C0C0C_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[clamp(3rem,8vw,5.8rem)] font-black uppercase leading-[0.86] tracking-[-0.035em] text-white">
            Skills
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-7 text-white/64 sm:text-lg">
            Tools and systems I use to build, deploy, monitor, and explain real projects.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? "show" : "show"}
          viewport={{ once: true, amount: 0.18 }}
        >
          {coreSkills.map(({ name, detail, icon: Icon }) => (
            <motion.article
              key={name}
              variants={rise}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-h-[218px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]"
            >
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.07] blur-2xl transition-transform duration-500 group-hover:translate-y-4" />
              <div className="relative flex h-full flex-col justify-between">
                <Icon className="h-12 w-12 text-white" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.025em] text-white">
                    {name}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-5 text-white/58">{detail}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-20 space-y-4">
          {groups.map((group, index) => (
            <motion.article
              key={group.area}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.055] sm:p-6"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.58, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid gap-5 lg:grid-cols-[0.34fr_1fr] lg:items-center">
                <div>
                  <h3 className="text-[clamp(1.35rem,2vw,2rem)] font-black uppercase leading-none tracking-[-0.025em] text-white">
                    {group.area}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm font-light leading-6 text-white/56">
                    {group.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {group.tools.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-light leading-none text-white/75 transition-colors duration-300 hover:bg-white/[0.07] hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
