import { useMutation } from "react-query";

import fetch from "~/helpers/fetch";

export default function useCreateUserMutation() {
  return useMutation(createUser, {
    throwOnError: true,
  });
}

async function createUser(body) {
  return fetch("/users", { method: "POST", body });
}
