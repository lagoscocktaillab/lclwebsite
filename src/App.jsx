import { useState, useEffect, useRef } from "react";
import logoImg from "./assets/logo.png";

/* ─────────────────────────────────────────────
   GALLERY IMAGES
   Add your photos to src/assets/gallery/
   then import them here and add to GALLERY_IMAGES
───────────────────────────────────────────── */
import img2536 from "./assets/gallery/IMG_2536.jpg";
import img2540 from "./assets/gallery/IMG_2540.jpg";
import img2541 from "./assets/gallery/IMG_2541.jpg";
import img2542 from "./assets/gallery/IMG_2542.jpg";
import img2543 from "./assets/gallery/IMG_2543.jpg";
import img2544 from "./assets/gallery/IMG_2544.jpg";
import img2545 from "./assets/gallery/IMG_2545.jpg";
import img2546 from "./assets/gallery/IMG_2546.jpg";
import img2547 from "./assets/gallery/IMG_2547.jpg";
import img2548 from "./assets/gallery/IMG_2548.jpg";
import img2549 from "./assets/gallery/IMG_2549.jpg";
import img2550 from "./assets/gallery/IMG_2550.jpg";
import img2553 from "./assets/gallery/IMG_2553.jpg";

const GALLERY_IMAGES = [
  img2536, img2540, img2541, img2542, img2543, img2544,
  img2545, img2546, img2547, img2548, img2549, img2550, img2553,
];

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root {
    width: 100%; min-height: 100%;
    background: #F5F0E8;
    font-family: 'Syne', sans-serif;
    overflow-x: hidden;
  }
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=Syne:wght@400;500;600;700&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes floatBlob {
    0%, 100% { transform: translateY(-50%) scale(1); }
    50%       { transform: translateY(-53%) scale(1.04); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes marqueeTicker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .reveal {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  button { font-family: inherit; }

  html { scroll-behavior: smooth; }

  @keyframes fadeSlide {
    from { opacity: 0; transform: scale(1.03); }
    to   { opacity: 1; transform: scale(1); }
  }
  .gallery-img {
    animation: fadeSlide 0.55s ease;
  }
`;

function injectGlobalCSS() {
  if (document.getElementById("lcl-global")) return;
  const s = document.createElement("style");
  s.id = "lcl-global";
  s.textContent = GLOBAL_CSS;
  document.head.prepend(s);
}

/* ─────────────────────────────────────────────
   COLOURS
───────────────────────────────────────────── */
const C = {
  cream:         "#F5F0E8",
  green:         "#1B6B45",
  greenDark:     "#124D33",
  greenLight:    "#2A8A5A",
  lavender:      "#C4B5F4",
  lavenderLight: "#E8E2FF",
  muted:         "#5A5A5A",
};

/* ─────────────────────────────────────────────
   ADMIN CONFIG
───────────────────────────────────────────── */
const ADMIN_EMAIL    = "admin@lagoscocktaillab.com";
const ADMIN_PASSWORD = "LCL@admin2025";

/* ─────────────────────────────────────────────
   DEFAULT EVENTS
───────────────────────────────────────────── */
const DEFAULT_EVENTS = [
  { id:1, date:{day:"14",month:"JUN"}, title:"Cocktail Masterclass: Tropical Edition",     location:"Victoria Island, Lagos", time:"4:00 PM, 7:00 PM",  price:25000, spots:12, tag:"Masterclass", tagStyle:{ background:C.greenDark, color:C.cream     }, bookingUrl:"" },
  { id:2, date:{day:"22",month:"JUN"}, title:"Hibiscus & Botanicals Tasting Evening",      location:"Ikoyi, Lagos",           time:"6:00 PM, 9:00 PM",  price:18000, spots:20, tag:"Tasting",     tagStyle:{ background:C.green,     color:C.cream     }, bookingUrl:"" },
  { id:3, date:{day:"05",month:"JUL"}, title:"Couples Date Night: Cocktail Edition",        location:"Lekki Phase 1, Lagos",   time:"7:00 PM, 10:00 PM", price:40000, spots:8,  tag:"Date Night",  tagStyle:{ background:C.lavender,  color:C.greenDark }, bookingUrl:"" },
  { id:4, date:{day:"19",month:"JUL"}, title:"Corporate Team Building: Mixology Workshop", location:"Your Office or Our Venue",time:"Flexible",            price:0,     spots:0,  tag:"Corporate",   tagStyle:{ background:"#D6EBE0",   color:C.greenDark }, bookingUrl:"" },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────────
   SHARED UI ATOMS
───────────────────────────────────────────── */
function Btn({ children, onClick, outline, small }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: outline ? (hov ? C.green : "transparent") : (hov ? C.greenDark : C.green),
        color: outline ? (hov ? C.cream : C.greenDark) : C.cream,
        border: `1.5px solid ${C.green}`,
        padding: small ? "0.55rem 1.2rem" : "0.9rem 2rem",
        borderRadius: 100, fontSize: small ? "0.82rem" : "0.95rem",
        fontWeight: 600, cursor: "pointer",
        transition: "all 0.2s", whiteSpace: "nowrap",
      }}
    >{children}</button>
  );
}

function Toast({ message, visible }) {
  return (
    <div style={{
      position: "fixed", bottom: "2rem", left: "50%",
      transform: `translateX(-50%) translateY(${visible ? "0" : "80px"})`,
      opacity: visible ? 1 : 0,
      background: C.greenDark, color: C.cream,
      padding: "0.75rem 1.5rem", borderRadius: 100,
      fontSize: "0.88rem", fontWeight: 500,
      display: "flex", alignItems: "center", gap: "0.5rem",
      boxShadow: "0 6px 24px rgba(0,0,0,0.22)",
      zIndex: 600, pointerEvents: "none", whiteSpace: "nowrap",
      transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
    }}>
      <span style={{ background: C.lavender, color: C.greenDark, width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700 }}>✓</span>
      {message}
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav({ onAdminClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [clicks, setClicks]     = useState(0);
  const timerRef                = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function handleLogoClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const next = clicks + 1;
    setClicks(next);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setClicks(0), 4000);
    if (next >= 10) {
      setClicks(0);
      clearTimeout(timerRef.current);
      onAdminClick();
    }
  }

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 64, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 2.5rem",
      background: C.cream,
      borderBottom: `1.5px solid ${C.green}`,
      boxShadow: scrolled ? "0 2px 20px rgba(18,77,51,0.08)" : "none",
      transition: "box-shadow 0.3s",
    }}>
      {/* Left side: logo + brand name + nav links grouped together */}
      <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
        {/* Logo + brand — click 10 times within 4 seconds to open admin */}
        <button onClick={handleLogoClick} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <img src={logoImg} alt="Lagos Cocktail Lab" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <span style={{ fontFamily: "\'Fraunces\', Georgia, serif", fontSize: "1rem", fontWeight: 700, color: C.greenDark, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
            Lagos Cocktail Lab
          </span>
        </button>

        {/* Nav links, left-aligned next to brand */}
        <ul style={{ display: "flex", gap: "1.75rem", listStyle: "none", margin: 0, padding: 0 }}>
          {[["about", "About"], ["experience", "Experience"], ["gallery", "Gallery"]].map(([id, label]) => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 500, color: C.greenDark, letterSpacing: "0.05em", textTransform: "uppercase", transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = C.green}
                onMouseLeave={e => e.currentTarget.style.color = C.greenDark}
              >{label}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Empty right side keeps nav from collapsing */}
      <div />
    </nav>
  );
}


/* ─────────────────────────────────────────────
   TICKER
───────────────────────────────────────────── */
function Ticker() {
  const items = ["✦ Cocktail Making Experiences", "🍹 Hands-on Masterclasses", "🌿 House-Made Syrups", "🎉 Private & Group Sessions", "🌺 Hibiscus · Tamarind · Passion Fruit", "✦ Elevating Cocktail Experiences"];
  const text = [...items, ...items].join("   ·   ");
  return (
    <div style={{ background: C.greenDark, color: C.lavender, fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.04em", overflow: "hidden", height: 32, display: "flex", alignItems: "center" }}>
      <div style={{ display: "inline-block", whiteSpace: "nowrap", animation: "marqueeTicker 28s linear infinite" }}>{text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <section style={{ width: "100%", minHeight: "calc(100vh - 96px)", background: C.cream, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      {/* blob */}
      <div style={{ position: "absolute", right: "-8vw", top: "50%", width: "52vw", height: "88vh", borderRadius: "50%", background: C.lavenderLight, opacity: 0.5, pointerEvents: "none", animation: "floatBlob 9s ease-in-out infinite" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 2.5rem", position: "relative", zIndex: 2, width: "100%" }}>
                <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 900, lineHeight: 1.0, color: C.greenDark, maxWidth: 700, marginBottom: "1.5rem", animation: "fadeUp 0.7s ease 0.2s both" }}>
          Lagos Cocktail Lab:<br />
          <em style={{ fontStyle: "italic", color: C.greenLight }}>Elevating Cocktail<br />Experiences.</em>
        </h1>

        <p style={{ fontSize: "1.1rem", color: C.muted, lineHeight: 1.8, maxWidth: 500, marginBottom: "2.5rem", animation: "fadeUp 0.7s ease 0.35s both" }}>
          We bring people together around the art of cocktail making. Learn the craft, experiment with ingredients, and walk away with skills, and drinks, that are truly yours.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.5s both" }}>
          <Btn onClick={() => scrollTo("events")}>View upcoming events</Btn>
          <Btn onClick={() => scrollTo("about")} outline>About us</Btn>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────── */
function About() {
  const ref = useReveal();
  return (
    <section id="about" style={{ width: "100%", background: C.greenDark, padding: "7rem 2.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          {/* Left */}
          <div>
            <span style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", padding: "0.35rem 1rem", borderRadius: 100, background: "rgba(196,181,244,0.2)", color: C.lavender, marginBottom: "1.25rem" }}>Who we are</span>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.1, color: C.cream, marginBottom: "1.5rem" }}>
              Experimenting with<br />
              <em style={{ fontStyle: "italic", color: C.lavender }}>different ingredients.</em>
            </h2>
            <p style={{ color: "rgba(245,240,232,0.75)", fontSize: "1rem", lineHeight: 1.85 }}>
              Lagos Cocktail Lab is a cocktail making experience. We run hands-on sessions where you don't just watch, you make, taste, adjust, and make again. The goal isn't a perfect cocktail. It's understanding why it works and how to make the perfect drink for yourself with friends and new faces.
            </p>
          </div>

          {/* Right, value cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { emoji: "🍹", title: "Hands-on from the start", desc: "You're behind the bar from minute one, shaking and stirring your own drinks." },
              { emoji: "🌿", title: "Experiment freely", desc: "We give you the framework, you make the decisions. Swap an ingredient, adjust the ratio, make it yours." },
              { emoji: "🎯", title: "Learn something real", desc: "You'll leave every session understanding flavour balance, technique, and how to recreate it at home." },
            ].map((item, i) => {
              const r = useReveal();
              return (
                <div key={i} ref={r} className="reveal" style={{ transitionDelay: `${i * 0.12}s`, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "1.4rem 1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", fontWeight: 700, color: C.cream, marginBottom: "0.3rem" }}>{item.title}</div>
                    <div style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.62)", lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EXPERIENCE SECTION
───────────────────────────────────────────── */
function Experience() {
  const ref = useReveal();
  return (
    <section id="experience" style={{ width: "100%", background: C.cream, padding: "7rem 2.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", padding: "0.35rem 1rem", borderRadius: 100, background: C.lavender, color: C.greenDark, marginBottom: "1rem" }}>What to expect</span>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: C.greenDark, lineHeight: 1.1, marginBottom: "0.75rem" }}>
            What a session looks like
          </h2>
          <p style={{ color: C.muted, fontSize: "1rem", lineHeight: 1.75, maxWidth: 500, margin: "0 auto" }}>
            Every LCL session is designed to be relaxed, social, and genuinely educational. Here's what you can expect.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {[
            { num: "01", title: "Welcome & intro", desc: "You'll get a quick rundown of the session, what we're making, and why those ingredients work together." },
            { num: "02", title: "Learn the technique", desc: "We walk through the method, shaking, stirring, muddling, whatever the recipe calls for, and you follow along hands-on." },
            { num: "03", title: "Make your first version", desc: "You build the cocktail yourself, using the exact ratios. Taste it. See how it hits." },
            { num: "04", title: "Experiment & adjust", desc: "Now you play. More citrus? Different syrup? We give you the tools to riff on the base recipe and find your version." },
          ].map((step, i) => {
            const r = useReveal();
            return (
              <div key={i} ref={r} className="reveal" style={{ transitionDelay: `${i * 0.1}s`, background: "white", border: "1.5px solid #E0D9CC", borderRadius: 20, padding: "2rem 1.75rem", transition: "transform 0.25s, box-shadow 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(27,107,69,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "2.5rem", fontWeight: 900, color: C.lavender, lineHeight: 1, marginBottom: "1rem" }}>{step.num}</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", fontWeight: 700, color: C.greenDark, marginBottom: "0.6rem" }}>{step.title}</div>
                <div style={{ fontSize: "0.88rem", color: C.muted, lineHeight: 1.7 }}>{step.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Who it's for strip */}
        <div ref={useReveal()} className="reveal" style={{ marginTop: "4rem", background: C.lavenderLight, borderRadius: 24, padding: "2.5rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", fontWeight: 700, color: C.greenDark, marginBottom: "0.5rem" }}>Who is this for?</div>
            <p style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 480 }}>
              Anyone. Absolute beginners, people who've been making drinks at home for years, groups of friends looking for something different on a Friday, couples wanting a shared experience, teams that are done with pub quizzes. If you're curious, you'll fit in.
            </p>
          </div>
          <Btn onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}>See upcoming sessions</Btn>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EVENTS SECTION
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   GALLERY SECTION
   Portrait-first Instagram-style reel layout
───────────────────────────────────────────── */
function Gallery() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touching, setTouching] = useState(null); // touch start X
  const timerRef = useRef(null);
  const ref = useReveal();

  const images = GALLERY_IMAGES;
  const hasImages = images.length > 0;

  function startTimer() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4500);
  }

  useEffect(() => {
    if (hasImages && isPlaying && images.length > 1) startTimer();
    return () => clearInterval(timerRef.current);
  }, [isPlaying, hasImages, images.length]);

  function goTo(idx) {
    setCurrent(idx);
    if (isPlaying) startTimer();
  }
  function prev() { goTo((current - 1 + images.length) % images.length); }
  function next() { goTo((current + 1) % images.length); }

  // Swipe support
  function onTouchStart(e) { setTouching(e.touches[0].clientX); }
  function onTouchEnd(e) {
    if (touching === null) return;
    const diff = touching - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
    setTouching(null);
  }

  return (
    <section id="gallery" style={{ width: "100%", background: C.greenDark, padding: "7rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" }}>
        {/* Header */}
        <div ref={ref} className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", padding: "0.35rem 1rem", borderRadius: 100, background: "rgba(196,181,244,0.2)", color: C.lavender, marginBottom: "1rem" }}>
            Past Events
          </span>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: C.cream, lineHeight: 1.1, marginBottom: "0.75rem" }}>
            Nights at the lab.
          </h2>
          <p style={{ color: "rgba(245,240,232,0.65)", fontSize: "1rem", lineHeight: 1.75, maxWidth: 420, margin: "0 auto" }}>
            A look at what happens when people show up curious and leave with a drink they actually made.
          </p>
        </div>
      </div>

      {!hasImages ? (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "2px dashed rgba(196,181,244,0.3)", borderRadius: 24, padding: "4rem 2rem", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📸</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1.2rem", fontWeight: 700, color: C.cream, marginBottom: "0.6rem" }}>Photos coming soon</div>
            <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Add your event photos to <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.1rem 0.4rem", borderRadius: 4, fontSize: "0.82rem" }}>src/assets/gallery/</code> and import them at the top of App.jsx.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* ── Full-width reel viewer ── */}
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}
          >
            {/* Prev arrow */}
            {images.length > 1 && (
              <button onClick={prev}
                style={{ flexShrink: 0, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", color: C.cream, fontSize: "1.4rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", zIndex: 2 }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              >‹</button>
            )}

            {/* Portrait card — centred, fixed width */}
            <div style={{
              position: "relative",
              width: "min(420px, 88vw)",
              aspectRatio: "4/5",
              borderRadius: 20,
              overflow: "hidden",
              background: "#111",
              boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
              flexShrink: 0,
            }}>
              <img
                key={current}
                src={images[current]}
                alt={`Event photo ${current + 1}`}
                className="gallery-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",   /* show full image, no cropping */
                  objectPosition: "center",
                  display: "block",
                  background: "#111",
                }}
              />
              {/* Counter badge */}
              <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "0.25rem 0.7rem", borderRadius: 100, backdropFilter: "blur(4px)" }}>
                {current + 1} / {images.length}
              </div>
            </div>

            {/* Next arrow */}
            {images.length > 1 && (
              <button onClick={next}
                style={{ flexShrink: 0, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", color: C.cream, fontSize: "1.4rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", zIndex: 2 }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              >›</button>
            )}
          </div>

          {/* ── Dots + play/pause ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginTop: "1.75rem", padding: "0 2.5rem" }}>
            {images.length > 1 && (
              <button onClick={() => setIsPlaying(p => !p)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.45)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.15s", flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = C.cream}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.45)"}
              >{isPlaying ? "⏸ Pause" : "▶ Play"}</button>
            )}
            <div style={{ display: "flex", gap: "0.45rem", alignItems: "center" }}>
              {images.map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  style={{ width: i === current ? 22 : 7, height: 7, borderRadius: 100, background: i === current ? C.lavender : "rgba(245,240,232,0.25)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }}
                />
              ))}
            </div>
          </div>

          {/* ── Thumbnail strip (when 3+ images) ── */}
          {images.length >= 3 && (
            <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.5rem", overflowX: "auto", padding: "0 2.5rem 0.5rem", justifyContent: "center" }}>
              {images.map((img, i) => (
                <button key={i} onClick={() => goTo(i)}
                  style={{ flexShrink: 0, width: 64, height: 80, borderRadius: 10, overflow: "hidden", border: i === current ? `2.5px solid ${C.lavender}` : "2.5px solid transparent", cursor: "pointer", padding: 0, transition: "all 0.2s", opacity: i === current ? 1 : 0.5 }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

function Events({ events }) {
  const [ticketAdded, setTicketAdded] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: "" });

  function handleTicket(ev) {
    setTicketAdded(ev.id);
    setToast({ visible: true, message: `Ticket added: ${ev.title}` });
    setTimeout(() => setTicketAdded(null), 1500);
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  }

  const ref = useReveal();

  return (
    <section id="events" style={{ width: "100%", background: "#FFFDF9", padding: "7rem 2.5rem", borderTop: `1.5px solid #E0D9CC` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ marginBottom: "3.5rem" }}>
          <span style={{ display: "inline-block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", padding: "0.35rem 1rem", borderRadius: 100, background: C.lavender, color: C.greenDark, marginBottom: "1rem" }}>Event Calendar</span>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: C.greenDark, lineHeight: 1.1, marginBottom: "0.75rem" }}>Upcoming sessions</h2>
          <p style={{ color: C.muted, fontSize: "1rem", lineHeight: 1.75, maxWidth: 480 }}>
            All sessions are intimate and capped at a small number of guests so everyone gets proper attention. Book early.
          </p>
        </div>

        {events.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", background: "white", borderRadius: 20, border: "1.5px solid #E0D9CC" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗓️</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1.2rem", fontWeight: 700, color: C.greenDark, marginBottom: "0.5rem" }}>No upcoming events right now</div>
            <p style={{ color: C.muted, fontSize: "0.9rem" }}>Follow us on Instagram to hear about new dates first.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {events.map((ev, i) => {
              const r = useReveal();
              return (
                <div key={ev.id} ref={r} className="reveal" style={{ transitionDelay: `${i * 0.08}s`, background: "white", border: "1.5px solid #E0D9CC", borderRadius: 20, padding: "1.75rem 2rem", display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap", transition: "box-shadow 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 28px rgba(27,107,69,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                >
                  {/* Date block */}
                  <div style={{ background: C.greenDark, borderRadius: 14, padding: "0.85rem 1.1rem", textAlign: "center", minWidth: 64, flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1.6rem", fontWeight: 900, color: C.cream, lineHeight: 1 }}>{ev.date.day}</div>
                    <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", color: C.lavender, marginTop: "0.2rem" }}>{ev.date.month}</div>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <span style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 600, padding: "0.25rem 0.7rem", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.5rem", ...(ev.tagStyle || { background: C.greenDark, color: C.cream }) }}>{ev.tag}</span>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", fontWeight: 700, color: C.greenDark, marginBottom: "0.3rem" }}>{ev.title}</div>
                    <div style={{ fontSize: "0.83rem", color: C.muted }}>📍 {ev.location} &nbsp;·&nbsp; 🕓 {ev.time}</div>
                    {ev.spots > 0 && <div style={{ fontSize: "0.76rem", color: C.greenLight, fontWeight: 600, marginTop: "0.35rem" }}>Only {ev.spots} spots available</div>}
                  </div>

                  {/* CTA */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    {ev.price > 0 ? (
                      <>
                        <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1.3rem", fontWeight: 700, color: C.greenDark, marginBottom: "0.6rem" }}>
                          ₦{ev.price.toLocaleString()}
                          <span style={{ fontSize: "0.74rem", fontWeight: 400, color: C.muted, display: "block" }}>per person</span>
                        </div>
                        {ev.bookingUrl ? (
                          <a href={ev.bookingUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: C.green, color: C.cream, padding: "0.65rem 1.4rem", borderRadius: 100, fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", transition: "background 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = C.greenDark}
                            onMouseLeave={e => e.currentTarget.style.background = C.green}
                          >Book now</a>
                        ) : (
                          <a href="https://mail.google.com/mail/?view=cm&to=lagoscocktaillab@gmail.com&su=Booking%20Request" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: C.green, color: C.cream, padding: "0.65rem 1.4rem", borderRadius: 100, fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>Book now</a>
                        )}
                      </>
                    ) : (
                      <a href="https://mail.google.com/mail/?view=cm&to=lagoscocktaillab@gmail.com&su=Event%20Quote%20Request" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "transparent", color: C.greenDark, border: `1.5px solid ${C.green}`, padding: "0.65rem 1.4rem", borderRadius: 100, fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>Get a quote</a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: "2.5rem", background: C.lavenderLight, borderRadius: 16, padding: "1.25rem 2rem", textAlign: "center", border: `1px dashed ${C.lavender}` }}>
          <span style={{ fontSize: "0.88rem", color: C.greenDark }}>
            More sessions added regularly, follow <a href="https://instagram.com/lagoscocktaillab" style={{ color: C.green, fontWeight: 600 }}>@lagoscocktaillab</a> to stay in the loop.
          </span>
        </div>
      </div>
      <Toast visible={toast.visible} message={toast.message} />
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ width: "100%", background: C.greenDark, color: C.cream, padding: "4rem 2.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3rem", alignItems: "start" }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
            <img src={logoImg} alt="Lagos Cocktail Lab" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", fontWeight: 700, color: C.cream }}>Lagos Cocktail Lab</div>
          </div>
          <div style={{ fontSize: "0.78rem", color: "rgba(196,181,244,0.8)", marginBottom: "1rem", letterSpacing: "0.04em" }}>Elevating Cocktail Experiences</div>
          <p style={{ fontSize: "0.84rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.7 }}>A cocktail experience studio running hands-on masterclasses, tastings, and private events.</p>
        </div>

        {/* Links */}
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginBottom: "1rem" }}>Navigate</div>
          {[["about", "About"], ["experience", "Experience"], ["events", "Events & Booking"]].map(([id, label]) => (
            <div key={id} style={{ marginBottom: "0.6rem" }}>
              <button onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} style={{ background: "none", border: "none", color: "rgba(245,240,232,0.65)", cursor: "pointer", fontSize: "0.88rem", padding: 0, transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = C.cream}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.65)"}
              >{label}</button>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginBottom: "1rem" }}>Get in touch</div>
          <p style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.65)", marginBottom: "0.6rem" }}>
            <a href="mailto:lagoscocktaillab@gmail.com" style={{ color: C.lavender, textDecoration: "none" }}>lagoscocktaillab@gmail.com</a>
          </p>
          <p style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.65)", marginBottom: "0.6rem" }}>
            <a href="https://instagram.com/lagoscocktaillab" style={{ color: C.lavender, textDecoration: "none" }}>@lagoscocktaillab</a>
          </p>
          <p style={{ fontSize: "0.84rem", color: "rgba(245,240,232,0.45)", marginTop: "1rem" }}>Lagos, Nigeria</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "2rem auto 0", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
        <p style={{ fontSize: "0.72rem", opacity: 0.3 }}>© 2025 Lagos Cocktail Lab. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   ADMIN PANEL
   Login: admin@lagoscocktaillab.com / LCL@admin2025
═══════════════════════════════════════════ */
const AD = { bg: "#F4F2EE", white: "#FFFFFF", border: "#E0D9CC", red: "#C0392B", redLight: "#FDECEA", sidebar: "#124D33" };

const iStyle = { padding: "0.6rem 0.85rem", borderRadius: 8, border: `1.5px solid ${AD.border}`, fontSize: "0.9rem", fontFamily: "'Syne',sans-serif", background: AD.white, color: "#1A1A1A", outline: "none", width: "100%", transition: "border-color 0.15s" };

function AInput({ value, onChange, type = "text", placeholder, min, step }) {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} min={min} step={step} style={iStyle} onFocus={e => e.target.style.borderColor = C.green} onBlur={e => e.target.style.borderColor = AD.border} />;
}
function ATextarea({ value, onChange, placeholder, rows = 3 }) {
  return <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{ ...iStyle, resize: "vertical", lineHeight: 1.6 }} onFocus={e => e.target.style.borderColor = C.green} onBlur={e => e.target.style.borderColor = AD.border} />;
}
function ASelect({ value, onChange, children }) {
  return <select value={value} onChange={onChange} style={{ ...iStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235A5A5A' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.8rem center", paddingRight: "2.2rem", cursor: "pointer" }} onFocus={e => e.target.style.borderColor = C.green} onBlur={e => e.target.style.borderColor = AD.border}>{children}</select>;
}

function AField({ label, required, children, hint }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <label style={{ fontSize: "0.74rem", fontWeight: 700, color: C.greenDark, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}{required && <span style={{ color: AD.red }}> *</span>}</label>
      {children}
      {hint && <span style={{ fontSize: "0.7rem", color: C.muted }}>{hint}</span>}
    </div>
  );
}

function ImgUploader({ current, onChange }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);
  function handle(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader(); r.onload = () => onChange(r.result); r.readAsDataURL(file);
  }
  return (
    <div>
      <div onClick={() => ref.current.click()} onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }} style={{ border: `2px dashed ${drag ? C.green : AD.border}`, borderRadius: 12, padding: "1.25rem", textAlign: "center", cursor: "pointer", background: drag ? "#EDF6F1" : C.cream, transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        {current ? <img src={current} alt="" style={{ maxHeight: 110, maxWidth: "100%", borderRadius: 8, objectFit: "contain" }} /> : <><div style={{ fontSize: "2rem" }}>🖼️</div><div style={{ fontSize: "0.8rem", color: C.muted }}>Click or drag & drop an image</div></>}
        {current && <div style={{ fontSize: "0.74rem", color: C.greenLight, fontWeight: 600 }}>Click to replace</div>}
      </div>
      {current && <button type="button" onClick={() => onChange("")} style={{ marginTop: "0.4rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.74rem", color: AD.red }}>Remove image</button>}
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handle(e.target.files[0])} />
    </div>
  );
}

function AModal({ title, onClose, children }) {
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 800 }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(700px,95vw)", maxHeight: "90vh", overflowY: "auto", background: AD.white, borderRadius: 20, boxShadow: "0 24px 64px rgba(0,0,0,0.2)", zIndex: 900, animation: "fadeUp 0.22s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: `1.5px solid ${AD.border}`, position: "sticky", top: 0, background: AD.white, zIndex: 1 }}>
          <span style={{ fontFamily: "'Fraunces',serif", fontSize: "1.1rem", fontWeight: 700, color: C.greenDark }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: C.muted }}>×</button>
        </div>
        <div style={{ padding: "1.5rem" }}>{children}</div>
      </div>
    </>
  );
}

function AConfirm({ message, onConfirm, onCancel }) {
  return (
    <AModal title="Confirm delete" onClose={onCancel}>
      <p style={{ fontSize: "0.95rem", color: C.muted, marginBottom: "1.5rem", lineHeight: 1.7 }}>{message}</p>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
        <button onClick={onCancel} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "0.88rem", color: C.muted, padding: "0.55rem 1rem" }}>Cancel</button>
        <button onClick={onConfirm} style={{ background: AD.red, color: "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.2rem", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>Yes, delete</button>
      </div>
    </AModal>
  );
}

function AToast({ msg, visible }) {
  return <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", background: C.greenDark, color: C.cream, padding: "0.75rem 1.25rem", borderRadius: 10, fontSize: "0.85rem", fontWeight: 500, boxShadow: "0 6px 20px rgba(0,0,0,0.2)", zIndex: 1000, pointerEvents: "none", transform: `translateY(${visible ? "0" : "60px"})`, opacity: visible ? 1 : 0, transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1),opacity 0.25s ease", display: "flex", alignItems: "center", gap: "0.5rem" }}><span>✓</span>{msg}</div>;
}

/* Event form */
const ETAGS = ["Masterclass", "Tasting", "Date Night", "Corporate", "Pop-up", "Other"];
const EE = { title: "", date: "", time: "", location: "", price: "", spots: "", tag: "Masterclass", img: "", bookingUrl: "" };

function dateToInput(d) {
  if (!d || !d.day) return "";
  const monthNums = { JAN:"01",FEB:"02",MAR:"03",APR:"04",MAY:"05",JUN:"06",JUL:"07",AUG:"08",SEP:"09",OCT:"10",NOV:"11",DEC:"12" };
  return `2025-${monthNums[d.month] || "06"}-${d.day.padStart(2, "0")}`;
}

function inputToDate(str) {
  if (!str) return { day: "", month: "" };
  const d = new Date(str + "T00:00:00");
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return { day: String(d.getDate()).padStart(2, "0"), month: months[d.getMonth()] };
}

function tagStyle(tag) {
  if (tag === "Date Night") return { background: C.lavender, color: C.greenDark };
  if (tag === "Corporate")  return { background: "#D6EBE0", color: C.greenDark };
  if (tag === "Tasting")    return { background: C.green, color: C.cream };
  return { background: C.greenDark, color: C.cream };
}

function EventForm({ initial, onSave, onClose }) {
  const [f, setF] = useState(initial
    ? { ...initial, date: dateToInput(initial.date), price: initial.price || "", spots: initial.spots || "", bookingUrl: initial.bookingUrl || "" }
    : EE
  );
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));

  function save() {
    if (!f.title.trim() || !f.date) return;
    onSave({
      ...f,
      id: f.id || Date.now(),
      price: Number(f.price) || 0,
      spots: Number(f.spots) || 0,
      date: inputToDate(f.date),
      tagStyle: tagStyle(f.tag),
    });
    onClose();
  }

  return (
    <AModal title={initial ? "Edit Event" : "Add New Event"} onClose={onClose}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ gridColumn: "1/-1" }}>
          <AField label="Event title" required><AInput value={f.title} onChange={e => s("title", e.target.value)} placeholder="e.g. Tropical Masterclass" /></AField>
        </div>
        <AField label="Date" required><AInput value={f.date} onChange={e => s("date", e.target.value)} type="date" /></AField>
        <AField label="Time"><AInput value={f.time} onChange={e => s("time", e.target.value)} placeholder="4:00 PM, 7:00 PM" /></AField>
        <div style={{ gridColumn: "1/-1" }}>
          <AField label="Location"><AInput value={f.location} onChange={e => s("location", e.target.value)} placeholder="Victoria Island, Lagos" /></AField>
        </div>
        <AField label="Ticket price (₦)" hint="Leave 0 for 'Get a quote'"><AInput value={f.price} onChange={e => s("price", e.target.value)} type="number" min="0" step="500" placeholder="25000" /></AField>
        <AField label="Spots available" hint="Leave 0 for unlimited"><AInput value={f.spots} onChange={e => s("spots", e.target.value)} type="number" min="0" placeholder="12" /></AField>
        <AField label="Event type">
          <ASelect value={f.tag} onChange={e => s("tag", e.target.value)}>
            {ETAGS.map(t => <option key={t}>{t}</option>)}
          </ASelect>
        </AField>
        <div style={{ gridColumn: "1/-1" }}>
          <AField label="Booking link" hint="Paste a link (e.g. Eventbrite, Paystack, Google Form). If left empty, Book now sends an email instead.">
            <AInput value={f.bookingUrl} onChange={e => s("bookingUrl", e.target.value)} placeholder="https://..." />
          </AField>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <AField label="Event image (optional)"><ImgUploader current={f.img} onChange={v => s("img", v)} /></AField>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: `1px solid ${AD.border}` }}>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.88rem", color: C.muted, padding: "0.55rem 1rem" }}>Cancel</button>
        <button onClick={save} disabled={!f.title.trim() || !f.date} style={{ background: !f.title.trim() || !f.date ? C.muted : C.green, color: "#fff", border: "none", borderRadius: 8, padding: "0.65rem 1.4rem", fontSize: "0.88rem", fontWeight: 700, cursor: !f.title.trim() || !f.date ? "not-allowed" : "pointer", fontFamily: "'Syne',sans-serif" }}>
          {initial ? "Save changes" : "Add event"}
        </button>
      </div>
    </AModal>
  );
}

/* Admin login */
function AdminLogin({ onLogin, adminPassword }) {
  const [email, setEmail]   = useState("");
  const [pw, setPw]         = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr]       = useState("");
  const [loading, setLoading] = useState(false);

  function handleSignIn() {
    setErr("");
    if (!email.trim() || !pw) { setErr("Please enter your email and password."); return; }
    setLoading(true);
    setTimeout(() => {
      if (email.trim() === ADMIN_EMAIL && pw === adminPassword) {
        onLogin();
      } else {
        setErr("Incorrect email or password.");
        setLoading(false);
      }
    }, 500);
  }

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: AD.sidebar, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ position: "fixed", bottom: "-10vh", right: "-10vw", width: "50vw", height: "50vw", borderRadius: "50%", background: C.lavenderLight, opacity: 0.07, pointerEvents: "none" }} />
      <div style={{ background: AD.white, borderRadius: 24, padding: "2.5rem 2.25rem", width: "100%", maxWidth: 400, boxShadow: "0 32px 80px rgba(0,0,0,0.3)", animation: "fadeUp 0.4s ease" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.lavenderLight, border: `2px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 0.75rem" }}>🍸</div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.3rem", fontWeight: 700, color: C.greenDark }}>Admin Panel</div>
          <div style={{ fontSize: "0.78rem", color: C.muted, marginTop: "0.25rem" }}>Lagos Cocktail Lab</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AField label="Email" required>
            <AInput value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="admin@lagoscocktaillab.com" />
          </AField>
          <AField label="Password" required>
            <div style={{ position: "relative" }}>
              <AInput value={pw} onChange={e => setPw(e.target.value)} type={showPw ? "text" : "password"} placeholder="Enter password" />
              <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", color: C.muted }}>{showPw ? "Hide" : "Show"}</button>
            </div>
          </AField>
          {err && <div style={{ background: AD.redLight, color: AD.red, padding: "0.65rem 0.9rem", borderRadius: 8, fontSize: "0.84rem", fontWeight: 500 }}>⚠ {err}</div>}
          <button onClick={handleSignIn} disabled={loading} style={{ background: loading ? C.muted : C.green, color: "#fff", border: "none", borderRadius: 8, padding: "0.8rem", fontSize: "0.95rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Syne',sans-serif", width: "100%", transition: "background 0.2s" }}>
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </div>

      </div>
    </div>
  );
}

/* Admin dashboard */
function AdminDashboard({ events, setEvents, goBack, onLogout, adminPassword, setAdminPassword }) {
  const [modal, setModal]       = useState(null);
  const [confirm, setConfirm]   = useState(null);
  const [toast, setToast]       = useState({ visible: false, msg: "" });
  const [view, setView]         = useState("events"); // "events" | "settings"
  // Change password state
  const [pwForm, setPwForm]     = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError]   = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  function showToast(msg) { setToast({ visible: true, msg }); setTimeout(() => setToast({ visible: false, msg: "" }), 2500); }

  function saveEvent(ev) {
    setEvents(prev => prev.find(e => e.id === ev.id) ? prev.map(e => e.id === ev.id ? ev : e) : [...prev, ev]);
    showToast(ev.title + " saved ✓");
  }
  function deleteEvent(id) {
    setEvents(prev => prev.filter(e => e.id !== id));
    showToast("Event deleted");
  }

  const thS = { padding: "0.65rem 1rem", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", background: "#FAFAF8", whiteSpace: "nowrap" };
  const tdS = { padding: "0.85rem 1rem", verticalAlign: "middle" };

  return (
    <div style={{ minHeight: "100vh", background: AD.bg, fontFamily: "'Syne',sans-serif", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: 210, background: AD.sidebar, display: "flex", flexDirection: "column", flexShrink: 0, position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 10 }}>
        <div style={{ padding: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.lavenderLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🍸</div>
            <div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: "0.82rem", fontWeight: 700, color: C.cream, lineHeight: 1.2 }}>Lagos Cocktail Lab</div>
              <div style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.45)", marginTop: "0.1rem" }}>Admin Panel</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <button onClick={() => setView("events")} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.6rem 0.75rem", borderRadius: 8, background: view==="events" ? "rgba(255,255,255,0.1)" : "transparent", border: view==="events" ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent", color: view==="events" ? C.cream : "rgba(245,240,232,0.55)", fontSize: "0.84rem", fontWeight: view==="events" ? 600 : 400, cursor: "pointer", width: "100%", textAlign: "left", transition: "all 0.15s" }}>
            <span>🗓️</span><span style={{ flex: 1 }}>Events</span>
            <span style={{ background: "rgba(255,255,255,0.12)", color: "rgba(245,240,232,0.7)", fontSize: "0.68rem", fontWeight: 700, padding: "0.1rem 0.45rem", borderRadius: 100 }}>{events.length}</span>
          </button>
          <button onClick={() => { setView("settings"); setPwForm({ current: "", next: "", confirm: "" }); setPwError(""); setPwSuccess(false); }} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.6rem 0.75rem", borderRadius: 8, background: view==="settings" ? "rgba(255,255,255,0.1)" : "transparent", border: view==="settings" ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent", color: view==="settings" ? C.cream : "rgba(245,240,232,0.55)", fontSize: "0.84rem", fontWeight: view==="settings" ? 600 : 400, cursor: "pointer", width: "100%", textAlign: "left", transition: "all 0.15s" }}>
            <span>⚙️</span><span>Settings</span>
          </button>
        </nav>
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <button onClick={goBack} style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.55)", fontSize: "0.8rem", textAlign: "left", padding: "0.45rem 0.5rem", borderRadius: 6, transition: "color 0.15s" }} onMouseEnter={e => e.currentTarget.style.color = C.cream} onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.55)"}>← Back to site</button>
          <button onClick={onLogout} style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.55)", fontSize: "0.8rem", textAlign: "left", padding: "0.45rem 0.5rem", borderRadius: 6, transition: "color 0.15s" }} onMouseEnter={e => e.currentTarget.style.color = C.cream} onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.55)"}>↩ Sign out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: 210, flex: 1 }}>
        {/* Top bar */}
        <div style={{ background: AD.white, borderBottom: `1px solid ${AD.border}`, padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 5 }}>
          <div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.1rem", fontWeight: 700, color: C.greenDark }}>{view === "settings" ? "Settings" : "Event Calendar"}</div>
            <div style={{ fontSize: "0.74rem", color: C.muted, marginTop: "0.1rem" }}>{view === "settings" ? "Manage your account" : "Add, edit or remove upcoming sessions"}</div>
          </div>
          {view === "events" && (
            <button onClick={() => setModal({ item: null })} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.25rem", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", fontFamily: "'Syne',sans-serif", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = C.greenDark} onMouseLeave={e => e.currentTarget.style.background = C.green}>
              + Add Event
            </button>
          )}
        </div>

        {/* Settings view */}
        {view === "settings" && (
          <div style={{ padding: "2rem", maxWidth: 480 }}>
            <div style={{ background: AD.white, borderRadius: 16, border: `1.5px solid ${AD.border}`, padding: "2rem" }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem", fontWeight: 700, color: C.greenDark, marginBottom: "0.4rem" }}>Change Password</div>
              <p style={{ fontSize: "0.82rem", color: C.muted, marginBottom: "1.5rem", lineHeight: 1.6 }}>Update your admin password. You will need to use the new password next time you log in.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <AField label="Current password" required>
                  <AInput value={pwForm.current} onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))} type="password" placeholder="Enter current password" />
                </AField>
                <AField label="New password" required>
                  <AInput value={pwForm.next} onChange={e => setPwForm(p => ({ ...p, next: e.target.value }))} type="password" placeholder="Enter new password" />
                </AField>
                <AField label="Confirm new password" required>
                  <AInput value={pwForm.confirm} onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))} type="password" placeholder="Repeat new password" />
                </AField>
                {pwError && <div style={{ background: "#FDECEA", color: "#C0392B", padding: "0.65rem 0.9rem", borderRadius: 8, fontSize: "0.84rem", fontWeight: 500 }}>⚠ {pwError}</div>}
                {pwSuccess && <div style={{ background: "#D6EBE0", color: C.greenDark, padding: "0.65rem 0.9rem", borderRadius: 8, fontSize: "0.84rem", fontWeight: 600 }}>✓ Password updated successfully</div>}
                <button
                  onClick={() => {
                    setPwError(""); setPwSuccess(false);
                    if (!pwForm.current || !pwForm.next || !pwForm.confirm) { setPwError("Please fill in all fields."); return; }
                    if (pwForm.current !== adminPassword) { setPwError("Current password is incorrect."); return; }
                    if (pwForm.next.length < 6) { setPwError("New password must be at least 6 characters."); return; }
                    if (pwForm.next !== pwForm.confirm) { setPwError("New passwords do not match."); return; }
                    setAdminPassword(pwForm.next);
                    setPwSuccess(true);
                    setPwForm({ current: "", next: "", confirm: "" });
                  }}
                  style={{ background: C.green, color: "#fff", border: "none", borderRadius: 8, padding: "0.75rem", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", fontFamily: "'Syne',sans-serif", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.greenDark}
                  onMouseLeave={e => e.currentTarget.style.background = C.green}
                >Update password</button>
              </div>
            </div>
          </div>
        )}

        {/* Events view */}
        {view === "events" && (
        <div style={{ flex: 1 }}>

        {/* Stats */}
        <div style={{ padding: "1.5rem 2rem 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { icon: "🗓️", label: "Total Events",    value: events.length },
            { icon: "🎟️", label: "Ticketed",        value: events.filter(e => e.price > 0).length },
            { icon: "👥", label: "Total Spots",     value: events.reduce((s, e) => s + (e.spots || 0), 0) || "∞" },
            { icon: "💰", label: "Avg Ticket",      value: events.filter(e=>e.price>0).length ? `₦${Math.round(events.filter(e=>e.price>0).reduce((s,e)=>s+e.price,0)/events.filter(e=>e.price>0).length).toLocaleString()}` : "" },
          ].map(sc => (
            <div key={sc.label} style={{ background: AD.white, borderRadius: 14, border: `1.5px solid ${AD.border}`, padding: "1.1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: C.lavenderLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{sc.icon}</div>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 700, fontFamily: "'Fraunces',serif", color: C.greenDark, lineHeight: 1 }}>{sc.value}</div>
                <div style={{ fontSize: "0.72rem", fontWeight: 600, color: C.muted, marginTop: "0.15rem" }}>{sc.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ padding: "0 2rem 3rem" }}>
          <div style={{ background: AD.white, borderRadius: 16, border: `1.5px solid ${AD.border}`, overflow: "hidden" }}>
            {events.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 2rem", color: C.muted }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🗓️</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.1rem", color: C.greenDark, marginBottom: "0.5rem" }}>No events yet</div>
                <p style={{ fontSize: "0.88rem" }}>Click "+ Add Event" to create your first session.</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ borderBottom: `1.5px solid ${AD.border}` }}>
                      {["Date", "Title", "Location", "Time", "Price", "Spots", "Type", "Actions"].map(h => <th key={h} style={thS}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev, i) => (
                      <tr key={ev.id} style={{ borderBottom: `1px solid ${AD.border}`, background: i % 2 === 1 ? "#FDFCFA" : AD.white }}>
                        <td style={{ ...tdS, whiteSpace: "nowrap" }}>
                          <div style={{ background: C.greenDark, borderRadius: 10, padding: "0.4rem 0.7rem", display: "inline-block", textAlign: "center" }}>
                            <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.1rem", fontWeight: 900, color: C.cream, lineHeight: 1 }}>{ev.date.day}</div>
                            <div style={{ fontSize: "0.6rem", color: C.lavender, letterSpacing: "0.08em" }}>{ev.date.month}</div>
                          </div>
                        </td>
                        <td style={tdS}><div style={{ fontWeight: 600, color: C.greenDark, maxWidth: 220 }}>{ev.title}</div></td>
                        <td style={{ ...tdS, color: C.muted, whiteSpace: "nowrap" }}>{ev.location}</td>
                        <td style={{ ...tdS, color: C.muted, whiteSpace: "nowrap" }}>{ev.time}</td>
                        <td style={{ ...tdS, whiteSpace: "nowrap" }}>{ev.price > 0 ? <strong>₦{ev.price.toLocaleString()}</strong> : <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 100, background: "#FFF3CD", color: "#856404" }}>Quote</span>}</td>
                        <td style={{ ...tdS, color: C.muted }}>{ev.spots > 0 ? ev.spots : "∞"}</td>
                        <td style={tdS}><span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 100, ...(ev.tagStyle || { background: C.greenDark, color: C.cream }) }}>{ev.tag}</span></td>
                        <td style={{ ...tdS, whiteSpace: "nowrap" }}>
                          <div style={{ display: "flex", gap: "0.4rem" }}>
                            <button onClick={() => setModal({ item: ev })} style={{ background: "transparent", color: C.green, border: `1.5px solid ${C.green}`, borderRadius: 6, padding: "0.35rem 0.8rem", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>Edit</button>
                            <button onClick={() => setConfirm(ev.id)} style={{ background: AD.red, color: "#fff", border: "none", borderRadius: 6, padding: "0.35rem 0.8rem", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        </div>
        )}
      </div>

      {modal && <EventForm initial={modal.item} onSave={saveEvent} onClose={() => setModal(null)} />}
      {confirm && <AConfirm message={`Delete "${events.find(e=>e.id===confirm)?.title}"? This can't be undone.`} onConfirm={() => { deleteEvent(confirm); setConfirm(null); }} onCancel={() => setConfirm(null)} />}
      <AToast msg={toast.msg} visible={toast.visible} />
    </div>
  );
}

function AdminPanel({ events, setEvents, goBack }) {
  const [authed, setAuthed]             = useState(() => sessionStorage.getItem("lcl_admin") === "1");
  const [adminPassword, setAdminPassword] = useState(ADMIN_PASSWORD);
  function login()  { sessionStorage.setItem("lcl_admin", "1"); setAuthed(true); }
  function logout() { sessionStorage.removeItem("lcl_admin"); setAuthed(false); }
  return authed
    ? <AdminDashboard events={events} setEvents={setEvents} goBack={goBack} onLogout={logout} adminPassword={adminPassword} setAdminPassword={setAdminPassword} />
    : <AdminLogin onLogin={login} adminPassword={adminPassword} />;
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  injectGlobalCSS();

  const [page, setPage]     = useState("site"); // "site" | "admin"
  const [events, setEvents] = useState(DEFAULT_EVENTS);

  if (page === "admin") {
    return <AdminPanel events={events} setEvents={setEvents} goBack={() => setPage("site")} />;
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: C.cream, overflowX: "hidden" }}>
      <Nav onAdminClick={() => setPage("admin")} />
      <div style={{ paddingTop: 96 }}>
        <Ticker />
        <Hero />
        <About />
        <Experience />
        <Gallery />
        <Events events={events} />
      </div>
      <Footer />
    </div>
  );
}