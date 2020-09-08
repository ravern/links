import styled from "@emotion/styled";
import NextLink from "next/link";

import Button from "~/components/core/Button";
import useUserQuery from "~/hooks/api/useUserQuery";

export default function NavigationBar() {
  const { data: user } = useUserQuery();

  return (
    <Container>
      <Brand>Links</Brand>
      <ButtonsContainer>
        {user ? (
          <NextLink href="/links">
            <Button as="a">{user.username}</Button>
          </NextLink>
        ) : (
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

const Brand = styled.span`
  font-size: 2.4rem;
  font-weight: bold;
`;
