import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const admin = async () => (await import("@/integrations/supabase/client.server")).supabaseAdmin;

/** Crée un lien d'invitation valable 24 h. */
export const createInvite = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ guest: z.string().trim().min(2).max(80) }).parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const token = crypto.randomUUID().replace(/-/g, "");
    const { data: row, error } = await db.from("preach_invites").insert({ token, guest: data.guest }).select().single();
    if (error) throw new Error("Impossible de créer le lien.");
    return row;
  });

export const listInvites = createServerFn({ method: "GET" }).handler(async () => {
  const db = await admin();
  const { data } = await db.from("preach_invites").select("*").order("created_at", { ascending: false }).limit(30);
  return data ?? [];
});

export const revokeInvite = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    await db.from("preach_invites").delete().eq("id", data.id);
    return { ok: true };
  });

/** Vérifie un lien côté pasteur invité. */
export const checkInvite = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ token: z.string().min(8).max(64) }).parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: inv } = await db.from("preach_invites").select("guest, expires_at, used_at").eq("token", data.token).maybeSingle();
    if (!inv) return { status: "invalid" as const };
    if (inv.used_at) return { status: "used" as const };
    if (new Date(inv.expires_at) < new Date()) return { status: "expired" as const };
    return { status: "ok" as const, guest: inv.guest, expiresAt: inv.expires_at };
  });

export const submitGuestMeditation = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({
      token: z.string().min(8).max(64),
      book: z.string().trim().min(1).max(60),
      verse: z.string().trim().min(1).max(30),
      body: z.string().trim().min(10).max(500),
      servant: z.string().trim().min(2).max(80),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: inv } = await db.from("preach_invites").select("id, expires_at, used_at").eq("token", data.token).maybeSingle();
    if (!inv || inv.used_at || new Date(inv.expires_at) < new Date()) throw new Error("Lien invalide ou expiré.");
    const { error } = await db.from("guest_meditations").insert({
      invite_id: inv.id, book: data.book, verse: data.verse, body: data.body, servant: data.servant,
    });
    if (error) throw new Error("Envoi impossible.");
    await db.from("preach_invites").update({ used_at: new Date().toISOString() }).eq("id", inv.id);
    return { ok: true };
  });

/** Méditations reçues pas encore importées dans le tableau de bord. */
export const pendingGuestMeditations = createServerFn({ method: "GET" }).handler(async () => {
  const db = await admin();
  const { data } = await db.from("guest_meditations").select("*").eq("imported", false).order("created_at");
  return data ?? [];
});

export const markImported = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ ids: z.array(z.string().uuid()).max(50) }).parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    if (data.ids.length) await db.from("guest_meditations").update({ imported: true }).in("id", data.ids);
    return { ok: true };
  });
