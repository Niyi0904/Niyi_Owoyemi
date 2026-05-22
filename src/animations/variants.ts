import type { Variants } from "framer-motion";

// ─── Fade up — default section reveal ────────────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ─── Fade in — opacity only ───────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

// ─── Slide in from left ───────────────────────────────────────────────────────
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// ─── Slide in from right ──────────────────────────────────────────────────────
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// ─── Stagger container — wraps staggered children ────────────────────────────
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// ─── Stagger item — child of staggerContainer ────────────────────────────────
export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─── Scale in — for cards and badges ─────────────────────────────────────────
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } },
};

// ─── Page transition — wraps each page ───────────────────────────────────────
export const pageTransition: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: "easeOut" } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3,  ease: "easeIn"  } },
};

// ─── Shared viewport config ───────────────────────────────────────────────────
export const viewport = { once: true, margin: "-80px" };
