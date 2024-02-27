import ReactDOM from 'react-dom';
import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import './myModal.scss';
const portalRoot = document.getElementById('portal-root');

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999999;
`;
const Content = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 20px;
  max-width: 90%;
  width: 30%;
  max-height: 90%;
  box-shadow: 0 3px 15px -3px rgba(0, 0, 0, 0.2);
  transform: translate(50%, -50%);
  position: absolute;
  top: 46%;
  right: 50%;
  @media screen and (max-width: 850px) {
    width: 90%;
  }
`;
const HeaderRow = styled.h3`
  font-size: 18px;
  color: black;
  border-radius: 50px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const MyModal = ({ modalOpen, close, children }) => {
  console.log("modalOpen", modalOpen )
  const contentRef = useRef();

  useEffect(() => {
    function listener(e) {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        close();
      }
    }

    if (modalOpen) {
      window.addEventListener('mousedown', listener);
    }
    return () => {
      window.removeEventListener('mousedown', listener);
    };
  }, [modalOpen, close, contentRef]);

  if (!modalOpen) return null;
  return ReactDOM.createPortal(
    <Background>
      <Content ref={contentRef}>
        <HeaderRow className='modalCloser' onClick={close}>
          <div className='absolute top-[2.56rem] right-[2rem]'>
            <span className='lineOne'></span>
            <span className='lineTwo'></span>
          </div>

        </HeaderRow>
        {children}
      </Content>
    </Background>,
    portalRoot
  );
};

export default MyModal;
