import styled from "@emotion/styled";

import Button from "~/components/core/Button";
import Input from "~/components/core/Input";
import useCreateUserMutation from "~/hooks/api/useCreateUserMutation";
import useForm from "~/hooks/useForm";

export default function SignUpForm({ onSuccess }) {
  const [createUser] = useCreateUserMutation();

  const handleSubmit = async (values) => {
    await createUser(values);
    onSuccess();
  };

  const { values, onChange, onSubmit, error } = useForm({
    values: {
      email: "",
      username: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <Container>
      <Title>Sign up</Title>
      <InputsContainer>
        <EmailInput value={values.email} onChange={onChange("email")} />
        <UsernameInput
          value={values.username}
          onChange={onChange("username")}
        />
        <PasswordInput
          value={values.password}
          onChange={onChange("password")}
        />
      </InputsContainer>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton onClick={onSubmit}>Sign up</SubmitButton>
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

const EmailInput = styled(Input)``;

EmailInput.defaultProps = {
  placeholder: "Email",
};

const UsernameInput = styled(Input)``;

UsernameInput.defaultProps = {
  placeholder: "Username",
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
