import { StoryList } from "~/components/stories";
import Stories from "~/config/stories";

export default function StoriesPage() {
  return (
    <main className="min-h-screen w-full p-5">
      <h1 className="m-5 text-center text-5xl">Choose a story</h1>
      <StoryList arr={Stories} />
    </main>
  );
}
