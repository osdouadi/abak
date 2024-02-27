import { useEffect, useRef, useState } from 'react';
import Card from '../components/Card';
import './../styles/portfolio.css';
import styled from 'styled-components';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import {
  getAllProjectCategories,
  getAllProjects,
} from '../../../../services/portfolio';
import { uploadsBaseURL } from '../../../../../config/uploadsConfig';
import { register } from 'swiper/element/bundle';
import Pagination from '../../../../components/pagination/Pagination';
import CardSkeleton from '../../../../components/skeleton/card/CardSkeleton';
import NoData from '../../../../components/404/NoData';
import IconSkeleton from '../../../../components/skeleton/icon/iconSkeleton';
import cookies from 'js-cookie';

const Brand = styled.span`
  color: var(--color-blue-600);
`;

function Portfolio() {
  const { t } = useTranslation();
  const [portfolio, setPortfolio] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [getCategoryId, setGetCategoryId] = useState(46);
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);

  const {
    data: categoriesData,
    isPending: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryFn: () => getAllProjectCategories(),
    queryKey: ['projectCategories'],
  });

  const {
    data: projectsData,
    isPending: projectsLoading,
    isError: projectsError,
  } = useQuery({
    queryFn: () => getAllProjects(currentPage, 6, getCategoryId),
    queryKey: ['projects', currentPage, getCategoryId],
  });
  const handleCategoryId = (id, index) => {
    setGetCategoryId(id);
    setActiveSlideIndex(index);
  };

  const currentLanguageCode = cookies.get('i18next') || 'ar';


  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-[#FAFAFA]">
        <div className="py-5 md:py-14 lg:py-14 flex flex-col items-center justify-center gap-8">
          <div className="text-center px-2 space-y-7">
            <h2 className="section-primary-heading section-intro-text font-semibold  mb-3 md:mb-5 lg:mb-9 ">
              <Brand>{t('brand_name')}</Brand> {t('portfolio_section_title')}
            </h2>
            <p className=" sub-heading  text-center text-black-500 font-semibold tracking-normal opacity-95  md:mb-5 lg:px-24">
              {t('portfolio_section_description')}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <Swiper
          className="categoriesFilter "
          slidesPerView={2}
          spaceBetween={0}
          navigation={true}
          breakpoints={{
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 4,
              spaceBetween: 20,
            },
            500: {
              width: 500,
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          {categoriesLoading ? (
            <div className="flex justify-center items-center gap-5">
              <IconSkeleton />
              <IconSkeleton />
              <IconSkeleton />
            </div>
          ) : (
            categoriesData?.data.map((categoryItem, index) => (
              <SwiperSlide
                key={categoryItem.id}
                className={classNames('slide', {
                  'active-category': index === activeSlideIndex,
                })}
                onClick={() => handleCategoryId(categoryItem.id, index)}
              >
                <div className="category-icon">
                  <img
                    src={`${uploadsBaseURL}${categoryItem.image}`}
                    alt="category"
                  />
                </div>
                <div className="category-name">
                  <span>{currentLanguageCode === "ar" ? categoryItem?.name : categoryItem?.name_en}</span>
                </div>
              </SwiperSlide>
            ))
          )}{' '}
        </Swiper>
      </div>

      {/* Portfolio items */}
      {projectsLoading ? (
        <div className="flex flex-col  lg:flex-row  items-center lg:justify-center">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : projectsError || projectsData?.data?.total < 1 ? (
        <NoData missingDataName={t('projects')} />
      ) : (
        <div className="section-container pb-3">
          <div className=" container grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 ">
            {projectsData?.data?.data.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {!projectsLoading && !categoriesLoading && (
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          totalPageCount={projectsData?.data.last_page}
        />
      )}
    </div>
  );
}

export default Portfolio;
