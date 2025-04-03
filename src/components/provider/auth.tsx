"use client";

import { useEffect, type ReactNode } from "react";
import { api, token } from "~/trpc/react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const createUserMutations = api.user.createUser.useMutation({
    onSuccess(data) {
      console.log(data);
      localStorage.setItem("token", data.token);
      token.current = data.token;
    },
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) return createUserMutations.mutate({});

    token.current = localStorage.getItem("token");
    console.log("token");
  }, []);

  return <>{children}</>;
};
