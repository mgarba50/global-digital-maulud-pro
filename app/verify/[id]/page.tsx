import type { Metadata } from "next";
import { getSupabase } from "../../lib/supabaseServer";

export const metadata: Metadata = { title: "Verify Certificate – Global Digital Maulud" };

export default async function VerifyPage({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  let valid = false, name: string | null = null;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("certificates")
      .select("id,name")
      .eq("id", id)
      .maybeSingle();
    if (!error && data) { valid = true; name = data.name; }
  } catch {}
  return (
    <div className="min-h-screen section py-20">
      <h1 className="text-3xl font-bold text-yellow-300 mb-4">Certificate Verification</h1>
      <div className="card p-6">
        <p className="text-sm">Certificate ID: <span className="font-semibold">{id}</span></p>
        {valid ? (
          <div className="mt-3 text-green-300">✅ Valid certificate for <span className="font-semibold">{name}</span>.</div>
        ) : (
          <div className="mt-3 text-red-300">❌ Not found. Please check the ID.</div>
        )}
      </div>
    </div>
  );
}
