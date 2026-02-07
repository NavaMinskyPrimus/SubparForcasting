"use server"
import { auth } from "@/auth";
import type {ActionResult} from "@/lib/types";

export async function getQuestions(year: number): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/questions/year?year=${encodeURIComponent(year)}`;
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

