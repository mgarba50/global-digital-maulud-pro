'use client';
import { useEffect, useState } from "react";
export default function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(()=>{ setNow(new Date()); const t=setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(t);},[]);
  if (!now) return null;
  const tgt = new Date(target);
  const diff = Math.max(0, tgt.getTime() - now.getTime());
  const d = Math.floor(diff/86400000), h=Math.floor(diff/3600000)%24, m=Math.floor(diff/60000)%60, s=Math.floor(diff/1000)%60;
  const cells = [{label:"Days",value:d},{label:"Hours",value:h},{label:"Minutes",value:m},{label:"Seconds",value:s}];
  return (
    <div className="mt-6 grid grid-cols-4 gap-3 max-w-md">
      {cells.map((x,i)=> (
        <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
          <div className="text-3xl font-extrabold text-yellow-300 tabular-nums">{String(x.value).padStart(2,'0')}</div>
          <div className="text-[10px] uppercase tracking-widest text-emerald-200/80">{x.label}</div>
        </div>
      ))}
    </div>
  );
}
