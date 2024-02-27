import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../header/core/Header';
import Footer from '../footer/core/Footer';

const Main = styled.main`
  background-color: var(--bg-main);
  padding-top: 7.4rem;
  @media screen and (max-width: 768px) {
    padding-top: 9.7rem;
  }
`;

function AppLayout() {
  return (
    <div>
      <Header />
      <Main >
        <Outlet  />
      </Main>
      <Footer />
    </div>
  );
}

export default AppLayout;
