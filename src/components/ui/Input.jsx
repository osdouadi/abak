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

const types = {
  field: css`
    color: var( --color-black-500);
    background-color: var(--color-white);
    border-radius: 100px;
    border-color: #dbdbdb;
    opacity: 1;
    transition: 0.3s;
    @media screen and (min-device-width: 768px) 
    and (max-device-width: 1024px) { 
      font-size: 1.6rem !important;
    }

 
    &:focus {
   outline: 0.135rem solid #d7d7d7;
    outline-offset: 1px;
    border-color: transparent;
    }
  `,
   button: css`   
    color: #FFF;
    background-color: var(--color-blue-600);
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: var(--color-blue-500);
    }
   `
};

const Input = styled.input`
    flex-shrink: 1 !important;
    appearance: none !important;
    height: 5.7rem !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    font-size: calc(var(--fs-text-n-4) + 0.2rem) !important;
    line-height: 1.25rem;
    border-radius: 0.4rem !important;
    border-width: 1px !important;
    background-color: #FAFAFA;


    @media screen and (max-width: 768px) {
      font-size: 1.7rem !important;
        height: 5.3rem !important;
    }
   
  
  ${(props) => sizes[props.size]}
  ${(props) => types[props.types]}
`;

Input.defaultProps = {
    types: 'field',
  size: 'medium',
};

export default Input;
