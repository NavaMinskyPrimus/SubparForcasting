import { auth } from "@/auth";

export async function getDates() {
  const url = `${process.env.BACKEND_URL}/api/settings/dates`;
  const session = await auth();
  const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${session?.idToken}` },
      });
  return await response.json(); 
}