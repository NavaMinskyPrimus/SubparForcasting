"use server"
import { auth } from "@/auth";
import type {ActionResult} from "@/lib/types";

export async function getDates(): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/settings/dates`;
  const session = await auth();
  const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${session?.idToken}` },
      });
  if(!response.ok){
    let message = `Backend error (${response.status})`;
    try {
      const body = await response.json();
      if (typeof body?.err === "string") {
        message = body.err;
      }
    } catch {
    }
    return {ok : false, error : message}
  }
  const data = await response.json();
  return { ok: true, data: data };
}

export async function setWindow({open,close}: {open: string; close: string}): Promise<ActionResult<string>> {
  const url = `${process.env.BACKEND_URL}/api/settings/dates`;
  const session = await auth();
  const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${session?.idToken}`,
                  "Content-Type": "application/json",},
        body: JSON.stringify({ questions_open: open, questions_close: close }),
        cache: "no-store",
      });
  if(!response.ok){
    let message = `Backend error (${response.status})`;
    try {
      const body = await response.json();
      if (typeof body?.err === "string") {
        message = body.err;
      }
    } catch {
    }
    return {ok : false, error : message}
  }
  const data = await response.json();
  return { ok: true, data: data };
}