"use client";

import { Game } from "~/components/game";
import { StoryNotFound } from "~/components/story-not-found";
import { useStory } from "~/hooks/useStory";

export default function HistoryPage() {
  const story = useStory();

  if (!story) return <StoryNotFound />;

  return <Game storyTemplate={story} />;
}
