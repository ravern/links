import styled from "@emotion/styled";
import { useRouter } from "next/router";

import SignUpForm from "./components/SignUpForm";

export default function CreateUserPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/login");
  };

  return (
    <Container>
      <SignUpForm onSuccess={handleSuccess} />
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
