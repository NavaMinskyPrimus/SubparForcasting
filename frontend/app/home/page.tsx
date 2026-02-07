import { HomePage } from "@/components/home-page";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { checkAuth,isAdmin } from "@/lib/authInteractions";
import { getDates } from "@/lib/settingsActions";
import { CURRENT_DATE } from "@/lib/constants";

export default async function Page() {
  checkAuth();
  const isa = await isAdmin();
  const res = await getDates();
  if (!res.ok) {
    throw new Error(res.error);
  }
  const open = new Date(res.data.open);
  const close = new Date(res.data.close);
  return <HomePage isAdmin={isa} open={open} close={close}/>;
}
