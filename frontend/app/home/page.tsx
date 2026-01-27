import { HomePage } from "@/components/home-page";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { checkAuth,isAdmin } from "@/lib/authInteractions";

export default async function Page() {
  const session = checkAuth();
  const isa = await isAdmin();
  return <HomePage isAdmin={isa}/>;
}
