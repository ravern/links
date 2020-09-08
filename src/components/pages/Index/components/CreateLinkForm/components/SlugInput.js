import styled from "@emotion/styled";

import CoreInput from "~/components/core/Input";

export default function SlugInput({ value, onChange }) {
  return <Input value={value} onChange={onChange} />;
}

const Input = styled(CoreInput)``;

Input.defaultProps = {
  placeholder: "Custom slug (optional)",
};
