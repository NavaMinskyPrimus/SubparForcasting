"use server"
import { auth } from "@/auth";

export type ActionResult<T> = { ok: true; data: T}  | { ok: false; error: string };
export async function authedFetch<T>(
  url: string,
  options: RequestInit
): Promise<ActionResult<T>> {
  const session = await auth();
  const res = await fetch(url, { 
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(session?.idToken
        ? { Authorization: `Bearer ${session.idToken}` }
        : {}),
      ...(options.headers as Record<string, string> | undefined),
    },
  });

  if (!res.ok) {
    let message = `Backend error (${res.status})`;
    if(res.status == 401 || res.status == 403){
      // TODO: Figure out what to do here.
    }
    try {
      const body = await res.json();
      if (typeof body?.err === "string") message = body.err;
    } catch {}
    return { ok: false, error: message };
  }
  if (res.status === 204) {
    return { ok: true, data: undefined as T };
  }

  return { ok: true, data: (await res.json()) as T };
}
