import styled from "@emotion/styled";
import NextLink from "next/link";
import { useRouter } from "next/router";

import Button from "~/components/core/Button";
import useLogOutMutation from "~/hooks/api/useLogOutMutation";
import useUserQuery from "~/hooks/api/useUserQuery";

export default function NavigationBar() {
  const router = useRouter();

  const [logOut] = useLogOutMutation();
  const { data: user } = useUserQuery();

  const handleLogOutClick = async () => {
    await logOut();
    window.location.href = "";
  };

  return (
    <Container>
      <NextLink href="/">
        <Brand>Links</Brand>
      </NextLink>
      <ButtonsContainer>
        {user && router.route === "/links" && (
          <Button onClick={handleLogOutClick}>Log out</Button>
        )}
        {user && router.route !== "/links" && (
          <NextLink href="/links">
            <Button as="a">{user.username}</Button>
          </NextLink>
        )}
        {!user && (
          <>
            <NextLink href="/login">
              <Button as="a">Log in</Button>
            </NextLink>
            <NextLink href="/signup">
              <Button as="a">Sign up</Button>
            </NextLink>
          </>
        )}
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;

  & > * + * {
    margin-left: 0.8rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;

  & > * + * {
    margin-left: 0.8rem;
  }
`;

const Brand = styled.a`
  font-size: 2.4rem;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
`;
