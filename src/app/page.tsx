"use client";

import Welcome from "~/components/weclome";
import { api } from "~/trpc/react";
import { useEffect } from "react";

export default function Home() {
  const createUserMutations = api.user.createUser.useMutation({
    onSuccess(data) {
      console.log(data);
	  localStorage.setItem("token", data.token);
    },
  });

  useEffect(() => {
    createUserMutations.mutate({});
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-10">
      <Welcome />
    </main>
  );
}
