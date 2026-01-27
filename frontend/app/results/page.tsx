import { ResultsPage } from "@/components/results-page";

export default function Page() {
    const session = await auth();
    if (!session?.user) {
      redirect("/"); 
    }
  return <ResultsPage />;
}
