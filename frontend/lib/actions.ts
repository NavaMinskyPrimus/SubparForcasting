"use server";

import { signIn, signOut } from "@/auth";

export async function loginWithGoogle() {
  console.log("User clicked checkout button");
  await signIn("google", { redirectTo: "/instructions" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
