import fetch from "~/helpers/fetch";

export default function LinkPage() {
  return "";
}

export async function getServerSideProps({ query: { slug }, res }) {
  let link;
  try {
    const res = await fetch(`/links/${slug}`);
    link = res.data;
  } catch {
    return { props: {} };
  }

  res.writeHead(302, {
    Location: link.url,
  });
  res.end();

  return { props: {} };
}
