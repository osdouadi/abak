import { Link, useNavigate } from 'react-router-dom';
import './../styles/footer.css';

import { MdOutlineMailOutline } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { TbClockHour5 } from 'react-icons/tb';
import { MdOutlineLocationOn } from 'react-icons/md';
import { IoBookOutline } from 'react-icons/io5';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BsShieldCheck } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';
import { TbDeviceTabletSearch } from 'react-icons/tb';
import { LiaSitemapSolid } from 'react-icons/lia';
import { MdArchitecture } from 'react-icons/md';
import { CiMedal } from 'react-icons/ci';
import { IoPricetagsOutline } from 'react-icons/io5';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';
import { RiBuilding2Line } from 'react-icons/ri';
import { TbSitemap } from 'react-icons/tb';
import { LuFileBarChart } from 'react-icons/lu';
import Logo from '/images/logos/logo-white.png';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaSnapchat } from 'react-icons/fa6';
import { IoLogoLinkedin } from 'react-icons/io5';
import { FaYoutube } from 'react-icons/fa6';
import { RxCalendar } from 'react-icons/rx';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    navigate(`/home#${sectionId}`);
  };

  const emailAddress = 'info@abak.com.sa';

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };
  const phoneNumber = '+966 53 122 2169';
  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="footer-section">
      <div className="container px-7  lg:px-10 lg:max-w-full">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap md:justify-center lg:justify-between mb-7">
            <div className="logo  mb-6 lg:flex-1">
              <img
                src={Logo}
                alt="abak"
                className=" w-[10rem] lg:w-[15rem] h-auto mb-5"
              />
              <div className="description lg:max-w-[90%]">
                <p className="text-[#FAFAFA]  font-light leading-9 tracking-wide footer-about">
                  {t('footer_about_company')}
                </p>
              </div>
            </div>
            <div className="min-w-[53%] md:min-w-[26%] lg:min-w-[0%] lg:flex-1">
              <div className="footer-section-title">
                <h3 className="leading-10 tracking-wide">
                  {' '}
                  {t('footer_browse')}
                </h3>
              </div>
              <ul className="pt-10">
                <li>
                  <MdArchitecture className="iconLink" />
                  <Link
                    to="/#services-section"
                    className={`footer-link cursor-pointer ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr '
                    }`}
                  >
                    {t('footer_service_link')}
                  </Link>
                </li>
                <li>
                  <LuFileBarChart className="iconLink " />
                  <Link
                    to="/#portfolio-section"
                    className={`footer-link cursor-pointer ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr '
                    }`}
                  >
                    {t('footer_portfolio_link')}
                  </Link>
                </li>

                <li>
                  <IoPricetagsOutline className="iconLink" />
                  <Link
                    to="/pricing"
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {' '}
                    {t('footer_pricing_link')}{' '}
                  </Link>
                </li>
                <li>
                  <MdOutlineWorkOutline className="iconLink " />
                  <Link
                    to="/recruitment"
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {t('footer_recruitment_link')}{' '}
                  </Link>
                </li>
                <li>
                  <FiPhoneCall className="iconLink" />
                  <Link
                    to="/consulting"
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {t('footer_consulting_link')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:min-w-[30%] lg:min-w-[0%] lg:flex-1">
              <div className="footer-section-title">
                <h3 className="leading-10 tracking-wide ">
                  {t('footer_important_links')}{' '}
                </h3>
              </div>
              <ul className="pt-10">
                <li>
                  <RiBuilding2Line className="iconLink " />
                  <Link
                    to="about"
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {t('footer_about_link')}{' '}
                  </Link>
                </li>

                <li>
                  <IoBookOutline className="iconLink" />
                  <Link
                    to="our-goal"
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {' '}
                    {t('footer_aim_page_link')}
                  </Link>
                </li>
                <li>
                  <FiSend className="iconLink " />
                  <Link
                    to="/#contact-section"
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {' '}
                    {t('footer_contact_us_link')}
                  </Link>
                </li>
                <li>
                  <BsShieldCheck className="iconLink" />
                  <Link
                    to="privacy"
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {' '}
                    {t('footer_privacy_page_link')}
                  </Link>
                </li>
                <li>
                  <BiSupport className="iconLink " />
                  <Link
                    to="/client-support"
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {t('footer_client_service_page_link')}{' '}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="contact md:min-w-[30%] lg:min-w-[0%] lg:flex-1">
              <div className="footer-section-title">
                <h3 className="leading-10 tracking-wide">
                  {' '}
                  {t('footer_contact')}{' '}
                </h3>
              </div>
              <ul className="pt-10">
                <li>
                  <MdOutlineMailOutline className="iconLink" />
                  <a
                    onClick={handleEmailClick}
                    className={`footer-link cursor-pointer ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {' '}
                    {t('footer_email_link')}
                  </a>
                </li>
                <li>
                  <FiPhoneCall className="iconLink" />
                  <a
                    onClick={handlePhoneClick}
                    className={`footer-link cursor-pointer ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {t('footer_phone_link')}{' '}
                  </a>
                </li>
                <li>
                  <RxCalendar className="iconLink" />
                  <Link
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {t('footer_days_of_work')}
                  </Link>
                </li>
                <li>
                  <TbClockHour5 className="iconLink" />
                  <Link
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {t('footer_hours_of_work_one')}
                  </Link>
                </li>
                <li>
                  <TbClockHour5 className="iconLink" />
                  <Link
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {t('footer_hours_of_work_two')}
                  </Link>
                </li>
                <li>
                  <MdOutlineLocationOn className="iconLink" />
                  <Link
                    className={`footer-link ${
                      i18next.language === 'ar'
                        ? 'footer-link-rtl'
                        : 'footer-link-ltr'
                    }`}
                  >
                    {t('footer_footer_address')}
                  </Link>
                </li>
                <div className="social-icons mt-4">
                  <div className="icon-container">
                    <Link>
                      <AiOutlineInstagram className="icon" />
                    </Link>
                  </div>
                  <div className="icon-container">
                    <Link to="https://www.facebook.com/profile.php?id=61554669083775">
                      <FaFacebookF className="icon" />
                    </Link>
                  </div>
                  <div className="icon-container">
                    <Link to="https://twitter.com/abak_engineer">
                      <RiTwitterXFill className="icon" />
                    </Link>
                  </div>
                  <div className="icon-container">
                    <Link to="https://www.linkedin.com/company/98655480/admin/feed/posts">
                      <IoLogoLinkedin className="icon" />
                    </Link>
                  </div>
                  <div className="icon-container">
                    <Link>
                      <FaYoutube className="icon" />
                    </Link>
                  </div>
                </div>
              </ul>
            </div>
          </div>

          <div className="copy-rights-section w-full text-center p-1">
            <hr className="w-1/2 text-center mx-auto mt-5 mb-6  h-[0.01rem] border-0 bg-[#FAFAFA]  opacity-[75]" />

            <span className="text-[#FAFAFA] text-[1.2rem] md:text-[1.4rem] lg:text-[1.4rem] leading-8 font-normal">
              {t('footer_copy_rights')}&copy;
              {currentYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
