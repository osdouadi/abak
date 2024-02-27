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
    padding: 1.2rem 1.6rem;
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
    color: #fafafa;
    border: none;
    background-color: var(--color-blue);
    padding: 10px 15px;
    font-size: 2rem;
    font-weight: 400;
    border-radius: 100px;
    transition: .5s;
    &:hover {
      background-color: var(--color-blue-hover);
    }

    @media screen and (min-device-width: 768px) 
    and (max-device-width: 1024px) { 
      font-size: 1.7rem;
    }
    
    @media screen and (min-device-width: 450px) 
    and (max-device-width: 768px) {
      font-size: 1.5rem;
    }
  `,
  secondary: css`
    color: var(--color-blue);
    outline: 0.17rem solid var(--color-blue);
    padding: 10px 15px;
    font-size: 2rem;
    font-weight: 500;
    border-radius: 100px;
    transition: .5s;
    &:hover {
      background-color: var(--color-blue);
      color: #FAFAFA;
      outline: none;
    }

    @media screen and (min-device-width: 768px) 
    and (max-device-width: 1024px) { 
      font-size: 1.7rem;
    }

    @media screen and (min-device-width: 450px) 
    and (max-device-width: 768px) {
      font-size: 1.5rem;
    }

  `,
  authBtnOne: css`
    color: #FAFAFA;
    background-color: #19526d;
    border-radius: 100px;

 
  `,
};

const Button = styled.button`
  border: none;
  ${(props) => sizes[props.sizes]}
  ${(props) => variations[props.variations]}
`;

Button.defaultProps = {
  variations: 'primary',
  size: 'medium',
};
export default Button;
