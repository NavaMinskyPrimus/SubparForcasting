import { auth } from "@/auth";
import { CURRENT_DATE } from "./constants";

export async function getDates() {
  const current_date = CURRENT_DATE;
  const url = `${process.env.BACKEND_URL}/api/settings/dates`;
  const session = await auth();
  const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${session?.idToken}` },
      });
  return await response.json(); 
}