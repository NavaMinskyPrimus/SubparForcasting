"use server";

import { signIn, signOut, auth } from "@/auth";
import {redirect} from "next/navigation";

export async function loginWithGoogle() {
  console.log("User clicked checkout button");
  await signIn("google", { redirectTo: "/home" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function checkAuth(){
  const session = await auth();
    if (!session?.user) {
      redirect("/"); 
    }
  return session
}

export async function isAdmin(){
  const session = await auth();
  console.log("Checking admin status:");
  const url = `${process.env.BACKEND_URL}/api/users/me`;
  const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${session?.idToken}` },
      });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const body = await response.json(); 
  return (body.permission == "admin");

}