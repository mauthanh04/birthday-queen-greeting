import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Crown, Heart, Sparkles, Star, Quote, Lock, Unlock, CheckCircle2, Fingerprint, ShieldCheck, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

const messages = [
  "Chị lúc nào cũng xinh đẹp hết phần thiên hạ luôn á 😍",
  "Vibe của chị đúng kiểu cool ngầu, nhìn là thấy cuốn 😎",
  "Chúc nữ hoàng tuổi mới ngày càng slayyyy hơn nha 💅✨",
  "Nhan sắc này đúng chuẩn ‘đỉnh cao’, không ai đọ lại nổi 👑",
  "Chị vừa xinh vừa chất, đúng kiểu ‘girl crush’ luôn á 💖",
  "Ra đường là spotlight tự chiếu vào chị luôn đó 🎉",
  "Chúc chị ngày càng quyền lực, khí chất ngút trời 🔥",
  "Đã xinh rồi mà còn thần thái nữa thì ai chịu nổi 😆",
  "Nữ hoàng thì chỉ có thể ngày càng tỏa sáng thôi ✨",
  "Chúc chị luôn tự tin và ‘cháy’ hết mình nha 💥",
  "Đẹp – ngầu – sang, chị hội tụ đủ luôn rồi 😍",
  "Chị xứng đáng là phiên bản đỉnh nhất của chính mình 💯",
];

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [challengeStep, setChallengeStep] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [humbleMessage, setHumbleMessage] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotateHero = useTransform(scrollYProgress, [0, 0.5], [0, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const startScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setChallengeStep(1);
    }, 2000);
  };

  const handleUnlock = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    setIsUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-amber-500/30">
      <div className="fixed inset-0 noise-bg z-[999]" />
      
      {/* Premium Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-amber-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Subtle Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, rgba(251, 191, 36, 0.04), transparent 80%)`,
          opacity: isUnlocked ? 1 : 0
        }}
      />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] px-4"
          >
            <div className="max-w-2xl w-full text-center space-y-16">
              <div className="relative inline-block">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-16 border border-amber-500/5 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 border border-amber-500/10 rounded-full border-dashed"
                />
                <div 
                  onClick={challengeStep === 0 && !isScanning ? startScanning : undefined}
                  className={`relative w-48 h-48 mx-auto rounded-full border-2 ${challengeStep === 0 && !isScanning ? 'border-amber-500 cursor-pointer hover:shadow-[0_0_100px_rgba(251,191,36,0.15)]' : 'border-amber-500/20'} flex flex-col items-center justify-center bg-black/80 backdrop-blur-3xl shadow-[0_0_80px_rgba(251,191,36,0.05)] transition-all duration-700 group overflow-hidden`}
                >
                  {/* Scanning Line (Idle) */}
                  {challengeStep === 0 && !isScanning && (
                    <motion.div 
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[1px] bg-amber-500/20 z-0"
                    />
                  )}

                  {isScanning ? (
                    <motion.div 
                      animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.1, 0.9] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="z-10"
                    >
                      <Fingerprint className="w-20 h-20 text-amber-500" />
                    </motion.div>
                  ) : challengeStep === 0 ? (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative z-10 flex flex-col items-center gap-2"
                    >
                      <Fingerprint className="w-20 h-20 text-amber-500" />
                      <motion.span 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[8px] font-black tracking-[0.4em] text-amber-500 uppercase"
                      >
                        Touch to Scan
                      </motion.span>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0, 0.3, 0], scale: [1, 1.4, 1.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-amber-500 rounded-full -z-10 blur-xl"
                      />
                    </motion.div>
                  ) : challengeStep === 1 ? (
                    <ShieldCheck className="w-20 h-20 text-amber-500/20" />
                  ) : (
                    <Unlock className="w-20 h-20 text-green-500" />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-black tracking-[1.2em] text-amber-500/40 uppercase block"
                >
                  Security Protocol 7.2
                </motion.span>
                <h1 className="text-5xl md:text-7xl font-serif font-bold gold-text italic tracking-tight">
                  The Queen's Vault
                </h1>
              </div>

              <div className="glass-card p-12 space-y-10 border-white/5 relative overflow-hidden">
                {isScanning && (
                  <motion.div 
                    initial={{ top: "-100%" }}
                    animate={{ top: "200%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent z-10 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                  />
                )}

                {challengeStep === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                    <p className="text-lg font-light text-amber-100/60 leading-relaxed">
                      Nội dung này chỉ dành riêng cho <span className="text-white font-medium">Nữ Hoàng Tối Cao</span>. <br />
                      Vui lòng chạm vào vân tay phía trên để bắt đầu xác thực.
                    </p>
                    <div className="flex justify-center">
                      <motion.div 
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-amber-500/30"
                      >
                        <ArrowRight className="w-6 h-6 rotate-[-90deg]" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {challengeStep === 1 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                    <p className="text-2xl font-serif font-light text-amber-100/80 italic leading-relaxed">
                      "Bạn có phải là người xinh đẹp nhất thế gian không?"
                    </p>
                    
                    <AnimatePresence>
                      {humbleMessage && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-amber-500 text-xs font-bold uppercase tracking-widest"
                        >
                          {humbleMessage}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 gap-4">
                      <button
                        onClick={() => setChallengeStep(2)}
                        className="w-full py-5 border border-amber-500/20 text-amber-500 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-amber-500/5 transition-colors"
                      >
                        Đúng vậy, chính là tôi
                      </button>
                      <button
                        onClick={() => setHumbleMessage("Hôm nay chúng tôi bắt bạn phải nhận mình là Nữ Hoàng! Không được từ chối đâu nhé 😉")}
                        className="w-full py-5 text-white/20 text-[10px] uppercase tracking-[0.2em] hover:text-white/40 transition-colors"
                      >
                        Tôi không dám nhận...
                      </button>
                    </div>
                  </motion.div>
                )}

                {challengeStep === 2 && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
                    <div className="space-y-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                      >
                        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
                      </motion.div>
                      <p className="text-3xl font-serif font-bold text-white italic">Access Granted.</p>
                      <p className="text-amber-100/30 text-[10px] uppercase tracking-[0.6em] font-black">Welcome, Your Majesty.</p>
                    </div>
                    <button
                      onClick={handleUnlock}
                      className="w-full py-7 bg-white text-black font-black text-xl uppercase tracking-[0.5em] shadow-[0_0_60px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Enter Palace
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {/* Hero Section - Split Editorial Layout */}
            <header className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
              {/* Left Pane - Visuals */}
              <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen bg-[#080808] border-r border-white/5 overflow-hidden">
                <motion.div 
                  style={{ y: backgroundY }}
                  className="absolute inset-0 z-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
                  {/* Background image removed */}
                </motion.div>
                
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="relative"
                  >
                    <Crown className="w-32 h-32 text-amber-500/20 absolute -top-16 -left-16 rotate-[-15deg] blur-sm" />
                    <h2 className="text-[15vw] font-serif font-black text-stroke italic leading-none select-none">
                      2026
                    </h2>
                  </motion.div>
                </div>

                <div className="absolute bottom-12 left-12 z-30 space-y-2">
                  <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.6em] block">Volume 01</span>
                  <span className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Birthday Edition</span>
                </div>
              </div>

              {/* Right Pane - Content */}
              <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center px-12 lg:px-24 py-24 relative">
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-12"
                >
                  <div className="space-y-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "80px" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-px bg-amber-500" 
                    />
                    <h3 className="text-amber-500 text-xs font-black uppercase tracking-[0.8em]">Happy Birthday</h3>
                  </div>

                  <h1 className="text-7xl md:text-[8rem] font-serif font-bold gold-text leading-[0.9] italic tracking-tighter">
                    Happy <br /> Birthday <br /> Queen
                  </h1>

                  <div className="max-w-md space-y-8">
                    <p className="text-xl md:text-2xl text-amber-100/60 font-light leading-relaxed italic">
                      Hôm nay không chỉ là sinh nhật… mà là ngày một <br />
                      <span className="text-white font-medium not-italic">“nữ hoàng xinh đẹp – ngầu – đỉnh của chóp”</span> ra đời.
                    </p>
                    
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-amber-500/40 font-black">From Hội 12 Người</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="absolute bottom-12 right-12 flex flex-col items-end gap-4"
                >
                  <span className="text-[9px] uppercase tracking-[0.6em] text-amber-500/40 font-black">Scroll to Explore</span>
                  <div className="w-px h-24 bg-gradient-to-b from-amber-500/50 to-transparent" />
                </motion.div>
              </div>
            </header>

            {/* Marquee Section */}
            <div className="py-12 border-y border-white/5 bg-white/[0.01] overflow-hidden whitespace-nowrap">
              <div className="flex animate-marquee">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center gap-12 px-6">
                    <span className="text-4xl md:text-6xl font-serif font-black text-stroke uppercase italic">Slay Queen</span>
                    <Sparkles className="w-8 h-8 text-amber-500/20" />
                    <span className="text-4xl md:text-6xl font-serif font-black gold-text uppercase italic">Happy Birthday</span>
                    <Crown className="w-8 h-8 text-amber-500/20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Messages Section - Editorial Data Grid */}
            <section className="max-w-7xl mx-auto px-6 py-48">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start mb-32">
                <div className="lg:col-span-7 space-y-8">
                  <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.6em]">Section 01 / Testimonials</span>
                  <h2 className="text-6xl md:text-8xl font-serif font-bold italic leading-none">
                    Lời chúc từ <br /> <span className="gold-text">"Hội 12 người"</span>
                  </h2>
                </div>
                <div className="lg:col-span-5 pt-12">
                  <p className="text-amber-100/40 text-lg leading-relaxed font-light italic border-l border-amber-500/20 pl-8">
                    Mỗi lời chúc là một mảnh ghép tạo nên bức chân dung hoàn hảo về Nữ Hoàng của chúng tôi. Một tập hợp những tình cảm chân thành nhất.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-white/10">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className="p-12 border-b border-r border-white/10 group hover:bg-white/[0.02] transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-0 bg-amber-500 group-hover:h-full transition-all duration-700" />
                    <div className="flex justify-between items-start mb-12">
                      <span className="font-mono text-[9px] text-amber-500/40 tracking-[0.4em]">MSG_REF_{String(index + 1).padStart(3, '0')}</span>
                      <Quote className="w-5 h-5 text-amber-500/10 group-hover:text-amber-500/30 transition-colors" />
                    </div>
                    <p className="text-xl text-amber-50/70 leading-relaxed font-light italic group-hover:text-white transition-colors">
                      “{msg}”
                    </p>
                    <div className="mt-12 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[9px] uppercase tracking-[0.4em] text-amber-500/60 font-black">Verified Message</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Summary Section - Immersive Luxury */}
            <section className="py-72 px-6 relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[180px]" />
              </div>
              
              <div className="max-w-5xl mx-auto text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-24"
                >
                  <div className="flex justify-center items-center gap-12 opacity-10">
                    <div className="h-px flex-1 bg-white" />
                    <Heart className="w-10 h-10" />
                    <div className="h-px flex-1 bg-white" />
                  </div>

                  <div className="space-y-12">
                    <motion.span 
                      whileInView={{ letterSpacing: ["0.5em", "1.5em"] }}
                      className="text-xs uppercase text-amber-500 font-black block"
                    >
                      The Final Word
                    </motion.span>
                    <p className="text-4xl md:text-7xl font-light text-amber-100/90 leading-[1.1] tracking-tight">
                      Chị không chỉ là chị iu… <br />
                      mà là <span className="text-white font-serif font-bold italic gold-text">NỮ HOÀNG</span> <br />
                      trong lòng tụi em.
                    </p>
                    <div className="h-32 w-px bg-gradient-to-b from-amber-500/40 to-transparent mx-auto" />
                    <p className="text-2xl md:text-3xl text-amber-100/40 font-light italic max-w-2xl mx-auto leading-relaxed">
                      Cứ việc xinh đẹp, tỏa sáng và ngầu hết nấc, <br />
                      còn lại cứ để tụi em lo phần “hâm mộ”.
                    </p>
                  </div>

                  <motion.div
                    whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                    transition={{ duration: 1.5 }}
                    className="pt-32"
                  >
                    <h3 className="text-7xl md:text-[12rem] font-serif font-black tracking-tighter gold-text leading-[0.8] uppercase italic select-none">
                      Long Live <br /> The Queen
                    </h3>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Footer - High End Minimalist */}
            <footer className="py-32 px-12 border-t border-white/5 relative overflow-hidden">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex flex-col gap-2 items-center md:items-start">
                  <span className="text-[10px] uppercase tracking-[0.8em] text-amber-500 font-black">Royal Edition</span>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">© 2026 All Rights Reserved</span>
                </div>
                
                <div className="flex gap-8">
                  {[Star, Crown, Heart].map((Icon, i) => (
                    <Icon key={i} className="w-4 h-4 text-amber-500/20 hover:text-amber-500 transition-colors cursor-pointer" />
                  ))}
                </div>

                <div className="text-right flex flex-col gap-2 items-center md:items-end">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Curated with love by</span>
                  <span className="text-[10px] uppercase tracking-[0.6em] text-amber-500 font-black">Hội 12 Người</span>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
