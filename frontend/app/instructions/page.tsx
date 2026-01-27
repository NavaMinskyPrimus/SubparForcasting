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
  const open = new Date(dates.open)
  const isa = await isAdmin();
  const are_q_open = (open <= CURRENT_DATE) && (CURRENT_DATE < close);

  return <InstructionsPage isAdmin={isa} isOpen={are_q_open} dueDate={close.toDateString()}/>;
}
