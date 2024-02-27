import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './../styles/user.css';
import { TbReport, TbShoppingCart } from 'react-icons/tb';
import { TbShoppingCartStar } from 'react-icons/tb';
import { TbShoppingCartCheck } from 'react-icons/tb';
import { TbShoppingCartExclamation } from 'react-icons/tb';
import { PiShoppingCartDuotone } from 'react-icons/pi';
import { AiTwotoneFileText } from 'react-icons/ai';
import { HiOutlineSupport } from 'react-icons/hi';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { HiOutlineHome } from 'react-icons/hi2';
import { AiTwotoneHome } from 'react-icons/ai';
import { useState } from 'react';
import Orders from '../orders/Order';
import { RiExternalLinkLine } from 'react-icons/ri';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { logout, statistics } from '../../../services/users';
import { MdOutlinePhoneInTalk } from 'react-icons/md';
import { FaRegEnvelopeOpen } from 'react-icons/fa';
import { userActions } from '../../../store/reducers/userReducers';
import doneSound from './../../../../public/sounds/success_four.mp3';
import errorSound from './../../../../public/sounds/error.mp3';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
function UserPanel() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = userState.userInfo.access_token;
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data } = useQuery({
    queryFn: () => statistics(token),
    queryKey: ['statistics'],
  });

  const {
    mutate: logoutMutate,
    isPending: logoutPending,
    isError: logoutError,
  } = useMutation({
    mutationFn: () => {
      return logout({ token });
    },
    onSuccess: (data) => {
      const audio = new Audio(doneSound);
      audio.onended = () => {
        close();
      };
      audio.play();
      dispatch(userActions.resetUserInfo(data));
      localStorage.removeItem('account', JSON.stringify());
      navigate('/');
    },
    onError: (error) => {
      const audio = new Audio(errorSound);
      audio.play();
      console.log(error);
    },
  });

  if (!userState || !userState.userInfo) {
    // Handle the case when the user is not authenticated
    return <div>Not authenticated</div>;
  }

  const logoutHandler = (data) => {
    const { token } = data;
    logoutMutate({ token });
  };


  const languages = [
    {
      code: 'ar',
      name: 'العربية',
      country_code: 'sa',
      dir: 'rtl',
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'us',
      dir: 'ltr',
    },
  ];

  const currentLanguageCode = cookies.get('i18next') || 'ar';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  return (
    <div className="user-panel">
      <div className="banner">
        <h1 className=" page-title text-center p-20">
          {t('technical_support')}
        </h1>
      </div>
      <div className="panel">
        <div className="sidebar">
          <ul className="sidebar-items">
            <li>
              <Link
                to="/user-panel"
                className={pathname === '/user-panel' ? 'active-link-user' : ''}
              >
                <AiTwotoneHome className="icon" />
                <span className="text-black">{t('main_panel')}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/user-panel/orders"
                className={
                  pathname === '/user-panel/orders' ? 'active-link-user' : ''
                }
              >
                <PiShoppingCartDuotone
                  className="icon"
                  activeClassName="active-link-user"
                />
                <span className="text-black">{t('orders_panel')}</span>
              </Link>
            </li>

            <li>
              <Link
                to="/user-panel/support"
                className={
                  pathname === '/user-panel/support' ? 'active-link-user' : ''
                }
              >
                <HiOutlineSupport
                  className="icon"
                  activeClassName="active-link-user"
                />
                <span className="text-black"> {t('technical_support')} </span>
              </Link>
            </li>
            <li>
              <a onClick={logoutHandler}>
                {logoutPending ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-[2rem] h-[2rem] me-3 text-blue-600 animate-spin   lg:w-[2.3rem] lg:h-[2.3rem]"
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
                ) : (
                  <RiLogoutCircleRLine
                    className="icon"
                    activeClassName="active-link-user"
                  />
                )}
                <span className="text-black"> {t('logout_panel')}</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="content">
          <h1 className="page-sub-title mb-14 text-black">
            {t('technical_support')}
          </h1>
          <div className="support-content pb-10">
            <p className="text-black">
              {t('technical_support_Desc_01')}
              </p>
              <p className="text-black">
              {t('technical_support_Desc_02')}
              </p>
              <p className="text-black">
              {t('technical_support_Desc_03')}
              </p>
              <p className="text-black">
              {t('technical_support_Desc_04')}
              </p>
            
                <p className="text-black">
              {t('technical_support_Desc_05')}
           
          
            </p>
          </div>
          <h1 className=" page-sub-title mb-14 text-black">{t("order_technical_support")}</h1>
          <div className="support-methods py-4 mt-3">
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <FaRegEnvelopeOpen className="support-icon" />
                <h3 className="text-black">{t("email")}</h3>
              </div>
              <p className="text-black">info@abak.com.sa</p>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-4">
                <MdOutlinePhoneInTalk className="support-icon" />
                <h3 className="text-black">{t("phone")}</h3>
              </div>
              <p className={currentLanguageCode ==='ar' ?  "text-black text-right" : "text-black text-left" } style={{ direction: 'ltr' }}> +966 53 122 2169</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
