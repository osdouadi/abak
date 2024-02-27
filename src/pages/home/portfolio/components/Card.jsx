import { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { TfiSharethis } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '/images/logos/abak.png';
import { useTranslation } from 'react-i18next';
import { uploadsBaseURL } from '../../../../../config/uploadsConfig';
import ReactHtmlParser from 'react-html-parser'
import cookies from 'js-cookie';

const ReadMore = styled.button`
  padding: 0.3rem 0.6rem;
  border-radius: var(--border-radius-tiny);
  font-weight: 300;
  font-size: 14px;
`;



const Card = ({ item }) => {
  const currentLanguageCode = cookies.get('i18next') || 'ar';
  const { t } = useTranslation();
  return (
    <div
     
      className="card shadow-md relative lg:mr-5 md:my-4 "
    >
      <div>
        <figure>
          <img
            src={`${uploadsBaseURL}${item.image}`}
            alt="Abak-portfolio"
            className="hover:scale-105 transition-all duration-300 h-[250px] md:h-96 w-full"
          />
        </figure>
      </div>
      <div className="card-body overflow-hidden p-0 ">
        <div>
          <h2 className="project-title font-semibold p-3">{currentLanguageCode === "ar" ? item.name : item.name_en}</h2>
          <p className=" description_text font-noraml p-3 overflow-hidden h-[170px] lg:h-[200px] ">
            {currentLanguageCode === "ar" ? item.short_description : item.short_description_en}
          </p>
          <div className="card-actions flex flex-row-reverse justify-between items-center my-4 px-3">
            <img className="w-[100px] h-auto" src={Logo} alt="abak" />
            <ReadMore className="bg-blue-600 text-white link-text ">
              {' '}
              <Link  to={`portfolio/${item.id}`}>
              {t('readmore_btn')}
              </Link>
            </ReadMore>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
