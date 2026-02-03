import { AdminPage } from "@/components/admin-page";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { checkAuth,isAdmin } from "@/lib/authInteractions";

export default async function Page() {
  checkAuth();
  const isa = await isAdmin();
  if(!isa){
    redirect("/home");
  }
  const current_questions = null
  return <AdminPage />;
}
