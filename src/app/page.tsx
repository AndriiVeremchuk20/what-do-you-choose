import { HydrateClient } from "~/trpc/server";
import Welcome from "~/components/weclome";

export default function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black px-10 text-white">
        <Welcome />
      </main>
    </HydrateClient>
  );
}
