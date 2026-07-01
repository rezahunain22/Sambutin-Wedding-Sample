import type { SVGProps } from "react";

/* Premium decorative SVG ornaments — all stroke=currentColor so they inherit text color.
   Use with className to set size/color, e.g. <LeafSprig className="w-12 h-12 text-primary/40" />. */

type P = SVGProps<SVGSVGElement>;

const base = "shrink-0";

export function LeafSprig(props: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className={base} {...props}>
      <path d="M32 6 Q32 34 32 58" />
      <path d="M32 16 Q20 18 14 12" /><path d="M32 16 Q44 18 50 12" />
      <path d="M32 26 Q18 30 10 24" /><path d="M32 26 Q46 30 54 24" />
      <path d="M32 36 Q20 40 12 36" /><path d="M32 36 Q44 40 52 36" />
      <path d="M32 46 Q22 50 16 48" /><path d="M32 46 Q42 50 48 48" />
    </svg>
  );
}

export function BotanicalSpray(props: P) {
  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" className={base} {...props}>
      <path d="M40 72 Q40 50 40 14" />
      <path d="M40 22 Q26 14 18 18 Q22 28 38 30" fill="currentColor" fillOpacity="0.08" />
      <path d="M40 22 Q54 14 62 18 Q58 28 42 30" fill="currentColor" fillOpacity="0.08" />
      <path d="M40 38 Q28 32 22 36 Q26 44 38 44" fill="currentColor" fillOpacity="0.06" />
      <path d="M40 38 Q52 32 58 36 Q54 44 42 44" fill="currentColor" fillOpacity="0.06" />
      <circle cx="40" cy="14" r="4" fill="currentColor" fillOpacity="0.15" />
      <circle cx="32" cy="54" r="2.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="48" cy="58" r="2" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export function ArtDecoDiamond(props: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={base} {...props}>
      <path d="M32 6 L54 32 L32 58 L10 32 Z" />
      <path d="M32 14 L46 32 L32 50 L18 32 Z" />
      <path d="M32 22 L40 32 L32 42 L24 32 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M2 32 H12" /><path d="M52 32 H62" />
    </svg>
  );
}

export function MonogramSwirl(props: P) {
  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" className={base} {...props}>
      <path d="M10 40 Q10 18 30 18 Q50 18 50 40 Q50 62 30 62 Q22 62 18 56" />
      <path d="M30 40 Q30 24 46 24 Q70 24 70 44 Q70 62 50 62 Q42 62 38 56" />
      <circle cx="10" cy="40" r="2.5" fill="currentColor" />
      <circle cx="70" cy="44" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function RoseSilhouette(props: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className={base} {...props}>
      <circle cx="32" cy="26" r="14" fill="currentColor" fillOpacity="0.08" />
      <path d="M32 14 Q24 20 24 28 Q24 36 32 38 Q40 36 40 28 Q40 20 32 14 Z" />
      <path d="M28 22 Q32 26 28 30" /><path d="M36 22 Q32 26 36 30" />
      <path d="M32 38 Q30 50 22 56" /><path d="M32 38 Q34 50 42 56" />
      <path d="M26 50 Q22 48 20 52" /><path d="M38 50 Q42 48 44 52" />
    </svg>
  );
}

export function StarBurst(props: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className={base} {...props}>
      <path d="M24 4 L24 18 M24 30 L24 44 M4 24 L18 24 M30 24 L44 24" />
      <path d="M10 10 L18 18 M30 30 L38 38 M38 10 L30 18 M18 30 L10 38" opacity="0.6" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function EnvelopeOrnate(props: P) {
  return (
    <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={base} {...props}>
      <rect x="4" y="6" width="56" height="36" rx="2" fill="currentColor" fillOpacity="0.05" />
      <path d="M4 6 L32 28 L60 6" />
      <path d="M4 42 L24 24 M60 42 L40 24" />
      <circle cx="32" cy="32" r="5" fill="currentColor" fillOpacity="0.15" />
      <path d="M30 30 L34 34 M34 30 L30 34" />
    </svg>
  );
}

export function WaxSeal(props: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" className={base} {...props}>
      <circle cx="32" cy="32" r="22" fill="currentColor" fillOpacity="0.12" />
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="17" strokeDasharray="2 3" opacity="0.7" />
      <path d="M32 22 L36 32 L32 42 L28 32 Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

export function HourglassOrnate(props: P) {
  return (
    <svg viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={base} {...props}>
      <path d="M8 6 H40 M8 58 H40" />
      <path d="M10 6 Q10 24 24 32 Q38 40 38 58" />
      <path d="M38 6 Q38 24 24 32 Q10 40 10 58" />
      <path d="M14 14 Q24 22 34 14" opacity="0.6" />
      <path d="M14 50 Q24 42 34 50" opacity="0.6" />
    </svg>
  );
}

export function QuoteOpen(props: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={base} {...props}>
      <path d="M14 28 Q14 18 22 14 L22 18 Q18 20 18 26 H22 V36 H12 V28 Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M30 28 Q30 18 38 14 L38 18 Q34 20 34 26 H38 V36 H28 V28 Z" fill="currentColor" fillOpacity="0.12" />
    </svg>
  );
}

export function QuestionOrnate(props: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className={base} {...props}>
      <circle cx="24" cy="24" r="20" strokeDasharray="2 3" opacity="0.6" />
      <path d="M18 18 Q18 12 24 12 Q30 12 30 18 Q30 22 24 26 V30" />
      <circle cx="24" cy="36" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function RingsDuo(props: P) {
  return (
    <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="1.3" className={base} {...props}>
      <circle cx="24" cy="28" r="14" />
      <circle cx="40" cy="28" r="14" />
      <path d="M22 12 L24 6 L26 12" strokeLinecap="round" />
      <path d="M38 12 L40 6 L42 12" strokeLinecap="round" />
    </svg>
  );
}

export function DiamondTiny(props: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={base} {...props}>
      <path d="M8 1 L15 8 L8 15 L1 8 Z" />
    </svg>
  );
}

export function FlourishDivider(props: P) {
  return (
    <svg viewBox="0 0 200 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" className={base} {...props}>
      <path d="M2 12 H78" />
      <path d="M78 12 Q88 4 96 12 Q104 20 112 12 Q120 4 128 12" />
      <path d="M128 12 H198" />
      <path d="M100 12 L100 6" /><path d="M100 12 L100 18" />
    </svg>
  );
}
