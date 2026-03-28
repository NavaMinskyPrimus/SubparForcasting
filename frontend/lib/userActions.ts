"use server"
import type {ActionResult} from "@/lib/actionUtils";
import {authedFetch} from  "@/lib/actionUtils";

export async function getUsers(): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/users`;
  return authedFetch(url, {method: "GET"})
}

export async function getMe(): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/users/me`;
  return authedFetch(url, {method: "GET"})
}

export async function makeAdmin(email: string): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/users/makeadmin`;
  return authedFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export async function makeUser(email: string): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/users/makeuser`;
  return authedFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export async function addSyntheticPlayer(
  name: string,
  answers: { questionid: number; probability: number }[]
): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/users/synthetic`;
  return authedFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, answers }),
  });
}