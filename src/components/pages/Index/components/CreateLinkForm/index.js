import styled from "@emotion/styled";
import isEmpty from "lodash/isEmpty";

import Button from "~/components/core/Button";
import Input from "~/components/core/Input";
import useCreateLinkMutation from "~/hooks/api/useCreateLinkMutation";
import useForm from "~/hooks/useForm";

import SlugInput from "./components/SlugInput";

export default function CreateLinkForm({ onSuccess }) {
  const [createLink, { status: createLinkStatus }] = useCreateLinkMutation();

  const { values, onChange, onSubmit, error } = useForm({
    values: {
      url: "",
      slug: "",
    },
    onSubmit: async (values) => {
      return await createLink({
        ...values,
        slug: isEmpty(values.slug) ? undefined : values.slug,
      });
    },
    onSuccess: (link) => {
      onChange("url")(`${process.env.BASE_URL}/${link.slug}`);
      onSuccess();
    },
  });

  const handleURLInputFocus = (e) => {
    e.target.select();
  };

  return (
    <Container>
      <Title>Shorten link here!</Title>
      <InputsContainer>
        <URLInput
          value={values.url}
          onChange={onChange("url")}
          onFocus={handleURLInputFocus}
        />
        <SlugInput value={values.slug} onChange={onChange("slug")} />
      </InputsContainer>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton onClick={onSubmit}>
        {createLinkStatus !== "idle" ? "Shorten again" : "Shorten!"}
      </SubmitButton>
    </Container>
  );
}

const Container = styled.form`
  width: 32ch;
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

const URLInput = styled(Input)``;

URLInput.defaultProps = {
  placeholder: "Paste your link here",
};

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.error};
`;

const SubmitButton = styled(Button)``;
