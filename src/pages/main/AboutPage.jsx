import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
const Banner = styled.div`
  background-image: url('images/general/img_02.png');
  background-size: 100% 100%;
  width: 100%;
`;

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div>
      <Banner className="page-banner h-[200px] md:h-[400px] mb-3 md:mb-7 lg:mb-10"></Banner>
      <div className="content pb-10 ">
        <div className="container flex flex-col justify-center mx-auto px-7">
          <h1 className="page-title text-center  font-semibold  mb-5  md:mb-7 lg:mb-10">
            {t('about_us_page')}
            
          </h1>
          <div className="flex flex-col items-center ">
            <p className=" page-description text-center  mb-5  lg:max-w-[80%] lg:mb-10">
              {t('about_description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
