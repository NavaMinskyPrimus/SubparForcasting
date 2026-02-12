import { QuestionsPage } from "@/components/questions-page";
import { checkAuth,isAdmin } from "@/lib/authInteractions";
import { getQuestions } from "@/lib/questionsActions";
import { getDates } from "@/lib/settingsActions";
import { CURRENT_DATE } from "@/lib/constants";
import {redirect} from "next/navigation";
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
  if (open > CURRENT_DATE || CURRENT_DATE >= close){
    redirect("/home");
  }
  const year = CURRENT_DATE.getFullYear()
  const response = await getQuestions(year); 
  if(!response.ok){
    throw new Error(response.error);
  }
  const rows = response.data
  return <QuestionsPage rows={rows} isAdmin={isa}/>;
}
