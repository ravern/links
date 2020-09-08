import styled from "@emotion/styled";

import Button from "~/components/core/Button";
import Input from "~/components/core/Input";
import useLoginMutation from "~/hooks/api/useLogInMutation";
import useForm from "~/hooks/useForm";

export default function LogInForm({ onSuccess }) {
  const [login] = useLoginMutation();

  const handleSubmit = async (values) => {
    await login(values);
  };

  const { values, onChange, onSubmit, error } = useForm({
    values: {
      emailOrUsername: "",
      password: "",
    },
    onSubmit: handleSubmit,
    onSuccess,
  });

  return (
    <Container>
      <Title>Log in</Title>
      <InputsContainer>
        <EmailOrUsernameInput
          value={values.emailOrUsername}
          onChange={onChange("emailOrUsername")}
        />
        <PasswordInput
          value={values.password}
          onChange={onChange("password")}
        />
      </InputsContainer>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton onClick={onSubmit}>Log in</SubmitButton>
    </Container>
  );
}

const Container = styled.form`
  width: 24ch;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 1.6rem;
  }
`;

const Title = styled.h1``;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 0.8rem;
  }
`;

const EmailOrUsernameInput = styled(Input)``;

EmailOrUsernameInput.defaultProps = {
  placeholder: "Email or Username",
};

const PasswordInput = styled(Input)``;

PasswordInput.defaultProps = {
  type: "password",
  placeholder: "Password",
};

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.error};
`;

const SubmitButton = styled(Button)``;
