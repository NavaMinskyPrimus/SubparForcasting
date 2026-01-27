import { HomePage } from "@/components/home-page";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { isAdmin } from "@/lib/authInteractions";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/"); 
  }
  const isa = await isAdmin();
  console.log(isAdmin);
  return <HomePage isAdmin={isa}/>;
}
