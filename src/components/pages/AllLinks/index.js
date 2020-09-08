import styled from "@emotion/styled";
import connect from "next-connect";

import NavigationBar from "~/components/shared/NavigationBar";
import auth from "~/middleware/auth";

export default function AllLinksPage({ user }) {
  return (
    <Container>
      <NavigationBar user={user} />
    </Container>
  );
}

export async function getServerSideProps({ req, res }) {
  await connect().use(auth()).apply(req, res);

  const { user } = req.state;

  return { props: { user } };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 64ch;
  height: 100vh;
`;
