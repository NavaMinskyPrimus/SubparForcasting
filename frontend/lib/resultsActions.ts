"use server"
import type { ActionResult } from "@/lib/actionUtils";
import { authedFetch } from "@/lib/actionUtils";

export async function computeResults(year: number): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/results/compute`;
  return authedFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ year }),
  });
}

export async function getResults(year: number): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/results?year=${year}`;
  return authedFetch(url, { method: "GET" });
}

export async function releaseResults(year: number): Promise<ActionResult<any>> {
  // TODO: implement release logic
  throw new Error("releaseResults not implemented");
}
