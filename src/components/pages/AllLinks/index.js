import useLinksQuery from "~/hooks/api/useLinksQuery";

export default function AllLinksPage() {
  const { data, error, status } = useLinksQuery();

  return "asdf";
}
