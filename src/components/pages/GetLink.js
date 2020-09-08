import fetch from "~/helpers/fetch";

export default function GetLinkPage() {
  return "";
}

export async function getServerSideProps({ query: { slug }, res }) {
  let link;
  try {
    link = await fetch(`/links/${slug}`);
  } catch {
    return { props: {} };
  }

  res.writeHead(302, {
    Location: link.url,
  });
  res.end();

  return { props: {} };
}
