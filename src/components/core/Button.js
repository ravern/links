import styled from "@emotion/styled";
import { darken } from "polished";

const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.colors.darkGray};
  padding: 0.8rem;
  border-radius: 0.4rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => darken(0.04, props.theme.colors.darkGray)};
  }
`;

export default Button;
