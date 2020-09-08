import styled from "@emotion/styled";
import connect from "next-connect";

import auth from "~/middleware/auth";

export default function IndexPage({ user }) {
  return <Button>{JSON.stringify(user)}</Button>;
}

export async function getServerSideProps({ req, res }) {
  await connect().use(auth()).apply(req, res);

  const { user } = req.state;

  return { props: { user } };
}

const Button = styled.button`
  background-color: red;
  border: none;
`;
