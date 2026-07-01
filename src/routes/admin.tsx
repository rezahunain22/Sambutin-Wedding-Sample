import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, Save, RotateCcw, Plus, Trash2, Download, Upload, Eye, Check,
} from "lucide-react";
import * as Icons from "lucide-react";
import {
  DEFAULT_CONTENT,
  useContent,
  saveContent,
  resetContent,
  type SiteContent,
  type TitleParts,
} from "@/lib/content-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Sambutin.id" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPanel,
});

type TabKey =
  | "branding" | "hero" | "keunggulan" | "fitur" | "portfolio" | "addon"
  | "process" | "testimoni" | "faq" | "cta" | "kontak" | "footer";

const TABS: { key: TabKey; label: string }[] = [
  { key: "branding", label: "Branding & WA" },
  { key: "hero", label: "Hero" },
  { key: "keunggulan", label: "Keunggulan" },
  { key: "fitur", label: "Fitur" },
  { key: "portfolio", label: "Portfolio" },
  { key: "addon", label: "Add On" },
  { key: "process", label: "Proses" },
  { key: "testimoni", label: "Testimoni" },
  { key: "faq", label: "FAQ" },
  { key: "cta", label: "CTA Banner" },
  { key: "kontak", label: "Kontak" },
  { key: "footer", label: "Footer" },
];

function AdminPanel() {
  const current = useContent();
  const [draft, setDraft] = useState<SiteContent>(current);
  const [tab, setTab] = useState<TabKey>("branding");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  // Keep draft in sync if external change happens (e.g. another tab)
  useEffect(() => { setDraft(current); /* eslint-disable-next-line */ }, []);

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(current),
    [draft, current]
  );

  const update = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const save = () => {
    saveContent(draft);
    setSavedAt(Date.now());
    setTimeout(() => setSavedAt(null), 2200);
  };

  const reset = () => {
    if (confirm("Reset semua konten ke default? Perubahan akan hilang.")) {
      resetContent();
      setDraft(DEFAULT_CONTENT);
    }
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sambutin-content-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        setDraft({ ...DEFAULT_CONTENT, ...parsed });
        alert("Konten berhasil dimuat. Klik Simpan untuk menerapkan.");
      } catch {
        alert("File JSON tidak valid.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft size={16} /> Kembali
          </Link>
          <div className="h-6 w-px bg-border mx-1" />
          <div>
            <h1 className="font-serif text-lg leading-tight">Admin Panel</h1>
            <p className="text-[11px] text-muted-foreground">Edit konten website — disimpan di browser ini.</p>
          </div>
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            {savedAt && (
              <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                <Check size={12} /> Tersimpan
              </span>
            )}
            {dirty && !savedAt && (
              <span className="text-xs text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">Perubahan belum disimpan</span>
            )}
            <label className="btn-ghost cursor-pointer">
              <Upload size={14} /> Import
              <input type="file" accept="application/json" className="hidden"
                onChange={(e) => e.target.files?.[0] && importJSON(e.target.files[0])} />
            </label>
            <button onClick={exportJSON} className="btn-ghost"><Download size={14} /> Export</button>
            <button onClick={reset} className="btn-ghost text-destructive"><RotateCcw size={14} /> Reset</button>
            <Link to="/" target="_blank" className="btn-ghost"><Eye size={14} /> Preview</Link>
            <button onClick={save} disabled={!dirty} className="btn-primary !px-4 !py-2 !text-xs disabled:opacity-50 disabled:cursor-not-allowed">
              <Save size={14} /> Simpan
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-3 flex gap-1.5 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                tab === t.key ? "bg-primary text-primary-foreground" : "bg-background text-foreground/70 hover:bg-secondary/60"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {tab === "branding" && <BrandingTab draft={draft} update={update} />}
        {tab === "hero" && <HeroTab draft={draft} update={update} />}
        {tab === "keunggulan" && <ListSectionTab section="keunggulan" draft={draft} update={update} fields={[["title","Judul"],["desc","Deskripsi"]]} max={7} note="Item ke-1 dan ke-7 menampilkan layout besar. Item ke-7 berlatar gelap." />}
        {tab === "fitur" && <ListSectionTab section="fitur" draft={draft} update={update} fields={[["title","Judul"],["desc","Deskripsi"]]} max={6} note="Ikon mengikuti urutan: Tamu, Musik, Hati, Hadiah, Video, Kalender." />}
        {tab === "portfolio" && <PortfolioTab draft={draft} update={update} />}
        {tab === "addon" && <AddOnTab draft={draft} update={update} />}
        {tab === "process" && <ProcessTab draft={draft} update={update} />}
        {tab === "testimoni" && <TestimoniTab draft={draft} update={update} />}
        {tab === "faq" && <FAQTab draft={draft} update={update} />}
        {tab === "cta" && <CTATab draft={draft} update={update} />}
        {tab === "kontak" && <KontakTab draft={draft} update={update} />}
        {tab === "footer" && <FooterTab draft={draft} update={update} />}
      </main>

      <style>{`
        .field-label{display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:oklch(0.45 0.02 260);margin-bottom:.4rem}
        .field-input{width:100%;background:var(--background);border:1px solid var(--border);border-radius:.6rem;padding:.65rem .8rem;font-size:.875rem;outline:none;transition:border-color .15s, box-shadow .15s;}
        .field-input:focus{border-color:var(--primary);box-shadow:0 0 0 3px oklch(0.36 0.13 18 / .12);}
        textarea.field-input{resize:vertical;min-height:80px;font-family:inherit}
        .card{background:var(--card);border:1px solid var(--border);border-radius:1rem;padding:1.25rem 1.25rem;box-shadow:0 1px 2px rgba(0,0,0,.03)}
        .card + .card{margin-top:1rem}
        .card-title{font-family:var(--font-serif, ui-serif, Georgia);font-size:1.15rem;margin-bottom:.25rem}
        .card-sub{font-size:.78rem;color:oklch(0.45 0.02 260);margin-bottom:1rem}
        .grid-2{display:grid;grid-template-columns:1fr;gap:.85rem}
        @media(min-width:640px){.grid-2{grid-template-columns:1fr 1fr}}
        .grid-3{display:grid;grid-template-columns:1fr;gap:.85rem}
        @media(min-width:640px){.grid-3{grid-template-columns:1fr 1fr 1fr}}
        .btn-ghost{display:inline-flex;align-items:center;gap:.35rem;padding:.45rem .75rem;border-radius:.5rem;font-size:.75rem;font-weight:500;background:var(--background);border:1px solid var(--border);color:var(--foreground);transition:background .15s}
        .btn-ghost:hover{background:var(--secondary)}
        .item-card{position:relative;background:var(--background);border:1px solid var(--border);border-radius:.85rem;padding:1rem 1rem .85rem;margin-bottom:.75rem}
        .item-tag{position:absolute;top:-.55rem;left:.85rem;background:var(--primary);color:var(--primary-foreground);font-size:.65rem;font-weight:700;letter-spacing:.08em;padding:.1rem .55rem;border-radius:999px}
        .icon-btn{display:inline-flex;align-items:center;justify-content:center;height:1.85rem;width:1.85rem;border-radius:.45rem;background:var(--background);border:1px solid var(--border);color:oklch(0.5 0.02 260);transition:all .15s}
        .icon-btn:hover{color:var(--destructive);border-color:var(--destructive)}
        .add-btn{display:inline-flex;align-items:center;gap:.4rem;padding:.55rem 1rem;border-radius:.6rem;font-size:.8rem;font-weight:600;background:var(--primary);color:var(--primary-foreground);border:none;cursor:pointer;transition:opacity .15s}
        .add-btn:hover{opacity:.9}
      `}</style>
    </div>
  );
}

/* ====================== Reusable bits ====================== */

function TextField({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="field-input" placeholder={placeholder} />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 3, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="field-input" placeholder={placeholder} />
    </label>
  );
}

function TitleEditor({ label, value, onChange }: { label: string; value: TitleParts; onChange: (v: TitleParts) => void }) {
  return (
    <div>
      <span className="field-label">{label}</span>
      <p className="text-[11px] text-muted-foreground -mt-1 mb-2">
        Bagian "Highlight" akan tampil <em className="text-primary not-italic font-semibold italic">miring & berwarna</em>.
      </p>
      <div className="grid-3">
        <input className="field-input" placeholder="Teks sebelum" value={value.pre} onChange={(e) => onChange({ ...value, pre: e.target.value })} />
        <input className="field-input" placeholder="Highlight" value={value.em} onChange={(e) => onChange({ ...value, em: e.target.value })} />
        <input className="field-input" placeholder="Teks sesudah" value={value.post} onChange={(e) => onChange({ ...value, post: e.target.value })} />
      </div>
    </div>
  );
}

/* Image upload as base64 data URL — auto-resized to keep localStorage small */
function ImageUpload({ label, value, onChange, aspect = "4/3" }: { label: string; value?: string; onChange: (v: string | undefined) => void; aspect?: string }) {
  const onFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxW = 900;
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) { onChange(String(reader.result)); return; }
        ctx.drawImage(img, 0, 0, w, h);
        onChange(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(f);
  };
  return (
    <div>
      <span className="field-label">{label}</span>
      <div className="flex items-start gap-3">
        <div className="rounded-md border border-border bg-secondary/30 overflow-hidden shrink-0" style={{ width: 110, aspectRatio: aspect }}>
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center text-xs text-muted-foreground">No image</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="btn-ghost cursor-pointer">
            <Upload size={14} /> {value ? "Ganti" : "Upload"}
            <input type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.currentTarget.value = ""; }} />
          </label>
          {value && (
            <button className="btn-ghost text-destructive" onClick={() => onChange(undefined)}>
              <Trash2 size={14} /> Hapus
            </button>
          )}
          <p className="text-[10px] text-muted-foreground max-w-[180px]">JPG/PNG, otomatis dikompres ≤900px.</p>
        </div>
      </div>
    </div>
  );
}

type UpdateFn = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
type TabProps = { draft: SiteContent; update: UpdateFn };

/* ====================== TABS ====================== */

function BrandingTab({ draft, update }: TabProps) {
  const b = draft.branding;
  const set = (patch: Partial<SiteContent["branding"]>) => update("branding", { ...b, ...patch });
  return (
    <div className="card">
      <h2 className="card-title">Branding & WhatsApp</h2>
      <p className="card-sub">Identitas situs dan tombol WhatsApp di seluruh halaman.</p>
      <div className="grid-2">
        <TextField label="Nama Situs" value={b.siteName} onChange={(v) => set({ siteName: v })} />
        <TextField label="Nomor WhatsApp (format internasional, contoh: 6281234567890)" value={b.waNumber} onChange={(v) => set({ waNumber: v.replace(/[^\d]/g, "") })} />
      </div>
      <div className="mt-3">
        <TextArea label="Pesan WhatsApp Default" value={b.waMessage} onChange={(v) => set({ waMessage: v })} />
      </div>
      <div className="grid-2 mt-3">
        <TextField label="Meta Title (SEO)" value={b.metaTitle} onChange={(v) => set({ metaTitle: v })} />
        <TextArea label="Meta Description (SEO)" value={b.metaDescription} onChange={(v) => set({ metaDescription: v })} />
      </div>
    </div>
  );
}

function HeroTab({ draft, update }: TabProps) {
  const h = draft.hero;
  const set = (patch: Partial<SiteContent["hero"]>) => update("hero", { ...h, ...patch });
  return (
    <>
      <div className="card">
        <h2 className="card-title">Hero — Konten Utama</h2>
        <p className="card-sub">Yang pertama kali dilihat pengunjung.</p>
        <TextField label="Teks Script (di atas judul)" value={h.script} onChange={(v) => set({ script: v })} />
        <div className="mt-3"><TitleEditor label="Judul" value={h.title} onChange={(v) => set({ title: v })} /></div>
        <div className="mt-3"><TextArea label="Subtitle" value={h.subtitle} onChange={(v) => set({ subtitle: v })} /></div>
        <div className="grid-2 mt-3">
          <TextField label="Teks Tombol Utama" value={h.primaryCta} onChange={(v) => set({ primaryCta: v })} />
          <TextField label="Teks Tombol Sekunder" value={h.secondaryCta} onChange={(v) => set({ secondaryCta: v })} />
        </div>
      </div>
      <div className="card">
        <h2 className="card-title">Badge Hero</h2>
        <p className="card-sub">Daftar fitur singkat di bawah hero.</p>
        <StringList items={h.badges} onChange={(items) => set({ badges: items })} placeholder="Contoh: RSVP Online" />
      </div>
    </>
  );
}

function StringList({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input className="field-input" value={it} placeholder={placeholder}
            onChange={(e) => { const next = [...items]; next[i] = e.target.value; onChange(next); }} />
          <button className="icon-btn" onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label="Hapus">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button className="add-btn" onClick={() => onChange([...items, ""])}>
        <Plus size={14} /> Tambah
      </button>
    </div>
  );
}

function SectionHeaderEditor<K extends "keunggulan" | "fitur" | "portfolio" | "process" | "testimoni" | "faq" | "kontak">({
  section, draft, update,
}: { section: K; draft: SiteContent; update: UpdateFn }) {
  const s: any = draft[section];
  const set = (patch: any) => update(section, { ...s, ...patch } as any);
  return (
    <div className="card">
      <h2 className="card-title">Header Bagian</h2>
      <p className="card-sub">Judul utama bagian ini.</p>
      <div className="grid-2">
        <TextField label="Eyebrow" value={s.eyebrow} onChange={(v) => set({ eyebrow: v })} />
        <TextArea label="Subtitle" value={s.subtitle} onChange={(v) => set({ subtitle: v })} rows={2} />
      </div>
      <div className="mt-3"><TitleEditor label="Judul" value={s.title} onChange={(v) => set({ title: v })} /></div>
    </div>
  );
}

function ListSectionTab({ section, draft, update, fields, max, note }: {
  section: "keunggulan" | "fitur";
  draft: SiteContent; update: UpdateFn;
  fields: [string, string][];
  max: number;
  note?: string;
}) {
  const s: any = draft[section];
  const set = (patch: any) => update(section, { ...s, ...patch } as any);
  const setItem = (i: number, patch: any) => {
    const next = [...s.items];
    next[i] = { ...next[i], ...patch };
    set({ items: next });
  };
  return (
    <>
      <SectionHeaderEditor section={section} draft={draft} update={update} />
      <div className="card">
        <h2 className="card-title">Item</h2>
        <p className="card-sub">{note ?? "Edit, tambah, atau hapus item."}</p>
        {s.items.map((it: any, i: number) => (
          <div key={i} className="item-card">
            <span className="item-tag">#{i + 1}</span>
            <div className="flex justify-end mb-1">
              <button className="icon-btn" onClick={() => set({ items: s.items.filter((_: any, j: number) => j !== i) })} aria-label="Hapus">
                <Trash2 size={14} />
              </button>
            </div>
            {fields.map(([k, label]) =>
              k === "desc"
                ? <div key={k} className="mt-1"><TextArea label={label} value={it[k] ?? ""} onChange={(v) => setItem(i, { [k]: v })} rows={2} /></div>
                : <div key={k} className="mt-1"><TextField label={label} value={it[k] ?? ""} onChange={(v) => setItem(i, { [k]: v })} /></div>
            )}
          </div>
        ))}
        {s.items.length < max && (
          <button className="add-btn" onClick={() => {
            const blank: any = {};
            fields.forEach(([k]) => (blank[k] = ""));
            set({ items: [...s.items, blank] });
          }}>
            <Plus size={14} /> Tambah Item
          </button>
        )}
      </div>
    </>
  );
}

function PortfolioTab({ draft, update }: TabProps) {
  const p = draft.portfolio;
  const set = (patch: Partial<SiteContent["portfolio"]>) => update("portfolio", { ...p, ...patch });
  return (
    <>
      <SectionHeaderEditor section="portfolio" draft={draft} update={update} />
      <div className="card">
        <h2 className="card-title">Kategori Filter</h2>
        <p className="card-sub">Kategori pertama dianggap sebagai "Semua".</p>
        <StringList items={p.cats} onChange={(v) => set({ cats: v })} placeholder="Contoh: Luxury" />
      </div>
      <div className="card">
        <h2 className="card-title">Item Portfolio</h2>
        <p className="card-sub">Upload gambar thumbnail untuk tiap undangan. Jika kosong, akan pakai gambar default.</p>
        {p.items.map((it, i) => (
          <div key={i} className="item-card">
            <span className="item-tag">#{i + 1}</span>
            <div className="flex justify-end mb-1">
              <button className="icon-btn" onClick={() => set({ items: p.items.filter((_, j) => j !== i) })}><Trash2 size={14} /></button>
            </div>
            <div className="mt-1">
              <ImageUpload label="Thumbnail Undangan" aspect="3/4" value={it.image}
                onChange={(v) => { const n = [...p.items]; n[i] = { ...n[i], image: v }; set({ items: n }); }} />
            </div>
            <div className="grid-3 mt-3">
              <TextField label="Judul" value={it.title} onChange={(v) => { const n = [...p.items]; n[i] = { ...n[i], title: v }; set({ items: n }); }} />
              <TextField label="Kategori" value={it.cat} onChange={(v) => { const n = [...p.items]; n[i] = { ...n[i], cat: v }; set({ items: n }); }} />
              <TextField label="Tanggal" value={it.date} onChange={(v) => { const n = [...p.items]; n[i] = { ...n[i], date: v }; set({ items: n }); }} />
              <TextField label="Link" value={it.link} onChange={(v) => { const n = [...p.items]; n[i] = { ...n[i], link: v }; set({ items: n }); }} />
            </div>
          </div>
        ))}
        <button className="add-btn" onClick={() => set({ items: [...p.items, { title: "", cat: p.cats[1] ?? "", date: "", link: "" }] })}><Plus size={14} /> Tambah Item</button>
        <div className="mt-4"><TextField label="Teks Tombol CTA" value={p.ctaLabel} onChange={(v) => set({ ctaLabel: v })} /></div>
      </div>
    </>
  );
}
function AddOnTab({ draft, update }: TabProps) {
  const a = draft.addon;
  const set = (patch: Partial<SiteContent["addon"]>) => update("addon", { ...a, ...patch });
  return (
    <>
      <SectionHeaderEditor section={"addon" as any} draft={draft} update={update} />
      <div className="card">
        <h2 className="card-title">Tiket Add On</h2>
        <p className="card-sub">Label besar di atas tiket dan catatan kecil di bawah.</p>
        <div className="grid-2">
          <TextField label="Label Tiket" value={a.ticketLabel} onChange={(v) => set({ ticketLabel: v })} />
        </div>
        <div className="mt-3"><TextArea label="Catatan" value={a.note} onChange={(v) => set({ note: v })} rows={2} /></div>
      </div>
      <div className="card">
        <h2 className="card-title">Daftar Add On</h2>
        <p className="card-sub">Nama layanan & harga. Contoh harga: 40K - 60K, 20K, dll.</p>
        {a.items.map((it, i) => (
          <div key={i} className="grid grid-cols-[1fr_140px_auto] gap-2 mb-2 items-end">
            <div>
              <span className="field-label">Nama</span>
              <input className="field-input" value={it.name} onChange={(e) => { const n = [...a.items]; n[i] = { ...n[i], name: e.target.value }; set({ items: n }); }} />
            </div>
            <div>
              <span className="field-label">Harga</span>
              <input className="field-input" value={it.price} onChange={(e) => { const n = [...a.items]; n[i] = { ...n[i], price: e.target.value }; set({ items: n }); }} />
            </div>
            <button className="icon-btn" onClick={() => set({ items: a.items.filter((_, j) => j !== i) })}><Trash2 size={14} /></button>
          </div>
        ))}
        <button className="add-btn" onClick={() => set({ items: [...a.items, { name: "", price: "" }] })}><Plus size={14} /> Tambah</button>
      </div>
    </>
  );
}

function ProcessTab({ draft, update }: TabProps) {
  const p = draft.process;
  const set = (patch: Partial<SiteContent["process"]>) => update("process", { ...p, ...patch });
  return (
    <>
      <SectionHeaderEditor section="process" draft={draft} update={update} />
      <div className="card">
        <h2 className="card-title">Langkah</h2>
        <p className="card-sub">Urutan proses kerja Anda.</p>
        {p.steps.map((s, i) => (
          <div key={i} className="item-card">
            <span className="item-tag">#{i + 1}</span>
            <div className="flex justify-end mb-1">
              <button className="icon-btn" onClick={() => set({ steps: p.steps.filter((_, j) => j !== i) })}><Trash2 size={14} /></button>
            </div>
            <div className="grid-3">
              <TextField label="Nomor" value={s.n} onChange={(v) => { const n = [...p.steps]; n[i] = { ...n[i], n: v }; set({ steps: n }); }} />
              <div className="sm:col-span-2"><TextField label="Judul" value={s.title} onChange={(v) => { const n = [...p.steps]; n[i] = { ...n[i], title: v }; set({ steps: n }); }} /></div>
            </div>
            <div className="mt-2"><TextArea label="Deskripsi" value={s.desc} onChange={(v) => { const n = [...p.steps]; n[i] = { ...n[i], desc: v }; set({ steps: n }); }} rows={2} /></div>
          </div>
        ))}
        <button className="add-btn" onClick={() => set({ steps: [...p.steps, { n: String(p.steps.length + 1).padStart(2, "0"), title: "", desc: "" }] })}><Plus size={14} /> Tambah Langkah</button>
      </div>
    </>
  );
}

function TestimoniTab({ draft, update }: TabProps) {
  const t = draft.testimoni;
  const set = (patch: Partial<SiteContent["testimoni"]>) => update("testimoni", { ...t, ...patch });
  return (
    <>
      <SectionHeaderEditor section="testimoni" draft={draft} update={update} />
      <div className="card">
        <h2 className="card-title">Testimoni</h2>
        <p className="card-sub">Tampil 4 sekaligus. Jika lebih dari 4, akan otomatis slide setiap 5 detik. Foto opsional.</p>
        {t.items.map((it, i) => (
          <div key={i} className="item-card">
            <span className="item-tag">#{i + 1}</span>
            <div className="flex justify-end mb-1">
              <button className="icon-btn" onClick={() => set({ items: t.items.filter((_, j) => j !== i) })}><Trash2 size={14} /></button>
            </div>
            <div className="mb-3">
              <ImageUpload label="Foto (opsional)" aspect="4/3" value={it.image}
                onChange={(v) => { const n = [...t.items]; n[i] = { ...n[i], image: v }; set({ items: n }); }} />
            </div>
            <TextArea label="Kutipan" value={it.text} onChange={(v) => { const n = [...t.items]; n[i] = { ...n[i], text: v }; set({ items: n }); }} rows={3} />
            <div className="grid-2 mt-2">
              <TextField label="Nama" value={it.name} onChange={(v) => { const n = [...t.items]; n[i] = { ...n[i], name: v }; set({ items: n }); }} />
              <TextField label="Info (mis. Pernikahan · Nov 2024)" value={it.meta} onChange={(v) => { const n = [...t.items]; n[i] = { ...n[i], meta: v }; set({ items: n }); }} />
            </div>
          </div>
        ))}
        <button className="add-btn" onClick={() => set({ items: [...t.items, { text: "", name: "", meta: "" }] })}><Plus size={14} /> Tambah</button>
      </div>
      <div className="card">
  <h2 className="card-title">Statistik</h2>
  <p className="card-sub">Chip di bawah testimoni.</p>

  {t.stats.map((st, i) => {
    const PreviewIcon =
  (Icons[
    st.icon as keyof typeof Icons
  ] as React.ElementType) ?? Icons.Star;

    return (
      <div
        key={i}
        className="grid grid-cols-[80px_120px_1fr_auto] gap-2 mb-2 items-end"
      >
        {/* Preview Icon */}
        <div>
          <span className="field-label">Preview</span>
          <div className="field-input flex items-center justify-center h-11">
            <PreviewIcon size={20} />
          </div>
        </div>

        {/* Pilihan Icon */}
        <div>
          <span className="field-label">Ikon</span>
          <select
            className="field-input"
            value={st.icon}
            onChange={(e) => {
              const n = [...t.stats];
              n[i] = {
                ...n[i],
                icon: e.target.value,
              };
              set({ stats: n });
            }}
          >
            <option value="Star">Star</option>
            <option value="Mail">Mail</option>
            <option value="Repeat">Repeat</option>
            <option value="Rocket">Rocket</option>
            <option value="Heart">Heart</option>
            <option value="Award">Award</option>
            <option value="Users">Users</option>
            <option value="Sparkles">Sparkles</option>
            <option value="Gift">Gift</option>
          </select>
        </div>

        {/* Label */}
        <div>
          <span className="field-label">Label</span>
          <input
            className="field-input"
            value={st.label}
            onChange={(e) => {
              const n = [...t.stats];
              n[i] = {
                ...n[i],
                label: e.target.value,
              };
              set({ stats: n });
            }}
          />
        </div>

        {/* Hapus */}
        <button
          className="icon-btn"
          onClick={() =>
            set({
              stats: t.stats.filter((_, j) => j !== i),
            })
          }
        >
          <Trash2 size={14} />
        </button>
      </div>
    );
  })}

  <button
    className="add-btn"
    onClick={() =>
      set({
        stats: [
          ...t.stats,
          {
            icon: "Star",
            label: "",
          },
        ],
      })
    }
  >
    <Plus size={14} /> Tambah
  </button>
</div>
    </>
  );
}

function FAQTab({ draft, update }: TabProps) {
  const f = draft.faq;
  const set = (patch: Partial<SiteContent["faq"]>) => update("faq", { ...f, ...patch });
  return (
    <>
      <SectionHeaderEditor section="faq" draft={draft} update={update} />
      <div className="card">
        <h2 className="card-title">Pertanyaan & Jawaban</h2>
        {f.items.map((it, i) => (
          <div key={i} className="item-card">
            <span className="item-tag">#{i + 1}</span>
            <div className="flex justify-end mb-1">
              <button className="icon-btn" onClick={() => set({ items: f.items.filter((_, j) => j !== i) })}><Trash2 size={14} /></button>
            </div>
            <TextField label="Pertanyaan" value={it.q} onChange={(v) => { const n = [...f.items]; n[i] = { ...n[i], q: v }; set({ items: n }); }} />
            <div className="mt-2"><TextArea label="Jawaban" value={it.a.content} onChange={(v) => { const n = [...f.items]; n[i] = { ...n[i], a: {...n[i].a,content: v, }}; set({ items: n }); }} rows={2} /></div>
          </div>
        ))}
        <button className="add-btn" onClick={() => set({ items: [...f.items, { q: "", a: {type: "text", content: "", }, }] })}><Plus size={14} /> Tambah</button>
      </div>
    </>
  );
}

function CTATab({ draft, update }: TabProps) {
  const c = draft.cta;
  const set = (patch: Partial<SiteContent["cta"]>) => update("cta", { ...c, ...patch });
  return (
    <div className="card">
      <h2 className="card-title">CTA Banner</h2>
      <p className="card-sub">Banner ajakan tindakan sebelum kontak.</p>
      <TextField label="Teks Script" value={c.script} onChange={(v) => set({ script: v })} />
      <div className="mt-3"><TitleEditor label="Judul" value={c.title} onChange={(v) => set({ title: v })} /></div>
      <div className="mt-3"><TextArea label="Deskripsi" value={c.description} onChange={(v) => set({ description: v })} /></div>
      <div className="mt-3"><TextField label="Teks Tombol" value={c.button} onChange={(v) => set({ button: v })} /></div>
    </div>
  );
}

function KontakTab({ draft, update }: TabProps) {
  const k = draft.kontak;
  const set = (patch: Partial<SiteContent["kontak"]>) => update("kontak", { ...k, ...patch });
  return (
    <>
      <SectionHeaderEditor section="kontak" draft={draft} update={update} />
      <div className="card">
        <h2 className="card-title">Detail Kontak</h2>
        <div className="grid-2">
          <TextField label="Nomor Telepon" value={k.phone} onChange={(v) => set({ phone: v })} />
          <TextField label="Catatan WA" value={k.waNote} onChange={(v) => set({ waNote: v })} />
        </div>
        <div className="mt-3"><TextField label="Lokasi" value={k.location} onChange={(v) => set({ location: v })} /></div>
      </div>
    </>
  );
}

function FooterTab({ draft, update }: TabProps) {
  const f = draft.footer;
  const set = (patch: Partial<SiteContent["footer"]>) => update("footer", { ...f, ...patch });
  return (
    <div className="card">
      <h2 className="card-title">Footer</h2>
      <TextArea label="Tagline" value={f.tagline} onChange={(v) => set({ tagline: v })} rows={2} />
      <div className="grid-2 mt-3">
        <TextField label="Email" value={f.email} onChange={(v) => set({ email: v })} />
        <TextField label="Label WhatsApp" value={f.waLabel} onChange={(v) => set({ waLabel: v })} />
      </div>
      <div className="grid-2 mt-3">
        <TextField label="URL Instagram" value={f.instagram} onChange={(v) => set({ instagram: v })} />
        <TextField label="URL Facebook" value={f.facebook} onChange={(v) => set({ facebook: v })} />
      </div>
    </div>
  );
}
