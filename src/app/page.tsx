import { HydrateClient } from "~/trpc/server";
import Welcome from "~/components/weclome";

export default function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center px-10">
        <Welcome />
      </main>
    </HydrateClient>
  );
}
