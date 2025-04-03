import { StoryList } from "~/components/stories";
import { api } from "~/trpc/server";

export default async function StoriesPage() {
  const { stories } = await api.game.getStories({});

  return (
    <main className="min-h-screen w-full p-5">
      <h1 className="m-5 text-center text-5xl">Choose a story</h1>
      <StoryList arr={stories} />
    </main>
  );
}
