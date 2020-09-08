import styled from "@emotion/styled";
import { useRouter } from "next/router";

import LogInForm from "./components/LoginForm";

export default function LogInPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/");
  };

  return (
    <Container>
      <LogInForm onSuccess={handleSuccess} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
