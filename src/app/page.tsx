import { HydrateClient } from "~/trpc/server";
import Welcome from "./_components/weclome";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <Welcome />
      </main>
    </HydrateClient>
  );
}
