import ReactDOM from 'react-dom';
import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import Input from '../../components/ui/Input';
import Logo from '/images/logos/abak.png';
import { MdOutlineEmail } from 'react-icons/md';
import { MdOutlineVpnKey } from 'react-icons/md';
import { useMutation } from '@tanstack/react-query';
import { login } from './../../services/users';
import toast from 'react-hot-toast';
import { userActions } from './../../store/reducers/userReducers';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/error/Error';
import InputFieldsError from '../../components/error/InputFieldsError';
import Signup from './Signup';
import AuthModal from './AuthModal';
import doneSound from './../../../public/sounds/success_four.mp3';
import errorSound from './../../../public/sounds/error.mp3';
import LoadingAnimation from '../../components/loaders/LoadingAnimation';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const portalRoot = document.getElementById('portal-root');

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  top: 0;
  left: 0;
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
  color: var(--color-black);
  border-radius: 50px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const Login = ({ loginModal, close, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [signupModal, setSignupModal] = useState(false);
  const { t } = useTranslation();
  const emailValidationMessage = t('email_validation');
  const emailValidationEnterMessage = t('email_validation_enter');
  const passwordValidationMessage = t('password_validation');
  const passwordValidationEnterMessage = t('password_validation_enter');
  const login =t('login');


  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return login({
        name,
        email,
        password,
      });
    },
    onSuccess: (data) => {
      const audio = new Audio(doneSound);
      audio.onended = () => {
        close();
      };
      audio.play();
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account', JSON.stringify(data));
    },
    onError: (error) => {
      const audio = new Audio(errorSound);
      audio.play();
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  const handleClose = () => {
    close();
  };

  const openSignupModal = () => {
    setSignupModal(true);
    close();
  };

  if (signupModal) {
    close();
  }

  const contentRef = useRef();

  return ReactDOM.createPortal(
    <Background className={loginModal ? 'flex ' : 'hidden'}>
      <Content ref={contentRef}>
        <HeaderRow className="modalCloser" onClick={handleClose}>
          <div className="absolute top-[2.56rem] right-[2rem]">
            <span className="lineOne"></span>
            <span className="lineTwo"></span>
          </div>
        </HeaderRow>
        <div className=" w-full ">
          <img
            src={Logo}
            alt="abak"
            className="w-[8rem] h-auto absolute top-[11px] left-[15px] "
          />
          <div className="modal-action mt-0 flex flex-col justify-center ">
            <form onSubmit={handleSubmit(submitHandler)}>
              {isPending ? (
                <div className="flex justify-center mx-auto">
                  <LoadingAnimation />
                </div>
              ) : userState.userInfo !== null ? (
                <h3 className="login-intro-success pt-1">
                  {t('success_login')}
                </h3>
              ) : isError ? (
                <h3 className="login-intro-error pt-1">{t('fail_login')}</h3>
              ) : (
                <h3 className="login-intro pt-1">{t('hi_login')}</h3>
              )}
              <div className=" form-control relative  w-full mb-2">
                <label className="label input-label flex items-center">
                  <span>{t('input_email')} </span>
                  <MdOutlineEmail className="iconAuth" />
                </label>
                <Input
                  type="email"
                  placeholder={t('input_email')}
                  className="  input-bordered   input-text-color  mb-5 relative"
                  required
                  {...register('email', {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: emailValidationMessage,
                    },
                    required: {
                      value: true,
                      message: emailValidationEnterMessage,
                    },
                  })}
                />
                {errors.email?.message && (
                  <InputFieldsError message={errors.email?.message} />
                )}
              </div>
              <div className="form-control relative  w-full mb-2">
                <label className="label input-label flex items-center">
                  <span>{t('input_password')}</span>
                  <MdOutlineVpnKey className="iconAuth" />
                </label>
                <Input
                  type="password"
                  placeholder={t('input_password')}
                  className=" input-bordered input-text-color  mb-5 relative"
                  required
                  {...register('password', {
                    required: {
                      value: true,
                      message: passwordValidationEnterMessage,
                    },
                    minLength: {
                      value: 6,
                      message: passwordValidationMessage,
                    },
                  })}
                />
                {errors.password?.message && (
                  <InputFieldsError message={errors.password?.message} />
                )}
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={isPending}
                  className={
                    !isPending
                      ? 'auth-btn'
                      : 'auth-btn cursor-not-allowed opacity-95'
                  }
                >
                  {isPending ? (
                    <>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-[2rem] h-[2rem] me-3 text-white animate-spin   lg:w-[2.3rem] lg:h-[2.3rem]"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                     {t('login_loading')}
                    </>
                  ) : (
                    login
                  )}
                </button>
              </div>
              <p className="text-right have-no-account">
               {t('no_account')}
                <span
                  className="signup-link cursor-pointer"
                  onClick={openSignupModal}
                >
                {t('create_new_account')}
                </span>
              </p>
              {ErrorMessage && <Error message={ErrorMessage} />}
            </form>
          </div>
        </div>
      </Content>
      {signupModal && (
        <Signup signupModal={signupModal} close={() => setSignupModal(false)} />
      )}
    </Background>,

    portalRoot
  );
};

export default Login;
