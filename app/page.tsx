'use client';
import { useState, useEffect } from "react";
import { CalendarDays, Globe2, PlayCircle, CheckCircle2, Users, Star, Send } from "lucide-react";
import Countdown from "../components/Countdown";
import LogoMark from "../components/LogoMark";

const EVENT_TIME_WAT = "2025-09-20T19:00:00+01:00"; // shifted by one week

const copy = {
  en: {
    heroSubtitle: "A Night of Light & Remembrance ﷺ",
    heroTitle: "Global Digital Maulud 1447H",
    register: "Register Free",
    trailer: "Watch Trailer",
    donate: "Give Sadaqah",
    program: "Program Highlights",
    certificate: "Certificate Verification",
    verifyPlaceholder: "Enter Certificate ID (e.g., GD-1447-0001)",
    verify: "Verify",
    salawatWall: "Global Salawat Wall",
    postSalawat: "Post Salawat",
    name: "Full Name",
    email: "Email",
    country: "Country",
    submit: "Submit",
    success: "Registered! Check your email for confirmation.",
  },
  ar: {
    heroSubtitle: "ليلة نور وذكر ﷺ",
    heroTitle: "المولد النبوي العالمي الرقمي ١٤٤٧هـ",
    register: "سجّل مجانًا",
    trailer: "شاهد الإعلان",
    donate: "تبرّع",
    program: "فقرات البرنامج",
    certificate: "التحقق من الشهادة",
    verifyPlaceholder: "أدخل رقم الشهادة (مثال GD-1447-0001)",
    verify: "تحقّق",
    salawatWall: "جدار الصلوات العالمي",
    postSalawat: "أرسل الصلاة",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    country: "الدولة",
    submit: "إرسال",
    success: "تم التسجيل! تفقد بريدك للتأكيد.",
  },
  fr: {
    heroSubtitle: "Une Nuit de Lumière & de Souvenir ﷺ",
    heroTitle: "Mawlid Numérique Mondial 1447H",
    register: "Inscription Gratuite",
    trailer: "Voir la Bande-annonce",
    donate: "Faire un Don",
    program: "Programme",
    certificate: "Vérification du Certificat",
    verifyPlaceholder: "Entrez l'ID du Certificat (ex. GD-1447-0001)",
    verify: "Vérifier",
    salawatWall: "Mur Mondial de Salawat",
    postSalawat: "Publier",
    name: "Nom Complet",
    email: "Email",
    country: "Pays",
    submit: "Valider",
    success: "Inscription réussie ! Vérifiez votre email.",
  }
} as const;

export default function Page() {
  const [lang, setLang] = useState<'en'|'ar'|'fr'>('en');
  const t = copy[lang];

  // Register
  const [form, setForm] = useState({ name: "", email: "", country: "" });
  const [registered, setRegistered] = useState<string | null>(null);
  async function register(e: React.FormEvent){
    e.preventDefault();
    const res = await fetch("/api/register", { method:"POST", body: JSON.stringify({...form, lang}), headers: {"Content-Type":"application/json"} });
    const j = await res.json();
    setRegistered(j?.ok ? t.success : "Error");
  }

  // Salawat
  const [salawat, setSalawat] = useState("");
  const [feed, setFeed] = useState<string[]>([]);
  async function postSalawat(e: React.FormEvent){
    e.preventDefault();
    if(!salawat.trim()) return;
    const res = await fetch("/api/salawat", { method:"POST", body: JSON.stringify({ text: salawat, lang }), headers: {"Content-Type":"application/json"} });
    const j = await res.json();
    setFeed([j.text, ...feed].slice(0, 20));
    setSalawat("");
  }
  useEffect(()=>{ (async()=>{
    try{ const r = await fetch("/api/salawat"); const j = await r.json(); if(j?.items) setFeed(j.items.map((x:any)=>x.text)); }catch{}
  })(); },[]);

  // Verify
  const [certId, setCertId] = useState("");
  const [verifyMsg, setVerifyMsg] = useState<string | null>(null);
  async function verify(e: React.FormEvent){
    e.preventDefault();
    const res = await fetch("/api/verify", { method:"POST", body: JSON.stringify({ id: certId }), headers: {"Content-Type":"application/json"} });
    const j = await res.json();
    setVerifyMsg(j.valid ? "✅ Valid certificate" : "❌ Not found");
  }

  return (
    <div>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="section py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark/>
            <div className="leading-tight">
              <div className="text-sm text-yellow-300 font-semibold tracking-wide">{t.heroSubtitle}</div>
              <div className="text-xs text-emerald-200/80">Global Digital Maulud 1447H</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {(['en','ar','fr'] as const).map(code => (
              <button key={code} onClick={()=>setLang(code)} className={`px-3 py-1 rounded-full border border-white/10 ${lang===code?'bg-yellow-300 text-black':'bg-white/5'}`}>{code.toUpperCase()}</button>
            ))}
            <a href="#register" className="btn btn-primary hidden md:inline-flex"><CheckCircle2 className="w-4 h-4"/> {t.register}</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="section py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            <span className="text-yellow-300 block">{t.heroSubtitle}</span>
            <span className="mt-2 block text-emerald-100">{t.heroTitle}</span>
          </h1>
          <div className="mt-4 text-emerald-200/90 flex flex-col gap-1">
            <p className="flex items-center gap-2 text-sm"><CalendarDays className="w-4 h-4 text-yellow-300"/> Saturday, September 20, 2025 • 7:00 PM (WAT)</p>
            <p className="flex items-center gap-2 text-sm"><Globe2 className="w-4 h-4 text-yellow-300"/> YouTube Live + Zoom Webinar</p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#register" className="btn btn-primary"><CheckCircle2 className="w-5 h-5"/> {t.register}</a>
            <a href="#trailer" className="btn btn-ghost"><PlayCircle className="w-5 h-5 text-yellow-300"/> {t.trailer}</a>
          </div>
          <Countdown target={EVENT_TIME_WAT}/>
        </div>
        <div className="relative rounded-2xl border border-white/10 p-3 bg-white/5 shadow-2xl">
          <div className="aspect-video rounded-xl bg-[linear-gradient(135deg,rgba(200,162,74,0.25),rgba(15,81,50,0.25))] border border-yellow-300/30 flex items-center justify-center">
            <div className="text-center">
              <PlayCircle className="w-16 h-16 mx-auto text-yellow-300"/>
              <p className="mt-2 text-sm text-emerald-100">Live: YouTube + Zoom</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-emerald-100/90">
            <div className="card p-3 flex items-center gap-2"><Users className="w-4 h-4 text-yellow-300"/> 50k+ viewers</div>
            <div className="card p-3 flex items-center gap-2"><Star className="w-4 h-4 text-yellow-300"/> Certificate</div>
            <div className="card p-3 flex items-center gap-2"><Globe2 className="w-4 h-4 text-yellow-300"/> Worldwide</div>
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="section py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-6">{t.program}</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {["Opening Qur’an & Salawat","Scholars & Reciters (Global)","Poetic Presentation & Visual Dhikr","Global Du’a & Closing","Salawat Wall Open","Replay + Certificate"].map((title, i)=> (
            <div key={i} className="card p-5 hover:bg-white/10 transition">
              <div className="text-emerald-200/90 text-xs">{i<4 ? `00:${String(i*15).padStart(2,'0')}–00:${String((i+1)*15).padStart(2,'0')}` : "All Night"}</div>
              <div className="mt-1 font-semibold text-emerald-50">{title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SALAWAT + VERIFY */}
      <section className="section py-12 grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-xl md:text-2xl font-bold text-yellow-300 mb-4">{t.salawatWall}</h3>
          <form onSubmit={postSalawat} className="space-y-3">
            <textarea value={salawat} onChange={e=>setSalawat(e.target.value)} placeholder="Write your salawat / الصلاة على النبي ﷺ" className="w-full h-28"/>
            <button className="btn btn-primary w-full"><Send className="w-4 h-4"/> {t.postSalawat}</button>
          </form>
          <div className="mt-4 grid gap-3">
            {feed.map((s,i)=> (<div key={i} className="card p-3">{s}</div>))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-xl md:text-2xl font-bold text-yellow-300 mb-4">{t.certificate}</h3>
          <form onSubmit={verify} className="flex flex-col sm:flex-row gap-3">
            <input value={certId} onChange={e=>setCertId(e.target.value)} placeholder={t.verifyPlaceholder} className="flex-1"/>
            <button className="btn btn-primary">{t.verify}</button>
          </form>
          {verifyMsg && <div className="mt-3 text-sm">{verifyMsg}</div>}
        </div>
      </section>

      {/* REGISTER */}
      <section id="register" className="section pb-16">
        <div className="card p-6">
          <h3 className="text-xl md:text-2xl font-bold text-yellow-300 mb-2">{t.register}</h3>
          <form onSubmit={register} className="grid md:grid-cols-3 gap-4">
            <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder={t.name}/>
            <input value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder={t.email}/>
            <input value={form.country} onChange={e=>setForm({...form, country: e.target.value})} placeholder={t.country}/>
            <button className="md:col-span-3 btn btn-primary">{t.submit}</button>
          </form>
          {registered && <div className="mt-3 text-emerald-100">{registered}</div>}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30">
        <div className="section py-8 flex items-center justify-between">
          <div className="flex items-center gap-3"><LogoMark/><span className="font-semibold">Global Digital Maulud 1447H</span></div>
          <div className="text-sm text-emerald-200/80">© 1447H • All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
