
import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import {Star, Mail, Repeat, Rocket} from "lucide-react";
import { LucideIcon } from "lucide-react";
/* ============================================================
   Content schema — every text field shown on the website
   ============================================================ */

export type TitleParts = { pre: string; em: string; post: string };

export type KeunggulanItem = { title: string; desc: string };
export type FiturItem = { title: string; desc: string };
export type PortfolioItem = { title: string; cat: string; link: string; price: string; image?: string };
export type ProcessStep = { n: string; title: string; desc: string };
export type TestimoniItem = { text: string; name: string; meta: string; image?: string };
export type FAQItem = { q: string; 
  a:  | { type: "text"; content: string }
      | { type: "list"; content: string[] }; };
export type AddOnItem = { name: string; price: string };

export type SiteContent = {
  branding: {
    waNumber: string;
    waMessage: string;
    siteName: string;
    metaTitle: string;
    metaDescription: string;
  };
  nav: { label: string; href: string }[];
  hero: {
    script: string;
    title: TitleParts;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    badges: string[];
  };
  keunggulan: {
    eyebrow: string;
    title: TitleParts;
    subtitle: string;
    items: KeunggulanItem[]; // exactly 7
  };
  fitur: {
    eyebrow: string;
    title: TitleParts;
    subtitle: string;
    items: FiturItem[]; // exactly 6
  };
  portfolio: {
    eyebrow: string;
    title: TitleParts;
    subtitle: string;
    cats: string[];
    items: PortfolioItem[];
    ctaLabel: string;
  };

  addon: {    
    eyebrow: string;
    title: TitleParts;
    subtitle: string;
    ticketLabel: string;
    items: AddOnItem[];
    note: string;
  };

  process: {
    eyebrow: string;
    title: TitleParts;
    subtitle: string;
    steps: ProcessStep[];
  };
  testimoni: {
    eyebrow: string;
    title: TitleParts;
    subtitle: string;
    items: TestimoniItem[];
    stats: { icon: string; label: string }[];
  };
  faq: {
    eyebrow: string;
    title: TitleParts;
    subtitle: string;
    items: FAQItem[];
  };
  cta: {
    script: string;
    title: TitleParts;
    description: string;
    button: string;
  };
  kontak: {
    eyebrow: string;
    title: TitleParts;
    subtitle: string;
    phone: string;
    waNote: string;
    location: string;
  };
  footer: {
    tagline: string;
    email: string;
    instagram: string;
    facebook: string;
    waLabel: string;
  };
};

/* ============================================================
   Defaults — mirror the original hard-coded values
   ============================================================ */

export const DEFAULT_CONTENT: SiteContent = {
  branding: {
    waNumber: "6285111501210",
    waMessage: "Hallo, aku mau diskusi lebih lanjut tentang undangan.",
    siteName: "Sambutin.id",
    metaTitle: "Sambutin.id — Undangan Digital Pernikahan Premium & Elegan",
    metaDescription:
      "Sambutin.id membuat undangan digital pernikahan premium, elegan, dan interaktif. RSVP online, amplop digital, live streaming, dan gratis revisi sampai hari H.",
  },
  nav: [
    { label: "Beranda", href: "#beranda" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Fitur", href: "#fitur" },
    { label: "Testimoni", href: "#testimoni" },
    { label: "Kontak", href: "#kontak" },
  ],
  hero: {
    script: "— mengabadikan kisah cinta",
    title: {
      pre: "Undangan Digital yang ",
      em: "Mengabadikan",
      post: " Kisah Cinta Kalian",
    },
    subtitle:
      "Website undangan pernikahan premium yang elegan, interaktif, dan mudah dibagikan kepada seluruh tamu Anda.",
    primaryCta: "Pesan via WhatsApp",
    secondaryCta: "Lihat Demo",
    badges: ["RSVP Online", "Unlimited Tamu", "Amplop Digital", "Mobile Friendly", "Custom Nama Tamu"],
  },
  keunggulan: {
    eyebrow: "Keunggulan kami",
    title: { pre: "Mengapa Pasangan Memilih ", em: "Sambut.in?", post: "" },
    subtitle:
      "Kami membantu ribuan pasangan membagikan momen spesial mereka dengan cara yang lebih elegan, praktis, dan berkesan.",
    items: [
      { title: "Praktis & Cepat Dibagikan", desc: "Bagikan undangan hanya dengan satu link melalui WhatsApp, Instagram, atau media sosial lainnya." },
      { title: "Desain Elegan & Beragam", desc: "Pilihan desain modern, minimalis, hingga premium yang dapat disesuaikan dengan tema pernikahan." },
      { title: "Bebas Custom Nama & Foto", desc: "Personalisasi nama tamu, foto prewedding, dan berbagai elemen lainnya sesuai kebutuhan." },
      { title: "Harga Terjangkau", desc: "Dapatkan undangan digital premium dengan harga yang ramah di kantong." },
      { title: "Pengerjaan Cepat", desc: "Proses mudah, cepat, dan didampingi tim support yang responsif." },
      { title: "Gratis Revisi Sampai Hari H", desc: "Tidak perlu khawatir jika ada perubahan data atau detail acara." },
      { title: "Tools Sebar Undangan Instan", desc: "Fitur khusus untuk membantu mengirim undangan ke banyak tamu secara lebih efisien." },
    ],
  },
  fitur: {
    eyebrow: "Fitur unggulan",
    title: { pre: "Semua yang Kamu Butuhkan dalam ", em: "Satu Undangan", post: "" },
    subtitle: "Fitur lengkap untuk membuat pengalaman mengundang menjadi lebih mudah dan berkesan.",
    items: [
      { title: "Bebas Jumlah Tamu", desc: "Undang sebanyak mungkin tamu tanpa batas." },
      { title: "Bebas Request Lagu", desc: "Pilih musik favorit yang akan diputar di halaman undangan." },
      { title: "Ucapan & Doa", desc: "Tamu dapat memberikan ucapan dan doa langsung melalui website." },
      { title: "Kado Digital & Fisik", desc: "Mendukung transfer hadiah digital maupun informasi pengiriman hadiah fisik." },
      { title: "Live Streaming", desc: "Bagikan momen spesial secara langsung kepada tamu yang berhalangan hadir." },
      { title: "RSVP", desc: "Konfirmasi kehadiran tamu secara otomatis dan lebih terorganisir." },
    ],
  },
  portfolio: {
    eyebrow: "",
    title: { pre: "Katalog ", em: "Undangan", post: ""},
    subtitle: "Ratusan undangan digital yang telah kami rancang untuk pasangan istimewa di seluruh Indonesia.",
    cats: ["Semua", "Elegant", "Monochrome", "Doodle", "Flowy", "Ethnic"],
    items: [
      { title: "Elegant Maroon", cat: "Elegant", link:"https://sambutin.id/maroon-hijau/", price: "79 K"},
      { title: "Monochrome-1", cat: "Monochrome", link:"https://sambutin.id/kl-monochrome-1/", price: "79 K" },
      { title: "Doodle-1", cat: "Doodle", link:"https://sambutin.id/doodle1/" , price: "79 K"},
      { title: "Green", cat: "Flowy", link:"https://sambutin.id/green-flowy/", price: "79 K" },
      { title: "Jawa", cat: "Ethnic",  link:"https://sambutin.id/jawa-1/", price: "79 K" },
    ],
    ctaLabel: "Lihat Semua Portfolio",
  },

  addon: {
   eyebrow: "Add On",
    title: { pre: "Sesuaikan ", em: "Undanganmu", post: " Sesukamu" },
    subtitle: "Tambahkan layanan ekstra agar undangan digitalmu makin spesial.",
    ticketLabel: "Add On",
    items: [
      { name: "Fast Track", price: "40K - 60K" },
      { name: "Ganti Warna", price: "20K" },
      { name: "Tambah Foto (5)", price: "10K" },
      { name: "Tambah Link", price: "50K" },
      { name: "Masa Aktif", price: "20K - 100K" },
      { name: "Revisi Major", price: "10K - 50K" },    ],
   note: "Harga sewaktu-waktu dapat berubah. Konsultasikan via WhatsApp untuk penawaran terbaik.",  },

  process: {
    eyebrow: "Proses",
    title: { pre: "Proses yang Mudah dan ", em: "Cepat", post: "" },
    subtitle: "Empat langkah sederhana, undangan digital impian sudah siap Anda bagikan.",
    steps: [
      { n: "01", title: "Pilih Template/Konsultasi Langsung", desc: "Tentukan undangan digital yang sesuai dengan kebutuhan pernikahan Anda." },
      { n: "02", title: "Kirim Data", desc: "Kirim seluruh data acara, foto, dan preferensi desain melalui form." },
      { n: "03", title: "Desain & Revisi", desc: "Tim kami akan mendesain undangan dan revisi sesuai keinginan Anda." },
      { n: "04", title: "Undangan Siap", desc: "Undangan siap dibagikan via WhatsApp & media sosial lainnya." },
    ],
  },
  testimoni: {
    eyebrow: "Cerita Mereka",
    title: { pre: "Cerita dari Pasangan ", em: "Bahagia", post: "" },
    subtitle: "Ribuan klien sudah mempercayai kami.",
    items: [
      { text: "Undangannya cantik banget! Tamu-tamu pada kagum dan banyak yang tanya dibuat di mana. Pelayanannya responsif sekali.", name: "Dewi Rahayu", meta: "Pernikahan · Nov 2024" },
      { text: "Sangat membantu! Proses pembuatannya cepat dan hasilnya melebihi ekspektasi saya. Sangat recommended!", name: "Budi Santoso", meta: "Pernikahan · Okt 2024" },
      { text: "Lucu banget designnya! Fitur RSVP-nya memudahkan banget hitungan tamu.", name: "Siti Aminah", meta: "Resepsi · Sep 2024" },
      { text: "Pelayanan prima, harga terjangkau, hasil memuaskan. Sudah 3x pakai Sambutin.id untuk acara keluarga.", name: "Ahmad Fauzi", meta: "Akad Nikah · Agu 2024" },
    ],
    stats: [
      { icon: "Star", label: "4.9/5 Rating" },
      { icon: "Mail", label: "500+ Undangan" },
      { icon: "Rocket", label: "Respon Cepat" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: { pre: "Pertanyaan yang Sering ", em: "Ditanyakan", post: "" },
    subtitle: "Belum menemukan jawabannya? Hubungi kami langsung via WhatsApp.",
    items: [
      { q: "Cara Order?", a: {type: "list", content:["Klik tombol Order yang tersedia", "Anda akan diarahkan ke WhatsApp kami", "Silakan diskusikan kebutuhan undangan dengan tim admin", "Lakukan pembayaran sesuai arahan", "Kirimkan form beserta foto yang akan digunakan dalam undangan", "Tunggu proses pembuatan hingga undangan selesai"]} },
      { q: "Proses pengerjaan berapa lama?", a:{type: "text", content: `Pengerjaan 3x24 Jam hari kerja, Hari Minggu & Tanggal merah tidak terhitung` }},
      { q: "Bisa 1 Hari selesai?", a: {
                type: "text",
                content: `Bisa, Kita ada layanan prioritas

            Prioritas 24 Jam = + Rp. 40.000
            Prioritas 12 Jam = + Rp. 60.000

            *Pengerjaan menyesuaikan jam operasional
            *Sesuai ketersediaan slot fast track karena kami hanya menerima 3 pemesanan fast track setiap harinya`
              } },
      { q: "Apakah bisa revisi?", a: {
            type: "text",
            content: 
            `Bisa, Kita kasih FREE Revisi Minor sampai hari H.

            Jika ada Revisi Major (Besar), akan ada tambahan biaya menyesuaikan kesulitan revisi.`}},
      { q: "Apakah bisa ganti konsep?", a:{ type: "text", content: `Desain tidak bisa diubah jika anda sudah melakukan pembayaran sesuai diskusi awal dengan admin.`}},
      { q: "Berapa batas maksimal foto?", a:{
            type: "text",
            content:
            `Maksimal 10 Foto sudah termauk kebutuhan :
              - Cover
              - Profil Pengantin
              - Background Utama

              Jika ingin ada tambahan foto, dikenakan biaya Rp. 10.000/5 Foto`}},
      { q: "Bisa tambah video Prewed?", a:{
              type: "text",
              content: 
              `Bisa, Jika tanpa foto akan kami hilangkan opsi Gallery.
              Profil akan kami ganti dengan animasi atau foto lain untuk memperindah undanganmu.`}},
      { q: "Bisa kostum desain?", a: {
              type: "text",
              content:
              `Bisa, untuk harga akan disesuaikan dengan desain yang diubah/dicustom.
              silahkan hubungi admin untuk diskusi.`}},
      { q: "Bisa dire-schedule?", a: {
              type: "text",
              content:
              `Bisa, Maksimal Revisi 10 Jam sebelum acara.`}},
      { q: "Berapa banyak tamu yang bisa di undang?", a: {
              type: "text",
              content:
              `Tanpa batas, Kamu bisa kirim ke banyak tamu undangan tanpa batas.
              Kita beri FREE Tools untuk sebar undangan instan`}},
      { q: "Bisa hapus ucapan yang dikirim tamu?", a: {
              type: "text",
              content:
              `Bisa, penghapusan akan dilakukan oleh tim kami.`}},  
      { q: "Siapa yang isi nama tamu?", a: {
              type: "text",
              content:
              `Nama tamu di isi oleh klien secara mandiri,
              kami kirim tutorial penggunaan tools kirim undangan instan.`}},
      { q: "Undangan bisa di akses berapa lama?", a: {
              type: "text",
              content:
              `Undangan bisa di akses selama 3 Bulan
              Jika kamu ingin meng-aksesnya lebih lama, akan dikenakan biaya :

              Masa aktif 6 Bulan = + Rp. 20.000
              Masa Aktif 12 Bulan = + Rp. 40.000
              Masa Aktif Selamanya = + Rp. 100.000`}},
        

    ],
  },
  cta: {
    script: "— for your big day",
    title: { pre: "Siap Membuat Undangan Pernikahan yang ", em: "Berkesan?", post: "" },
    description:
      "Konsultasikan kebutuhan pernikahan Anda sekarang juga. Tim kami siap membantu mewujudkan undangan impian Anda.",
    button: "Chat WhatsApp Sekarang",
  },
  kontak: {
    eyebrow: "Kontak",
    title: { pre: "Mari Wujudkan ", em: "Undangan Impian", post: " Anda" },
    subtitle: "Isi formulir di bawah ini, kami akan menghubungi Anda melalui WhatsApp.",
    phone: "+62 851-1150-1210",
    waNote: "WhatsApp 24/7 support",
    location: "Bandung, Indonesia",
  },
  footer: {
    tagline: "Mengabadikan Kisah Cinta dalam Undangan Digital yang Berkesan.",
    email: "hello@sambutin.id",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    waLabel: "+62 851-1150-1210",
  },
};

/* ============================================================
   Storage + reactive subscription
   ============================================================ */

const STORAGE_KEY = "sambutin:content:v1";
const EVENT = "sambutin:content:change";

function deepMerge<T>(base: T, override: any): T {
  if (Array.isArray(base)) return (override ?? base) as T;
  if (base && typeof base === "object") {
    const out: any = { ...base };
    if (override && typeof override === "object") {
      for (const k of Object.keys(override)) {
        out[k] = deepMerge((base as any)[k], override[k]);
      }
    }
    return out;
  }
  return (override ?? base) as T;
}

function readFromStorage(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_CONTENT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    return deepMerge(DEFAULT_CONTENT, JSON.parse(raw));
  } catch {
    return DEFAULT_CONTENT;
  }
}

let cached: SiteContent = DEFAULT_CONTENT;
let initialised = false;

function ensureInit() {
  if (!initialised && typeof window !== "undefined") {
    cached = readFromStorage();
    initialised = true;
  }
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

function getSnapshot(): SiteContent {
  ensureInit();
  return cached;
}
function getServerSnapshot(): SiteContent {
  return DEFAULT_CONTENT;
}

export function useContent(): SiteContent {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function saveContent(next: SiteContent) {
  cached = next;
  initialised = true;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  }
}

export function resetContent() {
  cached = DEFAULT_CONTENT;
  initialised = true;
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(EVENT));
  }
}

/* Helpers */
export function waLink(content: SiteContent, msg?: string) {
  const text = msg ?? content.branding.waMessage;
  return `https://wa.me/${content.branding.waNumber}?text=${encodeURIComponent(text)}`;
}

export function renderTitle(t: TitleParts) {
  return (
    <>
      {t.pre}
      {t.em && <em className="text-primary not-italic font-serif italic">{t.em}</em>}
      {t.post}
    </>
  );
}

// silence unused-import warnings in some bundlers
export const _bind = { useEffect, createContext, useContext };
