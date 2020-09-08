import { useQuery } from "react-query";

import fetch from "~/helpers/fetch";

export default function useLinksQuery() {
  return useQuery("/links", getLinks);
}

async function getLinks() {
  return fetch("/links");
}
