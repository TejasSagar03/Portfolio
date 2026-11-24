import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';

// --- IMPORT YOUR IMAGES HERE ---
import heroPic from './assets/hero-pic.jpg'; 
import aboutPic from './assets/about-pic.jpg'; 

// --- ZERO-CRASH SVGS ---
const ArrowUpRightIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>;
const MailIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const MapPinIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const GithubIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.5 5 5 0 0 0-.12-3.46s-1.13-.36-3.7 1.36a12.8 12.8 0 0 0-6.8 0c-2.57-1.72-3.7-1.36-3.7-1.36a5 5 0 0 0-.12 3.46 5.2 5.2 0 0 0-1.39 3.5c0 5.2 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path></svg>;
const LinkedinIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const SendIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const BadgeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M12 15v5s-2.5-1.5-5 0v-5"></path><circle cx="12" cy="9" r="5"></circle></svg>;
const CloseIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const CopyIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><rect x="9" y="9" width="13" height="13" rx="0" ry="0"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const CheckIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const ChevronLeftIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ChevronRightIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square"><polyline points="9 18 15 12 9 6"></polyline></svg>;

// --- MICRO-GRAPHIC COMPONENT ---
const MicroGraphicIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="mr-2 inline-block opacity-40 -mt-0.5">
    <rect x="2" y="3" width="3" height="3" />
    <rect x="7" y="3" width="3" height="3" />
    <rect x="2" y="8" width="3" height="3" />
    <rect x="7" y="8" width="3" height="3" />
    <rect x="2" y="13" width="3" height="3" />
    <rect x="7" y="13" width="3" height="3" />
  </svg>
);

// --- AUTHENTIC iOS OPTICAL + NOTHING OS 5.0 DETENT CURVES ---
const IOS_OPTICAL_EASE = [0.25, 1, 0.5, 1];
const IOS_SHEET_EASE = [0.32, 0.72, 0, 1];
const NOTHING_DETENT_EASE = [0.19, 1, 0.22, 1];
const NOTHING_LAYOUT_SPRING = { type: "spring", stiffness: 580, damping: 48, mass: 0.65 };

// --- BIDIRECTIONAL SCROLL VIEWPORT CONFIG ---
const SCROLL_REPLAY_VIEWPORT = { once: false, amount: "some" };

// --- FIXED HARDWARE REGISTRATION BRACKETS (VISIBLE ON ALL 4 EDGES + CLEAN ROTATION) ---
const HardwareRegistrationBrackets = ({ isDark, size = "lg" }) => {
  const isLarge = size === "lg";
  const svgDim = isLarge ? "w-11 h-11 sm:w-14 sm:h-14" : "w-9 h-9 sm:w-11 sm:h-11";
  const topOffset = isLarge ? "-top-2.5 -left-2.5 sm:-top-3.5 sm:-left-3.5" : "-top-2 -left-2 sm:-top-3 sm:-left-3";
  const bottomOffset = isLarge ? "-bottom-2.5 -right-2.5 sm:-bottom-3.5 sm:-right-3.5" : "-bottom-2 -right-2 sm:-bottom-3 sm:-right-3";

  return (
    <>
      <motion.svg
        initial={{ opacity: 0, x: -6, y: -6 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={SCROLL_REPLAY_VIEWPORT}
        transition={{ duration: 0.45, ease: NOTHING_DETENT_EASE }}
        className={`absolute ${topOffset} ${svgDim} ${isDark ? 'text-zinc-500' : 'text-zinc-400'} group-hover:text-[#ea0000] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 z-20 pointer-events-none`}
        viewBox="0 0 64 64"
        fill="none"
      >
        <motion.line
          x1="4" y1="4" x2="60" y2="4"
          stroke="currentColor" strokeWidth="1.25"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{ duration: 0.5, ease: IOS_SHEET_EASE, delay: 0.06 }}
        />
        <motion.line
          x1="4" y1="4" x2="4" y2="60"
          stroke="currentColor" strokeWidth="1.25"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{ duration: 0.5, ease: IOS_SHEET_EASE, delay: 0.06 }}
        />
        <circle cx="4" cy="4" r="2.2" fill="#ea0000" />
        {isLarge && <circle cx="60" cy="4" r="1.8" fill="currentColor" />}
        {isLarge && <circle cx="4" cy="60" r="1.8" fill="currentColor" />}
      </motion.svg>

      <motion.svg
        initial={{ opacity: 0, x: 6, y: 6 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={SCROLL_REPLAY_VIEWPORT}
        transition={{ duration: 0.45, ease: NOTHING_DETENT_EASE, delay: 0.06 }}
        className={`absolute ${bottomOffset} ${svgDim} ${isDark ? 'text-zinc-500' : 'text-zinc-400'} group-hover:text-[#ea0000] group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300 z-20 pointer-events-none`}
        viewBox="0 0 64 64"
        fill="none"
      >
        <motion.line
          x1="60" y1="60" x2="4" y2="60"
          stroke="currentColor" strokeWidth="1.25"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{ duration: 0.5, ease: IOS_SHEET_EASE, delay: 0.12 }}
        />
        <motion.line
          x1="60" y1="60" x2="60" y2="4"
          stroke="currentColor" strokeWidth="1.25"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{ duration: 0.5, ease: IOS_SHEET_EASE, delay: 0.12 }}
        />
        <circle cx="60" cy="60" r="2.2" fill="#ea0000" />
        {isLarge && <circle cx="4" cy="60" r="1.8" fill="currentColor" />}
        {isLarge && <circle cx="60" cy="4" r="1.8" fill="currentColor" />}
      </motion.svg>
    </>
  );
};

// --- UNIQUE NOTHING OS 5.0 GLYPH DEPTH & KINETIC TELEMETRY STRIP ---
const HeroScrollTelemetryBar = ({ isDark, smoothProgress }) => {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      setScrollPct(Math.min(99, Math.max(0, Math.round(latest * 100))));
    });
  }, [smoothProgress]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={SCROLL_REPLAY_VIEWPORT}
      transition={{ duration: 0.5, ease: IOS_SHEET_EASE }}
      className="absolute -right-11 xl:-right-14 bottom-6 hidden lg:flex flex-col items-center gap-2.5 z-20 pointer-events-none select-none"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#ea0000] shadow-[0_0_8px_#ea0000] animate-pulse" />

      <div className="flex items-center gap-1.5">
        <div className="flex flex-col justify-between h-16 py-1 opacity-40">
          {[0, 1, 2, 3, 4].map((tick) => (
            <span
              key={tick}
              className={`block h-[1px] ${
                tick === 2 ? 'w-2 bg-[#ea0000] opacity-100' : isDark ? 'w-1 bg-zinc-400' : 'w-1 bg-zinc-600'
              }`}
            />
          ))}
        </div>

        <div
          className={`relative w-3 h-16 rounded-[2px] border border-dotted backdrop-blur-md overflow-hidden p-[2px] ${
            isDark
              ? 'border-zinc-700 bg-zinc-950/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
              : 'border-zinc-400 bg-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
          }`}
        >
          <div className={`absolute inset-y-1 left-1/2 -translate-x-1/2 w-[1px] ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />

          <motion.div
            animate={{
              y: [0, 42, 0],
              scaleY: [1, 1.35, 0.9, 1.35, 1]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: [0.45, 0.05, 0.55, 0.95]
            }}
            className="relative z-10 w-full h-3.5 rounded-[1px] bg-gradient-to-b from-[#ff3b3b] via-[#ea0000] to-[#990000] shadow-[0_0_12px_#ea0000]"
          >
            <span className="block w-1 h-1 mx-auto mt-[2px] rounded-full bg-white/90" />
          </motion.div>
        </div>
      </div>

      <span className={`font-mono text-[7.5px] font-bold tracking-[0.2em] ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
        {String(scrollPct).padStart(2, '0')}%
      </span>
    </motion.div>
  );
};

// --- PER-CHARACTER DOT-MATRIX HERO TITLE REVEAL ---
const AnimatedDotTitle = ({ text, hasRedDot = false, className = "", delayOffset = 0 }) => {
  const chars = Array.from(text);

  return (
    <h1 className={className} aria-label={`${text}${hasRedDot ? '.' : ''}`}>
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{
            duration: 0.4,
            ease: IOS_SHEET_EASE,
            delay: delayOffset + index * 0.03
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {hasRedDot && (
        <motion.span
          initial={{ opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: [0.3, 1.25, 1] }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{
            duration: 0.42,
            ease: NOTHING_DETENT_EASE,
            delay: delayOffset + chars.length * 0.03 + 0.04
          }}
          className="text-[#ea0000] inline-block drop-shadow-[0_0_10px_rgba(234,0,0,0.6)]"
        >
          .
        </motion.span>
      )}
    </h1>
  );
};

// --- iOS OPTICAL SPECULAR CARD ---
const LiquidGlassCard = ({ children, isDark, className = "", onClick, isInteractive = false, delay = 0 }) => {
  const [spotlight, setSpotlight] = useState({ x: -200, y: -200, visible: false });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true
    });
  };

  const handleMouseLeave = () => {
    setSpotlight(prev => ({ ...prev, visible: false }));
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={SCROLL_REPLAY_VIEWPORT}
      whileHover={{ scale: 1.008, transition: { duration: 0.24, ease: IOS_OPTICAL_EASE } }}
      {...(isInteractive ? { whileTap: { scale: 0.985, transition: { duration: 0.1, ease: NOTHING_DETENT_EASE } } } : {})}
      transition={{ duration: 0.45, ease: IOS_OPTICAL_EASE, delay }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(240px circle at ${spotlight.x}px ${spotlight.y}px, ${
            isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(234, 0, 0, 0.06)'
          }, transparent 80%)`
        }}
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
};

// --- iOS SPATIAL 3D TILT FRAME ---
const SpatialTiltFrame = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 260, damping: 38, mass: 1 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 260, damping: 38, mass: 1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- NOTHING OS 5.0 INTERACTIVE GLYPH ACOUSTIC ARRAY ---
const GlyphEqualizerBadge = ({ isDark, onTriggerPulse }) => {
  const [active, setActive] = useState(true);
  const bars = [
    { min: 4, max: 12, delay: 0.0, red: false },
    { min: 6, max: 16, delay: 0.12, red: false },
    { min: 3, max: 10, delay: 0.24, red: false },
    { min: 7, max: 18, delay: 0.08, red: true },
    { min: 5, max: 14, delay: 0.18, red: false },
    { min: 4, max: 11, delay: 0.3, red: false },
    { min: 6, max: 15, delay: 0.15, red: false }
  ];

  const handleToggle = () => {
    const next = !active;
    setActive(next);
    if (onTriggerPulse) {
      onTriggerPulse(next ? 'GLYPH MATRIX // ACTIVE' : 'GLYPH MATRIX // STANDBY');
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.965 }}
      transition={{ duration: 0.14, ease: NOTHING_DETENT_EASE }}
      aria-label="Toggle Glyph Matrix"
      className={`group inline-flex items-center gap-3 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-[3px] border border-dotted backdrop-blur-xl mb-5 sm:mb-7 cursor-pointer transition-colors duration-200 ${
        isDark
          ? 'bg-white/[0.025] border-zinc-800 hover:border-[#ea0000]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
          : 'bg-black/[0.025] border-zinc-300 hover:border-[#ea0000]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
          active ? 'bg-[#ea0000] shadow-[0_0_8px_#ea0000]' : isDark ? 'bg-zinc-700' : 'bg-zinc-400'
        }`}
      />

      <div className="flex items-center gap-[3px] h-4">
        {bars.map((bar, i) => (
          <motion.span
            key={i}
            animate={
              active
                ? { height: [bar.min, bar.max, bar.min + 2, bar.max - 3, bar.min] }
                : { height: 4 }
            }
            transition={
              active
                ? {
                    duration: 1.4,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                    delay: bar.delay
                  }
                : { duration: 0.18, ease: NOTHING_DETENT_EASE }
            }
            className={`w-[2px] rounded-full transition-colors duration-200 ${
              bar.red && active
                ? 'bg-[#ea0000]'
                : isDark
                  ? 'bg-zinc-300 group-hover:bg-white'
                  : 'bg-zinc-700 group-hover:bg-black'
            }`}
          />
        ))}
      </div>

      <span className="opacity-25 text-[8px] font-mono">//</span>

      <span className={`font-mono text-[8px] font-bold tracking-[0.22em] sm:tracking-[0.26em] uppercase ${isDark ? 'text-zinc-400 group-hover:text-white' : 'text-zinc-600 group-hover:text-black'} transition-colors`}>
        GLYPH.05
      </span>
    </motion.button>
  );
};

// --- SECTION HEADER WITH BIDIRECTIONAL DOT-MATRIX REVEAL & HAIRLINE ---
const SectionHeader = ({ title, index, isDark }) => {
  const chars = Array.from(title);

  return (
    <div className="flex flex-col items-center mb-10 sm:mb-16 text-center">
      <motion.div
        initial={{ opacity: 0, letterSpacing: "0.14em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.28em" }}
        viewport={SCROLL_REPLAY_VIEWPORT}
        transition={{ duration: 0.48, ease: IOS_OPTICAL_EASE }}
        className="flex items-center gap-2 mb-2.5 sm:mb-3"
      >
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          transition={{ duration: 0.3, ease: NOTHING_DETENT_EASE }}
          className="w-1.5 h-1.5 rounded-full bg-[#ea0000]"
        />
        <span className={`font-mono text-[8px] font-bold uppercase ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
          SEC // {index}
        </span>
      </motion.div>

      <div className="overflow-hidden mb-3 sm:mb-4 py-1 max-w-full">
        <h2
          aria-label={title}
          className="font-nothing text-2xl sm:text-3xl md:text-5xl tracking-[0.12em] sm:tracking-widest uppercase text-current"
        >
          {chars.map((char, idx) => (
            <motion.span
              key={`${char}-${idx}`}
              initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={SCROLL_REPLAY_VIEWPORT}
              transition={{
                duration: 0.38,
                ease: IOS_SHEET_EASE,
                delay: idx * 0.022
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h2>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={SCROLL_REPLAY_VIEWPORT}
        transition={{ duration: 0.45, ease: NOTHING_DETENT_EASE, delay: 0.08 }}
        className={`w-12 h-[1px] origin-center ${isDark ? 'bg-zinc-800' : 'bg-zinc-300'}`}
      />
    </div>
  );
};

// --- EXPERIENCE DATA ---
const EXPERIENCE_DATA = [
  {
    code: "LOG_01 // VERIFIED",
    company: "Solident Technologies",
    role: "Full Stack Web & Mobile Development Intern",
    period: "Feb 2026 - Apr 2026",
    status: "RECENT",
    stack: ["Flutter", "Dart", "React Native", "Full-Stack APIs"],
    highlights: [
      "Acquiring hands-on expertise in Full Stack Web Development and mobile framework integration using React Native, Flutter, and Dart.",
      "Successfully developed and deployed production-ready applications, including the Alfa Public School and MyWorkers apps.",
      "Gained practical experience in building dynamic web platforms such as ARSolutions and the official domain, focusing on seamless frontend-backend integration and scalable architecture."
    ]
  },
  {
    code: "LOG_02 // COMPLETED",
    company: "Kri Communications",
    role: "Backend & Database Intern",
    period: "Sept 2025 - Nov 2025",
    status: "ARCHIVED",
    stack: ["PHP", "MySQL", "Bootstrap", "JavaScript", "HTML/CSS"],
    highlights: [
      "Undergone hands-on training in full stack web development, including building and maintaining databases using MySQL.",
      "Integrated PHP with MySQL for dynamic backend functionality and practical API development.",
      "Developed responsive interfaces using Bootstrap, along with core frontend technologies such as HTML, CSS, and JavaScript."
    ]
  }
];

// --- PROJECT DATA WITH TELEMETRY SPECS & CASE STUDIES ---
const PROJECTS_DATA = [
  { 
    name: "PixelStack Arcade", 
    id: "MOD_01",
    desc: "A responsive web-based gaming hub featuring a collection of classic and modern titles like Tic-Tac-Toe, 2048, and Neon Drifter. Built for high-performance gameplay.", 
    tech: ["Angular", "Tailwind CSS", "PostgresQL"],
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    link: "https://pixelstack-arcade.vercel.app",
    repo: "https://github.com/TejasSagar03/PixelStack-Arcade-",
    color: "168, 85, 247",
    metrics: [
      { label: "ENGINE", value: "60 FPS RAF" },
      { label: "TITLES", value: "03 MODULES" },
      { label: "STATE", value: "LOCAL PERSIST" }
    ],
    caseStudy: {
      problem: "Browser mini-game portals often feel sluggish with jarring page reloads, inconsistent controls across devices, and zero unified progression.",
      solution: "Implemented a modern Angular-based architecture with a focus on performance and user experience.",
      architecture: "Modular Angular component architecture running isolated game loops via custom requestAnimationFrame hooks and centralized local state persistence.",
      challenges: "Preventing frame drops during Neon Drifter canvas rendering while keeping touch gestures and keyboard listeners conflict-free on mobile viewports."
    }
  },
  { 
    name: "Web Chess Engine", 
    id: "MOD_02",
    desc: "Modern web-based chess game built with Java (Spring Boot) and AngularJS. Features a Chess.com-style UI, animated piece movement, full legal move validation, and Player vs AI.", 
    tech: ["Java", "Spring Boot", "AngularJS"],
    img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
    link: "https://chess-pla.netlify.app/",
    repo: "https://github.com/TejasSagar03/Chess",
    color: "59, 130, 246",
    metrics: [
      { label: "BACKEND", value: "SPRING BOOT" },
      { label: "AI CORE", value: "MINIMAX" },
      { label: "RULESET", value: "100% FIDE" }
    ],
    caseStudy: {
      problem: "Client-only chess implementations frequently miss edge-case rules (en passant, castling rights, check pins) and expose move logic to manipulation.",
      architecture: "RESTful Java Spring Boot backend handling authoritative board state, move legality verification, and minimax AI evaluation paired with an Angular frontend.",
      challenges: "Designing stateless board serialization so AI response latency stays responsive while animating piece transitions smoothly."
    }
  },
  { 
    name: "CashSpot", 
    id: "MOD_03",
    desc: "Specialized utility web application utilizing geolocation to help users locate nearby financial services, ATMs, and banks. Features an intuitive interface providing essential location data.", 
    tech: ["Geolocation", "React", "Maps API"],
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    link: "https://cash-spot.vercel.app",
    repo: "https://github.com/TejasSagar03/CashSpot",
    color: "34, 197, 94",
    metrics: [
      { label: "SENSOR", value: "GPS / GEO API" },
      { label: "MATH", value: "HAVERSINE" },
      { label: "MODE", value: "PWA READY" }
    ],
    caseStudy: {
      problem: "Finding verified nearby ATMs and banking touchpoints quickly in unfamiliar areas requires sifting through cluttered general-purpose map results.",
      architecture: "React PWA integrating browser Geolocation APIs, real-time Haversine distance telemetry, and structured place filtering with offline-ready caching.",
      challenges: "Handling GPS permission fallbacks gracefully and filtering noisy map POI metadata into clean, actionable distance cards."
    }
  },
  { 
    name: "Tetris Neo Plus", 
    id: "MOD_04",
    desc: "A modern, enhanced version of the classic block-stacking puzzle game. Features dynamic level progression, vibrant visuals, and responsive controls built for high-score chasers.", 
    tech: ["HTML5", "CSS3", "Vanilla JS"],
    img: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?auto=format&fit=crop&w=800&q=80",
    link: "https://tetrisneo.netlify.app/",
    repo: "https://github.com/TejasSagar03/Tetris-Neo-Plus",
    color: "245, 158, 11",
    metrics: [
      { label: "DEPS", value: "ZERO LIBS" },
      { label: "ROTATION", value: "SRS KICKS" },
      { label: "RENDER", value: "2D CANVAS" }
    ],
    caseStudy: {
      problem: "Classic browser Tetris clones often lack modern competitive mechanics like hard-drop ghost previews, wall-kick rotations, and responsive mobile swipe controls.",
      architecture: "Zero-dependency Vanilla JavaScript 2D matrix engine coupled with HTML5 Canvas rendering and deterministic gravity speed curves.",
      challenges: "Implementing Super Rotation System (SRS) wall-kick offsets accurately so fast piece rotations near board edges feel crisp and forgiving."
    }
  }
];

// --- ENHANCED MAGNETIC CANVAS (MOUSE + TOUCH SUPPORT) ---
const CanvasDotGrid = ({ isDark, hoverColorRGB }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; 
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    let width = window.innerWidth; 
    let height = window.innerHeight;
    canvas.width = width; 
    canvas.height = height;
    
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };
    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    
    let dots = [];
    const spacing = 40; 
    
    const initGrid = () => {
      dots = [];
      for (let i = 0; i <= Math.floor(width / spacing); i++) {
        for (let j = 0; j <= Math.floor(height / spacing); j++) {
          dots.push({ x: i * spacing, y: j * spacing, baseX: i * spacing, baseY: j * spacing, vx: 0, vy: 0 });
        }
      }
    };
    
    const handleResize = () => { 
      width = window.innerWidth; height = window.innerHeight; 
      canvas.width = width; canvas.height = height; 
      initGrid(); 
    };
    window.addEventListener('resize', handleResize);
    initGrid();
    
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const maxDist = 250; 

      dots.forEach(dot => {
        let dx = mouse.x - dot.baseX; 
        let dy = mouse.y - dot.baseY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        let targetX = dot.baseX; 
        let targetY = dot.baseY;
        
        let alpha = isDark ? 0.2 : 0.2; 
        let size = 1.2;

        if (dist < maxDist) {
          let force = Math.pow((maxDist - dist) / maxDist, 2); 
          targetX = dot.baseX - (dx / dist) * force * 50; 
          targetY = dot.baseY - (dy / dist) * force * 50;
          alpha = (isDark ? 0.2 : 0.2) + force * 0.6;
          size = 1.2 + force * 2.5;
        }

        dot.vx += (targetX - dot.x) * 0.14; 
        dot.vy += (targetY - dot.y) * 0.14;
        dot.vx *= 0.72; 
        dot.vy *= 0.72;
        dot.x += dot.vx; 
        dot.y += dot.vy;

        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha})`;
        ctx.beginPath(); ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2); ctx.fill();
      });

      if (mouse.x > 0) {
        ctx.shadowColor = `rgb(${hoverColorRGB})`;
        ctx.shadowBlur = 20;
        ctx.fillStyle = `rgba(${hoverColorRGB}, 1)`;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0; 
        ctx.fillStyle = `rgba(${hoverColorRGB}, 0.15)`;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2); ctx.fill();
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => { 
      window.removeEventListener('mousemove', handleMouseMove); 
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize); 
      cancelAnimationFrame(animationFrameId); 
    };
  }, [isDark, hoverColorRGB]);
  
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// --- APPLE x NOTHING LIQUID GLYPH SHUTTER BOOT SCREEN ---
const BootSequence = ({ setBooted }) => {
  const [progress, setProgress] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const pInterval = setInterval(() => {
      setProgress(p => (p < 100 ? Math.min(p + Math.floor(Math.random() * 18) + 12, 100) : 100));
    }, 75);

    const t1 = setTimeout(() => setSplitting(true), 1350);
    const t2 = setTimeout(() => setBooted(true), 1900);

    return () => {
      clearInterval(pInterval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [setBooted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const startTime = performance.now();
    const spacing = 28;

    const render = (now) => {
      const t = (now - startTime) / 1000;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.hypot(dx, dy);
          const angle = Math.atan2(dy, dx);

          const wave = Math.sin(dist * 0.022 - t * 6.5 + Math.sin(angle * 3 + t * 2) * 1.4);
          const intensity = Math.max(0, wave);

          const centerClear = Math.min(1, Math.max(0, (dist - 120) / 110));

          const push = intensity * 5 * centerClear;
          const drawX = x + (dx / (dist || 1)) * push;
          const drawY = y + (dy / (dist || 1)) * push;

          const alpha = (0.08 + intensity * 0.75) * centerClear;
          const radius = 1.0 + intensity * 2.4;

          if (intensity > 0.78) {
            ctx.fillStyle = `rgba(234, 0, 0, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none select-none overflow-hidden">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: splitting ? '-100%' : 0 }}
        transition={{ duration: 0.55, ease: IOS_SHEET_EASE }}
        className="absolute top-0 left-0 w-full h-1/2 bg-black border-b border-white/10"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: splitting ? '100%' : 0 }}
        transition={{ duration: 0.55, ease: IOS_SHEET_EASE }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-black border-t border-white/10"
      />

      <motion.div
        animate={{
          opacity: splitting ? 0 : 1,
          scale: splitting ? 1.05 : 1
        }}
        transition={{ duration: 0.28, ease: IOS_OPTICAL_EASE }}
        className="relative w-full h-full flex flex-col justify-between items-center py-10 sm:py-12 px-4 sm:px-6"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[480px] h-[200px] sm:h-[220px] rounded-full bg-[#ea0000]/15 blur-[110px]" />

        <div className="relative z-10 flex items-center gap-3 text-[9px] font-mono tracking-[0.35em] pl-[0.35em] uppercase text-zinc-500">
          <span>TSK</span>
          <span className="w-1 h-1 rounded-full bg-[#ea0000]" />
          <span>OS 5.0</span>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-6">
            <div className="flex items-center gap-3 sm:gap-5 overflow-hidden py-1">
              {['T', 'S', 'K'].map((char, i) => (
                <motion.span
                  key={char}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, ease: IOS_SHEET_EASE, delay: i * 0.06 }}
                  className="font-nothing text-5xl sm:text-6xl md:text-8xl leading-none text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0.6, 1, 0.6], scale: 1 }}
              transition={{ opacity: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.3 } }}
              className="ml-2.5 sm:ml-4 mt-6 sm:mt-10 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ea0000] shadow-[0_0_20px_#ea0000]"
            />
          </div>

          <div className="w-48 sm:w-72 h-[2px] bg-zinc-900 overflow-hidden mb-4 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-white via-white to-[#ea0000] shadow-[0_0_12px_#ea0000]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            />
          </div>

          <span className="text-[10px] font-mono tracking-[0.35em] pl-[0.35em] uppercase text-zinc-400">
            {progress < 100 ? `${String(progress).padStart(3, '0')}%` : 'UNLOCKING'}
          </span>
        </div>

        <div className="relative z-10 text-[8px] font-mono tracking-[0.35em] pl-[0.35em] uppercase text-zinc-600">
          PURE FUNCTION
        </div>
      </motion.div>
    </div>
  );
};

// --- BIDIRECTIONAL ANIMATED SECTION ---
const FadeSection = ({ children, id, className, isDark }) => (
  <section id={id} className={`scroll-mt-20 sm:scroll-mt-24 py-14 sm:py-24 px-4 sm:px-6 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'} ${className || ''}`}>
    <motion.div 
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={SCROLL_REPLAY_VIEWPORT}
      transition={{ duration: 0.5, ease: IOS_OPTICAL_EASE }}
      className="max-w-[1100px] mx-auto w-full"
    >
      {children}
    </motion.div>
  </section>
);

// --- ENHANCED MECHANICAL SOCIAL LINK ---
const SocialLink = ({ href, children, isDark, isMail, onClick }) => (
  <motion.a
    href={href}
    onClick={onClick}
    {...(!isMail && { target: "_blank", rel: "noopener noreferrer" })}
    whileHover="hover"
    whileTap="tap"
    transition={{ duration: 0.14, ease: NOTHING_DETENT_EASE }}
    className={`group relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center border border-dotted backdrop-blur-md transition-colors duration-150 ${
      isDark 
        ? 'border-zinc-600 bg-white/[0.02] hover:border-[#ea0000] hover:bg-[#ea0000]/10 text-zinc-300 hover:text-[#ea0000] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]' 
        : 'border-zinc-400 bg-black/[0.02] hover:border-[#ea0000] hover:bg-[#ea0000]/10 text-zinc-600 hover:text-[#ea0000] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
    }`}
  >
    <motion.div variants={{ hover: { scale: 1.06 }, tap: { scale: 0.94 } }} transition={{ duration: 0.14, ease: NOTHING_DETENT_EASE }}>
      {children}
    </motion.div>
    <motion.div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#ea0000]" variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }} initial="initial" transition={{ duration: 0.12 }} />
    <motion.div className="absolute top-[-1px] left-[-1px] w-2 h-2 border-t-[1.5px] border-l-[1.5px] border-[#ea0000]" variants={{ initial: { opacity: 0, x: -2, y: -2 }, hover: { opacity: 1, x: 0, y: 0 } }} initial="initial" transition={{ duration: 0.14, ease: NOTHING_DETENT_EASE }} />
    <motion.div className="absolute top-[-1px] right-[-1px] w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-[#ea0000]" variants={{ initial: { opacity: 0, x: 2, y: -2 }, hover: { opacity: 1, x: 0, y: 0 } }} initial="initial" transition={{ duration: 0.14, ease: NOTHING_DETENT_EASE }} />
    <motion.div className="absolute bottom-[-1px] left-[-1px] w-2 h-2 border-b-[1.5px] border-l-[1.5px] border-[#ea0000]" variants={{ initial: { opacity: 0, x: -2, y: 2 }, hover: { opacity: 1, x: 0, y: 0 } }} initial="initial" transition={{ duration: 0.14, ease: NOTHING_DETENT_EASE }} />
    <motion.div className="absolute bottom-[-1px] right-[-1px] w-2 h-2 border-b-[1.5px] border-r-[1.5px] border-[#ea0000]" variants={{ initial: { opacity: 0, x: 2, y: 2 }, hover: { opacity: 1, x: 0, y: 0 } }} initial="initial" transition={{ duration: 0.14, ease: NOTHING_DETENT_EASE }} />
  </motion.a>
);

// --- INTERACTIVE SYSTEM DOSSIER / CASE-STUDY DRAWER ---
const ProjectCaseStudyDrawer = ({ project, onClose, onSelectProject, isDark }) => {
  const [activeTab, setActiveTab] = useState('ALL');
  const drawerScrollRef = useRef(null);
  const { scrollYProgress: drawerProgress } = useScroll({ container: drawerScrollRef });
  const smoothDrawerProgress = useSpring(drawerProgress, { stiffness: 300, damping: 40 });

  useEffect(() => {
    setActiveTab('ALL');
    if (drawerScrollRef.current) {
      drawerScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!project) return;
      if (e.key === 'Escape') onClose();
      const idx = PROJECTS_DATA.findIndex((p) => p.id === project.id);
      if (e.key === 'ArrowRight' && idx !== -1) {
        onSelectProject(PROJECTS_DATA[(idx + 1) % PROJECTS_DATA.length]);
      }
      if (e.key === 'ArrowLeft' && idx !== -1) {
        onSelectProject(PROJECTS_DATA[(idx - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length]);
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose, onSelectProject]);

  const currentIdx = project ? PROJECTS_DATA.findIndex((p) => p.id === project.id) : 0;
  const prevProject = PROJECTS_DATA[(currentIdx - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
  const nextProject = PROJECTS_DATA[(currentIdx + 1) % PROJECTS_DATA.length];

  const blocks = project
    ? [
        { key: 'PROBLEM', code: '01 // PROBLEM SOLVED', text: project.caseStudy.problem },
        { key: 'ARCH', code: '02 // CORE ARCHITECTURE', text: project.caseStudy.architecture },
        { key: 'CHALLENGES', code: '03 // KEY TECHNICAL CHALLENGES', text: project.caseStudy.challenges }
      ]
    : [];

  const filteredBlocks = activeTab === 'ALL' ? blocks : blocks.filter((b) => b.key === activeTab);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[90] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: IOS_OPTICAL_EASE }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.aside
            ref={drawerScrollRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.46, ease: IOS_SHEET_EASE }}
            className={`relative z-10 w-full max-w-xl h-full overflow-y-auto border-l p-4 sm:p-6 md:p-9 flex flex-col justify-between backdrop-blur-3xl shadow-2xl ${
              isDark
                ? 'bg-zinc-950/90 border-zinc-800/90 text-white shadow-black'
                : 'bg-white/95 border-zinc-300 text-black shadow-zinc-400/40'
            }`}
          >
            <motion.div
              style={{ scaleX: smoothDrawerProgress, transformOrigin: '0%' }}
              className="fixed top-0 right-0 w-full max-w-xl h-[2px] bg-[#ea0000] z-50 pointer-events-none shadow-[0_0_10px_#ea0000]"
            />

            <div
              className="fixed inset-0 pointer-events-none opacity-20 z-0"
              style={{
                backgroundImage: `radial-gradient(${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
                backgroundSize: '28px 28px'
              }}
            />

            <div
              style={{ backgroundColor: `rgba(${project.color}, 0.16)` }}
              className="pointer-events-none absolute -top-20 right-0 w-80 h-80 rounded-full blur-[110px] z-0 transition-colors duration-500"
            />

            <div className="relative z-10">
              <div className={`flex items-center justify-between gap-2 pb-4 mb-5 sm:mb-6 border-b border-dotted ${isDark ? 'border-zinc-800' : 'border-zinc-300'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    style={{
                      backgroundColor: `rgb(${project.color})`,
                      boxShadow: `0 0 10px rgba(${project.color}, 0.8)`
                    }}
                    className="w-2 h-2 rounded-full animate-pulse shrink-0"
                  />
                  <span className="font-mono text-[8.5px] sm:text-[9px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase truncate">
                    {project.id} // DOSSIER
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onSelectProject(prevProject)}
                    title={`Previous: ${prevProject.name}`}
                    className={`p-2 rounded-[2px] border border-dotted transition-colors cursor-pointer ${
                      isDark
                        ? 'border-zinc-800 bg-black/50 hover:border-[#ea0000] hover:text-[#ea0000]'
                        : 'border-zinc-300 bg-white/60 hover:border-[#ea0000] hover:text-[#ea0000]'
                    }`}
                  >
                    <ChevronLeftIcon />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onSelectProject(nextProject)}
                    title={`Next: ${nextProject.name}`}
                    className={`p-2 rounded-[2px] border border-dotted transition-colors cursor-pointer ${
                      isDark
                        ? 'border-zinc-800 bg-black/50 hover:border-[#ea0000] hover:text-[#ea0000]'
                        : 'border-zinc-300 bg-white/60 hover:border-[#ea0000] hover:text-[#ea0000]'
                    }`}
                  >
                    <ChevronRightIcon />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.14, ease: NOTHING_DETENT_EASE }}
                    onClick={onClose}
                    aria-label="Close case study"
                    className={`ml-0.5 sm:ml-1 p-2 rounded-[2px] border border-dotted transition-colors cursor-pointer ${
                      isDark
                        ? 'border-zinc-700 bg-black/50 hover:border-[#ea0000] hover:text-[#ea0000]'
                        : 'border-zinc-400 bg-white/60 hover:border-[#ea0000] hover:text-[#ea0000]'
                    }`}
                  >
                    <CloseIcon />
                  </motion.button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: IOS_SHEET_EASE }}
                >
                  <div className={`relative p-2 border mb-5 ${isDark ? 'border-zinc-800 bg-black/60' : 'border-zinc-300 bg-white/70'}`}>
                    <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-[1.5px] border-l-[1.5px] border-[#ea0000]" />
                    <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-[1.5px] border-r-[1.5px] border-[#ea0000]" />
                    <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-[1.5px] border-l-[1.5px] border-[#ea0000]" />
                    <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-[1.5px] border-r-[1.5px] border-[#ea0000]" />

                    <div className={`aspect-[16/9] relative overflow-hidden border border-dotted ${isDark ? 'border-zinc-800 bg-black' : 'border-zinc-300 bg-zinc-100'}`}>
                      <motion.img
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, ease: IOS_OPTICAL_EASE }}
                        src={project.img}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[2px] text-[8px] font-mono font-bold tracking-widest uppercase bg-black/80 backdrop-blur-md text-white border border-white/15"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-2.5 mb-6">
                    {project.metrics.map((m, idx) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.08 + idx * 0.05, ease: NOTHING_DETENT_EASE }}
                        className={`p-2.5 border border-dotted rounded-[2px] ${
                          isDark ? 'border-zinc-800 bg-white/[0.02]' : 'border-zinc-300 bg-black/[0.02]'
                        }`}
                      >
                        <p className="font-mono text-[7px] tracking-[0.2em] uppercase opacity-50 mb-1">{m.label}</p>
                        <p className="font-mono text-[9px] sm:text-[9.5px] font-bold tracking-wider uppercase text-[#ea0000]">{m.value}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h2 className="font-nothing text-xl sm:text-3xl leading-[1.25] tracking-[0.12em] sm:tracking-[0.14em] uppercase mb-3">
                      {project.name}<span className="text-[#ea0000]">.</span>
                    </h2>
                    <p className={`text-xs md:text-sm font-serif leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {project.desc}
                    </p>
                  </div>

                  <div className={`grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-[3px] border border-dotted mb-5 ${isDark ? 'border-zinc-800 bg-black/50' : 'border-zinc-300 bg-zinc-100/80'}`}>
                    {[
                      { id: 'ALL', label: 'ALL SPECS' },
                      { id: 'PROBLEM', label: '01 PROBLEM' },
                      { id: 'ARCH', label: '02 ARCH' },
                      { id: 'CHALLENGES', label: '03 ISSUES' }
                    ].map((tab) => {
                      const active = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id)}
                          className={`relative py-2 px-2 font-mono text-[8px] font-bold tracking-[0.14em] uppercase transition-colors cursor-pointer ${
                            active ? (isDark ? 'text-white' : 'text-black') : 'opacity-55 hover:opacity-100'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="dossier-tab-pill"
                              transition={NOTHING_LAYOUT_SPRING}
                              className={`absolute inset-0 rounded-[2px] -z-10 border border-dotted ${
                                isDark ? 'bg-white/[0.08] border-[#ea0000]/70' : 'bg-white border-[#ea0000]/70 shadow-sm'
                              }`}
                            />
                          )}
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-3.5">
                    {filteredBlocks.map((block, idx) => (
                      <motion.div
                        key={block.code}
                        layout
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.34, ease: IOS_OPTICAL_EASE, delay: idx * 0.05 }}
                        className={`group relative p-4 md:p-5 rounded-[4px] border border-dotted backdrop-blur-xl transition-all duration-200 ${
                          isDark
                            ? 'border-zinc-800 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#ea0000]/60'
                            : 'border-zinc-300 bg-black/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] hover:border-[#ea0000]/60'
                        }`}
                      >
                        <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-[#ea0000] scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top" />
                        <h4 className="font-mono text-[8.5px] font-bold tracking-[0.22em] sm:tracking-[0.25em] uppercase text-[#ea0000] mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ea0000]" />
                          <span>{block.code}</span>
                        </h4>
                        <p className={`text-xs md:text-[13px] font-serif leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                          {block.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={`relative z-10 mt-7 pt-5 border-t border-dotted flex flex-col sm:flex-row gap-3 ${isDark ? 'border-zinc-800' : 'border-zinc-300'}`}>
              <motion.a
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12, ease: NOTHING_DETENT_EASE }}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3 px-4 rounded-[2px] font-mono text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-colors ${
                  isDark
                    ? 'bg-white text-black hover:bg-[#ea0000] hover:text-white'
                    : 'bg-black text-white hover:bg-[#ea0000]'
                }`}
              >
                <span>LIVE PREVIEW</span>
                <ArrowUpRightIcon />
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12, ease: NOTHING_DETENT_EASE }}
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3 px-4 rounded-[2px] font-mono text-[10px] font-bold tracking-[0.2em] uppercase border border-dotted backdrop-blur-md flex items-center justify-center gap-2 transition-colors ${
                  isDark
                    ? 'border-zinc-700 bg-white/[0.03] text-white hover:border-[#ea0000] hover:text-[#ea0000]'
                    : 'border-zinc-400 bg-black/[0.03] text-black hover:border-[#ea0000] hover:text-[#ea0000]'
                }`}
              >
                <GithubIcon />
                <span>SOURCE CODE</span>
              </motion.a>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

const NAV_ITEMS = [
  { id: 'about', label: 'About', dotColor: '#22c55e' },
  { id: 'certs', label: 'Certs', dotColor: '#3b82f6' },
  { id: 'skills', label: 'Skills', dotColor: '#eab308' },
  { id: 'experience', label: 'Exp', dotColor: '#ea0000' },
  { id: 'projects', label: 'Work', dotColor: '#ea0000' },
  { id: 'contact', label: 'Contact', dotColor: '#22c55e' }
];

const HERO_STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 }
  }
};

const HERO_ITEM = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: IOS_SHEET_EASE }
  }
};

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [booted, setBooted] = useState(false);
  const [hoverColorRGB, setHoverColorRGB] = useState('234, 0, 0');
  const [activeSection, setActiveSection] = useState('');

  const [toastMessage, setToastMessage] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [selectedProject, setSelectedProject] = useState(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 280, damping: 44, restDelta: 0.001 });
  const heroParallaxY = useTransform(smoothProgress, [0, 0.25], [0, -18]);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2600);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleCopy = (text, label) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedField(label);
    showToast(`${label.toUpperCase()} COPIED TO CLIPBOARD`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('PLEASE FILL ALL REQUIRED FIELDS');
      return;
    }

    setFormStatus('submitting');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'd4c11b74-f708-4169-94a5-a7f29720235e',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Inquiry from ${formData.name}`,
          message: formData.message,
          from_name: 'TSK Portfolio OS 5.0'
        })
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus('sent');
        setFormData({ name: '', email: '', subject: '', message: '' });
        showToast('MESSAGE TRANSMITTED SUCCESSFULLY');
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('error');
        showToast(result.message ? result.message.toUpperCase() : 'TRANSMISSION FAILED');
        setTimeout(() => setFormStatus('idle'), 3500);
      }
    } catch {
      setFormStatus('error');
      showToast('NETWORK ERROR // TRY EMAIL COPY');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  useEffect(() => {
    const bg = isDark ? '#000000' : '#ffffff';
    const fg = isDark ? '#ffffff' : '#000000';
    document.documentElement.style.backgroundColor = bg;
    document.documentElement.style.color = fg;
    document.documentElement.style.colorScheme = isDark ? 'only dark' : 'only light';
    document.body.style.backgroundColor = bg;
    document.body.style.color = fg;
  }, [isDark]);

  useEffect(() => {
    const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [booted]);

  return (
    <div
      style={{
        backgroundColor: isDark ? '#000000' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000'
      }}
      className={`relative min-h-screen overflow-x-clip transition-colors duration-500 selection:bg-[#ea0000] selection:text-white ${isDark ? 'text-white bg-black' : 'text-black bg-white'}`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${isDark ? '#000000' : '#ffffff'}; border-left: 1px solid ${isDark ? '#27272a' : '#e4e4e7'}; }
        ::-webkit-scrollbar-thumb { background: #ea0000; border-radius: 0px; }
        ::-webkit-scrollbar-thumb:hover { background: #cc0000; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <motion.div
        style={{ scaleX: smoothProgress, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#ea0000] via-[#ff4d4d] to-[#ea0000] z-[70] pointer-events-none shadow-[0_0_8px_#ea0000]"
      />

      <AnimatePresence>
        {!booted && <BootSequence setBooted={setBooted} />}
      </AnimatePresence>

      <CanvasDotGrid isDark={isDark} hoverColorRGB={hoverColorRGB} />

      <div className="fixed bottom-4 sm:bottom-6 left-0 w-full z-[95] flex justify-center px-3 sm:px-4 pointer-events-none">
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0.78, scaleY: 0.88 }}
              animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleX: 0.85, scaleY: 0.9 }}
              transition={{ duration: 0.3, ease: IOS_SHEET_EASE }}
              className={`pointer-events-auto max-w-full px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border backdrop-blur-2xl shadow-2xl flex items-center gap-2 text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.16em] sm:tracking-[0.22em] uppercase ${
                isDark
                  ? 'bg-zinc-950/90 border-zinc-700/80 text-white shadow-black shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
                  : 'bg-white/95 border-zinc-300 text-black shadow-zinc-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ea0000] animate-pulse shrink-0" />
              <span className="truncate">[{toastMessage}]</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ProjectCaseStudyDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        isDark={isDark}
      />

      <motion.div
        animate={{
          scale: selectedProject ? 0.985 : 1,
          opacity: selectedProject ? 0.72 : 1
        }}
        transition={{ duration: 0.44, ease: IOS_SHEET_EASE }}
        className="relative z-10 flex flex-col font-sans w-full max-w-full origin-top"
      >
        
        {/* --- FLOATING NOTHING OS 5.0 x iOS LUCENT DOCK --- */}
        <header className="fixed top-3 sm:top-5 left-0 w-full z-50 px-2.5 sm:px-4 pointer-events-none">
          <motion.nav 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: booted ? 1 : 0, scale: booted ? 1 : 0.97 }}
            transition={{ duration: 0.42, ease: IOS_OPTICAL_EASE }}
            className={`pointer-events-auto max-w-[740px] mx-auto pl-2.5 sm:pl-4 pr-1.5 sm:pr-2 min-h-10 sm:h-11 py-1 sm:py-0 rounded-[4px] flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 sm:gap-2 backdrop-blur-2xl border shadow-2xl transition-colors duration-300 ${
              isDark 
                ? 'bg-zinc-950/85 border-zinc-800/90 shadow-black/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.09)] text-white' 
                : 'bg-white/90 border-zinc-300 shadow-zinc-300/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] text-black'
            }`}
          >
            <a href="#" className="flex items-center shrink-0 group pr-2 sm:pr-3 border-r border-dotted border-zinc-700/60 h-5 sm:h-6">
              <span className="font-nothing text-sm sm:text-lg tracking-widest group-hover:text-[#ea0000] transition-colors duration-150">
                TSK
              </span>
            </a>
            
            <div className={`flex items-center justify-around sm:justify-start flex-1 gap-0.5 sm:gap-1 text-[7.5px] sm:text-[9px] font-bold tracking-[0.08em] sm:tracking-[0.18em] uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`relative px-1.5 sm:px-3 py-1 rounded-[2px] flex items-center gap-1 shrink-0 transition-colors duration-150 ${
                      isActive 
                        ? (isDark ? 'text-white' : 'text-black') 
                        : (isDark ? 'hover:text-zinc-200' : 'hover:text-zinc-900')
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="os5-lucent-dock"
                        transition={NOTHING_LAYOUT_SPRING}
                        className={`absolute inset-0 rounded-[2px] -z-10 border border-dotted ${
                          isDark 
                            ? 'bg-white/[0.07] border-zinc-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
                            : 'bg-black/[0.05] border-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
                        }`}
                      />
                    )}
                    <span
                      style={{ backgroundColor: isActive ? item.dotColor : 'transparent' }}
                      className={`hidden sm:inline-block w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-150 ${
                        isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 w-0'
                      }`}
                    />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
            
            <button 
              type="button"
              onClick={() => setIsDark(prev => !prev)} 
              aria-label="Toggle theme"
              className={`relative shrink-0 w-10 sm:w-12 h-5.5 sm:h-6 rounded-[2px] border flex items-center transition-colors duration-200 cursor-pointer touch-manipulation overflow-hidden p-0.5 ${
                isDark ? 'border-zinc-700 bg-black' : 'border-zinc-300 bg-zinc-100'
              }`}
            >
              <div className="absolute inset-0 flex justify-between items-center px-1 sm:px-1.5 text-[6.5px] sm:text-[7px] font-mono tracking-wider font-bold pointer-events-none">
                <span className={isDark ? 'text-zinc-600' : 'text-black'}>LT</span>
                <span className={isDark ? 'text-zinc-300' : 'text-zinc-400'}>DK</span>
              </div>
              <motion.div 
                layout 
                initial={false} 
                animate={{ x: isDark ? 18 : 0 }} 
                transition={NOTHING_LAYOUT_SPRING} 
                className={`w-4 sm:w-5 h-4 sm:h-4.5 rounded-[1px] relative z-10 flex items-center justify-center shadow-sm ${isDark ? 'bg-white' : 'bg-black'}`}
              >
                <div className={`w-[1.5px] h-2 ${isDark ? 'bg-black' : 'bg-white'}`} />
              </motion.div>
            </button>
          </motion.nav>
        </header>

        {/* --- HERO SECTION --- */}
        <section className={`pt-24 sm:pt-32 pb-12 sm:pb-16 min-h-[82vh] sm:min-h-[85vh] flex flex-col justify-center border-b relative ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center relative z-10">
            
            {/* Portrait First on Mobile so Identity + Visual Anchor Immediately */}
            <div className="lg:col-span-5 relative group order-1 flex justify-center lg:justify-start">
              <motion.div 
                style={{ y: heroParallaxY }}
                initial={{ opacity: 0, y: 18 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={SCROLL_REPLAY_VIEWPORT}
                transition={{ duration: 0.55, ease: IOS_SHEET_EASE }}
                className="w-full max-w-[230px] sm:max-w-[320px] relative group"
              >
                <HardwareRegistrationBrackets isDark={isDark} size="lg" />

                <SpatialTiltFrame>
                  <div className={`relative p-2 sm:p-3 border shadow-2xl transition-colors duration-300 ${isDark ? 'border-zinc-800 group-hover:border-zinc-700 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]' : 'border-zinc-200 group-hover:border-zinc-400 bg-white'} z-10`}>
                    <div className={`border border-dotted ${isDark ? 'border-zinc-700 group-hover:border-[#ea0000]/60' : 'border-zinc-300 group-hover:border-[#ea0000]/60'} p-1 transition-colors duration-300`}>
                      <div className={`aspect-[3/4] relative overflow-hidden ${isDark ? 'bg-black' : 'bg-zinc-100'}`}>
                        <img 
                          src={heroPic} 
                          alt="Tejas Sagar K" 
                          className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500 relative z-10" 
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                      </div>
                    </div>
                  </div>
                </SpatialTiltFrame>
                
                <HeroScrollTelemetryBar isDark={isDark} smoothProgress={smoothProgress} />
              </motion.div>
            </div>

            {/* Right: Bidirectional Staggered Apple System Cascade */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 relative">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[450px] aspect-square rounded-full border ${isDark ? 'border-white/5' : 'border-black/5'} -z-10 pointer-events-none`} />

              <motion.div 
                variants={HERO_STAGGER}
                initial="hidden"
                whileInView="visible"
                viewport={SCROLL_REPLAY_VIEWPORT}
                className="w-full flex flex-col items-center lg:items-start"
              >
                <motion.div variants={HERO_ITEM}>
                  <GlyphEqualizerBadge isDark={isDark} onTriggerPulse={showToast} />
                </motion.div>

                <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 w-full mb-5 sm:mb-8 z-10 relative">
                  <AnimatedDotTitle
                    text="TEJAS"
                    delayOffset={0.04}
                    className="text-[clamp(1.75rem,7vw,4.5rem)] font-nothing tracking-[0.12em] sm:tracking-[0.15em] leading-[1.15] uppercase text-current block"
                  />
                  <AnimatedDotTitle
                    text="SAGAR K"
                    hasRedDot={true}
                    delayOffset={0.18}
                    className="text-[clamp(1.75rem,7vw,4.5rem)] font-nothing tracking-[0.12em] sm:tracking-[0.15em] leading-[1.15] uppercase text-current block"
                  />
                </div>
                
                <motion.h4 variants={HERO_ITEM} className={`w-full text-[9px] sm:text-xs font-mono tracking-[0.18em] sm:tracking-widest uppercase mb-4 sm:mb-6 pb-4 sm:pb-6 border-b ${isDark ? 'text-zinc-500 border-zinc-800' : 'text-zinc-500 border-zinc-200'}`}>
                  Frontend · Backend · Full-Stack
                </motion.h4>

                <motion.p variants={HERO_ITEM} className={`text-xs sm:text-base font-serif leading-relaxed mb-6 sm:mb-8 max-w-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Dedicated MCA student and Full Stack Web Developer. Skilled in rapidly adopting new technologies to build impactful, scalable real-world applications.
                </motion.p>

                <motion.div variants={HERO_ITEM} className="flex justify-center lg:justify-start gap-3 sm:gap-4">
                  <SocialLink href="https://www.linkedin.com/in/tejas-sagar-659032287/" isDark={isDark}>
                    <LinkedinIcon />
                  </SocialLink>
                  <SocialLink href="https://github.com/TejasSagar03" isDark={isDark}>
                    <GithubIcon />
                  </SocialLink>
                  <SocialLink
                    href="#contact"
                    isDark={isDark}
                    isMail={true}
                    onClick={() => handleCopy('tejassagar9@gmail.com', 'Email')}
                  >
                    <MailIcon />
                  </SocialLink>
                </motion.div>

              </motion.div>
            </div>

          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <FadeSection id="about" isDark={isDark}>
          <SectionHeader title="ABOUT ME" index="01" isDark={isDark} />
          
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-20 items-center lg:items-start">
            
            <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={SCROLL_REPLAY_VIEWPORT}
                transition={{ duration: 0.55, ease: IOS_SHEET_EASE }}
                className="relative group max-w-[230px] sm:max-w-[280px] w-full"
              >
                <HardwareRegistrationBrackets isDark={isDark} size="sm" />
                
                <SpatialTiltFrame>
                  <div className={`relative p-2 sm:p-2.5 border shadow-xl transition-colors duration-300 ${isDark ? 'border-zinc-800 group-hover:border-zinc-700 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]' : 'border-zinc-200 group-hover:border-zinc-400 bg-white'} z-10`}>
                    <div className={`border border-dotted ${isDark ? 'border-zinc-700 group-hover:border-[#ea0000]/60' : 'border-zinc-300 group-hover:border-[#ea0000]/60'} p-1 transition-colors duration-300`}>
                      <div className={`aspect-[4/5] relative overflow-hidden ${isDark ? 'bg-black' : 'bg-zinc-100'}`}>
                        <img 
                          src={aboutPic} 
                          alt="Tejas Looking Out" 
                          className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500 relative z-10" 
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                      </div>
                    </div>
                  </div>
                </SpatialTiltFrame>

                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={SCROLL_REPLAY_VIEWPORT}
                  transition={{ duration: 0.42, ease: NOTHING_DETENT_EASE, delay: 0.14 }}
                  className={`absolute -bottom-2.5 left-4 px-2.5 py-1 font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.18em] uppercase z-30 shadow-xl border ${
                    isDark
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-white border-black'
                  }`}
                >
                  SOFTWARE ENGINEER
                </motion.div>
              </motion.div>
            </div>

            <div className="w-full lg:w-7/12 flex flex-col">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={SCROLL_REPLAY_VIEWPORT}
                transition={{ duration: 0.45, ease: IOS_OPTICAL_EASE }}
                className={`text-xs sm:text-base font-serif leading-relaxed mb-7 sm:mb-10 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}
              >
                I aim to contribute to impactful projects, collaborate effectively within teams, and expand my capabilities through continuous learning. Currently pursuing my Master of Computer Applications, focusing heavily on modern web and mobile architectures.
              </motion.p>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={SCROLL_REPLAY_VIEWPORT}
                transition={{ duration: 0.45, ease: NOTHING_DETENT_EASE }}
                className={`w-10 h-[1px] mb-7 sm:mb-10 origin-left ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}
              />

              <div>
                <h4 className={`font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-[#ea0000] mb-5 sm:mb-6`}>EDUCATION</h4>
                
                <div className="flex flex-col gap-5 sm:gap-6">
                  {[
                    { period: "2026 - 2028", school: "BMS Institute of Technology and Management", degree: "MCA Degree" },
                    { period: "2023 - 2026", school: "Dr. NSAM First Grade College", degree: "BCA Degree" },
                    { period: "2021 - 2023", school: "Dr. NSAM Pre University College", degree: "EBAS - PUC" },
                    { period: "2020 - 2021", school: "Sri Devaraj Urs International Residential School", degree: "SSLC" }
                  ].map((edu, idx) => (
                    <motion.div
                      key={edu.period}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={SCROLL_REPLAY_VIEWPORT}
                      transition={{ duration: 0.45, ease: IOS_SHEET_EASE, delay: idx * 0.06 }}
                      className="flex flex-col pl-3.5 sm:pl-4 border-l border-dotted border-zinc-700/60 hover:border-[#ea0000] transition-colors duration-200"
                    >
                      <p className={`font-mono text-[8.5px] sm:text-[9px] mb-1 uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{edu.period}</p>
                      <h5 className="font-serif text-base sm:text-xl leading-snug mb-1">{edu.school}</h5>
                      <p className="font-mono text-[8.5px] sm:text-[9px] tracking-widest uppercase opacity-70">{edu.degree}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </FadeSection>

        {/* --- CERTIFICATIONS SECTION --- */}
        <FadeSection id="certs" isDark={isDark}>
          <SectionHeader title="CERTIFICATIONS" index="02" isDark={isDark} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto w-full">
            {[
              { title: "JavaScript Essentials 1 & 2", issuer: "Cisco Networking Academy", date: "September 2025" },
              { title: "Artificial Intelligence Fundamentals", issuer: "IBM SkillsBuild", date: "October 2025" },
              { title: "Communication and Personality Dynamics", issuer: "IBM SkillsBuild", date: "October 2025" },
              { title: "Problem Solving and Process Controls", issuer: "IBM SkillsBuild", date: "October 2025" }
            ].map((cert, index) => (
              <LiquidGlassCard 
                key={index}
                isDark={isDark}
                delay={index * 0.05}
                className={`group p-4 sm:p-5 border border-dotted transition-colors duration-150 backdrop-blur-xl ${
                  isDark
                    ? 'border-zinc-800 bg-white/[0.02] hover:border-[#ea0000] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                    : 'border-zinc-300 bg-white/70 hover:border-[#ea0000] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
                }`}
              >
                <div className="flex items-start gap-3.5 sm:gap-5">
                  <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#ea0000] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

                  <div className={`mt-0.5 p-2 sm:p-2.5 border rounded-full shrink-0 transition-colors duration-150 ${isDark ? 'border-zinc-800 text-zinc-400 group-hover:text-[#ea0000] group-hover:border-[#ea0000]/30' : 'border-zinc-300 text-zinc-500 group-hover:text-[#ea0000] group-hover:border-[#ea0000]/30'}`}>
                    <BadgeIcon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-serif text-sm sm:text-base font-bold leading-snug mb-1">{cert.title}</h3>
                    <p className={`font-serif text-xs mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{cert.issuer}</p>
                    <p className="font-mono text-[8px] tracking-widest uppercase opacity-50">{cert.date}</p>
                  </div>
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </FadeSection>

        {/* --- TECHNICAL SKILLS --- */}
        <FadeSection id="skills" isDark={isDark}>
          <SectionHeader title="SYSTEM ARSENAL" index="03" isDark={isDark} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-10 gap-y-8 sm:gap-y-12">
            {[
              { category: "Frontend", tools: ["React", "Next.js", "Angular", "Tailwind CSS", "JavaScript", "TypeScript", "HTML/CSS"] },
              { category: "Backend", tools: ["Node.js", "Express.js", "Nest.js", "PHP"] },
              { category: "Databases", tools: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Prisma"] },
              { category: "Programming", tools: ["Java", "Python", "C", "C++", "SQL"] },
              { category: "Mobile Apps", tools: ["Flutter", "Dart", "Kotlin", "React Native"] },
              { category: "Tools", tools: ["Git", "GitHub", "API Integration", "VS Code"] }
            ].map((stack, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={SCROLL_REPLAY_VIEWPORT}
                transition={{ duration: 0.45, ease: IOS_OPTICAL_EASE, delay: i * 0.04 }}
                className="flex flex-col group"
              >
                <h3 className={`font-serif text-sm sm:text-base mb-3.5 sm:mb-5 border-b pb-2 uppercase tracking-widest transition-colors duration-150 ${isDark ? 'border-zinc-800 group-hover:border-[#ea0000] group-hover:text-[#ea0000]' : 'border-zinc-200 group-hover:border-[#ea0000] group-hover:text-[#ea0000]'}`}>
                  <MicroGraphicIcon /> {stack.category}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {stack.tools.map((tool, tIdx) => (
                    <motion.span 
                      key={tool}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={SCROLL_REPLAY_VIEWPORT}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.28, ease: NOTHING_DETENT_EASE, delay: tIdx * 0.015 }}
                      className={`px-2.5 py-1.5 text-[8px] font-mono font-bold tracking-widest uppercase border transition-colors duration-150 cursor-default backdrop-blur-md ${
                        isDark
                          ? 'border-zinc-800 text-zinc-300 hover:border-[#ea0000] hover:bg-[#ea0000]/10 hover:text-[#ea0000] bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                          : 'border-zinc-300 text-zinc-600 hover:border-[#ea0000] hover:bg-[#ea0000]/10 hover:text-[#ea0000] bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
                      }`}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeSection>

        {/* --- HARDWARE TELEMETRY EXPERIENCE TIMELINE --- */}
        <FadeSection id="experience" isDark={isDark}>
          <SectionHeader title="EXPERIENCE" index="04" isDark={isDark} />
          <div className="relative max-w-4xl mx-auto pl-5 sm:pl-10">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={SCROLL_REPLAY_VIEWPORT}
              transition={{ duration: 0.7, ease: IOS_SHEET_EASE }}
              className={`absolute left-1 sm:left-3 top-2 bottom-2 w-[1px] origin-top border-l border-dotted ${
                isDark ? 'border-zinc-700' : 'border-zinc-300'
              }`}
            />

            <div className="flex flex-col gap-7 sm:gap-10">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <div key={exp.code} className="relative group/exp">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={SCROLL_REPLAY_VIEWPORT}
                    transition={{ duration: 0.35, ease: NOTHING_DETENT_EASE, delay: idx * 0.1 }}
                    className={`absolute -left-[19px] sm:-left-[34px] top-6 sm:top-8 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border flex items-center justify-center z-20 ${
                      isDark ? 'bg-black border-zinc-700 group-hover/exp:border-[#ea0000]' : 'bg-white border-zinc-400 group-hover/exp:border-[#ea0000]'
                    } transition-colors duration-200`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-[#ea0000] animate-pulse' : 'bg-zinc-500 group-hover/exp:bg-[#ea0000]'} transition-colors`} />
                  </motion.div>

                  <LiquidGlassCard 
                    isDark={isDark}
                    delay={idx * 0.08}
                    className={`p-4 sm:p-6 md:p-9 border transition-all duration-200 backdrop-blur-xl ${
                      isDark
                        ? 'border-zinc-800 bg-white/[0.02] hover:border-[#ea0000]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]'
                        : 'border-zinc-300 bg-white/75 hover:border-[#ea0000]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
                    }`}
                  >
                    <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-[1.5px] border-l-[1.5px] border-[#ea0000] opacity-0 group-hover/exp:opacity-100 transition-opacity duration-200" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-[1.5px] border-r-[1.5px] border-[#ea0000] opacity-0 group-hover/exp:opacity-100 transition-opacity duration-200" />

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 sm:mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ea0000]" />
                        <span className="font-mono text-[8px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#ea0000]">
                          {exp.code}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 font-mono text-[7.5px] sm:text-[8px] font-bold tracking-[0.16em] uppercase border border-dotted ${
                        isDark ? 'border-zinc-700 bg-black/60 text-zinc-300' : 'border-zinc-300 bg-zinc-100 text-zinc-700'
                      }`}>
                        {exp.period}
                      </span>
                    </div>

                    <div className={`mb-4 sm:mb-6 pb-4 sm:pb-5 border-b border-dotted ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                      <h3 className="font-nothing text-lg sm:text-2xl tracking-[0.1em] sm:tracking-[0.12em] uppercase mb-1 group-hover/exp:text-[#ea0000] transition-colors duration-200">
                        {exp.company}
                      </h3>
                      <p className={`font-serif italic text-xs sm:text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {exp.role}
                      </p>
                    </div>

                    <ul className={`text-xs sm:text-sm font-serif leading-relaxed space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {exp.highlights.map((item, hIdx) => (
                        <motion.li
                          key={hIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={SCROLL_REPLAY_VIEWPORT}
                          transition={{ duration: 0.35, delay: 0.08 + hIdx * 0.05, ease: IOS_OPTICAL_EASE }}
                          className={`group/row flex gap-2.5 sm:gap-3 items-start p-1.5 sm:p-2 -mx-1.5 sm:-mx-2 rounded-[2px] transition-colors duration-150 ${
                            isDark ? 'hover:bg-white/[0.03] hover:text-zinc-200' : 'hover:bg-black/[0.03] hover:text-black'
                          }`}
                        >
                          <span className="mt-1.5 sm:mt-2 w-1.5 h-1.5 shrink-0 bg-[#ea0000] group-hover/row:scale-125 group-hover/row:shadow-[0_0_8px_#ea0000] transition-all" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className={`pt-3.5 sm:pt-4 border-t border-dotted flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 ${isDark ? 'border-zinc-800/80' : 'border-zinc-200'}`}>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 text-[7.5px] sm:text-[8px] font-mono font-bold tracking-widest uppercase border transition-colors duration-150 ${
                              isDark
                                ? 'bg-black/60 border-zinc-800 text-zinc-300 group-hover/exp:border-zinc-700'
                                : 'bg-white border-zinc-300 text-zinc-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="font-mono text-[7.5px] sm:text-[8px] tracking-[0.18em] uppercase opacity-45">
                        STATUS // {exp.status}
                      </span>
                    </div>
                  </LiquidGlassCard>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* --- INTERACTIVE PROJECTS SECTION --- */}
        <FadeSection id="projects" isDark={isDark}>
          <SectionHeader title="MODULES" index="05" isDark={isDark} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-9 sm:gap-y-12">
            {PROJECTS_DATA.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={SCROLL_REPLAY_VIEWPORT}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.48, ease: IOS_OPTICAL_EASE, delay: i * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col cursor-pointer"
                onMouseEnter={() => setHoverColorRGB(project.color)}
                onMouseLeave={() => setHoverColorRGB('234, 0, 0')}
              >
                <SpatialTiltFrame className="mb-4 sm:mb-6">
                  <div className={`aspect-[16/9] relative overflow-hidden flex items-center justify-center border transition-colors duration-150 ${isDark ? 'border-zinc-800 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]' : 'border-zinc-300 bg-white'}`}>
                    
                    <img src={project.img} alt={project.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-45 group-hover:grayscale-0 group-hover:scale-105 group-hover:blur-[2px] transition-all duration-500 z-0" />
                    
                    <div className="absolute inset-0 bg-black/40 md:bg-transparent md:group-hover:bg-black/50 transition-colors duration-200 z-10" />

                    <div className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 py-1 font-mono text-[7.5px] sm:text-[8px] font-bold tracking-widest uppercase shadow-xl z-20 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                      {project.id}
                    </div>

                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2 sm:px-2.5 py-1 font-mono text-[7.5px] sm:text-[8px] font-bold tracking-widest uppercase bg-black/80 backdrop-blur-md text-white border border-white/15 group-hover:border-[#ea0000] group-hover:bg-[#ea0000] transition-colors z-20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ea0000] group-hover:bg-white animate-pulse" />
                      <span>DOSSIER +</span>
                    </div>
                    
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="hidden md:flex absolute inset-0 items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30"
                    >
                      <SocialLink href={project.link} isDark={true}>
                        <ArrowUpRightIcon />
                      </SocialLink>
                      <SocialLink href={project.repo} isDark={true}>
                        <GithubIcon />
                      </SocialLink>
                    </div>

                  </div>
                </SpatialTiltFrame>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg sm:text-2xl font-light tracking-tight uppercase group-hover:text-[#ea0000] transition-colors duration-150">{project.name}</h3>
                  <span className="font-mono text-[8px] tracking-widest uppercase opacity-60 group-hover:opacity-100 group-hover:text-[#ea0000] transition-all shrink-0">
                    SPECS →
                  </span>
                </div>

                <p className={`text-xs sm:text-sm font-serif leading-relaxed mb-4 sm:mb-6 flex-grow max-w-md ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{project.desc}</p>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tech.map(t => (
                      <span key={t} className={`px-2 py-1 text-[7.5px] sm:text-[8px] font-mono font-bold tracking-widest uppercase border ${isDark ? 'bg-[#111] border-zinc-800 text-zinc-300 group-hover:border-[#ea0000] group-hover:text-[#ea0000]' : 'bg-white border-zinc-300 text-zinc-600 group-hover:border-[#ea0000] group-hover:text-[#ea0000]'} transition-colors duration-150`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex md:hidden items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-2.5 py-1 text-[7.5px] font-mono font-bold tracking-widest uppercase border border-dotted ${
                        isDark ? 'border-zinc-700 text-zinc-200 hover:border-[#ea0000]' : 'border-zinc-300 text-zinc-800 hover:border-[#ea0000]'
                      }`}
                    >
                      LIVE ↗
                    </a>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-2.5 py-1 text-[7.5px] font-mono font-bold tracking-widest uppercase border border-dotted ${
                        isDark ? 'border-zinc-700 text-zinc-200 hover:border-[#ea0000]' : 'border-zinc-300 text-zinc-800 hover:border-[#ea0000]'
                      }`}
                    >
                      CODE
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeSection>

        {/* --- CONTACT SECTION --- */}
        <FadeSection id="contact" isDark={isDark} className="border-b-0">
          <div className="max-w-[1000px] mx-auto w-full">
            
            <SectionHeader title="LET'S CONNECT" index="06" isDark={isDark} />
            <p className={`text-center font-serif text-xs sm:text-base -mt-6 sm:-mt-10 mb-10 sm:mb-14 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              I'm always open to new opportunities and collaborations. Feel free to reach out.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
              
              <div className="flex flex-col gap-6 sm:gap-8">
                
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h4 className={`font-serif text-lg sm:text-xl font-light mb-0.5`}>Contact Information</h4>
                  
                  <LiquidGlassCard 
                    isDark={isDark}
                    isInteractive={true}
                    delay={0}
                    onClick={() => handleCopy('tejassagar9@gmail.com', 'Email')}
                    className={`p-3.5 sm:p-5 border border-dotted group transition-colors duration-150 cursor-pointer backdrop-blur-xl ${
                      isDark
                        ? 'border-zinc-800 bg-white/[0.02] hover:border-[#ea0000] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                        : 'border-zinc-300 bg-white/70 hover:border-[#ea0000] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className={`p-2 sm:p-2.5 rounded-full shrink-0 ${isDark ? 'bg-zinc-900 text-zinc-400 group-hover:text-white' : 'bg-zinc-200 text-zinc-600 group-hover:text-black'} transition-colors duration-150`}>
                          <MailIcon />
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-widest opacity-50 mb-0.5">Email (Tap to copy)</p>
                          <p className="text-xs sm:text-sm font-serif font-bold truncate">tejassagar9@gmail.com</p>
                        </div>
                      </div>
                      <div className={`p-2 border border-dotted shrink-0 transition-colors ${copiedField === 'Email' ? 'border-emerald-500 text-emerald-500' : isDark ? 'border-zinc-800 text-zinc-500 group-hover:text-[#ea0000]' : 'border-zinc-300 text-zinc-500 group-hover:text-[#ea0000]'}`}>
                        {copiedField === 'Email' ? <CheckIcon /> : <CopyIcon />}
                      </div>
                    </div>
                  </LiquidGlassCard>
                  
                  <LiquidGlassCard 
                    isDark={isDark}
                    isInteractive={true}
                    delay={0.05}
                    onClick={() => handleCopy('+91 80739 00091', 'Phone')}
                    className={`p-3.5 sm:p-5 border border-dotted group transition-colors duration-150 cursor-pointer backdrop-blur-xl ${
                      isDark
                        ? 'border-zinc-800 bg-white/[0.02] hover:border-[#ea0000] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                        : 'border-zinc-300 bg-white/70 hover:border-[#ea0000] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className={`p-2 sm:p-2.5 rounded-full shrink-0 ${isDark ? 'bg-zinc-900 text-zinc-400 group-hover:text-white' : 'bg-zinc-200 text-zinc-600 group-hover:text-black'} transition-colors duration-150`}>
                          <PhoneIcon />
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-widest opacity-50 mb-0.5">Phone (Tap to copy)</p>
                          <p className="text-xs sm:text-sm font-serif font-bold truncate">+91 80739 00091</p>
                        </div>
                      </div>
                      <div className={`p-2 border border-dotted shrink-0 transition-colors ${copiedField === 'Phone' ? 'border-emerald-500 text-emerald-500' : isDark ? 'border-zinc-800 text-zinc-500 group-hover:text-[#ea0000]' : 'border-zinc-300 text-zinc-500 group-hover:text-[#ea0000]'}`}>
                        {copiedField === 'Phone' ? <CheckIcon /> : <CopyIcon />}
                      </div>
                    </div>
                  </LiquidGlassCard>
                  
                  <LiquidGlassCard 
                    isDark={isDark}
                    delay={0.1}
                    className={`p-3.5 sm:p-5 border border-dotted backdrop-blur-xl ${
                      isDark
                        ? 'border-zinc-800 bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                        : 'border-zinc-300 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`p-2 sm:p-2.5 rounded-full shrink-0 ${isDark ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-200 text-zinc-600'}`}>
                        <MapPinIcon />
                      </div>
                      <div>
                        <p className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-widest opacity-50 mb-0.5">Location</p>
                        <p className="text-xs sm:text-sm font-serif font-bold">Bangalore, India</p>
                      </div>
                    </div>
                  </LiquidGlassCard>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className={`font-serif text-lg sm:text-xl font-light`}>Follow Me</h4>
                  <div className="flex gap-3 sm:gap-4">
                    <SocialLink href="https://www.linkedin.com/in/tejas-sagar-659032287/" isDark={isDark}>
                      <LinkedinIcon />
                    </SocialLink>
                    <SocialLink href="https://github.com/TejasSagar03" isDark={isDark}>
                      <GithubIcon />
                    </SocialLink>
                  </div>
                </div>

              </div>

              <div className="flex flex-col gap-4 sm:gap-5">
                <h4 className={`font-serif text-lg sm:text-xl font-light`}>Send a Message</h4>
                
                <form className="space-y-4 sm:space-y-5" onSubmit={handleFormSubmit}>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className={`font-serif text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className={`bg-transparent border p-3 text-xs font-serif outline-none transition-colors duration-150 rounded-none backdrop-blur-md ${isDark ? 'border-zinc-800 focus:border-[#ea0000] text-white bg-white/[0.02]' : 'border-zinc-300 focus:border-[#ea0000] text-black bg-white/60'}`}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className={`font-serif text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className={`bg-transparent border p-3 text-xs font-serif outline-none transition-colors duration-150 rounded-none backdrop-blur-md ${isDark ? 'border-zinc-800 focus:border-[#ea0000] text-white bg-white/[0.02]' : 'border-zinc-300 focus:border-[#ea0000] text-black bg-white/60'}`}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className={`font-serif text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project inquiry, collaboration, etc."
                      className={`bg-transparent border p-3 text-xs font-serif outline-none transition-colors duration-150 rounded-none backdrop-blur-md ${isDark ? 'border-zinc-800 focus:border-[#ea0000] text-white bg-white/[0.02]' : 'border-zinc-300 focus:border-[#ea0000] text-black bg-white/60'}`}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className={`font-serif text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Message *</label>
                    <textarea
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project or inquiry..."
                      className={`bg-transparent border p-3 text-xs font-serif outline-none transition-colors duration-150 resize-none rounded-none backdrop-blur-md ${isDark ? 'border-zinc-800 focus:border-[#ea0000] text-white bg-white/[0.02]' : 'border-zinc-300 focus:border-[#ea0000] text-black bg-white/60'}`}
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.12, ease: NOTHING_DETENT_EASE }}
                    className={`w-full py-3 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer ${
                      formStatus === 'sent'
                        ? 'bg-emerald-600 text-white'
                        : isDark
                          ? 'bg-white text-black hover:bg-[#ea0000] hover:text-white'
                          : 'bg-black text-white hover:bg-[#ea0000]'
                    }`}
                  >
                    {formStatus === 'submitting' ? (
                      <span>TRANSMITTING...</span>
                    ) : formStatus === 'sent' ? (
                      <>
                        <CheckIcon />
                        <span>[MESSAGE TRANSMITTED]</span>
                      </>
                    ) : (
                      <>
                        <SendIcon />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* --- UNIQUE ANIMATED FOOTER --- */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: IOS_OPTICAL_EASE }}
          viewport={SCROLL_REPLAY_VIEWPORT}
          className={`py-8 sm:py-10 border-t overflow-hidden ${isDark ? 'border-zinc-800 bg-black' : 'border-zinc-200 bg-white'}`}
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center gap-5 sm:gap-6">
            <div className="flex w-full justify-between items-center opacity-60 text-[8.5px] sm:text-[9px] font-mono uppercase tracking-widest">
              <span className="font-nothing text-xl sm:text-2xl text-[#ea0000] opacity-100">TSK</span>
              <span>© 2026 LOG.</span>
              <span className="hidden md:inline text-[#ea0000]">SYS.V.5.0</span>
            </div>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: NOTHING_DETENT_EASE }}
              viewport={SCROLL_REPLAY_VIEWPORT}
              className={`w-full h-[1px] origin-center ${isDark ? 'bg-zinc-800' : 'bg-zinc-300'}`}
            />
            
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0.12em" }}
              whileInView={{ opacity: 0.6, letterSpacing: "0.28em" }}
              transition={{ duration: 0.6, delay: 0.05, ease: IOS_OPTICAL_EASE }}
              viewport={SCROLL_REPLAY_VIEWPORT}
              className="text-[8px] font-mono uppercase font-bold text-center text-[#ea0000]"
            >
              PURE FUNCTION. ZERO NOISE.
            </motion.p>
          </div>
        </motion.footer>

      </motion.div>
    </div>
  );
};

export default App;