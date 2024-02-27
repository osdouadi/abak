import styled from 'styled-components';
import MainNav from '../components/MainNav';
import "./../styles/header.css"
const StyledHeader = styled.header`
  background-color: #fff;
  padding: 0.989rem;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
  @media screen and (max-width: 850px){
    padding-right: 0px;
  }
  `;

function Header() {
  return (
    <StyledHeader>
      <MainNav />
    </StyledHeader>
  );
}

export default Header;
