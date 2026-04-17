import { ResultsPage } from "@/components/results-page";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getReleasedYear, getDates } from "@/lib/settingsActions";
import { isAdmin } from "@/lib/authInteractions";
import { CURRENT_DATE } from "@/lib/constants";

export default async function Page() {
  const session = await auth();
  const isa = await isAdmin();
  if (!session?.user) {
    redirect("/");
  }
  const [res, datesRes] = await Promise.all([getReleasedYear(), getDates()]);
  if (!res.ok) {
    throw new Error(res.error);
  }
  if (!datesRes.ok) {
    throw new Error(datesRes.error);
  }
  const open = new Date(datesRes.data.open);
  const close = new Date(datesRes.data.close);
  const isOpen = open <= CURRENT_DATE && CURRENT_DATE < close;
  return <ResultsPage releasedYear={res.data.released_year} isAdmin={isa} playing={isOpen} />;
}
