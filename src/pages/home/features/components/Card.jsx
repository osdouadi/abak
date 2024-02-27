import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Card({ icon, title, description, link }) {
  const { t } = useTranslation();
  return (
    <div className=" bg-[#FAFAFA]  p-6 lg:p-7 flex flex-col items-center overflow-hidden rounded-xl ">
      <div className="iconFeature relative flex justify-center items-center  rounded-full  lg:mb-10 ">
        <img src={icon} className=" w-[71.666667%] h-auto " alt={title} />
        <div className="moving-circle"></div>
      </div>
      <div className="card-title  text-center my-4 lg:mb-5">
        <h3 className=" font-bold feature-name opacity-95 lg:text-[2rem]">
          {title}
        </h3>
      </div>
      <div className="description text-center mb-3 ">
        <p className="description_text feature-summary font-semibold opacity-95 h-[60px] lg:h-[70%] mb-14 lg:leading-relaxed">
          {description}
        </p>
      </div>
      <div className="link  link-text no-underline text-white bg-blue-600 text-base font-semibold py-3 px-4 rounded-full mt-6  lg:font-light lg:px-6 lg:py-4 ">
        <Link to={link}> {t('readmore_secondary_btn')} </Link>
      </div>
    </div>
  );
}

export default Card;
