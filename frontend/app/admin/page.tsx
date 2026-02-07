import { AdminPage } from "@/components/admin-page";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { checkAuth,isAdmin } from "@/lib/authInteractions";
import { getQuestions } from "@/lib/questionsActions";
import { getDates } from "@/lib/settingsActions";

export default async function Page() {
  checkAuth();
  const isa = await isAdmin();
  if(!isa){
    redirect("/home");
  }
  const res = await getDates();
  if (!res.ok) {
    throw new Error(res.error);
  }
  const open = new Date(res.data.open);
  const close = new Date(res.data.close);
  const current_questions = await getQuestions(10); 
  return <AdminPage />;
}
