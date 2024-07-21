import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  return (
    <div className="text-3xl text-pretty">
      Hello Dating
      <div>
        {session ? (
          <>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button variant="default" type="submit">
                Sign Out
              </Button>
            </form>
          </>
        ) : (
          <p> Not signed in</p>
        )}
      </div>
      <Button variant="default">Click</Button>
    </div>
  );
}
