"use server"
import { auth } from "@/auth";
import type {ActionResult} from "@/lib/actionUtils";
import { logout } from "./authInteractions";
import {authedFetch} from  "@/lib/actionUtils";

export async function getDates(): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/settings/dates`;
  return authedFetch(url,{method: "GET",} )
}

export async function setWindow({open,close}: {open: string; close: string}): Promise<ActionResult<string>> {
  const url = `${process.env.BACKEND_URL}/api/settings/dates`;
  return authedFetch(url, {method: "POST", body: JSON.stringify({ questions_open: open, questions_close: close }),})
}

export async function getReleasedYear(): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/settings/released-year`;
  return authedFetch(url, { method: "GET" });
}

export async function setReleasedYear(year: number): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/settings/released-year`;
  return authedFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ year }),
  });
}