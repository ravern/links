import styled from "@emotion/styled";
import connect from "next-connect";

import auth from "~/middleware/auth";

import CreateLinkForm from "./components/CreateLinkForm";

export default function IndexPage({ user }) {
  const handleSuccess = () => {};

  return (
    <Container>
      <CreateLinkForm onSuccess={handleSuccess} />
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
