import GuideCards from '../components/guideCards';
import Notification from './../../../../../public/images/icons/flying-letter.svg';
import Call from './../../../../../public/images/icons/meeting.svg';
import Calendar from './../../../../../public/images/icons/calendar.svg';
import Button from '../../../../UI/Button';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Brand = styled.span`
  color: var(--color-blue-600);
  
`;

function Consulting() {
  const { t } = useTranslation();
  

  return (
    <>
      <div className="bg-[#E0EDF2] w-full">
        <div className=" container  py-14 relative">
          <div className="flex flex-col items-center justify-center mx-auto py-10 ">
            <div className="text-center pt-3 pb-10 w-full flex flex-col justify-center items-center ">
            <h2 className="section-primary-heading section-intro-text font-bold md:leading-snug leading-snug mb-3 md:mb-5 lg:mb-9 ">
              
                {t('consulting_section_heading')}
                <Brand className='mx-2'>{t('brand_name')}</Brand>
              </h2>
              
              <p className=" sub-heading  text-center text-black-500 font-semibold tracking-normal opacity-95  md:mb-5 lg:px-24">
                {t('consulting_section_description')}
              </p>
            </div>
            <div className="flex flex-col items-center md:flex-row md:justify-center lg:flex-row lg:justify-center gap-10 mb-14">
              <motion.div
                className="w-[75%] lg:w-[26%]"
                initial={{ opacity: 0.5, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <GuideCards
                  icon={Calendar}
                  title={t('consulting_feature_appointment')}
                  description={t('consulting_feature_appointment_description')}
                />
              </motion.div>

              <motion.div
                className="w-[75%] lg:w-[26%]"
                initial={{ opacity: 0.5, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <GuideCards
                  icon={Notification}
                  title={t('consulting_feature_notification')}
                  description={t('consulting_feature_notification_description')}
                />
              </motion.div>
              <motion.div
                className="w-[75%] lg:w-[26%]"
                initial={{ opacity: 0.5, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <GuideCards
                  icon={Call}
                  title={t('consulting_section_meeting')}
                  description={t('consulting_section_meeting_description')}
                />
              </motion.div>
            </div>
            <Link to="/consulting">

            <Button variations="secondary">{t('order_btn')} </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Consulting;
