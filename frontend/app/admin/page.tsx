import { AdminPage } from "@/components/admin-page";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { checkAuth,isAdmin } from "@/lib/authInteractions";
import { getQuestions } from "@/lib/questionsActions";
import { getDates, getReleasedYear } from "@/lib/settingsActions";
import { CURRENT_DATE } from "@/lib/constants";
import { getUsers } from "@/lib/userActions";

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
  const questionsnew = response.data;

  const last_year_response = await getQuestions(year - 1);
  if(!last_year_response.ok){
    throw new Error(last_year_response.error);
  }

  const users_response = await getUsers();
  if(!users_response.ok){
    throw new Error(users_response.error);
  }
  const released_year_response = await getReleasedYear();
  if(!released_year_response.ok){
    throw new Error(released_year_response.error);
  }
  return <AdminPage rowsnext={questionsnew} rowslast={last_year_response.data} isAdmin={isa} nextGame={year} playing={playing} users={users_response.data} initialReleasedYear={released_year_response.data.released_year}/>;
}
