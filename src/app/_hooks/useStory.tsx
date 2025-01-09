"use client";

import { useParams } from "next/navigation";
import Histories from "~/config/histories";

export const useStory = () => {
  const { id } = useParams();
  const history = Histories.filter((h) => h.id + "" === id)[0];

  return history ?? null;
};
