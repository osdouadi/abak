import './../styles/features.css';
import Card from '../components/Card';
import ManyServices from './../../../../../public/images/general/icon-01.svg';
import Safety from './../../../../../public/images/general/icon-02.svg';
import Consulting from './../../../../../public/images/general/icon-03.svg';
import Success from './../../../../../public/images/icons/icon-04.svg';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';

function Features() {
  const { t } = useTranslation();
  return (
    <div className=" relative min-h-[100vh]">
      <div className="absolute z-[1] top-[4%] md:top-[5%] lg:top-[9%] w-full ">
        <h3 className="section-primary-heading text-center text-[#FAFAFA]  font-semibold   ">
          {t('features_section_heading')}
        </h3>
      </div>
      <div className="featuresBg h-[28vh] md:h-[30vh]  lg:h-[43vh] items-center "></div>

      <div className="card-container relative flex flex-col items-center mt-[-6.5rem] lg:mt-[0rem]">
        <div className=" container pb-[2rem] lg:absolute  lg:top-[-11rem] w-full flex flex-wrap items-center justify-center gap-10 ">
          <motion.div
            className="company-features-card "
            initial={{ opacity: 0.5, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              icon={ManyServices}
              title={t('features_section_multiple')}
              description={t('features_section_multiple_description')}
              link="/#services-section"
            />
          </motion.div>
          <motion.div
            className="company-features-card "
            initial={{ opacity: 0.5, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              icon={Safety}
              title={t('features_section_safety')}
              description={t('features_section_safety_description')}
              link="/#services-section"
            />
          </motion.div>
          <motion.div
            className="company-features-card "
            initial={{ opacity: 0.5, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              icon={Consulting}
              title={t('features_section_consulting')}
              description={t('features_section_consulting_description')}
              link="/consulting"
            />
          </motion.div>
          <motion.div
            className="company-features-card "
            initial={{ opacity: 0.5, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              icon={Success}
              title={t('features_section_successful')}
              description={t('features_section_successful_description')}
              link="/#portfolio-section"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Features;
