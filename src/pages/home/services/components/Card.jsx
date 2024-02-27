import styled from 'styled-components';
import './../styles/services.scss';
import { MdExpandCircleDown } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { uploadsBaseURL } from './../../../../../config/uploadsConfig';

const CategoryCard = styled.div`
  max-width: 100%;
  border-radius: 1.42rem;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  box-shadow: var(--shadow-lg);
  background-color: #fafafa;

  background-image: linear-gradient(
    to right bottom,
    #216281,
    #226585,
    #246889,
    #256c8e,
    #276f92,
    #287195,
    #297498,
    #2a769b,
    #2b789d,
    #2c7a9f,
    #2d7ca2,
    #2e7ea4
  );

  @media screen and (max-width: 310px) and (min-width: 368px) {
    width: 90% !important;
    max-width: 90% !important;
  }

  @media screen and (min-width: 368px) and (max-width: 1024px) {
    width: 28rem;
  }

  @media (min-width: 1024px) {
    width: 90%;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60%;
  }
`;

const Icon = styled.img`
  margin-top: 0.7rem;
  z-index: 99;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #fafafa;
`;

const CatIcon = styled.div`
  background-color: #fafafa;
  height: 60px;
`;

const CategoryName = styled.h1`
  color: #fafafa;
  margin-bottom: 0.7rem;
  margin-top: 0.9rem;
`;
const CategorySummary = styled.p`
  font-weight: 400;
  color: #fafafa;
  text-align: center;
`;
const style = {
  color: '#FAFAFA',
  fontSize: '3.4rem',
  position: 'absolute',
  left: '1.3rem',
  bottom: '10px',
  cursor: 'pointer',
};

const ServicesNum = styled.div`
  padding: 0.263rem 0.6rem;
  background-color: #fafafa;
  color: var(--color-brand-black-five);
  border-radius: 0.32rem;
  font-weight: 500;
  letter-spacing: 0.01234rem;
  width: fit-content;
  overflow: hidden;
  display: flex;
  gap: 5px;
  position: absolute;
  bottom: 10px;
  right: 1.3rem;
`;

const Wave = styled.svg`
  position: absolute;
  top: 47px;
  width: 100%;

  @media screen and (max-width: 310px) {
    top: 60px;
  }
`;

function Card({ icon, category, descripton, number, onClick }) {
  const { t } = useTranslation();
  return (
    <CategoryCard
      className="cat-card pt-[10.33rem] pb-[5.6rem] lg:pt-[9.33rem]   lg:h-[24.4rem] lg:w-[90%] px-2 h-[280px]"
      onClick={onClick}
    >
      <div className=" pt-3  flex flex-col items-center justify-center ">
        <CatIcon className="cat-icon bg-color-[#FAFAFA] w-full absolute top-0 h-[100px] flex justify-center">
          <Icon src={`${uploadsBaseURL}${icon}`} alt="icon" />
        </CatIcon>
        <CategoryName className="card-title pt-[1px] tracking-wide">
          {category}
        </CategoryName>
        <CategorySummary className="card-description leading-snug tracking-wide px-1">
          {descripton}
        </CategorySummary>
        <ServicesNum
          dir={i18next.language === 'en' ? 'ltr' : 'rtl'}
          className="h-10 flex items-center"
        >
          <span className="text-xl lg:text-1xl font-semibold opacity-90 services-count ">
            {t('services_count')}
          </span>
          <span className="text-xl lg:text-1xl font-semibold opacity-90 services-count-num">
            {number}
          </span>
        </ServicesNum>
      </div>
      <MdExpandCircleDown style={style} className="open-services-icon" />
      <Wave xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#FAFAFA"
          d="M0,160L60,149.3C120,139,240,117,360,117.3C480,117,600,139,720,170.7C840,203,960,245,1080,240C1200,235,1320,181,1380,154.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </Wave>
    </CategoryCard>
  );
}

export default Card;
