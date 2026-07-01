import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactElement } from "react";
import { 
  Menu, X, MessageCircle, Play, Check, Heart, Sparkles, Music, Gift,
  Video, Calendar, Users, Palette, Wallet, Zap,
  RefreshCw, Send, Instagram, Facebook, ChevronDown, Star, Phone, MapPin,
  Settings,
} from "lucide-react";
import * as Icons from "lucide-react";
import logo from "@/assets/Sambutin-Header.png";
import heroImg from "@/assets/Sambutin-Hero-Picture.png";
import port1 from "@/assets/elegant-1.png";
import port2 from "@/assets/monochrome-1.png";
import port3 from "@/assets/doodle-1.png";
import port4 from "@/assets/flowy-1.png";
import port5 from "@/assets/jawa-1.png";
import { useContent, waLink, renderTitle, type SiteContent } from "@/lib/content-store";
import {
  LeafSprig, BotanicalSpray, ArtDecoDiamond, MonogramSwirl, RoseSilhouette,
  StarBurst, EnvelopeOrnate, WaxSeal, HourglassOrnate, QuoteOpen, QuestionOrnate,
  RingsDuo, DiamondTiny, FlourishDivider,
} from "@/components/ornaments";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sambutin.id — Undangan Digital Pernikahan Premium & Elegan" },
      { name: "description", content: "Sambutin.id membuat undangan digital pernikahan premium, elegan, dan interaktif. RSVP online, amplop digital, live streaming, dan gratis revisi sampai hari H." },
      { property: "og:title", content: "Sambutin.id — Undangan Digital Pernikahan Premium" },
      { property: "og:description", content: "Mengabadikan kisah cinta dalam undangan digital yang berkesan." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

const PORTFOLIO_IMAGES = [port1, port2, port3, port4, port5];
const KEUNGGULAN_META = [
  { icon: Send, span: "lg:col-span-2", tint: "bg-secondary/50" },
  { icon: Palette, tint: "bg-accent/50" },
  { icon: Sparkles, tint: "bg-cream" },
  { icon: Wallet, tint: "bg-secondary/40" },
  { icon: Zap, tint: "bg-accent/40" },
  { icon: RefreshCw, tint: "bg-cream" },
  { icon: Users, span: "lg:col-span-2", tint: "bg-primary text-primary-foreground" },
];
const FITUR_ICONS = [Users, Music, Heart, Gift, Video, Calendar];
const FITUR_ROTS = ["-2deg", "1.5deg", "-1.5deg", "2deg", "-2deg", "1.5deg"];
const TESTI_DECOR = [
  { Icon: RoseSilhouette, color: "bg-secondary/70", rot: "-3deg" },
  { Icon: RingsDuo,       color: "bg-accent/60",    rot: "2deg" },
  { Icon: BotanicalSpray, color: "bg-[oklch(0.9_0.05_60)]", rot: "-2deg" },
  { Icon: MonogramSwirl,  color: "bg-[oklch(0.9_0.04_140)]", rot: "3deg" },
];

function LandingPage() {
  const content = useContent();
  return (
    <div id="beranda" className="relative min-h-screen overflow-x-hidden">
      <Navbar content={content} />
      <main className="relative z-[1]">
        <Hero content={content} />
        <ScallopStrip />
        <Portfolio content={content} />
        <AddOn content={content} />
        <ScallopStrip flip />
        <Keunggulan content={content} />
        <Fitur content={content} />
        <ScallopStrip flip />
        <Process content={content} />
        <ScallopStrip />
        <Testimoni content={content} />
        <FAQ content={content} />
        <CTABanner content={content} />
        <Kontak content={content} />
      </main>
      <Footer content={content} />
      <FloatingWA content={content} />
    </div>
  );
}

/* ---------------- HERO SCENE DECOR (hero-only, absolute) ---------------- */
function HeroSceneDecor() {
  const items = [
    { top: "8%",  left: "3%",  size: 64, Icon: EnvelopeOrnate, r: -10, tint: "text-primary/55" },
    { top: "22%", right: "4%", size: 72, Icon: RoseSilhouette, r: 8,   tint: "text-primary/45" },
    { top: "46%", left: "2%",  size: 60, Icon: RingsDuo,       r: -6,  tint: "text-gold" },
    { top: "62%", right: "3%", size: 64, Icon: BotanicalSpray, r: 12,  tint: "text-primary/50" },
    { top: "80%", left: "5%",  size: 60, Icon: ArtDecoDiamond, r: -4,  tint: "text-gold/80" },
    { top: "90%", right: "6%", size: 64, Icon: MonogramSwirl,  r: 6,   tint: "text-primary/40" },
    { top: "34%", right: "12%", size: 40, Icon: StarBurst,     r: 6,   tint: "text-gold" },
    { top: "55%", left: "10%",  size: 44, Icon: LeafSprig,     r: -10, tint: "text-primary/50" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-secondary/25 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[480px] h-[480px] rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-secondary/20 blur-3xl" />
      {items.map((s, i) => {
        const Icon = s.Icon;
        return (
          <div
            key={i}
            className={`absolute drift ${s.tint}`}
            style={{
              top: s.top, left: (s as any).left, right: (s as any).right,
              ["--r" as any]: `${s.r}deg`,
              ["--dx" as any]: `${(i % 2 ? -1 : 1) * 10}px`,
              ["--dy" as any]: `${-8 - (i % 3) * 4}px`,
              animationDelay: `${i * 0.6}s`,
              transform: `rotate(${s.r}deg)`,
            }}
          >
            <Icon style={{ width: s.size, height: s.size }} />
          </div>
        );
      })}
      <div className="absolute top-[18%] left-[18%] w-24 h-24 doodle-circle spin-slow opacity-50" />
      <div className="absolute top-[70%] right-[20%] w-32 h-32 doodle-circle spin-slow opacity-40" style={{ animationDirection: "reverse" }} />
    </div>
  );
}

/* Subtle, unique per-section decor — premium SVG ornaments confined to each section */
type DecorItem = { top?: string; bottom?: string; left?: string; right?: string; size: number; Icon: (p: any) => ReactElement; r: number; tint: string };
function SectionDecor({ variant }: { variant: "keunggulan" | "fitur" | "portfolio" | "process" | "testimoni" | "faq" | "kontak" }) {
  const sets: Record<string, DecorItem[]> = {
    keunggulan: [
      { top: "6%",  right: "4%", size: 56, Icon: LeafSprig,      r: 8,  tint: "text-primary/35" },
      { bottom: "8%", left: "3%", size: 64, Icon: FlourishDivider, r: -4, tint: "text-gold/60" },
    ],
    fitur: [
      { top: "10%", left: "4%", size: 60, Icon: ArtDecoDiamond, r: -8, tint: "text-gold/55" },
      { bottom: "6%", right: "5%", size: 56, Icon: BotanicalSpray, r: 10, tint: "text-primary/35" },
    ],
    portfolio: [
      { top: "4%", left: "6%", size: 60, Icon: RoseSilhouette, r: -6, tint: "text-primary/35" },
      { bottom: "10%", right: "4%", size: 56, Icon: MonogramSwirl, r: 8, tint: "text-gold/60" },
    ],
    process: [
      { top: "8%", right: "6%", size: 56, Icon: HourglassOrnate, r: 6, tint: "text-primary/35" },
      { bottom: "6%", left: "5%", size: 60, Icon: ArtDecoDiamond, r: -8, tint: "text-gold/55" },
    ],
    testimoni: [
      { top: "6%", left: "4%", size: 64, Icon: QuoteOpen, r: -6, tint: "text-primary/30" },
      { bottom: "10%", right: "5%", size: 56, Icon: StarBurst, r: 8, tint: "text-gold/70" },
    ],
    faq: [
      { top: "8%", right: "5%", size: 56, Icon: QuestionOrnate, r: 6, tint: "text-primary/35" },
      { bottom: "8%", left: "5%", size: 60, Icon: FlourishDivider, r: -4, tint: "text-gold/55" },
    ],
    kontak: [
      { top: "10%", left: "4%", size: 64, Icon: EnvelopeOrnate, r: -8, tint: "text-primary/40" },
      { bottom: "8%", right: "5%", size: 56, Icon: WaxSeal, r: 8, tint: "text-primary/45" },
    ],
  };
  const items = sets[variant];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {items.map((s, i) => {
        const Icon = s.Icon;
        return (
          <div
            key={i}
            className={`absolute drift ${s.tint}`}
            style={{
              top: s.top, bottom: s.bottom, left: s.left, right: s.right,
              ["--r" as any]: `${s.r}deg`,
              ["--dx" as any]: `${(i % 2 ? -1 : 1) * 8}px`,
              ["--dy" as any]: `${-6 - (i % 3) * 3}px`,
              animationDelay: `${i * 0.7}s`,
              transform: `rotate(${s.r}deg)`,
            }}
          >
            <Icon style={{ width: s.size, height: s.size }} />
          </div>
        );
      })}
    </div>
  );
}

function ScallopStrip({ flip = false }: { flip?: boolean }) {
  return (
    <div className="relative z-[1]" aria-hidden>
      <div className={`scallop-edge ${flip ? "rotate-180" : ""}`} />
      <div className="h-6 bg-primary -mt-px" />
      <div className="bg-primary py-2 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap text-primary-foreground/70 font-script text-xl animate-drift">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>sambut.in</span> <DiamondTiny className="w-3 h-3 text-primary-foreground/70" /> <span>sambut.in</span> <DiamondTiny className="w-3 h-3 text-primary-foreground/70" /> <span>sambut.in</span> <DiamondTiny className="w-3 h-3 text-primary-foreground/70" />
            </span>
          ))}
        </div>
      </div>
      <div className={`scallop-edge ${flip ? "" : "rotate-180"}`} />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */
function Navbar({ content }: { content: SiteContent }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60 py-3" : "bg-transparent py-5"}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between gap-6">
        <a href="#beranda" className="flex items-center shrink-0">
          <img src={logo} alt={content.branding.siteName} className="h-12 sm:h-13 w-auto" />
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-foreground/75 hover:text-primary transition-colors relative group">
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={waLink(content)} target="_blank" rel="noreferrer" className="hidden sm:inline-flex btn-primary !px-5 !py-2.5 !text-xs">
            <MessageCircle size={15} /> Pesan Sekarang
          </a>
          <Link to="/admin" className="hidden" title="Admin Panel" aria-label="Admin Panel">
            <Settings size={15} />
          </Link>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="lg:hidden p-2 rounded-md text-primary">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border mt-3 px-5 py-5 space-y-3 fade-up">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2 font-serif text-lg text-foreground/80">{n.label}</a>
          ))}
          <a href={waLink(content)} target="_blank" rel="noreferrer" className="btn-primary w-full !text-xs mt-2">
            <MessageCircle size={15} /> Pesan via WhatsApp
          </a>
          <Link to="/admin" onClick={() => setOpen(false)} className="hidden">
            <Settings size={14} /> Admin Panel
          </Link>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ content }: { content: SiteContent }) {
  const h = content.hero;
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
      <HeroSceneDecor />
      <div className="pointer-events-none absolute inset-0 grid-paper opacity-70" />
      <div className="pointer-events-none absolute top-24 -left-20 w-72 h-72 rounded-full bg-secondary/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <RoseSilhouette className="absolute top-[18%] left-[42%] w-10 h-10 text-primary/40 wiggle" style={{ ["--r" as any]: "-12deg" }} />
        <StarBurst className="absolute top-[8%] right-[28%] w-8 h-8 text-gold drift" style={{ ["--r" as any]: "10deg" }} />
        <RingsDuo className="absolute bottom-[18%] left-[34%] w-12 h-8 text-primary/45 drift" style={{ ["--r" as any]: "8deg", animationDelay: ".8s" }} />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 lg:gap-16 items-center text-center">
        <div className="fade-up flex flex-col items-center">
          <span className="font-script text-primary text-2xl sm:text-3xl">{h.script}</span>
          <h1 className="mt-4 font-serif text-[2.6rem] sm:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight text-foreground">
            {renderTitle(h.title)}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">{h.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href={waLink(content)} target="_blank" rel="noreferrer" className="btn-primary">
              <MessageCircle size={18} /> {h.primaryCta}
            </a>
            <a href="#portfolio" className="btn-outline">
              <Play size={16} /> {h.secondaryCta}
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2.5 justify-center">
            {h.badges.map((b) => (
              <li key={b} className="chip">
                <Check size={14} className="text-primary" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden">
          <div className="absolute inset-6 doodle-circle spin-slow opacity-50" />
          <div className="absolute inset-0 rotate-2 overflow-hidden">
            <img src={heroImg} alt="Undangan digital" className="w-full h-full object-contain" />
          </div>
          <div className="absolute -top-6 -left-4 sm:-left-10 w-36 sm:w-44 polaroid -rotate-6 float-soft" style={{ ["--r" as any]: "-6deg" }}>
            <div className="aspect-square rounded-sm bg-secondary grid place-items-center text-primary/70"><RingsDuo className="w-20 h-14" /></div>
            <p className="font-script text-center text-lg text-primary mt-2">forever</p>
          </div>
          <div className="absolute bottom-6 -right-2 sm:-right-8 w-40 sm:w-48 polaroid rotate-6 float-soft" style={{ ["--r" as any]: "6deg", animationDelay: "1.2s" }}>
            <div className="aspect-square rounded-sm bg-accent grid place-items-center text-primary/70"><BotanicalSpray className="w-20 h-20" /></div>
            <p className="font-script text-center text-lg text-primary mt-2">our day</p>
          </div>
          <div className="absolute top-1/2 -right-4 sm:right-6 -translate-y-1/2 bg-primary text-primary-foreground rounded-full h-20 w-20 grid place-items-center text-center text-[10px] font-semibold rotate-12 shadow-lg">
            <span>SINCE<br/>2026<br/>PREMIUM</span>
          </div>
          <span className="absolute -top-3 right-12 tag-ribbon rotate-[-8deg]">just married!</span>
          <div className="absolute -bottom-4 left-6 sticker h-14 w-14 wiggle text-primary" style={{ ["--r" as any]: "-10deg" }}><WaxSeal className="w-9 h-9" /></div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- KEUNGGULAN ---------------- */
function Keunggulan({ content }: { content: SiteContent }) {
  const k = content.keunggulan;
  return (
    <section id="keunggulan" className="relative py-24 sm:py-32">
      <SectionDecor variant="keunggulan" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow={k.eyebrow} title={renderTitle(k.title)} subtitle={k.subtitle} />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {k.items.map((it, i) => {
            const meta = KEUNGGULAN_META[i] ?? KEUNGGULAN_META[KEUNGGULAN_META.length - 1];
            const Icon = meta.icon;
            const isDark = meta.tint.includes("bg-primary");
            return (
              <article key={i} className={`paper-card p-7 ${meta.span ?? ""} ${meta.tint} relative transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_oklch(0.36_0.13_18/0.35)]`}>
                <div className={`h-12 w-12 rounded-xl grid place-items-center ${isDark ? "bg-gold/30" : "bg-background"} mb-5`}>
                  <Icon size={22} className={isDark ? "text-primary-foreground" : "text-primary"} />
                </div>
                <h3 className="font-serif text-2xl mb-2">{it.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{it.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FITUR ---------------- */
function Fitur({ content }: { content: SiteContent }) {
  const f = content.fitur;
  return (
    <section id="fitur" className="relative py-24 sm:py-32 bg-secondary/25">
      <SectionDecor variant="fitur" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow={f.eyebrow} title={renderTitle(f.title)} subtitle={f.subtitle} />
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {f.items.map((it, i) => {
            const Icon = FITUR_ICONS[i % FITUR_ICONS.length];
            return (
              <div key={i} className="paper-card bg-card p-8 relative transition-transform duration-500 hover:rotate-0 hover:-translate-y-2"
                style={{ transform: `rotate(${FITUR_ROTS[i % FITUR_ROTS.length]})` }}>
                <span className="tape absolute" aria-hidden />
                <div className="h-14 w-14 rounded-full bg-secondary/70 grid place-items-center mb-5 ring-1 ring-primary/15">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-serif text-2xl mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
                <div className="mt-6 deco-divider" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PORTFOLIO ---------------- */
function Portfolio({ content }: { content: SiteContent }) {
  const p = content.portfolio;
  const [active, setActive] = useState(p.cats[0] ?? "Semua");
  const items = p.items.map((it, i) => ({ ...it, src: PORTFOLIO_IMAGES[i % PORTFOLIO_IMAGES.length] }));
  const filtered = active === (p.cats[0] ?? "Semua") ? items : items.filter((i) => i.cat === active);
  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <SectionDecor variant="portfolio" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow={p.eyebrow} title={renderTitle(p.title)} subtitle={p.subtitle} />
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {p.cats.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all ${active === c ? "bg-primary text-primary-foreground" : "bg-card text-foreground/70 hover:bg-secondary/60"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
          {filtered.map((it, i) => (
            <figure key={i} className="group relative paper-card overflow-hidden bg-card p-3 sm:p-4">
              <div className="relative overflow-hidden rounded-md bg-secondary/30 aspect-[3/4]">
                <img src={(it as any).image || it.src} alt={`Undangan ${it.title}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
              </div>
              <figcaption className="flex items-end justify-between gap-3 px-1 pt-4">
                <div>
                  <p className="font-serif text-xl leading-tight">{it.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{it.cat} · {it.date}</p>
                </div>
                <a
                  href={it.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-script text-primary text-xl"
                >
                  view ↗
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href={waLink(content, "Halo Sambutin.id, saya ingin melihat portfolio lengkap undangan digital.")} target="_blank" rel="noreferrer" className="btn-outline">
            {p.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ADD ON (paper ticket) ---------------- */
function AddOn({ content }: { content: SiteContent }) {
  const a = content.addon;
  return (
    <section id="addon" className="relative py-24 sm:py-32 bg-[oklch(0.78_0.05_25)]">
      <SectionDecor variant="portfolio" />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHead
          eyebrow={a.eyebrow}
          title={renderTitle(a.title)}
          subtitle={a.subtitle}
        />
        <div className="mt-14 mx-auto max-w-md ticket relative rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
          {/* Header */}
          <div className="px-8 sm:px-10 pt-10 pb-6 text-center">
            <h3 className="font-serif font-black text-[3.5rem] sm:text-[4.5rem] leading-none tracking-tight text-primary uppercase">
              {a.ticketLabel}
            </h3>
          </div>

          {/* Perforation */}
          <div className="relative" aria-hidden>
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[oklch(0.78_0.05_25)]" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[oklch(0.78_0.05_25)]" />
            <div className="mx-8 sm:mx-10 border-t border-dashed border-primary/40" />
          </div>

          {/* Items */}
          <ul className="px-8 sm:px-10 py-8 space-y-5 font-mono">
            {a.items.map((it, i) => (
              <li
                key={i}
                className="flex items-baseline gap-3 text-[13px] sm:text-sm uppercase tracking-[0.12em] text-primary/90"
              >
                <span className="shrink-0">{it.name}</span>
                <span
                  aria-hidden
                  className="flex-1 self-end border-b border-dotted border-primary/30 translate-y-[-4px]"
                />
                <span className="shrink-0 font-semibold text-primary">{it.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {a.note && (
          <p className="mt-8 text-center text-xs text-foreground/70 max-w-md mx-auto italic">
            {a.note}
          </p>
        )}

        <div className="mt-8 text-center">
          <a
            href={waLink(content, "Halo Sambutin.id, saya ingin tahu lebih lanjut tentang Add On undangan digital.")}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            <MessageCircle size={16} /> Konsultasi Sekarang
          </a>
        </div>
      </div>

      <style>{`
        .ticket{
          background: oklch(0.985 0.005 60);
          color: var(--primary);
          box-shadow: 0 30px 60px -20px oklch(0.30 0.10 20 / .45), 0 8px 20px -10px oklch(0.30 0.10 20 / .35);
          --scallop: radial-gradient(circle at 10px 6px, transparent 6px, #000 6.5px);
          -webkit-mask:
            radial-gradient(circle 7px at 10px 0, transparent 98%, #000 100%) top left/20px 8px repeat-x,
            radial-gradient(circle 7px at 10px 100%, transparent 98%, #000 100%) bottom left/20px 8px repeat-x,
            linear-gradient(#000, #000);
          -webkit-mask-composite: source-over;
          mask:
            radial-gradient(circle 7px at 10px 0, transparent 98%, #000 100%) top left/20px 8px repeat-x,
            radial-gradient(circle 7px at 10px 100%, transparent 98%, #000 100%) bottom left/20px 8px repeat-x,
            linear-gradient(#000, #000);
          padding-top: 8px;
          padding-bottom: 8px;
        }
      `}</style>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
function Process({ content }: { content: SiteContent }) {
  const p = content.process;
  return (
    <section className="relative py-24 sm:py-32 bg-accent/20">
      <SectionDecor variant="process" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow={p.eyebrow} title={renderTitle(p.title)} subtitle={p.subtitle} />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {p.steps.map((s) => (
            <div key={s.n} className="relative text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-background grid place-items-center font-serif text-3xl text-primary ring-1 ring-primary/20 shadow-[var(--shadow-soft)] relative z-10">{s.n}</div>
              <h3 className="mt-5 font-serif text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONI ---------------- */
function TestiCard({ it, i, decorIndex }: { it: { text: string; name: string; meta: string; image?: string }; i: number; decorIndex: number }) {
  const d = TESTI_DECOR[decorIndex % TESTI_DECOR.length];
  return (
    <article className="polaroid transition-transform duration-500 hover:-translate-y-2 hover:rotate-0"
      style={{ transform: `rotate(${d.rot})`, marginTop: i % 2 ? "2rem" : "0" }}>
      {it.image ? (
        <div className="aspect-[4/3] rounded-sm overflow-hidden bg-secondary/30">
          <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className={`aspect-[4/3] grid place-items-center rounded-sm ${d.color} text-primary/70`}>
          <d.Icon style={{ width: 96, height: 96 }} />
        </div>
      )}
      <div className="pt-4">
        <div className="flex gap-0.5 text-gold mb-2">
          {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={14} fill="currentColor" />)}
        </div>
        <p className="font-serif italic text-[15px] leading-snug text-foreground/85">&ldquo;{it.text}&rdquo;</p>
        <div className="mt-4 pt-3 border-t border-border/70">
          <p className="font-semibold text-sm">{it.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{it.meta}</p>
        </div>
      </div>
    </article>
  );
}

function Testimoni({ content }: { content: SiteContent }) {
  const t = content.testimoni;
  const items = t.items;
  const isCarousel = items.length > 4;
  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (!isCarousel) return;
    const id = setInterval(() => setPage((p) => (p + 1) % totalPages), 5000);
    return () => clearInterval(id);
  }, [isCarousel, totalPages]);
  const visible = isCarousel
    ? items.slice(page * pageSize, page * pageSize + pageSize)
    : items;
  return (
    <section id="testimoni" className="relative py-24 sm:py-32">
      <SectionDecor variant="testimoni" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow={t.eyebrow} title={renderTitle(t.title)} subtitle={t.subtitle} />
        <div key={page} className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 fade-up">
          {visible.map((it, i) => (
            <TestiCard key={`${page}-${i}`} it={it} i={i} decorIndex={isCarousel ? (page * pageSize + i) : i} />
          ))}
        </div>
        {isCarousel && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)} aria-label={`Halaman ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${i === page ? "w-8 bg-primary" : "w-2.5 bg-primary/30 hover:bg-primary/60"}`} />
            ))}
          </div>
        )}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {t.stats.map((s) => {
            const Icon =
              Icons[s.icon as keyof typeof Icons] ?? Icons.Star;

            return (
              <div
                key={s.label}
                className="chip !px-5 !py-3 text-sm"
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ---------------- FAQ ---------------- */
function FAQ({ content }: { content: SiteContent }) {
  const f = content.faq;
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-secondary/20">
      <SectionDecor variant="faq" />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHead eyebrow={f.eyebrow} title={renderTitle(f.title)} subtitle={f.subtitle} />
        <div className="mt-12 space-y-3">
          {f.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="paper-card bg-card overflow-hidden">
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6" aria-expanded={isOpen}>
                  <span className="font-serif text-lg sm:text-xl pr-2">{it.q}</span>
                  <ChevronDown size={20} className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                   <div className="px-5 sm:px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                      {Array.isArray(it.a) ? (
                        <ol className="list-decimal pl-5 space-y-2">
                          {it.a.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      ) : (
                        <div className="px-5 sm:px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                        {it.a.type === "list" ? (
                          <ol className="list-decimal pl-5 space-y-2">
                            {it.a.content.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        ) : (
                          <p className="whitespace-pre-line">
                            {it.a.content}
                          </p>
                        )}
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA BANNER ---------------- */
function CTABanner({ content }: { content: SiteContent }) {
  const c = content.cta;
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative paper-card overflow-hidden bg-primary text-primary-foreground px-8 sm:px-16 py-16 sm:py-24 text-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.78 0.09 80/0.6), transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.88 0.045 20/0.5), transparent 45%)" }} />
          <div className="absolute top-6 left-6 flex items-center gap-2 font-script text-3xl text-gold/80 rotate-[-6deg] pointer-events-none">with love <RoseSilhouette className="w-7 h-7" /></div>
          <div className="absolute bottom-6 right-6 bg-gold text-primary rounded-full h-20 w-20 grid place-items-center text-center text-[10px] font-bold rotate-12 pointer-events-none">
            <span>OFFICIAL<br/>STAMP<br/>2026</span>
          </div>
          <p className="font-script text-3xl text-gold">{c.script}</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-6xl leading-tight">
            {c.title.pre}{c.title.em && <em className="italic text-gold">{c.title.em}</em>}{c.title.post}
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-primary-foreground/85">{c.description}</p>
          <a href={waLink(content)} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-background text-primary font-semibold hover:bg-gold hover:text-primary transition-all">
            <MessageCircle size={18} /> {c.button}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- KONTAK ---------------- */
function Kontak({ content }: { content: SiteContent }) {
  const k = content.kontak;
  const [form, setForm] = useState({ name: "", phone: "", date: "", message: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Halo Sambutin.id, saya ingin konsultasi undangan digital.\n\n` +
      `Nama: ${form.name}\nNo. WhatsApp: ${form.phone}\nTanggal Acara: ${form.date}\n\nPesan:\n${form.message}`;
    window.open(waLink(content, text), "_blank");
  };
  return (
    <section id="kontak" className="relative py-24 sm:py-32 bg-accent/15">
      <SectionDecor variant="kontak" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHead align="left" eyebrow={k.eyebrow} title={renderTitle(k.title)} subtitle={k.subtitle} />
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3"><Phone size={18} className="text-primary" /> {k.phone}</li>
            <li className="flex items-center gap-3"><MessageCircle size={18} className="text-primary" /> {k.waNote}</li>
            <li className="flex items-center gap-3"><MapPin size={18} className="text-primary" /> {k.location}</li>
          </ul>
        </div>
        <form onSubmit={onSubmit} className="paper-card bg-card p-7 sm:p-10 space-y-5">
          <Field label="Nama Lengkap" required>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input" placeholder="Nama Anda" />
          </Field>
          <Field label="Nomor WhatsApp" required>
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="form-input" placeholder="08xxxxxxxxxx" />
          </Field>
          <Field label="Tanggal Pernikahan">
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="form-input" />
          </Field>
          <Field label="Pesan">
            <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="form-input resize-none" placeholder="Ceritakan kebutuhan undangan Anda..." />
          </Field>
          <button type="submit" className="btn-primary w-full">
            <MessageCircle size={18} /> Kirim via WhatsApp
          </button>
        </form>
      </div>
      <style>{`.form-input{width:100%;background:var(--background);border:1px solid var(--border);border-radius:.75rem;padding:.85rem 1rem;font-size:.9rem;outline:none;transition:border-color .2s,box-shadow .2s;}.form-input:focus{border-color:var(--primary);box-shadow:0 0 0 3px oklch(0.36 0.13 18 / .12);}`}</style>
    </section>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70 mb-2">
        {label}{required && <span className="text-primary"> *</span>}
      </span>
      {children}
    </label>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ content }: { content: SiteContent }) {
  const f = content.footer;
  return (
    <footer className="relative pt-20 pb-10 border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-3 gap-12">
        <div>
          <img src={logo} alt={content.branding.siteName} className="h-12 w-auto" />
          <p className="mt-5 text-sm text-muted-foreground max-w-xs leading-relaxed">{f.tagline}</p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Instagram, href: f.instagram },
              { Icon: Facebook, href: f.facebook },
              { Icon: MessageCircle, href: waLink(content) },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full grid place-items-center bg-background hover:bg-primary hover:text-primary-foreground border border-border transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-serif text-xl mb-4">Navigasi</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {content.nav.map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-primary">{n.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-xl mb-4">Hubungi Kami</h4>
          <p className="text-sm text-muted-foreground">WhatsApp: {f.waLabel}</p>
          <p className="text-sm text-muted-foreground mt-1">Email: {f.email}</p>
          <a href={waLink(content)} target="_blank" rel="noreferrer" className="btn-primary mt-5 !text-xs !px-5 !py-2.5">
            <MessageCircle size={14} /> Chat Sekarang
          </a>
        </div>
      </div>
      <div className="mt-14 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {content.branding.siteName} · Dibuat dengan <Heart size={12} className="inline text-primary" /> untuk pasangan istimewa.
      </div>
    </footer>
  );
}

/* ---------------- FLOATING WA ---------------- */
function FloatingWA({ content }: { content: SiteContent }) {
  return (
    <a href={waLink(content)} target="_blank" rel="noreferrer" aria-label="Chat via WhatsApp"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-[oklch(0.6_0.18_145)] text-white grid place-items-center shadow-xl pulse-ring hover:scale-110 transition-transform">
      <MessageCircle size={26} />
    </a>
  );
}

/* ---------------- SHARED ---------------- */
function SectionHead({ eyebrow, title, subtitle, align = "center" }: { eyebrow: string; title: React.ReactNode; subtitle?: string; align?: "center" | "left" }) {
  const a = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`${a} max-w-3xl`}>
      <p className="font-script text-2xl text-primary">— {eyebrow}</p>
      <h2 className="mt-2 font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight">{title}</h2>
      {subtitle && <p className="mt-5 text-base text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}
