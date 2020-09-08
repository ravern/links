import styled from "@emotion/styled";
import { useRouter } from "next/router";

import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/");
  };

  return (
    <Container>
      <LoginForm onSuccess={handleSuccess} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
