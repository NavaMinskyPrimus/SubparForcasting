import { InstructionsPage } from "@/components/instructions-page";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { checkAuth, isAdmin } from "@/lib/authInteractions";
import { getDates } from "@/lib/other-checks";
import { CURRENT_DATE } from "@/lib/constants";

export default async function Page() {
  await checkAuth();
  const dates = await getDates();
  const close = new Date(dates.close)
  const isa = await isAdmin();
  
  return <InstructionsPage isAdmin={isa} dueDate={close.toDateString()}/>;
}
