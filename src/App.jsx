import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORT YOUR IMAGES HERE ---
import heroPic from './assets/hero-pic.jpg'; 
import aboutPic from './assets/about-pic.jpg'; 

// --- ZERO-CRASH SVGS ---
const ArrowUpRightIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>;
const MailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const MapPinIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const GithubIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.5 5 5 0 0 0-.12-3.46s-1.13-.36-3.7 1.36a12.8 12.8 0 0 0-6.8 0c-2.57-1.72-3.7-1.36-3.7-1.36a5 5 0 0 0-.12 3.46 5.2 5.2 0 0 0-1.39 3.5c0 5.2 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path></svg>;
const LinkedinIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const SendIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const BadgeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M12 15v5s-2.5-1.5-5 0v-5"></path><circle cx="12" cy="9" r="5"></circle></svg>;

// --- CUSTOM TS LOGO SVG ---
const TSLogo = () => (
  <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* T Component */}
    <rect x="12" y="16" width="40" height="6" fill="currentColor" />
    <rect x="29" y="16" width="6" height="32" fill="currentColor" />
    {/* S Component (Abstracted) */}
    <rect x="42" y="28" width="6" height="6" fill="currentColor" />
    <rect x="16" y="36" width="6" height="6" fill="currentColor" />
    <rect x="16" y="42" width="32" height="6" fill="currentColor" />
    {/* Red Accent Dot */}
    <circle cx="32" cy="32" r="3" fill="#ea0000" />
  </svg>
);

// --- ENHANCED MAGNETIC CANVAS (SSR SAFE) ---
const CanvasDotGrid = ({ isDark }) => {
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
    window.addEventListener('mousemove', handleMouseMove);
    
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
          alpha = isDark ? 0.2 + force * 0.6 : 0.2 + force * 0.6;
          size = 1.2 + force * 2.5;
        }

        dot.vx += (targetX - dot.x) * 0.1; 
        dot.vy += (targetY - dot.y) * 0.1;
        dot.vx *= 0.8; 
        dot.vy *= 0.8;
        dot.x += dot.vx; 
        dot.y += dot.vy;

        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha})`;
        ctx.beginPath(); ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2); ctx.fill();
      });

      if (mouse.x > 0) {
        ctx.shadowColor = '#ea0000';
        ctx.shadowBlur = 20;
        ctx.fillStyle = 'rgba(234, 0, 0, 1)';
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0; 
        ctx.fillStyle = 'rgba(234, 0, 0, 0.15)';
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2); ctx.fill();
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => { 
      window.removeEventListener('mousemove', handleMouseMove); 
      window.removeEventListener('resize', handleResize); 
      cancelAnimationFrame(animationFrameId); 
    };
  }, [isDark]);
  
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// --- BOOT SEQUENCE ---
const BootSequence = ({ setBooted }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const pInterval = setInterval(() => setProgress(p => (p < 100 ? p + Math.floor(Math.random() * 30) : 100)), 100);
    const s1 = setTimeout(() => setStage(1), 600);
    const s2 = setTimeout(() => setStage(2), 1200);
    const s3 = setTimeout(() => { setStage(3); setTimeout(() => setBooted(true), 150); }, 1800);
    return () => { clearInterval(pInterval); clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); };
  }, [setBooted]);
  const bar = Array.from({ length: 20 }).map((_, i) => (i < (progress / 5) ? '█' : '░')).join('');

  return (
    <motion.div exit={{ opacity: 0, filter: "blur(10px)" }} transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-[100] flex flex-col justify-center items-center p-12 font-mono text-xs uppercase tracking-widest ${stage === 3 ? 'bg-white text-black' : 'bg-black text-[#d4d4d4]'}`}
    >
      <div className="w-full max-w-xl">
        <p className="text-[#ea0000] mb-8 font-bold tracking-[0.3em]">TS_OS [V.1.0]</p>
        <div className="mb-8 flex flex-col gap-2 opacity-70">
          <p>INIT KERNEL........ [OK]</p>
          <p>LOAD DRIVERS....... [{Math.min(progress, 100)}%]</p>
        </div>
        <p className="mb-8 text-white/50 tracking-widest">[{bar}]</p>
        {stage >= 2 && (
          <div className="flex items-center gap-4 mt-8 border-t border-white/20 pt-8">
            <div className="w-2 h-2 bg-[#ea0000] rounded-full animate-pulse" />
            <h1 className="font-nothing text-3xl text-white">SYSTEM ONLINE</h1>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- ANIMATED SECTION COMPONENT ---
const FadeSection = ({ children, id, className, isDark }) => (
  <section id={id} className={`py-32 px-6 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'} ${className || ''}`}>
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[1200px] mx-auto w-full"
    >
      {children}
    </motion.div>
  </section>
);

// --- ENHANCED MECHANICAL SOCIAL LINK ---
const SocialLink = ({ href, children, isDark, isMail }) => (
  <motion.a
    href={href}
    {...(!isMail && { target: "_blank", rel: "noopener noreferrer" })}
    whileHover="hover"
    whileTap="tap"
    className={`group relative w-14 h-14 flex items-center justify-center border border-dotted transition-colors duration-300 ${
      isDark 
        ? 'border-zinc-600 hover:border-[#ea0000] hover:bg-[#ea0000]/10 text-zinc-300 hover:text-[#ea0000]' 
        : 'border-zinc-400 hover:border-[#ea0000] hover:bg-[#ea0000]/10 text-zinc-600 hover:text-[#ea0000]'
    }`}
  >
    <motion.div variants={{ hover: { scale: 1.15, y: -2 }, tap: { scale: 0.95 } }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      {children}
    </motion.div>
    <motion.div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#ea0000]" variants={{ initial: { opacity: 0, scale: 0 }, hover: { opacity: 1, scale: 1 } }} initial="initial" />
    <motion.div className="absolute top-[-1px] left-[-1px] w-2 h-2 border-t-2 border-l-2 border-[#ea0000]" variants={{ initial: { opacity: 0, x: -4, y: -4 }, hover: { opacity: 1, x: 0, y: 0 } }} initial="initial" />
    <motion.div className="absolute top-[-1px] right-[-1px] w-2 h-2 border-t-2 border-r-2 border-[#ea0000]" variants={{ initial: { opacity: 0, x: 4, y: -4 }, hover: { opacity: 1, x: 0, y: 0 } }} initial="initial" />
    <motion.div className="absolute bottom-[-1px] left-[-1px] w-2 h-2 border-b-2 border-l-2 border-[#ea0000]" variants={{ initial: { opacity: 0, x: -4, y: 4 }, hover: { opacity: 1, x: 0, y: 0 } }} initial="initial" />
    <motion.div className="absolute bottom-[-1px] right-[-1px] w-2 h-2 border-b-2 border-r-2 border-[#ea0000]" variants={{ initial: { opacity: 0, x: 4, y: 4 }, hover: { opacity: 1, x: 0, y: 0 } }} initial="initial" />
  </motion.a>
);

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#000000' : '#ffffff';
  }, [isDark]);

  return (
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-700 selection:bg-[#ea0000] selection:text-white ${isDark ? 'text-white bg-black' : 'text-black bg-white'}`}>
      
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${isDark ? '#000000' : '#ffffff'}; border-left: 1px solid ${isDark ? '#27272a' : '#e4e4e7'}; }
        ::-webkit-scrollbar-thumb { background: #ea0000; border-radius: 0px; }
        ::-webkit-scrollbar-thumb:hover { background: #cc0000; }
      `}} />

      <AnimatePresence>
        {!booted && <BootSequence setBooted={setBooted} />}
      </AnimatePresence>

      <CanvasDotGrid isDark={isDark} />

      <div className="relative z-10 flex flex-col font-sans w-full max-w-full overflow-hidden">
        
        {/* --- NAVBAR --- */}
        <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 backdrop-blur-xl border-b ${isDark ? 'bg-black/90 border-zinc-800' : 'bg-white/90 border-zinc-200'}`}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            
            {/* Custom SVG Brand Logo */}
            <div className={`transition-colors ${isDark ? 'text-white' : 'text-black'}`}>
              <TSLogo />
            </div>
            
            <div className={`hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <a href="#about" className={`hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>About</a>
              <a href="#certs" className={`hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>Certs</a>
              <a href="#skills" className={`hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>Skills</a>
              <a href="#experience" className={`hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>Experience</a>
              <a href="#projects" className={`hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>Projects</a>
              <a href="#contact" className={`hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>Contact</a>
            </div>
            
            <button 
              onClick={() => setIsDark(!isDark)} 
              className={`relative w-16 h-8 border-2 flex items-center transition-colors duration-500 cursor-pointer overflow-hidden ${isDark ? 'border-zinc-800 bg-black' : 'border-zinc-200 bg-white'}`}
            >
              <div className="absolute inset-0 flex justify-between items-center px-2 text-[9px] font-mono tracking-widest font-bold pointer-events-none">
                <span className={isDark ? 'text-zinc-600' : 'text-black'}>LT</span>
                <span className={isDark ? 'text-white' : 'text-zinc-400'}>DK</span>
              </div>
              <motion.div 
                layout 
                initial={false} 
                animate={{ x: isDark ? 32 : 0 }} 
                transition={{ type: "spring", stiffness: 500, damping: 30 }} 
                className={`w-7 h-6 relative z-10 flex items-center justify-center shadow-md ${isDark ? 'bg-white' : 'bg-black'}`}
              >
                <div className={`w-[2px] h-3 ${isDark ? 'bg-black' : 'bg-white'}`} />
              </motion.div>
            </button>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <section className={`pt-40 pb-20 min-h-[90vh] flex flex-col justify-center border-b relative ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
          <div className="max-w-[1200px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
            
            {/* Left: Portrait */}
            <div className="lg:col-span-5 relative group order-2 lg:order-1 flex justify-center lg:justify-start">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: booted ? 1 : 0, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                className="w-full max-w-sm relative group mt-8 lg:mt-0"
              >
                <svg className={`absolute -top-6 -left-6 w-16 h-16 ${isDark ? 'text-zinc-600' : 'text-zinc-400'} z-0 pointer-events-none`} viewBox="0 0 64 64" fill="none">
                   <line x1="8" y1="8" x2="64" y2="8" stroke="currentColor" strokeWidth="1" />
                   <line x1="8" y1="8" x2="8" y2="64" stroke="currentColor" strokeWidth="1" />
                   <circle cx="8" cy="8" r="2.5" fill="currentColor" />
                   <circle cx="60" cy="8" r="2.5" fill="currentColor" />
                   <circle cx="8" cy="60" r="2.5" fill="currentColor" />
                </svg>

                <svg className={`absolute -bottom-6 -right-6 w-16 h-16 ${isDark ? 'text-zinc-600' : 'text-zinc-400'} z-0 pointer-events-none`} viewBox="0 0 64 64" fill="none" style={{ transform: 'rotate(180deg)' }}>
                   <line x1="8" y1="8" x2="64" y2="8" stroke="currentColor" strokeWidth="1" />
                   <line x1="8" y1="8" x2="8" y2="64" stroke="currentColor" strokeWidth="1" />
                   <circle cx="8" cy="8" r="2.5" fill="currentColor" />
                   <circle cx="60" cy="8" r="2.5" fill="currentColor" />
                   <circle cx="8" cy="60" r="2.5" fill="currentColor" />
                </svg>

                <div className={`relative p-3 md:p-4 border shadow-2xl ${isDark ? 'border-zinc-800 bg-black' : 'border-zinc-200 bg-white'} z-10`}>
                  <div className={`border border-dotted ${isDark ? 'border-zinc-700' : 'border-zinc-300'} p-1`}>
                    <div className={`aspect-[3/4] relative overflow-hidden ${isDark ? 'bg-black' : 'bg-zinc-100'}`}>
                      <img 
                        src={heroPic} 
                        alt="Tejas Sagar K" 
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 relative z-10" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-12 bottom-12 hidden md:flex flex-col items-center gap-2 z-0">
                  <div className={`w-3 h-12 border ${isDark ? 'border-zinc-800' : 'border-zinc-300'} flex items-start justify-center p-[2px]`}>
                    <motion.div 
                      animate={{ y: [0, 24, 0] }} 
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="w-full h-3 bg-[#ea0000]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Typography */}
            <div className="lg:col-span-7 flex flex-col order-1 lg:order-2 relative">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] aspect-square rounded-full border ${isDark ? 'border-white/5' : 'border-black/5'} -z-10 pointer-events-none`} />

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: booted ? 1 : 0, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="w-full">
                
                <div className="flex flex-col gap-6 md:gap-8 w-full mb-10 z-10 relative">
                  <h1 className="text-[clamp(2.2rem,5vw,5.5rem)] font-nothing tracking-[0.15em] leading-[1.15] uppercase text-current whitespace-nowrap block">
                    TEJAS
                  </h1>
                  <h1 className="text-[clamp(2.2rem,5vw,5.5rem)] font-nothing tracking-[0.15em] leading-[1.15] uppercase text-current whitespace-nowrap block">
                    SAGAR&nbsp;K<span className="text-[#ea0000]">.</span>
                  </h1>
                </div>
                
                <h4 className={`text-xs md:text-sm font-mono tracking-widest uppercase mb-8 pb-8 border-b ${isDark ? 'text-zinc-600 border-zinc-800' : 'text-zinc-500 border-zinc-200'}`}>
                  Frontend · Backend · Full-Stack
                </h4>

                <p className={`text-lg font-serif leading-relaxed mb-10 max-w-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Dedicated BCA student and Full Stack Web Developer. Skilled in rapidly adopting new technologies to build impactful, scalable real-world applications.
                </p>

                {/* SOCIAL LINKS */}
                <div className="flex gap-5">
                  <SocialLink href="https://www.linkedin.com/in/tejas-sagar-659032287/" isDark={isDark}>
                    <LinkedinIcon />
                  </SocialLink>
                  <SocialLink href="https://github.com/TejasSagar03" isDark={isDark}>
                    <GithubIcon />
                  </SocialLink>
                  <SocialLink href="mailto:tejassagar9@gmail.com" isDark={isDark} isMail={true}>
                    <MailIcon />
                  </SocialLink>
                </div>

              </motion.div>
            </div>

          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <FadeSection id="about" isDark={isDark}>
          <div className="flex flex-col items-center mb-20 text-center">
            <h2 className="font-nothing text-4xl md:text-6xl tracking-widest uppercase text-current mb-4">ABOUT ME</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Image */}
            <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
              <div className="relative group max-w-sm w-full">
                <svg className={`absolute -top-4 -left-4 w-12 h-12 ${isDark ? 'text-zinc-600' : 'text-zinc-400'} z-0 pointer-events-none`} viewBox="0 0 64 64" fill="none">
                   <line x1="8" y1="8" x2="64" y2="8" stroke="currentColor" strokeWidth="1" />
                   <line x1="8" y1="8" x2="8" y2="64" stroke="currentColor" strokeWidth="1" />
                   <circle cx="8" cy="8" r="2" fill="currentColor" />
                </svg>
                <svg className={`absolute -bottom-4 -right-4 w-12 h-12 ${isDark ? 'text-zinc-600' : 'text-zinc-400'} z-0 pointer-events-none`} viewBox="0 0 64 64" fill="none" style={{ transform: 'rotate(180deg)' }}>
                   <line x1="8" y1="8" x2="64" y2="8" stroke="currentColor" strokeWidth="1" />
                   <line x1="8" y1="8" x2="8" y2="64" stroke="currentColor" strokeWidth="1" />
                   <circle cx="8" cy="8" r="2" fill="currentColor" />
                </svg>
                
                <div className={`relative p-3 border shadow-xl ${isDark ? 'border-zinc-800 bg-black' : 'border-zinc-200 bg-white'} z-10`}>
                  <div className={`border border-dotted ${isDark ? 'border-zinc-700' : 'border-zinc-300'} p-1`}>
                    <div className={`aspect-[4/5] relative overflow-hidden ${isDark ? 'bg-black' : 'bg-zinc-100'}`}>
                      <img 
                        src={aboutPic} 
                        alt="Tejas Looking Out" 
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 relative z-10" 
                      />
                    </div>
                  </div>
                </div>

                <div className={`absolute -bottom-5 left-8 px-4 py-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase z-20 shadow-xl ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  SOFTWARE ENGINEER
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Education */}
            <div className="w-full lg:w-7/12 flex flex-col">
              <p className={`text-base md:text-lg font-serif leading-loose mb-12 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                I aim to contribute to impactful projects, collaborate effectively within teams, and expand my capabilities through continuous learning. Currently pursuing my Bachelor of Computer Applications, focusing heavily on modern web and mobile architectures.
              </p>
              
              <div className={`w-12 h-[1px] mb-12 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />

              <div>
                <h4 className={`font-mono text-[11px] font-bold tracking-[0.3em] uppercase text-[#ea0000] mb-8`}>EDUCATION</h4>
                
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col">
                    <p className={`font-mono text-[10px] mb-1.5 uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>2023 - 2026</p>
                    <h5 className="font-serif text-xl md:text-2xl leading-snug mb-1">Dr. NSAM First Grade College</h5>
                    <p className="font-mono text-[10px] tracking-widest uppercase opacity-70">BCA Degree</p>
                  </div>
                  <div className="flex flex-col">
                    <p className={`font-mono text-[10px] mb-1.5 uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>2021 - 2023</p>
                    <h5 className="font-serif text-xl md:text-2xl leading-snug mb-1">Dr. NSAM Pre University</h5>
                    <p className="font-mono text-[10px] tracking-widest uppercase opacity-70">PCMC - PUC</p>
                  </div>
                  <div className="flex flex-col">
                    <p className={`font-mono text-[10px] mb-1.5 uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>2020 - 2021</p>
                    <h5 className="font-serif text-xl md:text-2xl leading-snug mb-1">Sri Devaraj Urs International</h5>
                    <p className="font-mono text-[10px] tracking-widest uppercase opacity-70">SSLC</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </FadeSection>

        {/* --- CERTIFICATIONS SECTION --- */}
        <FadeSection id="certs" isDark={isDark}>
          <div className="flex flex-col items-center mb-20 text-center">
            <h2 className="font-nothing text-4xl md:text-6xl tracking-widest uppercase text-current mb-4">CERTIFICATIONS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
            {[
              { title: "JavaScript Essentials 1 & 2", issuer: "Cisco Networking Academy", date: "September 2025" },
              { title: "Artificial Intelligence Fundamentals", issuer: "IBM SkillsBuild", date: "October 2025" },
              { title: "Communication and Personality Dynamics", issuer: "IBM SkillsBuild", date: "October 2025" },
              { title: "Problem Solving and Process Controls", issuer: "IBM SkillsBuild", date: "October 2025" }
            ].map((cert, index) => (
              <div key={index} className={`group relative flex items-start gap-6 p-6 border border-dotted transition-colors duration-300 ${isDark ? 'border-zinc-800 bg-[#050505] hover:border-[#ea0000]' : 'border-zinc-300 bg-[#fafafa] hover:border-[#ea0000]'}`}>
                
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#ea0000] opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />

                <div className={`mt-1 p-3 border rounded-full transition-colors ${isDark ? 'border-zinc-800 text-zinc-400 group-hover:text-[#ea0000] group-hover:border-[#ea0000]/30' : 'border-zinc-300 text-zinc-500 group-hover:text-[#ea0000] group-hover:border-[#ea0000]/30'}`}>
                  <BadgeIcon />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-serif text-lg font-bold leading-snug mb-2">{cert.title}</h3>
                  <p className={`font-serif text-sm mb-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{cert.issuer}</p>
                  <p className="font-mono text-[9px] tracking-widest uppercase opacity-50">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* --- TECHNICAL SKILLS --- */}
        <FadeSection id="skills" isDark={isDark}>
          <div className="flex flex-col items-center mb-20 text-center">
            <h2 className="font-nothing text-4xl md:text-6xl tracking-widest uppercase text-current mb-4">SYSTEM ARSENAL</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {[
              { category: "Frontend", tools: ["React", "Next.js", "Angular", "Tailwind CSS", "JavaScript", "TypeScript", "HTML/CSS"] },
              { category: "Backend", tools: ["Node.js", "Express.js", "Nest.js", "PHP"] },
              { category: "Databases", tools: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Prisma"] },
              { category: "Programming", tools: ["Java", "Python", "C", "C++", "SQL"] },
              { category: "Mobile Apps", tools: ["Flutter", "Dart", "Kotlin", "React Native"] },
              { category: "Tools", tools: ["Git", "GitHub", "API Integration", "VS Code"] }
            ].map((stack, i) => (
              <div key={i} className="flex flex-col group">
                <h3 className={`font-serif text-lg mb-6 border-b pb-3 uppercase tracking-widest transition-colors ${isDark ? 'border-zinc-800 group-hover:border-[#ea0000] group-hover:text-[#ea0000]' : 'border-zinc-200 group-hover:border-[#ea0000] group-hover:text-[#ea0000]'}`}>{stack.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.tools.map(tool => (
                    <span key={tool} className={`px-4 py-1.5 text-[9px] font-mono font-bold tracking-widest uppercase border transition-all cursor-default ${isDark ? 'border-zinc-800 text-zinc-300 hover:border-[#ea0000] hover:bg-[#ea0000]/10 hover:text-[#ea0000] bg-black' : 'border-zinc-300 text-zinc-600 hover:border-[#ea0000] hover:bg-[#ea0000]/10 hover:text-[#ea0000] bg-white'}`}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* --- EXPERIENCE --- */}
        <FadeSection id="experience" isDark={isDark}>
          <div className="flex flex-col items-center mb-20 text-center">
            <h2 className="font-nothing text-4xl md:text-6xl tracking-widest uppercase text-current mb-4">EXPERIENCE</h2>
          </div>
          <div className="flex flex-col gap-12 max-w-4xl mx-auto">
            <div className={`p-8 md:p-12 border transition-colors ${isDark ? 'border-zinc-800 bg-black hover:border-white/50' : 'border-zinc-300 bg-white hover:border-black/50'}`}>
              <div className={`flex flex-col md:flex-row md:items-start justify-between mb-8 pb-6 border-b gap-4 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <div>
                  <h3 className="text-2xl font-light tracking-wide uppercase mb-2">Solident Technologies</h3>
                  <p className={`font-serif italic ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Full Stack Web & Mobile Development Intern</p>
                </div>
                <div className="md:text-right">
                  <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">Feb 2026 - Apr 2026</p>
                </div>
              </div>
              <ul className={`text-sm md:text-base font-serif leading-loose space-y-4 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li className="flex gap-4 items-start"><div className="mt-2 w-1.5 h-1.5 shrink-0 bg-[#ea0000]" /> Acquiring hands-on expertise in Full Stack Web Development and mobile framework integration using React Native, Flutter, and Dart.</li>
                <li className="flex gap-4 items-start"><div className="mt-2 w-1.5 h-1.5 shrink-0 bg-[#ea0000]" /> Successfully developed and deployed production-ready applications, including the Alfa Public School and MyWorkers apps.</li>
                <li className="flex gap-4 items-start"><div className="mt-2 w-1.5 h-1.5 shrink-0 bg-[#ea0000]" /> Gained practical experience in building dynamic web platforms such as ARSolutions and the official domain, focusing on seamless frontend-backend integration and scalable architecture.</li>
              </ul>
            </div>

            <div className={`p-8 md:p-12 border transition-colors ${isDark ? 'border-zinc-800 bg-black hover:border-white/50' : 'border-zinc-300 bg-white hover:border-black/50'}`}>
              <div className={`flex flex-col md:flex-row md:items-start justify-between mb-8 pb-6 border-b gap-4 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <div>
                  <h3 className="text-2xl font-light tracking-wide uppercase mb-2">Kri Communications</h3>
                  <p className={`font-serif italic ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Backend & Database Intern</p>
                </div>
                <div className="md:text-right">
                  <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">Sept 2025 - Nov 2025</p>
                </div>
              </div>
              <ul className={`text-sm md:text-base font-serif leading-loose space-y-4 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li className="flex gap-4 items-start"><div className="mt-2 w-1.5 h-1.5 shrink-0 bg-[#ea0000]" /> Undergone hands-on training in full stack web development, including building and maintaining databases using MySQL.</li>
                <li className="flex gap-4 items-start"><div className="mt-2 w-1.5 h-1.5 shrink-0 bg-[#ea0000]" /> Integrated PHP with MySQL for dynamic backend functionality and practical API development.</li>
                <li className="flex gap-4 items-start"><div className="mt-2 w-1.5 h-1.5 shrink-0 bg-[#ea0000]" /> Developed responsive interfaces using Bootstrap, along with core frontend technologies such as HTML, CSS, and JavaScript.</li>
              </ul>
            </div>
          </div>
        </FadeSection>

        {/* --- PROJECTS --- */}
        <FadeSection id="projects" isDark={isDark}>
          <div className="flex flex-col items-center mb-20 text-center">
            <h2 className="font-nothing text-4xl md:text-6xl tracking-widest uppercase text-current mb-4">MODULES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              { 
                name: "PixelStack Arcade", 
                id: "MOD_01",
                desc: "A responsive web-based gaming hub featuring a collection of classic and modern titles like Tic-Tac-Toe, 2048, and Neon Drifter. Built for high-performance gameplay, centralizing multiple game modules into a polished dashboard.", 
                tech: ["React", "HTML/CSS", "State Management"],
                img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
                link: "https://pixelstack-arcade.vercel.app",
                repo: "https://github.com/TejasSagar03/PixelStack-Arcade-"
              },
              { 
                name: "Web Chess Engine", 
                id: "MOD_02",
                desc: "Modern web-based chess game built with Java (Spring Boot) and AngularJS. Features a Chess.com-style UI, animated piece movement, full legal move validation, and Player vs AI (greedy engine) modes.", 
                tech: ["Java", "Spring Boot", "AngularJS"],
                img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
                link: "https://chess-pla.netlify.app/",
                repo: "https://github.com/TejasSagar03/Chess"
              },
              { 
                name: "CashSpot", 
                id: "MOD_03",
                desc: "Specialized utility web application utilizing geolocation to help users locate nearby financial services, ATMs, and banks. Features an intuitive interface providing essential location-based information.", 
                tech: ["Geolocation", "React", "Maps API"],
                img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
                link: "https://cash-spot.vercel.app",
                repo: "https://github.com/TejasSagar03/CashSpot"
              },
              { 
                name: "Tetris Neo Plus", 
                id: "MOD_04",
                desc: "A modern, enhanced version of the classic block-stacking puzzle game. Features dynamic level progression, vibrant visuals, and responsive controls built for high-score chasers.", 
                tech: ["HTML5", "CSS3", "Vanilla JS"],
                img: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?auto=format&fit=crop&w=800&q=80",
                link: "https://tetrisneo.netlify.app/",
                repo: "https://github.com/TejasSagar03/Tetris-Neo-Plus"
              }
            ].map((project, i) => (
              <div key={i} className="group flex flex-col">
                <div className={`aspect-[16/9] mb-8 relative overflow-hidden flex items-center justify-center border transition-colors ${isDark ? 'border-zinc-800 bg-black' : 'border-zinc-300 bg-white'}`}>
                  
                  <img src={project.img} alt={project.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-40 group-hover:grayscale-0 group-hover:blur-sm transition-all duration-700 z-0" />
                  
                  {/* Backdrop Overlay for contrast */}
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-colors duration-500 z-10" />

                  <div className={`absolute top-4 left-4 px-3 py-1 font-mono text-[9px] font-bold tracking-widest uppercase shadow-xl z-20 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    {project.id}
                  </div>
                  
                  {/* Interactive Dual-Link Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                    <SocialLink href={project.link} isDark={isDark}>
                      <ArrowUpRightIcon />
                    </SocialLink>
                    <SocialLink href={project.repo} isDark={isDark}>
                      <GithubIcon />
                    </SocialLink>
                  </div>

                </div>
                <h3 className="text-3xl font-light tracking-tight mb-4 uppercase group-hover:text-[#ea0000] transition-colors">{project.name}</h3>
                <p className={`text-base font-serif leading-relaxed mb-8 flex-grow max-w-md ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(t => (
                    <span key={t} className={`px-3 py-1 text-[9px] font-mono font-bold tracking-widest uppercase border ${isDark ? 'bg-[#111] border-zinc-800 text-zinc-300 group-hover:border-[#ea0000] group-hover:text-[#ea0000]' : 'bg-white border-zinc-300 text-zinc-600 group-hover:border-[#ea0000] group-hover:text-[#ea0000]'} transition-colors`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* --- CONTACT SECTION --- */}
        <FadeSection id="contact" isDark={isDark} className="border-b-0">
          <div className="max-w-[1100px] mx-auto w-full">
            
            <div className="flex flex-col items-center mb-20 text-center">
              <h2 className="font-nothing text-4xl md:text-6xl tracking-widest uppercase text-current mb-4">LET'S CONNECT</h2>
              <p className={`text-center font-serif text-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                I'm always open to new opportunities and collaborations. Feel free to reach out if you'd like to work together.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              
              {/* Left Column: Contact Info & Follow Me */}
              <div className="flex flex-col gap-10">
                
                <div className="flex flex-col gap-4">
                  <h4 className={`font-serif text-2xl font-light mb-2`}>Contact Information</h4>
                  
                  <div className={`p-5 md:p-6 border border-dotted flex items-center gap-5 group transition-colors cursor-pointer ${isDark ? 'border-zinc-800 bg-[#050505] hover:border-[#ea0000]/50' : 'border-zinc-300 bg-[#fafafa] hover:border-[#ea0000]/50'}`}>
                    <div className={`p-3 rounded-full ${isDark ? 'bg-zinc-900 text-zinc-400 group-hover:text-white' : 'bg-zinc-200 text-zinc-600 group-hover:text-black'} transition-colors`}>
                      <MailIcon />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest opacity-50 mb-1">Email</p>
                      <p className="text-sm md:text-base font-serif font-bold">tejassagar9@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className={`p-5 md:p-6 border border-dotted flex items-center gap-5 group transition-colors cursor-pointer ${isDark ? 'border-zinc-800 bg-[#050505] hover:border-[#ea0000]/50' : 'border-zinc-300 bg-[#fafafa] hover:border-[#ea0000]/50'}`}>
                    <div className={`p-3 rounded-full ${isDark ? 'bg-zinc-900 text-zinc-400 group-hover:text-white' : 'bg-zinc-200 text-zinc-600 group-hover:text-black'} transition-colors`}>
                      <PhoneIcon />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest opacity-50 mb-1">Phone</p>
                      <p className="text-sm md:text-base font-serif font-bold">+91 80739 00091</p>
                    </div>
                  </div>
                  
                  <div className={`p-5 md:p-6 border border-dotted flex items-center gap-5 ${isDark ? 'border-zinc-800 bg-[#050505]' : 'border-zinc-300 bg-[#fafafa]'}`}>
                    <div className={`p-3 rounded-full ${isDark ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-200 text-zinc-600'}`}>
                      <MapPinIcon />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest opacity-50 mb-1">Location</p>
                      <p className="text-sm md:text-base font-serif font-bold">Bangalore, India</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className={`font-serif text-2xl font-light mb-2`}>Follow Me</h4>
                  <div className="flex gap-4">
                    <SocialLink href="https://www.linkedin.com/in/tejas-sagar-659032287/" isDark={isDark}>
                      <LinkedinIcon />
                    </SocialLink>
                    <SocialLink href="https://github.com/TejasSagar03" isDark={isDark}>
                      <GithubIcon />
                    </SocialLink>
                  </div>
                </div>

              </div>

              {/* Right Column: Form */}
              <div className="flex flex-col gap-6">
                <h4 className={`font-serif text-2xl font-light mb-2`}>Send a Message</h4>
                
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href = "mailto:tejassagar9@gmail.com"; }}>
                  
                  <div className="flex flex-col gap-2">
                    <label className={`font-serif text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Name</label>
                    <input type="text" placeholder="Your name" className={`bg-transparent border p-4 text-sm font-serif outline-none transition-colors rounded-none ${isDark ? 'border-zinc-800 focus:border-[#ea0000] text-white' : 'border-zinc-300 focus:border-[#ea0000] text-black'}`} />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className={`font-serif text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Email</label>
                    <input type="email" placeholder="your.email@example.com" className={`bg-transparent border p-4 text-sm font-serif outline-none transition-colors rounded-none ${isDark ? 'border-zinc-800 focus:border-[#ea0000] text-white' : 'border-zinc-300 focus:border-[#ea0000] text-black'}`} />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className={`font-serif text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Subject</label>
                    <input type="text" placeholder="Project inquiry, collaboration, etc." className={`bg-transparent border p-4 text-sm font-serif outline-none transition-colors rounded-none ${isDark ? 'border-zinc-800 focus:border-[#ea0000] text-white' : 'border-zinc-300 focus:border-[#ea0000] text-black'}`} />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className={`font-serif text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Message</label>
                    <textarea rows="5" placeholder="Tell me about your project or inquiry..." className={`bg-transparent border p-4 text-sm font-serif outline-none transition-colors resize-none rounded-none ${isDark ? 'border-zinc-800 focus:border-[#ea0000] text-white' : 'border-zinc-300 focus:border-[#ea0000] text-black'}`}></textarea>
                  </div>
                  
                  <button type="submit" className={`w-full py-4 font-serif text-base tracking-wide flex items-center justify-center gap-3 transition-colors ${isDark ? 'bg-white text-black hover:bg-[#ea0000] hover:text-white' : 'bg-black text-white hover:bg-[#ea0000]'}`}>
                    <SendIcon /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* --- UNIQUE ANIMATED FOOTER --- */}
        <motion.footer 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.3 }}
          className={`py-12 border-t overflow-hidden ${isDark ? 'border-zinc-800 bg-black' : 'border-zinc-200 bg-white'}`}
        >
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-8">
            <div className="flex w-full justify-between items-center opacity-60 text-[10px] font-mono uppercase tracking-widest">
              <span className="font-nothing text-3xl text-[#ea0000] opacity-100">TEJAS</span>
              <span>© 2026 LOG.</span>
              <span className="hidden md:inline text-[#ea0000]">SYS.V.FINAL</span>
            </div>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: false }}
              className={`w-full h-[1px] origin-center ${isDark ? 'bg-zinc-800' : 'bg-zinc-300'}`}
            />
            
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0em", y: 10 }}
              whileInView={{ opacity: 0.6, letterSpacing: "0.4em", y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: false }}
              className="text-[9px] font-mono uppercase font-bold text-center text-[#ea0000]"
            >
              PURE FUNCTION. ZERO NOISE.
            </motion.p>
          </div>
        </motion.footer>

      </div>
    </div>
  );
};

export default App;