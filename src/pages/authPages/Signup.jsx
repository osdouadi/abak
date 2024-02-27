import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import MyModal from '../../components/header/components/login/MyModal';
import Input from './../../components/ui/Input';
import { MdOutlineEmail } from 'react-icons/md';
import { LuUser } from 'react-icons/lu';
import { useMutation } from '@tanstack/react-query';
import { signup } from './../../services/users';
import toast from 'react-hot-toast';
import { userActions } from './../../store/reducers/userReducers';
import InputFieldsError from '../../components/error/InputFieldsError';
import { IoKeyOutline } from 'react-icons/io5';
import Logo from '/images/logos/abak.png';
import styled from 'styled-components';
import Login from './Login';
import doneSound from './../../../public/sounds/success_four.mp3';
import errorSound from './../../../public/sounds/error.mp3';
import LoadingAnimation from '../../components/loaders/LoadingAnimation';
import { useTranslation } from 'react-i18next';
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
  width: 35%;
  max-height: auto;
  box-shadow: 0 3px 15px -3px rgba(0, 0, 0, 0.2);
  transform: translate(50%, -50%);
  position: absolute;
  top: 50%;
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
  height: 17px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const Signup = ({ signupModal, close, children }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [currentModal, setCurrentModal] = useState(null);
  const [loginModal, setLoginModal] = useState(false);
  const { t } = useTranslation();
  const nameValidationMessage = t('name_validation');
  const nameValidationEnterMessage = t('name_validation_enter');
  const emailValidationMessage = t('email_validation');
  const emailValidationEnterMessage = t('email_validation_enter');
  const passwordValidationMessage = t('password_validation');
  const passwordValidationEnterMessage = t('password_validation_enter');
  const createTheAccount = t('create_the_account')

  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({
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
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({
      name,
      email,
      password,
    });
  };

  const handleClose = () => {
    close();
  };

  const openLoginModal = () => {
    setLoginModal(true);
  };
  return ReactDOM.createPortal(
    <Background className={!loginModal ? 'flex ' : 'hidden'}>
      <Content>
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
          {isPending ? (
            <div className="flex justify-center mx-auto">
              <LoadingAnimation />
            </div>
          ) : userState.userInfo !== null ? (
            <h3 className="signup-intro-success pt-1">{t('success_signup')}</h3>
          ) : isError ? (
            <h3 className="signup-intro-error pt-1">{t('fail_signup')}</h3>
          ) : (
            <h3 className="signup-intro pt-1">{t('hi_signup')}</h3>
          )}
          <div className="modal-action mt-0 flex flex-col justify-center    ">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="form-fields flex flex-col">
                <div className="flex flex-col  gap-4  ">
                  <div className="form-control relative  w-full  ">
                    <label
                      className="label input-label flex items-center "
                      htmlFor="name"
                    >
                      <span>{t('input_full_name')}</span>
                      <LuUser className="iconAuth" />
                    </label>
                    <Input
                      type="text"
                      placeholder={t('input_full_name')}
                      className=" input-bordered   input-text-color  mb-2 relative"
                      required
                      id="name"
                      {...register('name', {
                        minLength: {
                          value: 3,
                          message: nameValidationMessage,
                        },
                        required: {
                          value: true,
                          message: nameValidationEnterMessage,
                        },
                      })}
                    />

                    {errors.name?.message && (
                      <InputFieldsError message={errors.name?.message} />
                    )}
                  </div>
                  <div className="form-control relative ">
                    <label className="label input-label flex items-center ">
                      <span className="">{t('input_email')}</span>

                      <MdOutlineEmail className="iconAuth" />
                    </label>
                    <Input
                      type="email"
                      placeholder={t('input_email')}
                      className="   input-bordered  input-text-color mb-2 relative"
                      required
                      {...register('email', {
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: emailValidationMessage,
                        },
                        required: {
                          value: true,
                          message: nameValidationEnterMessage,
                        },
                      })}
                    />
                    {errors.email?.message && (
                      <InputFieldsError message={errors.email?.message} />
                    )}
                  </div>
                  <div className="form-control relative   ">
                    <label className="label input-label flex items-center ">
                      <span className="">{t('input_password')}</span>
                      <IoKeyOutline className="iconAuth" />
                    </label>
                    <Input
                      type="password"
                      placeholder={t('input_password')}
                      className="input-bordered  input-text-color mb-2 relative"
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
                      <p className="text-red-500 text-xs mt-1">
                        <InputFieldsError message={errors.password?.message} />
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-control mt-7">
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
                        {t("signup_loading")}
                      </>
                    ) : (
                    createTheAccount
                    )}
                  </button>
                </div>

                <p className="have-account text-right  ">
                {t("have_account")}
                  <span
                    onClick={openLoginModal}
                    className="login-link  cursor-pointer"
                  >
                      {t("login")}
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Content>
      {loginModal && (
        <Login loginModal={loginModal} close={() => setLoginModal(false)} />
      )}
    </Background>,
    portalRoot
  );
};

export default Signup;
