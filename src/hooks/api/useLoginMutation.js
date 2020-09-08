import { useMutation } from "react-query";

import fetch from "~/helpers/fetch";

export default function useLinksQuery() {
  return useMutation(login, {
    throwOnError: true,
  });
}

async function login(body) {
  return fetch("/auth/login", { method: "POST", body });
}
