import { useMutation } from "react-query";

import fetch from "~/helpers/fetch";

export default function useLogOutMutation() {
  return useMutation(logOut, {
    throwOnError: true,
  });
}

async function logOut(body) {
  return fetch("/auth/logout", { method: "DELETE", body });
}
