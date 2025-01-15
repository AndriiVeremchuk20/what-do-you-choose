"use client";

import { useParams } from "next/navigation";
import Histories from "~/config/histories";

export const useStory = () => {
  const { id } = useParams();
  const history = Histories.find((h) => h.id + "" === id);

  return history ?? null;
};
