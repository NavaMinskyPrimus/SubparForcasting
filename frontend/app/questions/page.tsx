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
  const dates_res = await getDates();
  if (!dates_res.ok) {
    throw new Error(dates_res.error);
  }
  const open = new Date(dates_res.data.open);
  const close = new Date(dates_res.data.close);
  if (open > CURRENT_DATE || CURRENT_DATE >= close){
    redirect("/home");
  }
  const year = CURRENT_DATE.getFullYear()
  const question_res = await getQuestions(year); 
  if(!question_res.ok){
    throw new Error(question_res.error);
  }
  const rows = question_res.data

  return <QuestionsPage rows={rows} isAdmin={isa}/>;
}
