import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const menuItems = [
  { label: "Snapshot", href: "#snapshot" },
  { label: "Proof", href: "#proof" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

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
          className="pointer-events-auto hidden rounded-full border border-[#D7E2EA]/[0.38] px-5 py-2.5 text-sm font-medium uppercase tracking-[0.16em] text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA] hover:text-[#0C0C0C] sm:px-6 md:block"
        >
          GitHub
        </motion.a>

        <button
          type="button"
          className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/35 text-[#D7E2EA] backdrop-blur-xl transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            className="pointer-events-auto fixed inset-x-3 top-[4.75rem] overflow-hidden rounded-2xl border border-white/15 bg-[#0B090C]/95 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.65)] backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-2 gap-1">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#D7E2EA] transition-colors hover:bg-white/[0.08] focus-visible:bg-white/[0.08] focus-visible:outline-none"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025, duration: 0.25 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <a
              href="https://github.com/Harshitsharma010"
              className="mt-2 flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] px-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/[0.12]"
            >
              View GitHub
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
