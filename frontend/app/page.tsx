import { signIn, signOut, auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
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

  return (
    <div>
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
