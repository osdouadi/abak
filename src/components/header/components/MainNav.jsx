import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LuUserCircle } from 'react-icons/lu';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseOutline, IoLanguageSharp } from 'react-icons/io5';
import {
  HiHome,
  HiInformationCircle,
  HiViewGrid,
  HiFolderOpen,
  HiCreditCard,
  HiSpeakerphone,
} from 'react-icons/hi';
import { FaRegUser } from 'react-icons/fa';
import MyModal from './../components/login/MyModal';
import GradientIcon from '../styles/GradientIcon';
import * as StyledComponents from './../styles/MainNavStyles';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { BiSupport } from 'react-icons/bi';
import { GrLanguage } from 'react-icons/gr';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import './../styles/header.css';
import i18next from 'i18next';
import { MdArchitecture } from 'react-icons/md';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { MdDesignServices } from 'react-icons/md';
import { LuFileBarChart } from 'react-icons/lu';
import { MdOutlineDesignServices } from 'react-icons/md';
import { HiOutlineHome } from 'react-icons/hi2';
import { IoPricetagsOutline } from 'react-icons/io5';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { RiBuilding2Line } from 'react-icons/ri';
import Logo from '/images/logos/abak.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserAccount from '/public/images/general/user.svg';
import Login from '../../../pages/authPages/Login';
import Cookies from 'js-cookie';

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

function MainNav({ close }) {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const userState = useSelector((state) => state.user);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const currentLanguageCode = cookies.get('i18next') || 'ar';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'rtl';
    document.title = t('app_title');
    setIsDropdownOpen(false);
  }, [currentLanguage, t]);

  let AnimatedIconVars = {};
  const isMobile = window.innerWidth < 850;
  if (isMobile) {
    AnimatedIconVars = {
      hidden: {
        opacity: 0,
        x: '100vw',
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: 'spring',
          delay: 0.3,
          mass: 0.5,
          damping: 10,
          staggerChildren: 2,
        },
      },
    };
  }

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (code) => {
    i18next.changeLanguage(code);
    Cookies.set(`i18next`, code, { expires: 90 });
  
  };


  

  return (
    <div className="container-nav px-0">
      <div className="mobile_nav_items">
        <div
          className={isOpen ? 'menu-icon-close' : 'menu-icon'}
          onClick={handleMenu}
        >
          {isOpen === false ? (
            <RxHamburgerMenu className="icon" />
          ) : (
            <IoCloseOutline className="icon " />
          )}
        </div>
        <div className="user-sec flex items-center gap-5 max-w-xs z-0">
          {userState.userInfo ? (
            <Link to="/user-panel" user={user}>
              <LuUserCircle
                style={{ fontSize: '2.2rem', color: 'var(--color-blue)' }}
                className="mainNav-icon"
              />
            </Link>
          ) : (
            <button className="loginBtn" onClick={() => setLoginModal(true)}>
              <span>{t('login_btn')}</span>
              <StyledComponents.UserAccountIcon>
                <LuUserCircle
                  style={{
                    fontSize: '2.4rem',
                    color: 'var(--color-blue)',
                    cursor: 'pointer',
                  }}
                />
              </StyledComponents.UserAccountIcon>
            </button>
          )}
        </div>
        <Link className="customer-support" to="/client-support">
          <BiSupport
            style={{
              fontSize: '2.4rem',
              color: 'var(--color-blue)',
              cursor: 'pointer',
            }}
            className="mainNav-icon"
          />
        </Link>

        <div className="lang-dropdown" >
          <button
            onClick={toggleDropdown}
            className="lang-dropdown-text flex items-center text-[1.5rem] gap-1"
            
          >
            <span
              className={`fi fi-${currentLanguage.country_code} mx-2  lang-dropdown-icon`}
            ></span>
            {currentLanguage.name}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content relative">
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 absolute ">
                {languages.map(({ code, name, country_code }) => (
                  <li
                    key={country_code}
                    style={{ opacity: code === currentLanguageCode ? 0.5 : 1 }}
                  >
                    <button
                      className="text-[1.3rem] lg:text-[1.7rem] lg:font-semibold"
                      onClick={() => {
                        changeLanguage(code);
                      }}
                      disabled={currentLanguageCode === code}
                    >
                      <span
                        className={`fi fi-${country_code} mx-2 text-[1.7rem]`}
                      ></span>
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <nav className="nav-menu ">
        <ul className={isOpen ? `nav-list top-0  ` : 'nav-list top-[-700px]'}>
          <li className=" list-link-fst ">
            <StyledComponents.StyledNavLink to="/">
              <motion.div
                variants={AnimatedIconVars}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
              >
                <StyledComponents.MobileMenuIcon>
                  <HiOutlineHome className="list-icon" />
                </StyledComponents.MobileMenuIcon>
              </motion.div>
              <StyledComponents.NavMenuItemContainer>
                <StyledComponents.NavMenuItemTitle>
                  {t('home_list')}
                </StyledComponents.NavMenuItemTitle>
                <StyledComponents.NavMenuItemDescription>
                  {t('home_list_description')}
                </StyledComponents.NavMenuItemDescription>
              </StyledComponents.NavMenuItemContainer>
            </StyledComponents.StyledNavLink>
          </li>
          <li>
            <StyledComponents.StyledNavLink to="/about">
              <motion.div
                variants={AnimatedIconVars}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
              >
                <StyledComponents.MobileMenuIcon>
                  <RiBuilding2Line className="list-icon" />
                </StyledComponents.MobileMenuIcon>
              </motion.div>
              <StyledComponents.NavMenuItemContainer>
                <StyledComponents.NavMenuItemTitle>
                  {t('about_list')}
                </StyledComponents.NavMenuItemTitle>
                <StyledComponents.NavMenuItemDescription>
                  {t('about_list_description')}
                </StyledComponents.NavMenuItemDescription>
              </StyledComponents.NavMenuItemContainer>
            </StyledComponents.StyledNavLink>
          </li>
          <li>
            <StyledComponents.StyledNavLink to="/#portfolio-section">
              <motion.div
                variants={AnimatedIconVars}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
              >
                <StyledComponents.MobileMenuIcon>
                  <LuFileBarChart className="list-icon" />
                </StyledComponents.MobileMenuIcon>
              </motion.div>
              <StyledComponents.NavMenuItemContainer>
                <StyledComponents.NavMenuItemTitle>
                  {t('portfolio_list')}
                </StyledComponents.NavMenuItemTitle>
                <StyledComponents.NavMenuItemDescription>
                  {t('portfolio_list_description')}
                </StyledComponents.NavMenuItemDescription>
              </StyledComponents.NavMenuItemContainer>
            </StyledComponents.StyledNavLink>
          </li>
          <li>
            <StyledComponents.StyledNavLink
              to="/#services-section"
            >
              <motion.div
                variants={AnimatedIconVars}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
              >
                <StyledComponents.MobileMenuIcon>
                  <MdArchitecture className="list-icon" />
                </StyledComponents.MobileMenuIcon>
              </motion.div>
              <StyledComponents.NavMenuItemContainer>
                <StyledComponents.NavMenuItemTitle>
                  {t('services_list')}
                </StyledComponents.NavMenuItemTitle>
                <StyledComponents.NavMenuItemDescription>
                  {t('services_list_description')}
                </StyledComponents.NavMenuItemDescription>
              </StyledComponents.NavMenuItemContainer>
            </StyledComponents.StyledNavLink>
          </li>
       
          <li>
            <StyledComponents.StyledNavLink to="/pricing">
              <motion.div
                variants={AnimatedIconVars}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
              >
                <StyledComponents.MobileMenuIcon>
                  <IoPricetagsOutline className="list-icon" />
                </StyledComponents.MobileMenuIcon>
              </motion.div>
              <StyledComponents.NavMenuItemContainer>
                <StyledComponents.NavMenuItemTitle>
                  {t('pricing_list')}
                </StyledComponents.NavMenuItemTitle>
                <StyledComponents.NavMenuItemDescription>
                  {t('pricing_list_description')}
                </StyledComponents.NavMenuItemDescription>
              </StyledComponents.NavMenuItemContainer>
            </StyledComponents.StyledNavLink>
          </li>
          <li>
            <StyledComponents.StyledNavLink to="/recruitment">
              <motion.div
                variants={AnimatedIconVars}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
              >
                <StyledComponents.MobileMenuIcon>
                  <MdOutlineWorkOutline className="list-icon" />
                </StyledComponents.MobileMenuIcon>
              </motion.div>
              <StyledComponents.NavMenuItemContainer>
                <StyledComponents.NavMenuItemTitle>
                  {t('recuitment_list')}
                </StyledComponents.NavMenuItemTitle>
                <StyledComponents.NavMenuItemDescription>
                  {t('recuitment_list_description')}
                </StyledComponents.NavMenuItemDescription>
              </StyledComponents.NavMenuItemContainer>
            </StyledComponents.StyledNavLink>
          </li>
        </ul>
      </nav>
      <Link to="/" className="logo  ">
        <img src={Logo} alt="abak" className="max-w-[11rem] lg:max-w-[12rem]" />
      </Link>
      {<Login loginModal={loginModal} close={() => setLoginModal(false)} />}
    </div>
  );
}

export default MainNav;
