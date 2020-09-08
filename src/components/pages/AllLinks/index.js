import styled from "@emotion/styled";
import connect from "next-connect";

import NavigationBar from "~/components/shared/NavigationBar";
import useLinksQuery from "~/hooks/api/useLinksQuery";
import auth from "~/middleware/auth";

export default function AllLinksPage() {
  const { data: links } = useLinksQuery();

  return (
    <Container>
      <NavigationBar />
      <LinksContainer>
        {links?.map((link) => (
          <LinkContainer key={link.id}>
            <LinkSlug>{link.slug}</LinkSlug>
            <LinkURL>{link.url}</LinkURL>
          </LinkContainer>
        ))}
      </LinksContainer>
    </Container>
  );
}

export async function getServerSideProps({ req, res }) {
  await connect()
    .use(auth({ protect: true }))
    .apply(req, res);

  const { user } = req.state;

  return { props: { user: user ?? null } };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 64ch;
  height: 100vh;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;

  & > * + * {
    margin-top: 0.8rem;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.lightGray};
  border-radius: 0.4rem;
  padding: 0.8rem;
`;

const LinkSlug = styled.span``;

const LinkURL = styled.span``;
