import { NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabaseServer";

export async function POST(req: Request) {
  const body = await req.json().catch(()=>null);
  if (!body?.email || !body?.name) return NextResponse.json({ ok:false, error:"Missing fields" }, { status: 400 });
  try {
    const supabase = getSupabase();
    await supabase.from("registrations").insert({
      name: body.name, email: body.email, country: body.country || "", lang: body.lang || "en"
    });
  } catch {}
  return NextResponse.json({ ok:true });
}
