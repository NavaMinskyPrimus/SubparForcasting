import { AdminPage } from "@/components/admin-page";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { checkAuth,isAdmin } from "@/lib/authInteractions";
import { getQuestions } from "@/lib/questionsActions";
import { getDates } from "@/lib/settingsActions";
import { CURRENT_DATE } from "@/lib/constants";

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
  let year;
  if(CURRENT_DATE< close){
    year = open.getFullYear()
  }else{
    year = close.getFullYear()+1
  }
  const playing = (open <= CURRENT_DATE) && (CURRENT_DATE < close)
  const response = await getQuestions(year); 
  if(!response.ok){
    throw new Error(response.error);
  }
  const questions = response.data
  return <AdminPage rows={questions} isAdmin={isa} nextGame={year} playing={playing}/>;
}
