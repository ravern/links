import styled from "@emotion/styled";
import connect from "next-connect";

import NavigationBar from "~/components/shared/NavigationBar";
import auth from "~/middleware/auth";

import CreateLinkForm from "./components/CreateLinkForm";

export default function IndexPage() {
  const handleSuccess = () => {};

  return (
    <Container>
      <NavigationBar />
      <CenterContainer>
        <CreateLinkForm onSuccess={handleSuccess} />
      </CenterContainer>
    </Container>
  );
}

export async function getServerSideProps({ req, res }) {
  await connect().use(auth()).apply(req, res);

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

const CenterContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
