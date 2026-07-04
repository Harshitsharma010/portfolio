import { motion } from "framer-motion";

const menuItems = [
  { label: "Snapshot", href: "#snapshot" },
  { label: "Proof", href: "#proof" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 bg-gradient-to-b from-[#0C0C0C]/95 via-[#0C0C0C]/72 to-transparent pb-8">
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7 md:px-10">
        <a
          href="#home"
          className="pointer-events-auto text-2xl font-black uppercase leading-none tracking-[-0.04em] text-[#D7E2EA] sm:text-3xl"
          aria-label="Harshit Sharma home"
        >
          Harshit<sup className="ml-0.5 align-super text-xs">®</sup>
        </a>
        <div className="pointer-events-auto hidden items-center gap-5 md:flex lg:gap-7">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium uppercase tracking-[0.18em] text-[#D7E2EA] transition-opacity hover:opacity-70 lg:text-[0.96rem]"
            >
              {item.label}
            </a>
          ))}
        </div>
        <motion.a
          href="https://github.com/Harshitsharma010"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="pointer-events-auto rounded-full border border-[#D7E2EA]/[0.38] px-5 py-2.5 text-sm font-medium uppercase tracking-[0.16em] text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA] hover:text-[#0C0C0C] sm:px-6"
        >
          GitHub
        </motion.a>
      </nav>
    </header>
  );
}
