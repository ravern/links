import { useQuery } from "react-query";

import useLinksQuery from "~/hooks/api/useLinksQuery";

export default function AllLinksPage() {
  console.log(useLinksQuery());
  return "";
}
