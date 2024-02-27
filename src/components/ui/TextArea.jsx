import styled, { css } from 'styled-components';

const TextArea = styled.textarea`
  flex-shrink: 1 !important;
  appearance: none !important;
  height: 13rem;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  font-size: 1.5rem !important;
  line-height: 2.8rem;
  border-radius: 0.4rem !important;
  border-width: 1px !important;
  padding: 0.8rem 2rem;
  background-color: #fafafa;
  outline: none;
  font-size: calc(var(--fs-text-n-4) + 0.2rem) !important;
  color: var(--color-black);

  &:focus-within {
    outline: 1px solid #d3d2d2;
  }

  @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    font-size: 1.7rem !important;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.7rem !important;
  }
  @media screen and (max-device-width: 450px) {
    font-size: 1.7rem !important;
    height: 11rem;
  }
`;
export default TextArea;
