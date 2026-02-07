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