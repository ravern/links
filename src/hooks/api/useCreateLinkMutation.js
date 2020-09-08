import { useMutation } from "react-query";

import fetch from "~/helpers/fetch";

export default function useCreateLinkMutation() {
  return useMutation(createLink, {
    throwOnError: true,
  });
}

async function createLink(body) {
  return fetch("/links", { method: "POST", body });
}
