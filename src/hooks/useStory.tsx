"use client";

import { useParams } from "next/navigation";
import Stories from "~/config/stories";

export const useStory = () => {
  const { id } = useParams();
  const history = Stories.find((h) => h.id + "" === id);

  return history ?? null;
};
