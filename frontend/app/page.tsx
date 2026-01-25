import { signIn, signOut, auth } from "@/auth";
import { redirect } from "next/navigation";
import styles from "./landing.module.css";

export default async function Home() {
  const session = await auth();
 {/* Top image (not a banner overlay) */}
      <img
        src="/banner.png"
        alt="Subparforecasting illustration"
        className={styles.topImage}
      />

  // If already logged in, send them straight to /instructions
  if (session?.user) {
    redirect("/instructions");
  }

  // Otherwise, show the login form
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
