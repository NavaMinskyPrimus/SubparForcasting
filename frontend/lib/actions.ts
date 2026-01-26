"use server";

import { signIn, signOut, auth } from "@/auth";

export async function loginWithGoogle() {
  console.log("User clicked checkout button");
  await signIn("google", { redirectTo: "/instructions" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function checkAuth(){
  return await auth();
}

export async function isAdmin(){
  const session = await auth();
}