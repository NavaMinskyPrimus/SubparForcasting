import { InstructionsPage } from "@/components/instructions-page";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { checkAuth, isAdmin } from "@/lib/authInteractions";
import { getDates } from "@/lib/settingsActions";
import { CURRENT_DATE } from "@/lib/constants";

export default async function Page() {
  await checkAuth();
  const isa = await isAdmin();
  const result = await getDates();
  if (!result.ok) {
    throw new Error(result.error);
  }
  const open = new Date(result.data.open);
  const close = new Date(result.data.close);
  return <InstructionsPage isAdmin={isa} open={open} close={close}/>;
}
