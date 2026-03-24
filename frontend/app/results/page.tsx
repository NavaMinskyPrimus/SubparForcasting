import { ResultsPage } from "@/components/results-page";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getReleasedYear } from "@/lib/settingsActions";
import { isAdmin } from "@/lib/authInteractions";

export default async function Page() {
  const session = await auth();
  const isa = await isAdmin();
  if (!session?.user) {
    redirect("/");
  }
  const res = await getReleasedYear();
  if (!res.ok) {
    throw new Error(res.error);
  }
  return <ResultsPage releasedYear={res.data.released_year} isAdmin={isa} />;
}
