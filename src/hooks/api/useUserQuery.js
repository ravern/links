import { useQuery } from "react-query";

import fetch from "~/helpers/fetch";

export default function useUserQuery() {
  return useQuery("/users/me", getUser);
}

async function getUser() {
  return fetch("/users/me");
}
