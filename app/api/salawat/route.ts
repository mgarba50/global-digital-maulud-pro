import { NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabaseServer";

export async function POST(req: Request) {
  const body = await req.json().catch(()=>null);
  const text = String(body?.text || "").slice(0, 500);
  if (!text) return NextResponse.json({ ok:false }, { status: 400 });
  try {
    const supabase = getSupabase();
    await supabase.from("salawat").insert({ text, lang: body?.lang || "en" });
  } catch {}
  return NextResponse.json({ ok:true, text });
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data } = await supabase.from("salawat").select("text,created_at").order("created_at", { ascending:false }).limit(20);
    return NextResponse.json({ ok:true, items: data || [] });
  } catch {
    return NextResponse.json({ ok:true, items: [] });
  }
}
