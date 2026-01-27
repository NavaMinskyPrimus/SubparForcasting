import { HomePage } from "@/components/home-page";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { checkAuth,isAdmin } from "@/lib/authInteractions";
import { getDates } from "@/lib/other-checks";
import { CURRENT_DATE } from "@/lib/constants";

export default async function Page() {
  const session = checkAuth();
  const isa = await isAdmin();
  const dates = await getDates();
  const open = new Date(dates.open);
  const close = new Date(dates.close);
  const are_q_open = (open <= CURRENT_DATE) && (CURRENT_DATE < close);
  return <HomePage isAdmin={isa} questionsAreOpen={are_q_open} dueDate={close.toDateString()}/>;
}
