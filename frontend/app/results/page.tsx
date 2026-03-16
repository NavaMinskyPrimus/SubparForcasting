import { ResultsPage } from "@/components/results-page";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getReleasedYear } from "@/lib/settingsActions";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const res = await getReleasedYear();
  if (!res.ok) {
    throw new Error(res.error);
  }
  return <ResultsPage releasedYear={res.data.released_year} />;
}
