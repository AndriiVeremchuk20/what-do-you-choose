import { StoryList } from "~/components/stories";
import Stories from "~/config/stories";

export default function StoriesPage() {
  return (
    <main className="min-h-screen w-full bg-black p-5 text-white">
      <h1 className="m-5 text-center text-5xl">Choose a story</h1>
      <StoryList arr={Stories} />
    </main>
  );
}
