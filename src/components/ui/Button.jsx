import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1rem 2.4rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-white);
    background-color: var(--color-blue-600);
    border-radius: 100px;

    &:hover {
      background-color: var(--color-blue-500);
    }
  `,
  secondary: css`
  color: var(--color-white);
  background-color: var(--color-brown-600);
  border-radius: 100px;

  &:hover {
    background-color: var(--color-brown-500);
  }
`,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
};

export default Button;
